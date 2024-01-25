import { compareAsc, format } from "date-fns";
import { Link } from "react-router-dom";

export default function Post({title,summary,cover,content,createdAt,author}){
    return(
        <div className="post">
          
      <div className="image">
        <Link to={'/post/id'}>
          <img src={'http://localhost:3000/auth/'+cover} alt="post image" />
        </Link>
        </div>
        <div className="text">
        <Link to={'/post/id'}>
          <h2>{title}</h2>
        </Link>
        <p className="info">
          {/* need to add author in schema of post by reference from user (2:27:20) */}
          <a className="author">{author}</a>
          <time>{format(new Date(createdAt),"yyyy-MM-dd")}</time>
        </p>
        <p className="summary">{summary}</p>
        </div>
      </div>
    );
}