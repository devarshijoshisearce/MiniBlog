const express=require("express")
const cors=require('cors')
const app=express()
const cookie=require("cookie-parser")
const cors = require("cors")
require('dotenv').config()

//middleware
app.use(express.json())    //to accept json body
app.use(cookie())
app.use(cors())

//Just for testing 
app.get('/',(req,res)=>{
    res.send("This is home page")
    console.log("home page accessed")
})

app.post('/signup', (req, res)=>{
    // res.json("This is the signup page")
    console.log("Signup page accessed")
})

//Routes
const authRouter=require('./routers/Users')
app.use('/auth',authRouter)

const blogRouter=require('./routers/Blogs')
app.use('/blog',blogRouter)


//Connection to db
const port=process.env.PORT ?? 2324
const dbConnection=require('./databases/connect')

dbConnection.then(()=>{
    app.listen(port,()=>{
        console.log("Listening on Port "+port);
    })
}).catch((error)=>{
    console.log('Problem to connect with database');
})



