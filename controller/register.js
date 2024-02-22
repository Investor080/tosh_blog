require('dotenv').config();
const Register = require(`../model/register`)
const bycrypt = require("bcrypt")

const registerBlog = async (req, res)=>{
    try {
        const {fullname, email, password, state, city, choosen_course, courseType, why, others} = req.body
        if(!fullname){
            return res.json({error: "Fullname is required"})
        }
        if(!email){
            return res.json({error: "Email is required"})
        }
        if(!password){
            return res.json({error: "Password is required"})
        }
        if(!state){
            return res.json({error: "Your State is required"})
        }
        if(!city){
            return res.json({error: "Your City is required"})
        }
        if(!choosen_course){
            return res.json({error: "You have not choose a course"})
        }
        if(!courseType){
            return res.json({error: "Course Type is empty"})
        }
        if(!fullname || !email || !password || !state || !city || !choosen_course || !courseType){
            return res.status(400).json("All fields are required")
        }
        const existingUser = await Register.findOne({fullname})
        if(existingUser){
            return res.json({error: "User already exist"})
        }
        const salt = await bycrypt.genSalt(10)
        const hashpassword = await bycrypt.hash(req.body.password, salt)
        const newRegister = new Register({
            fullname:fullname,
            email:email,
            password:hashpassword,
            state:state,
            city:city,
            choosen_course:choosen_course,
            courseType:courseType,
            others:others,
            why:why
        });
        await newRegister.save();
        return res.status(200).json({message: 'Registered Successfully'})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: "Internal server error"})   
    }
};

module.exports = registerBlog