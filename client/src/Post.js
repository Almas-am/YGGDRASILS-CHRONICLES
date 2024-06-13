import {formatISO9075} from "date-fns";
import { Link } from "react-router-dom";

export default function Post({_id,title, summary,cover,content, createdAt, author}){
    return(
        <div className="post">
            <div className="Image">
                <Link to={'/post/${_id}'}>
                    <img src={'http://localhost:2000/'+ cover} alt="" />
                </Link>
            </div>
            <div className="text">
                <Link to={'/post/${_id}'}>
                <h2>{title}</h2>
                </Link>
                <p className="info">
                    {author && <a className="author">{author.username}</a>}
                    <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}