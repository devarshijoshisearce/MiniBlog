import { useContext, useEffect, useState } from 'react';
import {Link} from 'react-router-dom';
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";


export default function Header(){
    // const {setUserInfo,userInfo} = useContext(UserContext);
    const {setUserInfo,userInfo} = useContext(UserContext);
    const nav = useNavigate();
    useEffect(()=>{
      fetch('http://localhost:3000/auth/profile',{credentials: 'include'}).then(response=>{
          response.json().then(userInfo=>{
          // setUserInfo(userInfo);
          setUserInfo(userInfo);
          console.log(userInfo);
          });
      });
    },[]);

    function logout(){
      fetch('http://localhost:3000/auth/logout',{
        credentials: 'include',
      });
      setUserInfo(null);
      nav("/")
    }
    
    //userInfo can be null
    const username = userInfo?.username;
    return (
        <header>
        <Link to="/" className="logo">
          <img src="./MiniBlog-Logo.png" className='logoimg'/>
        </Link>
        <nav>
          {/* if we have username then next */}
          {username && (
          <>
          <p><b> Welcome {username} </b></p>
          <Link to="/create" > Create new Post </Link>
          <a onClick={logout}> Logout</a>
          </>
          )}
          {!username && (
            <>
            <p><b> Welcome to MiniBlog </b></p>
            <Link to="/login">Login</Link>
            <Link to="/register">Register</Link>
            </>
          )}
        </nav>
      </header>
    );
}