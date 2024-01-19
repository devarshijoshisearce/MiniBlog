const mongoose = require("mongoose")        // import mongoose

const URI = process.env.DB_URI
module.exports = mongoose.connect(URI)     // connecting to MongoDB