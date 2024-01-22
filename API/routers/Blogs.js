const express=require('express')
const router=express.Router()


const controller=require("../controllers/Blogs")

router.post('/createBlog',controller.createBlogs);
router.get('/viewBlogs',controller.viewBlogs)

module.exports=router