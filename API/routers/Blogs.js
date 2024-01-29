const express=require('express')
const router=express.Router()

const multer = require('multer')     //handles multipart/form-data, used for uploading images
const uploadMiddleWare  = multer({dest : 'uploads/'})   //Upload is the folder in which encoded files(images) are stored


const controller=require("../controllers/Blogs")

//.single :to handle upload of a single file
router.post('/createBlog',uploadMiddleWare.single('file'),controller.createBlogs );     //create a blog. data will be passed by a form
router.get('/viewBlogs',controller.viewBlogs);                                          //retrieve all blogs
router.get('/viewBlogsbyID/:id',controller.viewBlogsbyID);                              //retrieve a specific post. Search by postID
router.put('/updateBlog',uploadMiddleWare.single('file'),controller.updateBlog)         //update specific post
router.delete('/deleteBlogsbyID/:id',controller.deleteBlogsbyID);                       //delete a specific post -> pass postID


module.exports=router




//API'S for filtering data
// router.get('/viewBlogsbyAuthor/:writer',controller.viewBlogsbyAuthor);      //retrieve all posts by user name -> search function
// router.get('/viewBlogsbyAuthorID/:writerid',controller.viewBlogsbyAuthorID);//retrieve all post by a specific user -> user page
// router.post('/updateBlogbyID',uploadMiddleWare.single('file'), controller.updateBlogsbyID)                      //update a post -> pass postID, authorID, userID, and the same data as createBLogs.