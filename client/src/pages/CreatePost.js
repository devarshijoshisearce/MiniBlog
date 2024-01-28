import { useState } from "react";
import ReactQuill from "react-quill";
import { useNavigate } from "react-router-dom";
import 'react-quill/dist/quill.snow.css';

const modules = {
  toolbar: [
    [{ 'header': [1, 2, false] }],
    ['bold', 'italic', 'underline','strike', 'blockquote'],
    [{'list': 'ordered'}, {'list': 'bullet'}, {'indent': '-1'}, {'indent': '+1'}],
    ['link', 'image'],
    ['clean']
  ],
};
const formats = [
  'header',
  'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'indent',
  'link', 'image'
];
export default function CreatePost(){
    const [title,setTitle] = useState('');
    const [summary,setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFile] = useState('');
    // const [redirect, setRedirect] = useState(false);
    const nav = useNavigate();
    async function createNewPost(ev){
      const data = new FormData();
      data.set('title',title);
      data.set('summary',summary);
      data.set('content',content);
      data.set('file',files[0]); //send only first file
      ev.preventDefault();
      console.log(files);
      const response = await fetch('http://localhost:3000/blog/createBlog',{
        method:'POST',
        body:data, //sending as Form data as want file too
        // gotta add cookie(2:27:50)
        // credentials:'include',
      });
      // if(response.ok){
      //   console.log("Hello");
      //   // setRedirect(true);
      // }
      if(response.status === 200){
        alert("Post added Successful");
        nav("/");
    }else{
        alert("POST addition Failed");
    }    
    }
    // if(redirect){
    //  return <Navigate to={'/'} />
    // }
    return (
        // gotta add route in app.js (1:47:30)
        //"multipart/form-data" is a specific MIME type used for forms that have a file upload control.
        //Multipurpose Internet Mail Extensions
        <form onSubmit={createNewPost} encType="multipart/form-data"> 
            <input type="title" 
            placeholder={'Title'}
            value={title}
            onChange={ev=> setTitle(ev.target.value)}/>
            <input type="summary" 
            placeholder={"Summary"}
            value={summary}
            onChange={ev=> setSummary(ev.target.value)}/>
            <input type="file" 
            onChange={ev=>setFile(ev.target.files)}/>
            <ReactQuill value={content} 
            onChange={newValue=> setContent(newValue)} 
            modules={modules} 
            formats={formats}/>
            <button type="submit" style={{marginTop:'5px'}}>Create Post</button>
        </form>
    );
}