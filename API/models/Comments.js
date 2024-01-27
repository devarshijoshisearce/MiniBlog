const mongoose = require("mongoose")    //importing mongoose

//author, parentID, content, likes, replies (Content, Timestamp, Like), Timestamp, 
// const CommentSchema = new mongoose.Schema(
//     {
//         author : {
//             type : String,
//             required : [true, "author is needed"]
//         },
//         // Parent ID is post ID if original comment, else parent comment if a reply. 
//         parentid :{
//             type : String,
//             required : [true, "Parent ID is needed"]
//         },
//         content : {
//             type : String,
//             required : [true, "Content is needed"]
//         },
//         // +1 if button is pressed
//         upvotes : {
//             type : Number
//         },
//         // +1 if button is pressed
//         downvotes : {
//             type : Number
//         },
//         timestamp : {
//             type : Date,
//             default : Date.now
//         },
//         replies : [this]
//     }
// )

const CommentSchema=new mongoose.Schema({
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Users',
        required:true,
    },
    content:{
        type:String,
        required:true,
    },
    post:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Blogs',
        // required:true,
    },
    parentComment:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Comments',
    },
    createdAt:{
        type:Date,
        default:Date.now,
    }
})
module.exports = mongoose.model("Comments", CommentSchema)    //Export