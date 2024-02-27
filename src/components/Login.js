import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function Login() {
    const [error, setError] = useState();
    const [email, setEmail] = useState();
    const [formData, setFormData] = useState({ email: '', password: '' });
    const navigate = useNavigate();
    const isEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(!isEmail.test(email)){
            setError = "Invalid email"
        }
        try {
            const response = await axios.post('http://localhost:5005/api/User/login', formData);
            if (response.status === 200) {
                const token = response.data.token;
                localStorage.setItem('token', token);
                console.log("Token:", token)// Store token in local storage 
                navigate('/homepage');
            } else {
                console.log(response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className="login">
            <p className="sign" align="center">Login</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="un" type="text" align="center" placeholder="Email" name='email' value={formData.email} onChange={handleChange} required />
                <p>{error}</p>
                <input className="pass" type="password" align="center" placeholder="Password" name='password' value={formData.password} onChange={handleChange} required />
                <button className="submit" type="submit">Login</button>
                <p className="forgot" align="center"><a href="#">Forgot Password?</a></p>
                <label>Don't have an account? <a href="/signup">SignUp</a></label>
            </form>
        </div>
    );
} 