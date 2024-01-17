const express=require("express")
const app=express()
const port=3000

app.get('/',()=>{
    console.log("App get");
})

app.listen(port,()=>{
    console.log("Listening on Port "+port);
})

// console.log("Hello")