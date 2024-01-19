const mongoose = require("mongoose")    //importing mongoose


//function to validate email ID
var validateEmail = function(email) {
    var re = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
    return re.test(email)
};

//User Schema
const UserSchema = new mongoose.Schema(
    {
        username:{
            type : String,
            required : [true, "username is needed"]
            // unique: true,
        },
        emailID: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: 'Email address is required',
            validate: [validateEmail, 'Please fill a valid email address'],
            match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
        },
        password:{
            type : String,
            required : [true, "password is needed"]
        },
        name: {
            type : String,
            required : [true, "Name is needed"]
        },
        age: {
            type : Number,
            required : [true, "Age is needed"]   
        },
        gender: {
            type : String,
            required : [true, "Gender is needed"]
        }
    }
)

module.exports = mongoose.model("Users", UserSchema)    //Ex