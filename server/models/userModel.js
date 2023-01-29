const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")

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
        minLength: [8, "Password must be up to 8 characters"],
        match: [
            /^(?=(.*[a-z]){1,})(?=(.*[A-Z]){1,})(?=(.*[0-9]){1,})(?=(.*[!@#$%^&*()\-__+.]){1,}).{8,}$/,"Please enter a unique password with uppercase, a number, and symbol"
        ]
        //maxLength: [30, "Password must be less than 30 words"],

    },
    photo: {
        type: String,
        required: [true, "Please add a photo"],
        default: "https://i.stack.imgur.com/l60Hf.png"
    },
    phone: {
        type: String,
        default: "+977"
    },
    role: {
        type: String,
        required:[true,"Please specify user"],
        default:"user"
    }
}, {
    timestamps: true
})
// Encrypt password before passing to DB
userSchema.pre("save", async function(next){
    if(!this.isModified("password")){
        return next()
    }

    //Hash Password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password,salt);
    this.password = hashedPassword;
    next();
})

const User = mongoose.model("User", userSchema)
module.exports = User