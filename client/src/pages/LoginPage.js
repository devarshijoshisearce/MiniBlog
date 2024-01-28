import { useContext, useState } from 'react';
import { useNavigate} from 'react-router-dom';
import { UserContext } from '../UserContext';

export default function LoginPage() {
    // const [email,setemail] = useState('');
    const [emailID, setemailID] = useState('');
    const [password, setPassword] = useState('');
    const nav=useNavigate();
    const {setUserInfo} = useContext(UserContext);
    async function login(ev) {
        ev.preventDefault();
        const response = await fetch('http://localhost:3000/auth/login', {
          method: 'POST',
          body: JSON.stringify({emailID, password}),
          headers: {'Content-Type':'application/json'},
          credentials: 'include',
        });
        if (response.ok) {
          response.json().then(userInfo => {
            //from JSON (backend)
            setUserInfo(userInfo);
            console.log(userInfo);
            console.log("Login credentials ok.");
            nav("/");
            // setRedirect(true);
          });
        } else {
            console.log("Login credentials not ok.");
            alert("Login failed");
            nav("/login");
        }
      }
    // async function login(ev){
    //     ev.preventDefault();
    //     fetch('http://localhost:3000/auth/login',{
    //         method: 'POST',
    //         body: JSON.stringify({emailID,password}),
    //         headers: {'Content-type':'application/json'},
    //         // credentials: 'include',
    //     }
    //     ).then(res=>{
    //         if(res.ok){
    //             console.log("Login credentials ok.")
    //             nav("/")
    //         } else{      
    //             alert("Login Failed - Wrong Credentials")
    //         }
    //     })
    // }
    return (
        <form className="login" onSubmit={login}>
            <h1>Login</h1>
            <input type="email" 
            name="emailID" 
            placeholder="Email" 
            value={emailID}
            onChange={ev=>setemailID(ev.target.value)}/>

            <input type="password" 
            name="password" 
            placeholder="Password" 
            value={password}
            onChange={ev=>setPassword(ev.target.value)}/>
            <button type="submit">Login</button>
        </form>
    )
}