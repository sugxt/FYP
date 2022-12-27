const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv =  require('dotenv').config();
const app = express()

const PORT = process.env.PORT || 5000;

//Connect to DB and Start Server
mongoose
    .connect(process.env.MONGO_URI)
    .then(() => {
        app.listen(PORT, ()=> {
            console.log(`Sever running on port ${PORT}`);
        });
    })
    .catch((err)=> console.log(err));