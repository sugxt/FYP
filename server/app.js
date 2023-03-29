const dotenv = require('dotenv');
const express =  require('express');
const app = express();
const mongoose = require('mongoose');

dotenv.config({ path: './config.env'});
require('./db/conn');
//const User = require('./model/userSchema');
app.use(express.json());

app.use(require('./router/auth'));

const PORT = process.env.PORT;


app.get('/',(req,res) =>{
    res.send(`Hello world from the server`);
});

// app.get('/about', middleware, (req,res) =>{
//     res.send(`Hello about world`);
// });

app.get('/status',(req,res) =>{
    res.send(`Hello contact world`);
});

app.get('/signIn',(req,res) =>{
    res.send(`Sign In`);
});

app.get('/signUp',(req,res) =>{
    res.send(`Sign Up`);
});


app.listen(5000, () =>{
    console.log(`server is running on port 3000`)
})
