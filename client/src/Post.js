import {format} from "date-fns";
import {Link} from "react-router-dom";

export default function Post({_id,title,summary,img,content,createdAt,author}) {
  console.log(img)
  return (
    <div className="post">
      <div className="image" >
      <Link to={`/blog/${_id}`}>
          <center><img src={`http://localhost:3000/${img}`} alt="hello"/></center>
      </Link>
      </div>
      <div className="texts">
        <Link to={`/blog/${_id}`} key={_id}>
        <h2>{title}</h2>
        </Link>
        <p className="info">
          <a className="author">{author.username}</a>
          <time>{format(new Date(createdAt),"MMMM dd, yyyy h:mm a")}</time>
          {/* <time>{formatISO9075(new Date(createdAt))}</time> */}
        </p>
        <p className="summary">{summary}</p>
      </div>
    </div>
  );
}
