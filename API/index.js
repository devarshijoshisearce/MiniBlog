const express=require("express")
const cors=require('cors')              //used to make requests to a different origin
const app=express()

const cookieParser=require("cookie-parser")  //extracts cookie data from request and converts it into usable format
require('dotenv').config()                  //loads environment variables from .env

//middleware
app.use(express.json())    //to accept json body
app.use(cookieParser())
app.use(cors({credentials:true,origin:"http://localhost:3001"}))
app.use('/uploads',express.static(__dirname+'/uploads'))


//For Testing purpose
app.get('/',(req,res)=>{
    res.send("This is home page")
    console.log("home page accessed")
})

//Routes

//routes for user operations: login,signup,logout,getProfile
const authRouter=require('./routers/Users')     
app.use('/auth',authRouter)


//routes for operations on blogs: createBlog,updateBlog,viewBlog,deleteBlog
const blogRouter=require('./routers/Blogs')
app.use('/blog',blogRouter)


const commentRouter=require('./routers/Comments')
app.use('/',commentRouter)


//Connection to database
const port=process.env.PORT ?? 2324
const dbConnection=require('./databases/connect')

dbConnection.then(()=>{
    app.listen(port,()=>{
        console.log("Listening on Port "+port);
    })
}).catch((error)=>{
    console.log('Problem to connect with database');
})



