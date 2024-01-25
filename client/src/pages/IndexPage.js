import { useState } from "react";
import { useEffect } from "react";
import Post from "../Post";

export default function IndexPage(){
    const [posts, setPosts] = useState([]);
    // get request from index.js in api folder
    useEffect(()=>{
        fetch('http://localhost:3000/auth/post')
        .then(res=>res.json())
        .then(data=>console.log(data))
    },[]);
    return (
        <>
           {posts.length>0 && posts.map(post=>(
                <Post {...Post} />
           ))}
        </>
    )
}