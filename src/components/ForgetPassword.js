import React, { useEffect, useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from 'axios';

export default function ForgotPassword() {
    const [error, setError] = useState("");
    const [verifyOtp, setVerifyOTP] = useState("")
    const [formData, setFormData] = useState({ email: '', otp:'' });
    const navigate = useNavigate();
    const isEmail = /[a-z0-9]+@[a-z]+\.[a-z]{2,3}/;

    useEffect(() => {
        document.title = "Forgot password"
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleEmail = async (e) =>{
        e.preventDefault();
        setError("OTP sent to your mail");
        console.log("Email: ", formData.email);
        try {
            const response = await axios.post(`http://localhost:5269/api/SignupLogin/forgotpassword?email=${formData.email}`);
            const otp = response.data.sOTP;
            setVerifyOTP(otp);
        } catch (error) {
            console.error('Error:', error);
        }
    }

    const handleOTP = async (e) => {
        e.preventDefault();
        if (formData.otp == verifyOtp) {
            navigate("/newpassword")
        }
        setError("Invalid OTP")
        
    };
    return (
        <div className='login-signup'>
            <div className="login">
                <p className="sign" align="center">Verify Email</p>
                <p data-testid='Invalid' className='error'>{error}</p>
                <form className="login-form">
                    <input className="un" type="text" align="center" placeholder="Enter email" name='email' value={formData.email} onChange={handleChange} />
                    <button className="submit" onClick={handleEmail}>Send</button>
                    <p className='error'>{error}</p>
                    <input className="un mt-5" type="password" align="center" placeholder="Enter OTP" name='otp' value={formData.otp} onChange={handleChange} />
                    <button className="submit" onClick={handleOTP}>Verify</button>
                </form>
            </div>
        </div>
    );
} 