import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserContext } from '../UserContext';
import Swal from 'sweetalert2';

export default function LoginPage() {
  const [emailID, setemailID] = useState('');
  const [password, setPassword] = useState('');
  const nav = useNavigate();
  const { setUserInfo } = useContext(UserContext);

  async function login(ev) {
    ev.preventDefault();
    const response = await fetch('http://localhost:3000/auth/login', {
      method: 'POST',
      body: JSON.stringify({ emailID, password }),
      headers: { 'Content-Type': 'application/json' },
      credentials: 'include',
    });

    if (response.ok) {
      response.json().then((userInfo) => {
        // from JSON (backend)
        setUserInfo(userInfo);

        Swal.fire({
          icon: 'success',
          title: 'Login Successful',
          text: 'You will be redirected to Home Page!',
          // showConfirmButton: true, // Show the OK button
          confirmButton: 'success-button',
          confirmButtonColor: '#79ac78',
        }).then(() => {
          nav('/');
        });
      });
    } else {
      Swal.fire({
        icon: 'error',
        title: 'Login Failed',
        text: 'Please enter correct credentials!',
        showConfirmButton: true, // Show the OK button
      }).then(() => {
        nav('/login');
      });
    }
  }

  return (
    <form className="login" onSubmit={login}>
      <h1>Login</h1>
      <input
        type="email"
        name="emailID"
        placeholder="Email"
        value={emailID}
        onChange={(ev) => setemailID(ev.target.value)}
      />

      <input
        type="password"
        name="password"
        placeholder="Password"
        value={password}
        onChange={(ev) => setPassword(ev.target.value)}
      />
      <button type="submit">Login</button>
    </form>
  );
}
