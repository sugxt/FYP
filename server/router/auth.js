const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authenticate =  require("../middleware/authenticate")
const cookieParser = require('cookie-parser')
const multer = require('multer')
router.use(cookieParser())
const adminauth = require('../middleware/adminauth')


require('../db/conn');
const User = require('../model/userSchema')
const Package = require("../model/packageSchema")
router.get('/',(req,res) =>{
    res.send(`Hello world from the server router.js`);
});


// ****USING PROMISES****
// router.post('/register',  (req,res) =>{

//     const {name, email, password, photo, phone, role, cpassword} = req.body;
    
//     if(!name || !email || !password || !cpassword) {
//         return res.status(422).json({error: "Please enter all the required fields"})

//     }
//     if (password.length < 8){
//         return res.status(422).json({error: "Password must be at least 8 characters"})

//     }

//     User.findOne({email:email})
//     .then((userExists) => {
//         if(userExists){
//             return res.status(422).json({error: "User Already Exists"})
//         }

//         const user = new User({name, email, password, photo, phone, role,cpassword})

//         user.save().then(() =>{
//             res.status(201).json({message:"User Registered Successfully"})
//         }).catch((err) => res.status(500).json({error:"Failed to register"}))
//     }).catch(err =>{console.log(err); });
// })

// *** A-Sync and Await ***

// Sign Up Route

router.post('/register', async (req,res) =>{

    const {name, email, password, photo, phone, role, cpassword} = req.body;
    
    if(!name || !email || !password || !cpassword) {
        return res.status(422).json({error: "Please enter all the required fields"})

    }
    if (password.length < 8){
        return res.status(422).json({error: "Password must be at least 8 characters"})

    }

    try{
        
        const userExists = await User.findOne({email:email});

        if(userExists){
            return res.status(422).json({error: "Invalid Credintials"})
        } else if(password != cpassword){
            return res.status(422).json({error: "Your passwords don't match, Please try again"})
        } else {
            const user = new User({name, email, password, photo, phone, role,cpassword});    
            await user.save();
            res.status(201).json({message:"User Registered Successfully"});
    
        }

    } catch(err) {
        console.log(err)
    }

})

// Login Route

router.post('/signin', async (req,res) =>{
    try {
        const {email,password} =  req.body;

        if(!email || !password){
            return res.status(400).json({error:"Please Fill All Values"})
        }

        const userLogin = await User.findOne({email:email});

        if(userLogin){
            const isMatch = await bcrypt.compare(password, userLogin.password);
        
        if(!isMatch){
        res.status(400).json({message: "Invalid Credentials"});
        } else {
            const token = await userLogin.generateAuthToken();
            //console.log(token);

            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 25892000000),
                httpOnly: true
            });
            res.json({message: "User Sign in Successful",token})
        }
        } else {
            res.status(400).json({message: "Invalid Credentials"});
        }
    } catch (error) {
        console.log(error)
    }
})

// Middle Ware

router.get('/about',authenticate,(req,res) =>{
    res.send(req.rootUser);
});

router.get('/getdata', authenticate, (req,res)=>{
    res.send(req.rootUser);
});

// Status Page

router.post('/status', authenticate, async (req,res) => {
    try {
        const {name,email,message} = req.body;
        
        if(!name || !email || !message){
            console.log("Error in Status Form")
            return res.json({error:"Please Fill the Form"})
        }

        const userStatus = await User.findOne({_id:req.rootUserID})

        if (userStatus){
            const userMessage = await userStatus.addMessage(name,email,message)
            await userStatus.save();
            res.status(201).json({message:"Done"})
        }
    } catch (error) {
        console.log(error)
    }
})

//Logout
router.get('/logout',(req,res) =>{
    res.clearCookie("jwtoken", {path:'/'});
    res.status(200).send('User Logged Out');
});

// Add and Get Info about Packages
router.post('/packages', authenticate, async (req,res) => {
    try {
        const {package_name, user_name, user_email,image_url,description, price} = req.body;
    
        if(!package_name || !user_name || !user_email || !image_url || !description || !price) {
            return res.status(422).json({error: "Please enter all the required fields"})
    
        }
                const package = new Package({package_name, user_name,user_email,image_url,description,price});    
                await package.save();
                res.status(201).json({message:"Package Successfully Added"});
    } catch (error) {
        console.log(error)
     }

    });
router.get('/getpackages',authenticate, async (req,res)=>{
        const packages = await Package.find({});
        res.status(200).json({ packages });
    });

// Update Routes and Controllers

router.patch('/updateuser', authenticate, async (req,res) => {
    try {
        const id = req.rootUser._id;
        const {name, email, phone} = req.body;
        const isMatch = await User.findOne({email:email});
        if (isMatch){
            return res.status(200).json({error: "Invalid Credintials"})
        }
        const update = await User.findByIdAndUpdate({_id: id}, req.body, {new:true});
        res.status(200).json({message:'User Updated'})

    } catch (error) {
        res.status(500).json(error)
    }
})

router.patch('/packages/update', authenticate, async (req,res)=> {

        try{
        const {id, user_email, package_name,description,price,image_url} = req.body;
        const emailMatch = await Package.findById({_id:id})
        if(emailMatch.user_email != user_email){
            return res.status(412).send({message:'Email Doesnt Match'})
        } else{    

        const update = await Package.findByIdAndUpdate({_id:id}, req.body, {new:true})
        return res.status(200).json({message:"Packages Updated"})
        }
        } catch(error){
            
        }
})




// Admin Controllers
router.get("/admin",adminauth, async (req,res)=> {
    res.json(req.rootUser.role)
})

router.get('/getusers',adminauth, async (req,res)=>{
    const users = await User.find({});
    res.status(200).json({ users });
});

router.delete('/admin/deleteuser', adminauth, async(req,res)=> {
    try {
        const {id, name, email, photo, phone, role} = req.body;

        const userDelete = await User.findByIdAndDelete({_id:id})

        return res.status(201).send(userDelete)
    } catch (error) {
        res.json(error)
    }
})

router.delete('/admin/deletepackage', adminauth, async(req,res)=> {
    try {
        const {id} = req.body;

        const packageDelete = await Package.findByIdAndDelete({_id:id})

        return res.status(201).send(packageDelete)
    } catch (error) {
        res.json(error)
    }
})

router.patch("/admin/updateuser", adminauth, async(req,res)=> {
    try {
        const {id} = req.body;

        const upuser = await User.findByIdAndUpdate({_id:id}, req.body, {new:true})
        return res.status(201).json({message:"User Updated"})
    } catch (error) {
        return res.json(error)
    }
})
module.exports = router;