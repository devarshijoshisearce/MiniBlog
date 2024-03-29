const mongoose = require("mongoose")    //importing mongoose

const BlogSchema = new mongoose.Schema(
    {
        author : {type:mongoose.Schema.Types.ObjectId, ref:'Users'},
        title : {
            type : String,
            required : [true, "title is needed"]
        },
        summary : {
            type : String, 
            required : [true, "Summary is needed"]
        },
        content : {
            type : String,
            required : [true, "Content is needed"]
        },
        // Tuple of images. can be retrieved one at a time
        img : {
            type : String,
            required : [true, "Image is needed"]
        },
        upvotes : {
            type : Number
        },
        downvotes : {
            type : Number
        },
    },{
        timestamps:true,
    }
)

module.exports = mongoose.model("Blogs", BlogSchema)    //Export