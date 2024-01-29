import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import 'react-quill/dist/quill.snow.css';
import Editor from "../Editor";

export default function CreatePost() {
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const [files, setFile] = useState('');
  const nav = useNavigate();

  async function createNewPost(ev) {
    ev.preventDefault();

    // Check for empty fields
    if (!title || !summary || !content || !files[0]) {
      Swal.fire('Error', 'All fields are required.', 'error');
      return;
    }

    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('file', files[0]);

    try {
      const response = await fetch('http://localhost:3000/blog/createBlog', {
        method: 'POST',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Post created successfully',
          confirmButton: 'success-button',
          confirmButtonColor: '#79ac78',
        }).then(() => {
          nav('/');
        });
      } else {
        Swal.fire('Error', 'Failed to create post.', 'error');
      }
    } catch (error) {
      console.error('Error creating post:', error);
      Swal.fire('Error', 'Failed to create post. Please try again.', 'error');
    }
  }
  return (
    <form onSubmit={createNewPost} encType="multipart/form-data">
      <input
        type="title"
        placeholder={'Title'}
        value={title}
        onChange={(ev) => setTitle(ev.target.value)}
      />
      <input
        type="summary"
        placeholder={"Summary"}
        value={summary}
        onChange={(ev) => setSummary(ev.target.value)}
      />
      <input type="file" onChange={(ev) => setFile(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button type="submit" style={{ marginTop: '5px' }}>
        Create Post
      </button>
    </form>
  );
}
