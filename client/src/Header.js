import { useEffect, useContext } from "react";
import {Link} from "react-router-dom";
import { UserContext } from "./UserContext";

export default function Header(){
   const {setUserInfo, userInfo} = useContext(UserContext);
    useEffect(() => {
        fetch('http://localhost:2000/profile', {
            credentials: 'include',
        }).then(response => {
            response.json().then(userInfo =>{   
                setUserInfo(userInfo);     
            });
        });
}, [setUserInfo]);

    function logout() {
      fetch('http://localhost:2000/logout', {
        credentials: 'include',
        method: 'POST',
      });
      setUserInfo(null);
    }

    const username = userInfo?.username;
    
    return(
        <header>
            <Link to="/" className="logo">My Blog</Link>
            <nav>
                {username && (
                    <>
                        <Link to="/create">Create new post</Link>
                        <button onClick={logout} style={{ background: 'none', color: 'blue', textDecoration: 'underline', border: 'none', padding: 0, cursor: 'pointer' }}>
                            Logout
                        </button>
                    </>
                )}
                {!username && (
                    <>
                          <Link to ="/login">Login</Link>
                          <Link to ="/register">Register</Link>
                    </>
                )}
            </nav>
        </header>
    );
}