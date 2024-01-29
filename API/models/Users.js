const mongoose = require("mongoose")    //importing mongoose

//User Schema
const UserSchema = new mongoose.Schema(
    {
        username: {
            type: String,
            required: [true, "username is needed"]
        },
        emailID: {
            type: String,
            required: [true, 'email is the required field'],
            unique: true,
            match: /^\S+@\S+\.\S+$/,
        },
        password: {
            type: String,
            required: [true, "password is needed"]
        },
        name: {
            type: String,
            required: [true, "Name is needed"]
        },
        age: {
            type: Number,
            required: [true, "Age is needed"]
        }
    }
)

module.exports = mongoose.model("Users", UserSchema)    //Export