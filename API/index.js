const express=require("express")
const app=express()
require('dotenv').config()
console.log(process.env.PORT)


const port=process.env.PORT ?? 2324

app.get('/',()=>{
    console.log("App get");
})

app.listen(port,()=>{
    console.log("Listening on Port "+port);
})



// console.log("Hello")