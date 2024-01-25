const mongoose = require("mongoose")    //importing mongoose

const CommentSchema = require("../models/Comments") //importing comment schema

//author, title, content, img, upvotes, downvotes, timestamp
const BlogSchema = new mongoose.Schema(
    {
        author : {
            type : String,
            required : [true, "author is needed"]
        },
        authorID : {
            type : String,
            required : [true, "authorID  is needed"]
        },
        title : {
            type : String,
            required : [true, "title is needed"]
        },
        content : {
            type : String,
            required : [true, "Content is needed"]
        },
        // Tuple of images. can be retrieved one at a time
        img : {
            data : Buffer,
            contentType : String
        },
        upvotes : {
            type : Number
        },
        downvotes : {
            type : Number
        },
        timestamp : {
            type : Date,
            default : Date.now
        }
    }
)

module.exports = mongoose.model("Blogs", BlogSchema)    //Export