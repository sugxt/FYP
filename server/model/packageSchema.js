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
    }
},{
    timestamps: true
})

const Package = mongoose.model('Package',packageSchema)

module.exports = Package;