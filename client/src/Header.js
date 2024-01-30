import { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { UserContext } from './UserContext';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';

export default function Header() {
  const { setUserInfo, userInfo } = useContext(UserContext);
  const nav = useNavigate();

  useEffect(() => {
    fetch('http://localhost:3000/auth/profile', { credentials: 'include' }).then(response => {
      response.json().then(userInfo => {
        setUserInfo(userInfo);
        console.log(userInfo);
      });
    });
  }, []);

  function logout() {
    Swal.fire({
      title: 'Are you trying to logout?',
      text: 'Your session will end here.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#618264',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        fetch('http://localhost:3000/auth/logout', {
          credentials: 'include',
        });
        setUserInfo(null);
        nav("/");
      }
    });
  }

  const username = userInfo?.username;

  return (
    <header>
      <Link to="/" className="logo">
        <div className='left'>
        <img src="./MiniBlog-Logo.png" className='logoimg' alt="MiniBlog Logo" />
        </div>
      </Link>
      <nav>
        {username ? (
          <>
            <div className='middle'>
              <p className='middle-text'><b>Welcome,  {username} !</b></p> 
              </div>

            <div className='right'>
            <Link to="/create">Create new Post</Link>
            <a onClick={logout}>Logout</a>
            </div>
          </>
        ) : (
          <>
          <div className='middle'>            
            <p id='middle-text'><b>Welcome to MiniBlog</b></p>
          </div>
            <div className='right'><Link to="/login">Login</Link>
            <Link to="/register">Register</Link></div>
          </>
        )}
      </nav>
    </header>
  );
}
