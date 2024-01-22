const express=require('express')
const router=express.Router()


const controller=require("../controllers/Blogs")

router.post('/createBlog',controller.createBlogs);
router.get('/viewBlogs',controller.viewBlogs);
router.get('/viewBlogsbyID/:id',controller.viewBlogsbyID);
router.get('/viewBlogsbyAuthor/:writer',controller.viewBlogsbyAuthor);
router.get('/viewBlogsbyAuthorID/:writerid',controller.viewBlogsbyAuthorID);

module.exports=router