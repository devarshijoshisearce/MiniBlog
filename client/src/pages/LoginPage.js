import { useState } from 'react';
import { Navigate } from 'react-router-dom';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);

    async function login(ev){
        ev.preventDefault();
        fetch('http://localhost:3000/auth/login',{
            method: 'POST',
            body: JSON.stringify({username,password}),
            headers: {'Content-type':'application/json'},
            credentials: 'include',
        }).then(res=>{
            if(res.ok){
                setRedirect(true);
            } else{      
                alert("Login Failed - Wrong Credentials")
            }
        })
        

        if (redirect) {
            return <Navigate to="/" />
        }
    }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="text" 
            name="username" 
            placeholder="Username" 
            value={username}
            onChange={ev=>setUsername(ev.target.value)}/>

            <input type="password" 
            name="password" 
            placeholder="Password" 
            value={password}
            onChange={ev=>setPassword(ev.target.value)}/>
            <button type="submit">Login</button>
        </form>
    )
}