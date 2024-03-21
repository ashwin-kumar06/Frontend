import { useState,useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import '../styles/Login.css';
import axios from 'axios';

export default function SignUp() {
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
    const navigate = useNavigate();
    const isEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    useEffect(()=>{
        document.title = "Sign up"
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
            const response = await axios.post('http://localhost:5269/api/SignupLogin/signup', formData);
            console.log('User created:', response.data);
            window.alert('User Signed in successfuly');
            navigate('/login');
        } catch (error) {
            console.error('Error creating user:', error.response.data);
        }
    };
    return (
        <div className='login-signup'>
            <div className="login">
                <p className="sign" align="center">Sign Up</p>
                <p className='error'>{error}</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="un " type="text" align="center" placeholder="Email" name='email' value={formData.email} onChange={handleChange} />
                    <input className="pass" type="password" align="center" placeholder="Password" name='password' value={formData.password} onChange={handleChange}/>
                    <input className="pass" type="password" align="center" placeholder="Confirm Password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange}/>
                    <button className="submit" type='submit'>Sign Up</button>
                </form>
            </div>
        </div>
    );
}