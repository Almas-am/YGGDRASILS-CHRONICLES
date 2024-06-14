import { useEffect, useState } from "react";
import Post from "../Post";

export default function IndexPage(){
    const [posts, setPosts] = useState([]);
    useEffect(() => {
        fetch('http://localhost:2000/post')
        .then(response => response.json())
        .then(data => {
            console.log(data); // Ensure data is correctly fetched
            setPosts(data); // Set the fetched data to posts
        })
        .catch(error => {
            console.error('Error fetching posts:', error);
        });
    }, []);
    return(
       <>
            {posts.length >0 && posts.map(post => (
               <Post key={post._id} {...post} /> 
            ))}
       </>
    );
}