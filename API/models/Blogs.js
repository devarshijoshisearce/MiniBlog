const mongoose = require("mongoose")    //importing mongoose

//author, parentID, content, likes, replies (Content, Timestamp, Like), Timestamp, 
const CommentSchema = new mongoose.Schema(
    {
        author : {
            type : String,
            required : [true, "author is needed"]
        },
        // Parent ID is post ID if original comment, else parent comment if a reply. 
        parentid :{
            type : String,
            required : [true, "Parent ID is needed"]
        },
        content : {
            type : String,
            required : [true, "Content is needed"]
        },
        // +1 if button is pressed
        upvotes : {
            type : Number
        },
        // +1 if button is pressed
        downvotes : {
            type : Number
        },
        timestamp : {
            type : Date
        },
        replies : {
            type : CommentSchema
        }
    }
)

//author, title, content, likes, comments (Content, Timestamp, Like), Timestamp, 
const BlogSchema = new mongoose.Schema(
    {
        author : {
            type : String,
            required : [true, "author is needed"]
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
        img : [{
            data : Buffer,
            contentType : String
        }],
        upvotes : {
            type : Number
        },
        downvotes : {
            type : Number
        },
        timestamp : {
            type : Date
        },
        comments : {
            type : CommentSchema
        }
    }
)