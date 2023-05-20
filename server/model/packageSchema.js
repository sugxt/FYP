const mongoose = require("mongoose");
const packageSchema = new mongoose.Schema({
    package_name: {
        type: String,
        required: true
    },
    user_name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    image_url: {
        type: String,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
    buyers:[
        {
            name:{
                type: String,
                required: true,
            },
            email:{
                type: String,
                required: true,
            },
            message:{
                type: String,
                required: true
            },
            paid:{
                type: Boolean,
                default: false,
                required: true,
            }
        }
    ],
},{
    timestamps: true
})

packageSchema.methods.addBuyer = async function(name, email, message){
    try {
        this.buyers = this.buyers.concat({name,email,message});
        await this.save();
        return this.buyers;
    } catch (error) {
        console.log(error)
    }
}

const Package = mongoose.model('Package',packageSchema)

module.exports = Package;