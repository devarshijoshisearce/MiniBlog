import React, { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage() {
  const [posts, setPosts] = useState([]);
  const [hasData, setHasData] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch('http://localhost:3000/blog/viewBlogs');
        const data = await response.json();
        setPosts(data.blogs);
        setHasData(data.blogs.length > 0); // Set hasData based on the received data
      } catch (error) {
        console.error("Error fetching posts:", error);
        setHasData(false); // Set hasData to false in case of an error
      }
    };
    fetchPosts();
  }, []);

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      setHasData(posts.length > 0);
    }, 3000);

    return () => clearTimeout(timeoutId);
  }, [posts]);

  return (
    <>
      {hasData ? (
        posts.map((post, index) => (
          <Post key={post.id || index} {...post} />
        ))
      ) : (
        <h1>No posts available</h1>
      )}
    </>
  );
}
