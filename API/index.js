const express=require("express")
const app=express()
app.use(express.json())

require('dotenv').config()

app.get('/',(req,res)=>{
    res.send("This is home page")
})

const authRouter=require('./routers/Users')
app.use('/auth',authRouter)

const blogRouter=require('./routers/Blogs')
app.use('/blog',blogRouter)

const port=process.env.PORT ?? 2324

const dbConnection=require('./databases/connect')

dbConnection.then(()=>{
    app.listen(port,()=>{
        console.log("Listening on Port "+port);
    })
}).catch((error)=>{
    console.log('Problem to connect with database');
})

app.get('/',()=>{
    console.log("App get");
})





// console.log("Hello")