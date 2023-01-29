const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =  require('dotenv').config();
const app = express();
const userRoute = require("./route/userRoute");
const errorHandler = require("./middleWare/errorMiddleware");
const cookieParser = require("cookie-parser");

const PORT = process.env.PORT || 5000;

//Middlewares
app.use(express.json())
app.use(express.urlencoded({extended: false}))
app.use(bodyParser.json())
app.use(cookieParser())

//Route Middleware
app.use("/api/users", userRoute)

//Routing

app.get("/", (req,res) => {
    res.send("Home Page");
});
// Error Middleware
app.use(errorHandler);

//Connect to DB and Start Server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, ()=> {
            console.log(`Sever running on port ${PORT}`);
        });
    })
    .catch((err)=> console.log(err));