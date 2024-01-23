export default function RegisterPage() {
    return (
        <form className="register" action="/login" method="POST">
            <h1>Register</h1>

            <input type="text" name="username" placeholder="Username" />
            <input type="email" name="email" placeholder="Email" />
            <input type="text" name="name" placeholder="Name" />
            <input type="number" name="age" placeholder="Age" />
            <input type="password" name="password" placeholder="Password" />
            <label className="gender-1" for="cars">Select your Gender</label>
                <select name="gender" id="gender">
                    <option value="female">Female</option>
                    <option value="male">Male</option>
                </select>
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
