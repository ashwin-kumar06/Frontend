import React, { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";

import axios from 'axios';

export default function Login() {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [userData, setUserData] = useState([]);
    const navigate = useNavigate();
    const isEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    useEffect(()=>{
        document.title = "Login"
    })

    const handleChange = (e) => {
        setError("");
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!formData.email || !formData.password) {
            setError("Fields cannot be empty");
            return;
        }
        else if (!isEmail.test(formData.email)) {
            setError("Invalid email");
            return;
        }
        
        try {
            const response = await axios.post('http://localhost:5269/api/SignupLogin/login', formData);
            if (response.status === 200) {
                // const token = response.data.tokenString;
                // localStorage.setItem('token', token);
                const userId = response.data.userId;
                localStorage.setItem('signin',userId);
                console.log("User: ",userId);
                navigate('/');
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
            setError("Invalid Email or Password")
        }
    };
    return (
        <div className='login-signup'>
            <div className="login">
                <p className="sign" align="center">Login</p>
                <p className='error'>{error}</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="un" type="text" align="center" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
                    <input className="pass" type="password" align="center" placeholder="Password" name='password' value={formData.password} onChange={handleChange} />
                    <button className="submit" type="submit" data-testid="Login">Login</button>
                    <p className="forgot" align="center"><a href="/forgotpassword">Forgot Password?</a></p>
                    <label>Don't have an account? <a href="/signup">SignUp</a></label>
                </form>
            </div>
        </div>
    );
} 