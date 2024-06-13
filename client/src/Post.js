import {formatISO9075} from "date-fns";

export default function Post({title, summary,cover,content, createdAt, author}){
    return(
        <div className="post">
            <div className="Image">
                <img src="https://techcrunch.com/wp-content/uploads/2024/06/WWDC-2024-Apple-Intelligence-Reveal.jpg?resize=768,432"></img>
            </div>
            <div className="text">
                <h2>{title}</h2>
                <p className="info">
                {author && <a className="author">{author.username}</a>}
                <time>{formatISO9075(new Date(createdAt))}</time>
                </p>
                <p className="summary">{summary}</p>
            </div>
        </div>
    );
}