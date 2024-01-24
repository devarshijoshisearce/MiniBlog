import {useState} from "react";

export default function RegisterPage() {

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailID, setemailID] = useState('');
    const [name, setName] = useState('');
    const [age, setAge ]= useState('');
    const [gender, setGender] = useState('');
    async function register(ev){
        ev.preventDefault();
         await fetch('http://localhost:3000/auth/signup',{
            method: 'POST',
            body: JSON.stringify({username,password,emailID,name,age}),
            headers: {'Content-type':'application/json'},
        })

    }
    return (
        <form className="register" onSubmit={register} >
            <h1>Register</h1>

            <input 
            type="text" 
            name="username" 
            placeholder="Username" 
            value={username} 
            onChange={ev => setUsername(ev.target.value)}/>

            <input 
            type="email" 
            name="emailID" 
            placeholder="emailID" 
            value={emailID}
            onChange={ev => setemailID(ev.target.value)}/>

            <input 
            type="password" 
            name="password" 
            placeholder="Password" 
            value={password}
            onChange={ev => setPassword(ev.target.value)}/>

            <input 
            type="text" 
            name="name" 
            placeholder="Name" 
            value={name}
            onChange={ev => setName(ev.target.value)}/>

            <input 
            type="number" 
            name="age" 
            placeholder="Age" 
            value={age}
            onChange={ev => setAge(ev.target.value)}/>

            
            
            {/* <label className="gender-1" for="cars">Select your Gender</label>
                <select name="gender" id="gender">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select> */}
                {/* <div >
                <p> Select your Gender </p>
                    <label for="Male" >Male</label>
                    <input  type="radio" name="gender" value="Male" id="Male"/>
                    <label for="Female">Female </label>
                    <input type="radio" name="gender" value="Female" id="Female"/> 
                </div> */}
                
            <button type="submit">Register</button>
        </form>
    );
}
