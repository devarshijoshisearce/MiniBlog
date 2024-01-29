const express=require('express')
const router=express.Router()
const multer = require('multer')
const uploadMiddleWare  = multer({dest : 'uploads/'})


const controller=require("../controllers/Blogs")

router.post('/createBlog',controller.createBlogs, uploadMiddleWare.single('file') );                          //create a blog. data will be passed by a form
router.get('/viewBlogs',controller.viewBlogs);                              //retrieve all blogs
router.get('/viewBlogsbyID/:id',controller.viewBlogsbyID);                  //retrieve a specific post. Search by postID
router.get('/viewBlogsbyAuthor/:writer',controller.viewBlogsbyAuthor);      //retrieve all posts by user name -> search function
router.get('/viewBlogsbyAuthorID/:writerid',controller.viewBlogsbyAuthorID);//retrieve all post by a specific user -> user page
router.put('/deleteBlogsbyID/',controller.deleteBlogsbyID);                 //delete a specific post -> pass postID, authorID, userID as params similar to how data was passed in creating a blog
router.post('/updateBlogbyID', controller.updateBlogsbyID, uploadMiddleWare.single('file'))                      //update a post -> pass postID, authorID, userID, and the same data as createBLogs.

module.exports=router