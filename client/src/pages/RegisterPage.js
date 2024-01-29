import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [emailID, setEmailID] = useState('');
    const [name, setName] = useState('');
    const [age, setAge] = useState('');
    const [passwordStrength, setPasswordStrength] = useState('');
    const [emailError, setEmailError] = useState('');
    const [touchedFields, setTouchedFields] = useState({});
    const navigate = useNavigate(); // Corrected: navigate instead of nav

    useEffect(() => {
        if (password) { // Check if password is not empty before calculating strength
            checkPasswordStrength(password);
        } else {
            setPasswordStrength('');
        }
    }, [password]);

    function validateEmail(email) {
        const re = /\S+@\S+\.\S+/;
        return re.test(email);
    }

    function checkPasswordStrength(password) {
        const strongRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/;
        if (strongRegex.test(password)) {
            setPasswordStrength('Strong');
        } else {
            setPasswordStrength('Weak');
        }
    }

    function handleEmailChange(email) {
        setEmailID(email);
        if (email !== '' && !validateEmail(email)) {
            setEmailError('Please enter a valid email address');
        } else {
            setEmailError('');
        }
    }

    function handleFieldBlur(field) {
        setTouchedFields({ ...touchedFields, [field]: true });
    }

    async function register(ev) {
        ev.preventDefault();
        if (!validateEmail(emailID)) {
            alert("Please enter a valid email address");
            return;
        }

        if (passwordStrength === 'Weak') {
            alert("Password is not strong enough. Please choose a stronger password.");
            return;
        }

        // Check if any mandatory fields are left empty
        if (Object.values(touchedFields).some(field => !field)) {
            alert("Please fill in all mandatory fields.");
            return;
        }

        const response = await fetch('http://localhost:3000/auth/signup', {
            method: 'POST',
            body: JSON.stringify({ username, password, emailID, name, age }),
            headers: { 'Content-type': 'application/json' },
        });

        if (response.status === 200) {
            alert("Registration Successful");
            navigate("/login"); // Corrected: navigate instead of nav
        } else {
            alert("Registration Failed");
        }
    }

    return (
        <form className="register" onSubmit={register}>
            <h1>Register</h1>
            <div className="form-group">
                <label htmlFor="username">Username<span className="required">*</span></label>
                <input
                    type="text"
                    name="username"
                    id="username"
                    value={username}
                    onChange={ev => setUsername(ev.target.value)}
                    onBlur={() => handleFieldBlur('username')}
                    required
                />
                {touchedFields.username && !username && <p className="error">Username is mandatory</p>}
            </div>

            <div className="form-group">
                <label htmlFor="emailID">Email<span className="required">*</span></label>
                <input
                    type="text"
                    name="emailID"
                    id="emailID"
                    value={emailID}
                    onChange={(ev) => handleEmailChange(ev.target.value)}
                    onBlur={() => handleFieldBlur('emailID')}
                    required
                />
                {touchedFields.emailID && !emailID && <p className="error">Mail ID is mandatory</p>}
                {emailError && <p className="error">{emailError}</p>}
            </div>

            <div className="form-group">
                <label htmlFor="password">Password<span className="required">*</span></label>
                <input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={ev => setPassword(ev.target.value)}
                    onBlur={() => handleFieldBlur('password')}
                    required
                />
                {touchedFields.password && password && <p>Password Strength: {passwordStrength}</p>}
                {touchedFields.password && !password && <p className="error">Password is mandatory</p>}

            </div>

            <div className="form-group">
                <label htmlFor="name">Name<span className="required">*</span></label>
                <input
                    type="text"
                    name="name"
                    id="name"
                    value={name}
                    onChange={ev => setName(ev.target.value)}
                    onBlur={() => handleFieldBlur('name')}
                    required
                />
                {touchedFields.name && !name && <p className="error">Name is mandatory</p>}
            </div>

            <div className="form-group">
                <label htmlFor="age">Age<span className="required">*</span></label>
                <input
                    type="number"
                    name="age"
                    id="age"
                    value={age}
                    onChange={ev => setAge(ev.target.value)}
                    onBlur={() => handleFieldBlur('age')}
                    required
                />
                {touchedFields.age && !age && <p className="error">Age is mandatory</p>}
            </div>

            <button type="submit">Register</button>
        </form>
    );
}
