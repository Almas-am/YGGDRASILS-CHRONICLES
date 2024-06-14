import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function PostPage() {
  const [postInfo, setPostInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { id } = useParams();

  // Function to check if ID is a valid MongoDB ObjectId
  const isValidObjectId = (id) => /^[0-9a-fA-F]{24}$/.test(id);

  useEffect(() => {
    if (!isValidObjectId(id)) {
      setError(new Error('Invalid ID format'));
      setLoading(false);
      return;
    }

    fetch(`http://localhost:2000/post/${id}`)
      .then(response => {
        if (!response.ok) {
          return response.text().then(text => {
            throw new Error(`Network response was not ok: ${response.status} ${response.statusText} - ${text}`);
          });
        }
        return response.json();
      })
      .then(data => {
        setPostInfo(data);
        setLoading(false);
      })
      .catch(error => {
        console.error('Error fetching post:', error);
        setError(error);
        setLoading(false);
      });
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error loading post: {error.message}</p>;
  if (!postInfo) return <p>Post not found</p>;

  return (
    <div className="post-page">
      <div className="image">
        <img src={`http://localhost:2000/${postInfo.cover}`} alt={postInfo.title} />
      </div>
      <h1>{postInfo.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: postInfo.content }} />
    </div>
  );
}
