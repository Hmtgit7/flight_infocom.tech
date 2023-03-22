const mongoose = require('mongoose')

const userSchema = new mongoose.Schema({
    flightNumber:{
        type:String,
        required:true,
        max:10,
    },
    airline:{
        type:String,
        required:true,
        max:20,
    },
    destination:{
        type:String,
        required:true,
        max:50,
    },
    departureTime: {
        type: String,
        required: true,
    },
    terminal:{
        type:Number,
        required:true,
        max:2,
    },
    gateNumber:{
        type:Number,
        required:true,
        max:2,
    }
})

const User = mongoose.model('USER', userSchema)

module.exports = User;