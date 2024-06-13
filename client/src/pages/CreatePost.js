import ReactQuill from "react-quill";
import 'react-quill/dist/quill.snow.css';
import React, { useState } from "react";
import { Navigate, redirect } from "react-router-dom";

const modules = {
    toolbar : [
        ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
        ['blockquote', 'code-block'],
        ['link', 'image', 'video', 'formula'],

        [{ 'header': 1 }, { 'header': 2 }],               // custom button values
        [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'list': 'check' }],
        [{ 'script': 'sub'}, { 'script': 'super' }],      // superscript/subscript
        [{ 'indent': '-1'}, { 'indent': '+1' }],          // outdent/indent
        [{ 'direction': 'rtl' }],                         // text direction

        [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

        [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
        [{ 'font': [] }],
        [{ 'align': [] }],

        ['clean']                                        // remove formatting button
    ]
};

const formats = [
    'header',
    'bold', 'italic', 'underline', 'strike', 'blockquote', 
    'list', 'bullet', 'indent',
    'link', 'image'
];


export default function CreatePost(){
    const [title, setTitle] = useState('');
    const [summary, setSummary] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState(null);
    const [redirect, setRedirect] = useState(false);

    async function createNewPost(ev){
        const data = new FormData();
        data.set('title', title);
        data.set('summary', summary);
        data.set('content', content);
        if(files){
            data.set('file', files[0]);
        } 
        ev.preventDefault();
        const response = await fetch('http://localhost:2000/post', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });
        if(response.ok){
            setRedirect(true);
        }
    }

    if(redirect){
        return <Navigate to={'/'} />
    }

    return (
       <form onSubmit={createNewPost}>
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
            <ReactQuill 
                value={content} 
                onChange={newValue => setContent(newValue)} 
                modules={modules} 
                formats={formats}/>
            <button style={{marginTop:'5px'}}>Create post</button>
       </form>
    );
}