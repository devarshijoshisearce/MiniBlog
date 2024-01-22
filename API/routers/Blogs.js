const express=require('express')
const router=express.Router()


const controller=require("../controllers/Blogs")

router.post('/createBlog',controller.cretaeBlog);
router.get('/viewBlogs',controller.viewBlogs)

module.exports=router