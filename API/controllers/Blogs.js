const Blog = require("../models/Blogs");

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

      // Create a new blog instance
      const newBlog = new Blog({
        author,
        title,
        content,
        img,
        upvotes,
        downvotes,
        timestamp,
        comments,
      });

      // Save the blog to the database
      await newBlog.save();

      res.status(201).json({ message: "Blog created successfully", Blog: newBlog });
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
};

module.exports = controller;