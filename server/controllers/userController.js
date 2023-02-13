const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: "1d"})
};

// Register User
const registerUser = asyncHandler( async (req,res) => {
    const {name,email,password} = req.body

    //Validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all the required fields")

    }
    if (password.length < 8){
        throw new Error("Password must be up to 8 characters")

    }

    //Check if User Email already exists
    const userExists = await User.findOne({email})

    if (userExists) {
        throw new Error("The email is already in use")
    }

    // Create new user
    const user = await User.create({
        name,
        email,
        password,
    });

    const token = generateToken(user._id)

    // Send HTTP-only cookie
    res.cookie("token",token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // One Day
        sameSite:"none",
        secure: true
    });


    if (user) {
        const {_id, name, email,photo,phone,role} = user
        res.status(201).json({
            _id, name, email, photo, phone,token,role
        })
    } else{
        res.status(400)
        throw new Error("Invalid User Data")
    }
});

// Login User
const loginUser = asyncHandler( async (req,res) => {
    const {email, password} =  req.body

    // Validates the Login Request
    if (!email || !password) {
        res.status(400)
    throw new Error("Please add an email and password")
    }
    // Check if user exists
    const user = await User.findOne({email})
    if (!user) {
        res.status(400)
    throw new Error("User not found");

    }
    // After user confirmation, checking if password is correct
    const passCorrect = await bcrypt.compare(password, user.password)

    const token = generateToken(user._id)

    // Send HTTP-only cookie
    res.cookie("token",token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400), // One Day
        sameSite:"none",
        secure: true
    });



    if (user && passCorrect) {
        const {_id, name, email,photo,phone,role} = user
        res.status(200).json({
            _id,
            name,
            email,
            photo,
            phone,
            role,
            token,
            message:"Successfully Logged In"
        });
    } else {
        res.status(400);
        throw new Error("Your email or password is invalid");
    }

});

// Log the User Out

const logout = asyncHandler (async (req,res) => {
    res.cookie("token", "", {
        path: "/",
        httpOnly: true,
        expires: new Date(0), // Expires in the moment
        sameSite:"none",
        secure: true
    });
    return res.status(200).json({ message: "Successfully Logged Out" })
});

// Get User Profile

const getUser = asyncHandler (async (req,res) => {
    const user = await User.findById(req.user._id)

    if (user) {
        const {_id, name, email,photo,phone,role} = user
        res.status(200).json({
            _id, name, email, photo, phone,role
        })
    } else{
        res.status(400)
        throw new Error("User not found");
    }
});

// Get Login Status
const loginStatus = asyncHandler (async(req,res) => {
    res.send("Login Status")
});

module.exports = {
    registerUser,
    loginUser,
    logout,
    getUser,
    loginStatus,
};