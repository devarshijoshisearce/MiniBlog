const fs = require('fs')                    //file system module for working with file systems
const Blog = require("../models/Blogs");
const jwt = require('jsonwebtoken')         //used to identify authenticated user


const controller = {

  //for creation of Blogs
  async createBlogs(req, res, next) {
    try {
      const { originalname, path } = req.file;    //get the original name of file and also path
      const parts = originalname.split('.')       //splitting file name to extract extension
      const ext = parts[parts.length - 1]         //extracts the extension of image
      const newPath = path + '.' + ext            //cretes new file path from original path
      fs.renameSync(path, newPath)                //renames a file 

      const token = req.cookies.jwt;
      jwt.verify(token, process.env.SECRET_KEY, async (err, info) => {       //verifies whether user is authenticated or not
        if (err) {
          return res.status(401).json({ message: "User not logged in" })
        }
        const {title,summary,content} = req.body;
        // Save the blog to the database
        const sendBlog = await Blog.create({
          author: info.id,
          title,
          summary,
          img: newPath,
          content
        });

        res.status(201).send(sendBlog);
      })
    } catch (error) {
      next(error); // Pass the error to the error-handling middleware
    }
  },

  //To view all blogs
  async viewBlogs(req, res, next) {
    try {
      // Retrieve all blogs from the database
      const blogs = await Blog.find().populate('author', ['username']).sort({ createdAt: -1 });  // true condition, so returns all values
      res.status(200).json({ blogs });
    } catch (error) {
      next(error);
    }
  },

  //Updating single blog
  async updateBlog(req, res, next) {
    try {
      let newPath = null
      if (req.file) {
        const { originalname, path } = req.file;
        const parts = originalname.split('.')
        const ext = parts[parts.length - 1]
        newPath = path + '.' + ext
        fs.renameSync(path, newPath)
      }

      const token = req.cookies.jwt;
      jwt.verify(token, process.env.SECRET_KEY, async (err, info) => {        //verifies whether user is authenticated or not
        if (err) {
          return res.status(401).json({ message: "User not logged in" })
        }
        const { id, title, summary, content } = req.body;
        const postDoc = await Blog.findById(id);            //find the blog to be updated using id
        const sendBlogs = await postDoc.updateOne({         //update the blog 
          title,
          summary,
          img: newPath ? newPath : postDoc.img,             //if new path exists: assign its value to img
          content
        });
        res.status(201).json(sendBlogs);
      })
    } catch (error) {
      next(error)
    }
  },

  // API to view a specific blog
  async viewBlogsbyID(req, res, next) {
    try {
      id = req.params.id
      const blogs = await Blog.findById(id).populate('author', ['username']);   // view the specific blog by using blog ID
      res.status(201).send(blogs);
    } catch (error) {
      next(error);
    }
  },

  // API to delete a blog by its ID
  async deleteBlogsbyID(req, res, next) {
    try {
      const postID = req.params.id;
      const b  = await Blog.findByIdAndDelete(postID)      //find the specific post and delete it from the database
      fs.unlinkSync(b.img)
      res.status(201).json({ message: "Post deleted successfuly" });
    } catch (error) {
      next(error);
    }
  }

};

module.exports = controller;











//Controllers for filtering data

// API to search blogs by author name -> not that useful
// async viewBlogsbyAuthor(req, res, next) {
//   try {
//     writer = req.params.writer
//     const blogs = await Blog.find({ author: writer }) // search where author = name given
//     res.status(201).send(blogs);
//   } catch (error) {
//     next(error);
//   }
// },

// // API to search blogs by specific author ID
// async viewBlogsbyAuthorID(req, res, next) {
//   try {
//     writerID = req.params.writerid
//     const blogs = await Blog.find({ authorID: writerID })    // search where authorID = ID given
//     res.status(201).send(blogs);
//   } catch (error) {
//     next(error);
//   }
// },