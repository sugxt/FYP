const mongoose = require('mongoose');
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken');
const userSchema = new mongoose.Schema({
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
        default:"Freelancer"
    },
    cpassword: {
        type: String,
        required:[true, "Please Confirm Your Entered Password"]
    },
    tokens: [
        {
            token: {
                type: String,
                required: true,
            }
        }
    ]
}, {
    timestamps: true
})

// Hashing The Password
userSchema.pre('save', async function(next){
    if(this.isModified('password')){
        this.password = await bcrypt.hash(this.password, 12);
        this.cpassword = await bcrypt.hash(this.cpassword, 12);
    }
    next();
});

// Generating Token

userSchema.methods.generateAuthToken = async function() {
    try {
        let token = jwt.sign({_id:this._id}, process.env.SECRET_KEY);
        this.tokens = this.tokens.concat({token: token})
        await this.save();
        return token;
    } catch (error) {
        console.log(error);
    }
}

const User = mongoose.model('USER',userSchema);

module.exports = User;