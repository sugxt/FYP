const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: [true, "Please Add a Name"]
    },
    email: {
        type: String,
        required: [true, "Please add an Email"],
        unique: true,
        trim: true,
        //this is just a regex to validate an email
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please enter a valid e-mail"
        ]
    },
    password:{
        type: String,
        required: [true, "Please Add a Password"],
        minLength: [6, "Password must be up to 6 characters"],
        maxLength: [30, "Password must be less than 30 words"],

    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.stack.imgur.com/l60Hf.png"
    },
    phone: {
        type: String,
        default: "+977"
    }
}, {
    timestamps: true
})

const User = mongoose.model("User", userSchema)
module.exports = User