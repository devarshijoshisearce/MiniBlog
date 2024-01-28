const express=require("express")
const cors=require('cors')
const app=express()
const cookieParser=require("cookie-parser")
require('dotenv').config()

//middleware
app.use(express.json())    //to accept json body
app.use(cookieParser())
// app.use(cors({credentials:true,origin:"http://localhost:3000"}))
app.use(cors())
// app.use(cors({credentials:true,origin:'http://localhost:3000'}));
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

const commentRouter=require('./routers/Comments')
app.use('/',commentRouter)


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



