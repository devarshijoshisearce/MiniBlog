import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Editor from "../Editor";
import Swal from 'sweetalert2';

export default function EditPost() {
  const { id } = useParams();
  const [title, setTitle] = useState('');
  const [summary, setSummary] = useState('');
  const [content, setContent] = useState('');
  const nav = useNavigate();
  const [files, setFiles] = useState('');

  useEffect(() => {
    fetch(`http://localhost:3000/blog/viewBlogsbyID/${id}`)
      .then(response => {
        response.json().then(postInfo => {
          setTitle(postInfo.title);
          setContent(postInfo.content);
          setSummary(postInfo.summary);
        });
      });
  }, [id]);

  async function updatePost(ev) {
    ev.preventDefault();
    const data = new FormData();
    data.set('title', title);
    data.set('summary', summary);
    data.set('content', content);
    data.set('id', id);

    if (files?.[0]) {
      data.set('file', files?.[0]);
    }

    try {
      const response = await fetch(`http://localhost:3000/blog/updateBlog`, {
        method: 'PUT',
        body: data,
        credentials: 'include',
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Update Successful',
          text: 'Post has been updated successfully!',
          confirmButton: 'success-button',
          confirmButtonColor: '#79ac78',
        }).then(() => {
          nav("/");
        });
      } else {
        Swal.fire({
          icon: 'error',
          title: 'Update Failed',
          text: 'Failed to update the post. Please try again.',
        });
      }
    } catch (error) {
      console.error('Error updating post:', error);
    }
  }
  return (
    <form onSubmit={updatePost}>
      <input type="title"
        placeholder={'Title'}
        value={title}
        onChange={ev => setTitle(ev.target.value)} />
      <input type="summary"
        placeholder={'Summary'}
        value={summary}
        onChange={ev => setSummary(ev.target.value)} />
      <input type="file"
        onChange={ev => setFiles(ev.target.files)} />
      <Editor onChange={setContent} value={content} />
      <button style={{ marginTop: '5px' }}>Update post</button>
    </form>
  );
}
