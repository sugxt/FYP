const asyncHandler = require("express-async-handler");
const User = require("../models/userModel");
const jwt = require("jsonwebtoken")

const generateToken = (id) => {
    return jwt.sign({id},process.env.JWT_SECRET, {expiresIn: "1d"})
};


const registerUser = asyncHandler( async (req,res) => {
    const {name,email,password} = req.body

    //Validation
    if(!name || !email || !password) {
        res.status(400)
        throw new Error("Please fill all the required fields")

    }
    if (password.length < 6){
        throw new Error("Password must be up to 6 characters")

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

    if (user) {
        const {_id, name, email,photo,phone} = user
        res.status(201).json({
            _id, name, email, photo, phone,token
        })
    } else{
        res.status(400)
        throw new Error("Invalid User Data")
    }
});

module.exports = {
    registerUser
};