import {useContext, useEffect, useState} from "react";
import {Link,useParams,useNavigate} from "react-router-dom";
import {format} from "date-fns";
import {UserContext} from "../UserContext";
import DOMPurify from 'dompurify';
import Swal from 'sweetalert2';
export default function PostPage() {
  const [postInfo,setPostInfo] = useState(null);
  const {userInfo} = useContext(UserContext);
  const {id} = useParams();
  const nav = useNavigate();
    useEffect(() => {
        const fetchData = async () => {
        try {
            const response = await fetch(`http://localhost:3000/blog/viewBlogsbyID/${id}`);
            if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
            }
            const postInfo = await response.json();
            setPostInfo(postInfo);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
        };
    
        fetchData();
    
    }, [id, userInfo]);
    
    const handleDeleteClick = async () => {
        const result = await Swal.fire({
          title: 'Are you sure?',
          text: 'You won\'t be able to revert this!',
          icon: 'warning',
          showCancelButton: true,
          confirmButtonColor: '#79ac78',
          cancelButtonColor: '#d33',
          confirmButtonText: 'Yes, delete it!'
        });
    
        if (result.isConfirmed) {
          try {
            const response = await fetch(`http://localhost:3000/blog/deleteBlogsbyID/${id}`, {
              method: 'DELETE',
            });
    
            if (response.ok) {
              // If deletion is successful, show success message and navigate to homepage
              Swal.fire({
                title: 'Deleted!',
                text:'Your post has been deleted.',
                icon:'success',
                confirmButtonColor: '#79ac78',
            }
              );
              nav('/');
            } else {
              // If deletion fails, show an error message
              Swal.fire(
                'Error!',
                'Failed to delete the post. Please try again.',
                'error'
              );
              }
          } catch (error) {
            console.error('Error deleting post:', error);
          }
        }
      };
  if (!postInfo || !userInfo) return '';
  return (
    <div className="post-page">
      <h1>{postInfo.title}</h1>
      
      <time>{format(new Date(postInfo.updatedAt),"MMMM dd, yyyy h:mm a")}</time>
      <div className="author">by @{postInfo.author.username}</div>
      {userInfo._id === postInfo.author._id && (
        <>
        <div className="row">
        <div className="edit-row">
          <Link className="edit-btn" to={`/edit/${postInfo._id}`}>
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
            </svg>
            Edit this post
          </Link>
        </div>
            <div className="delete-row">
        <button className="delete-btn" onClick={handleDeleteClick}>
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" class="w-6 h-6">
  <path stroke-linecap="round" stroke-linejoin="round" d="M3 6V4a1 1 0 011-1h6a1 1 0 011 1v2m4 0V4a1 1 0 011-1h6a1 1 0 011 1v2m-3 3v10a2 2 0 01-2 2H8a2 2 0 01-2-2V9m4 0h4"/>
</svg>
          Delete this post
        </button>
        </div>
        </div>
        </>
      )}
      <div className="image-post">
        <img src={`http://localhost:3000/${postInfo.img}`} alt=""/>
      </div> 
<div className="content" dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(postInfo.content) }} />
    </div>
  );
}