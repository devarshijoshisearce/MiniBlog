const express=require("express")
const app=express()
const cookie=require("cookie-parser")
require('dotenv').config()

//middleware
app.use(express.json())    //to accept json body
app.use(cookie())

//Just for testing 
app.get('/',(req,res)=>{
    res.send("This is home page")
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

