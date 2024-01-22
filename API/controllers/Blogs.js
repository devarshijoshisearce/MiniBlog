const { write } = require("fs");
const Blog = require("../models/Blogs");
const Temp = "65ae5a254f046fd681538ccc";
const controller = {
  async createBlogs(req, res, next) {
    try {
      const {
        author,
        title,
        content,
        img,
        upvotes,
        downvotes,
        timestamp,
        comments,
      } = req.body;

      // Save the blog to the database
      const sendBlog = await Blog.create({
        author,
        title,
        content,
        img,
        upvotes,
        downvotes,
        timestamp,
        comments,
      });
      res.status(201).send(sendBlog);
    //   res.status(201).json({ message: "Blog created successfully" });
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  },

  async viewBlogs(req, res, next) {
    try {
      // Retrieve all blogs from the database
      const blogs = await Blog.find();

      res.status(200).json({ blogs });
    } catch (error) {
      next(error);
    }
  },
  
  async viewBlogsbyID(req, res, next){
    try{
        // console.log("Temp is ", Temp);
        id = req.params.id
        const blogs = await Blog.findById(id)
        res.status(201).send(blogs);
    } catch (error){
        next(error);
    }
  },

  async viewBlogsbyAuthor(req, res, next)
  {
    try{
        writer = req.params.writer
        const blogs = await Blog.find({author : writer})
        res.status(201).send(blogs);
    } catch(error)
    {
        next(error);
    }
  }
};

module.exports = controller;