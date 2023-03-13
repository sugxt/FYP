const jwt = require("jsonwebtoken")
const User = require("../model/userSchema")

const authenticate = async (req,res,next) => {
    try {
        
        const token = req.cookies.jwtoken;
        const verifyToken = jwt.verify(token,process.env.SECRET_KEY)
        
        const rootUser = await User.findOne({ _id: verifyToken._id, "tokens.token": token})

        if (!rootUser) {
            throw new Error("User not Found")
        }

        req.token = token;
        req.rootUser = rootUser;
        req.rootUserID = rootUser._id;

        next() //Calling next to move on from the middleware
    } catch (error) {
        res.status(401).send("Unauthorized Request");
        //console.log(error);
    }
}

module.exports =  authenticate;