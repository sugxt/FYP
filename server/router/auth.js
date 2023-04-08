const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authenticate =  require("../middleware/authenticate")
const cookieParser = require('cookie-parser')

router.use(cookieParser())

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
            res.json({message: "User Sign in Successful"})
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
router.post('/packages',async (req,res) => {
    try {
        const {package_name, user_name, user_email,image_url,description} = req.body;
    
        if(!package_name || !user_name || !user_email || !image_url || !description) {
            return res.status(422).json({error: "Please enter all the required fields"})
    
        }
                const package = new Package({package_name, user_name,user_email,image_url,description});    
                await package.save();
                res.status(201).json({message:"Package Successfully Added"});
    } catch (error) {
        console.log(error)
     }

    });
router.get('/getpackages', authenticate, async (req,res)=>{
        const packages = await Package.find({});
        res.status(200).json({ packages });
    });

module.exports = router;