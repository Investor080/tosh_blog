require('dotenv').config();
const mongoose = require("mongoose")
const {Schema, model} = mongoose
const registerSchema = new Schema({
    fullname:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    state:{
        type: String,
        required: true
    },
    city:{
        type: String,
        required: true
    },
    choosen_course:{
        type: String,
        required: true
    },  
    courseType:{
        type: String,
        enum:[],
    },
    others:{
        type:String
    },
    why:{
        type: String
    }
});

const Register = model("register", registerSchema)

module.exports = Register