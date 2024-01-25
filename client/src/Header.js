import { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';
export default function Header(){
    // const {setUserInfo,userInfo} = useContext(UserContext);
    const {setUserInfo,userInfo} = useContext(UserContext);
    useEffect(()=>{
      fetch('https://localhost:4000/profile',{
        credentials: 'include',
      }).then(response=>{
          response.json().then(userInfo=>{
          // setUserInfo(userInfo);
          setUserInfo(userInfo);
          });
      });
    },[]);
    function logout(){
      fetch('https://localhost:4000/logout',{
        credentials: 'include',
        method:'POST'
      });
      // setUserInfo(null);
      setUserInfo(null);
    }
    //userInfo can be null
    const username = userInfo?.username;
    return (
        <header>
        <Link to="/" className="logo">Logo</Link>
        <p><b> Welcome to MiniBlog </b></p>
        <nav>
          {/* if we have username then next */}
          {username && (
          <>
          <Link to="/create" > Create new Post </Link>
          <a onClick={logout}> Logout</a>
          </>
          )}
          {!username && (
            <>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    );
}