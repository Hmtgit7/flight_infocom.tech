const express = require('express');
const mongoose = require('mongoose')
const dotenv=require('dotenv')
const app = express();





dotenv.config({path:'./config.env'})    
require('./config/db')

const User=require('./Models/userSchema')

app.use(express.json())

app.use(require('./Routes/auth'))



const PORT =process.env.PORT||5000;


const middleware=(req,res,next)=>{
    console.log(`hello this is the middleware`)
    next(); 
}



//web application


app.get('/', (req, res) => {
    res.send("api running sucessfully")
})
app.get('/Listing', (req, res) => {
    res.send("api running sucessfully")
})
app.get('/chatGpt', (req, res) => {
    res.send("api running sucessfully")
})

app.listen(PORT, console.log(`server started on port number ${PORT}`))