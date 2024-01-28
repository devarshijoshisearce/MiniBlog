import React, { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog/viewBlogs');
        const data = await response.json();
        setPosts(data.blogs);
        console.log(data); 
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);
  return (
    <>
      {posts.length > 0 ? (
        posts.map(post => <Post key={post.id} {...post} />)
      ) : (
        <h1>No posts available</h1>
      )}
    </>
  );
}
