const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require("jsonwebtoken");
const authenticate =  require("../middleware/authenticate")
const cookieParser = require('cookie-parser')

router.use(cookieParser())

require('../db/conn');
const User = require('../model/userSchema')

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


module.exports = router;