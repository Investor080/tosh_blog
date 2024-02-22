require('dotenv').config();
const connectDb = require('./connectdb/connect')
const express = require("express");
const mongoose = require("mongoose")
const fileUpload = require('express-fileupload')
const router = require('./routes/handler')
const bodyPaser = require("body-parser")


const port = process.env.port || 3000


const app = express();
app.use(fileUpload());
app.use(express.json())
app.use("/uploads", express.static(__dirname + '/uploads'))
app.use(bodyPaser.urlencoded({extended:false}))

app.use(`/api/v1`, router)


app.listen (port, ()=>{
    connectDb();
    console.log(`server started on port ${port}`)
});