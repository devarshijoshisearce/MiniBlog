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
            type : Date,
            default : Date.now
        },
        replies : [this]
    }
)
module.exports = mongoose.model("Comments", CommentSchema)    //Export