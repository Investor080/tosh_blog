const express = require("express");
const { createBlog, getSingleBlog, getAllBlogs, updateBlog, deleteBlog } = require("../controller/blog");
const registerBlog = require("../controller/register");
const contactForm = require("../controller/contact");


const router = express.Router();



router.route("/register").post(registerBlog)
router.route("/create-blog").post(createBlog)
router.route('/getblog/:id').get(getSingleBlog)
router.route('/getall-blog').get(getAllBlogs)
router.route('/update-blog/:id').patch(updateBlog)
router.route('/deleteblog/:id').delete(deleteBlog)
router.route('/contact-form').post(contactForm)

module.exports = router
