const blog = require('../model/blog')
const upload = require('../middlewares/handleFile')
const path = require('path')



const createBlog = async(req, res)=>{
    const {title, content} = req.body;
    const image = req.files.image;
    try {
        const existingBlog = await blog.findOne({title})
        if(existingBlog){
            res.status(401).json({messgae: "Blog already exist", success: false})
        }
        if(!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).json({message: "Blog image is required"})
        }
        const uploadPath = __dirname + '/uploads/' + image.name;       
        const newBlog = await blog.create({
            title,
            content,
            image: uploadPath
        });
        res.json({
            message: 'Blog added successfully',
            blog: newBlog,
          });
    } catch (error) {
        console.error(error)
        res.status(500).json({ error: 'Server error'});
    }
};

// Get Single Blog

const getSingleBlog = async(req, res)=>{
    try {
        const id = req.params.id
        const ownedBlog = await blog.findById(id)
        if(!ownedBlog){
            return res.status(404).json({ error: 'Blog not found'})
        }
        return res.json(ownedBlog)
    } catch (error) {
        console.error(error)
        return res.status(500).json({ error: 'Server error'})
    }
};

// Get all Blogs

const getAllBlogs = async(req, res)=>{
    try {
        const blogs  = await blog.find()
        return res.status(200).json(blogs)
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
};

// Update Blog

const updateBlog = async(req, res)=>{
    try {
    const id = req.params.id
    const updatedBlog = await blog.findByIdAndUpdate(
        id,
        { $set: req.body },
        {new: true}
    )
    if (!updatedBlog){
        return res.status(404).json({message: "Blog Not Found"})
    }
    return res.status(200).json(updatedBlog)
    } catch (error){
        console.log(error)
        return res.status(500).json({error: error.message})
    } 
};

// Delete Blog

const deleteBlog = async(req, res)=>{
    try {
        const id = req.params.id
        const deletedBlog = await blog.findOneAndDelete(id)
        if(!deletedBlog){
            return res.status(404).json({messgae: "Blog Not Found"})
        }
        return res.status(201).json({messgae: "Blog has been deleted successfully"})
    } catch (error) {
        console.log(error)
        return res.status(500).json({error: error.message})
    }
};

module.exports = {
    createBlog,
    getSingleBlog,
    getAllBlogs,
    updateBlog,
    deleteBlog
}