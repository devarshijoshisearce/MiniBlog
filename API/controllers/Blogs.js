const { write } = require("fs");
const Blog = require("../models/Blogs");
const jwt=require('jsonwebtoken') 

// const Temp = "65ae5a254f046fd681538ccc";
const controller = {
  async createBlogs(req, res, next) {
    try {
      const token=req.cookies.jwt;
      jwt.verify(token,process.env.SECRET_KEY,async (err,info)=>{
        if(err){
          return res.status(401).json({ message: "User not logged in" })
        }
        const {
          title,
          summary,
          content,
          img
        } = req.body;
        // Save the blog to the database
      const sendBlog = await Blog.create({
        author: info.id,
        title,
        summary,
        content,
        img,
        upvotes,
        downvotes,
      });
      
      res.status(201).send(sendBlog);
      }) 
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  },

  //API to view all blogs
  async viewBlogs(req, res, next) {
    try {
      // Retrieve all blogs from the database
      const blogs = await Blog.find().populate('author',['username']);  // true condition, so returns all values
      res.status(200).json({ blogs });
    } catch (error) {
      next(error);
    }
  },
  
  // API to view a specific blog
  async viewBlogsbyID(req, res, next){
    try{
        // console.log("Temp is ", Temp);
        id = req.params.id
        const blogs = await Blog.findById(id).populate('author',['username']);   // search the blog ID
        res.status(201).send(blogs);
    } catch (error){
        next(error);
    }
  },

  // API to search blogs by author name -> not that useful
  async viewBlogsbyAuthor(req, res, next)
  {
    try{
        writer = req.params.writer
        const blogs = await Blog.find({author : writer}) // search where author = name given
        res.status(201).send(blogs);
    } catch(error)
    {
        next(error);
    }
  },

  // API to search blogs by specific author ID
  async viewBlogsbyAuthorID(req, res, next)
  {
    try{
        writerID = req.params.writerid
        const blogs = await Blog.find({authorID : writerID})    // search where authorID = ID given
        res.status(201).send(blogs);
    } catch(error)
    {
        next(error);
    }
  },

  // API to delete a blog by its ID
  async deleteBlogsbyID(req, res, next)
  {
    try{
        const { postID, AuthorID, userID } = req.body;
        if (AuthorID == userID)     //verify that the user is the author
        {
            const blogs = await Blog.findByIdAndDelete(postID)      //find the specific post and delete it from the database
            res.status(201).send(blogs);
        }
        else
        {
            res.status(400).send("User is not authorized to delete this post")
        }
    }catch(error)
    {
        next(error);
    }
  },

  async updateBlogsbyID(req, res, next)
  {
    try{
      const {postID, 
        userID,
        author,
        authorID,
        title,
        content,
        img,
        upvotes,
        downvotes,
        timestamp,} = req.body;

        

        if (authorID == userID)     //verify that the user is the author
        {
            // const blogs = await Blog.findByIdAndDelete(postID)      //find the specific post and delete it from the database
            const sendBlog = {
              author : author, 
              title : title, 
              content : content, 
              img : img, 
              upvotes : upvotes, 
              downvotes : downvotes, 
              timestamp : timestamp
            }
            const blogs = await Blog.findByIdAndUpdate(postID, sendBlog)
            res.status(201).send(sendBlog);
        }
        else
        {
            res.status(400).send("User is not authorized to update this post")
        }
    }catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  }

};

module.exports = controller;