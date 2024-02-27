import { useState } from 'react';
import { Link, useNavigate, useParams } from "react-router-dom";
import '../styles/Login.css';
import axios from 'axios';

export default function SignUp() {
    const [formData, setFormData] = useState({email:'',password:'',confirmPassword:''});
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({...formData,[e.target.name]:e.target.value});
    };
    
    const handleSubmit = async (e) => {
        e.preventDefault();
        try{
            const response = await axios.post('http://localhost:5005/api/User/signup',formData);
            console.log('User created:',response.data);
            window.alert('User Signed in successfuly');
            navigate('/login');
        }catch(error){
            console.error('Error creating user:',error.response.data);
        }
    };
    return (
        <div className="login">
            <p className="sign" align="center">Sign Up</p>
            <form className="login-form" onSubmit={handleSubmit}>
                <input className="un " type="text" align="center" placeholder="Email" name='email' value={formData.email} onChange={handleChange} required />
                <input className="pass" type="password" align="center" placeholder="Password" name='password' value={formData.password} onChange={handleChange} required />
                <input className="pass" type="password" align="center" placeholder="Confirm Password" name='confirmPassword' value={formData.confirmPassword} onChange={handleChange} required />
                <button className="submit" type='submit'>Sign Up</button>
            </form>
        </div>
    );
}