require('dotenv').config();
const mongoose = require("mongoose");
const { Schema, model } = mongoose
const blogSchema = new Schema({
    title:{
        type: String,
        required: true
    },
    content:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    }
})

const Blog = model("blog", blogSchema)

module.exports = Blog