const mongoose = require("mongoose")    //importing mongoose

//author, title, content, likes, comments (Content, Timestamp, Like), Timestamp, 


const BlogSchema = new mongoose.Schema(
    {
        comments : {
            type : BlogSchema
        }
    }
)