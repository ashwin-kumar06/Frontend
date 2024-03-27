import React, { useEffect, useState } from 'react';
import { useNavigate} from "react-router-dom";

import axios from 'axios';

export default function PersonalDetails() {
    const [error, setError] = useState("");
    const userId = localStorage.getItem('signin');
    const [formData, setFormData] = useState({name:'', mobileNumber:'', aadhar:'', address:'', userId:'' });
    const navigate = useNavigate();
    useEffect(()=>{
        document.title = "Details"
    })
    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if(formData.mobileNumber<10)
        {
            setError("Invalid Number")
        }
        else if(formData.aadhar<12){
            setError("Invalid Aadhar")
        }
        try {
            const response = await axios.post(`http://localhost:5269/api/PersonalDetails?name=${formData.name}&mobileNumber=${formData.mobileNumber}&aadhar=${formData.aadhar}&address=${formData.address}&userId=${userId}`, formData);
            if (response.status === 200 || response.status === 201) {
                navigate('/');
            } else {
                console.log("else error",response.data);
            }
        } catch (error) {
            console.error('Error:', error);
        }
    };
    return (
        <div className='login-signup'>
            <div className="login">
                <p className="sign" align="center">Details</p>
                <p className='error'>{error}</p>
                <form className="login-form" onSubmit={handleSubmit}>
                    <input className="un" type="text" align="center" placeholder="Name" name='name' value={formData.name} onChange={handleChange} />
                    <input className="pass" type="text" align="center" placeholder="Mobile Number" name='mobileNumber' value={formData.mobileNumber} onChange={handleChange} />
                    <input className="un" type="text" align="center" placeholder="Aadhar" name='aadhar' value={formData.aadhar} onChange={handleChange} />
                    <input className="un" type="text" align="center" placeholder="Address" name='address' value={formData.address} onChange={handleChange} />
                    <button className="submit" type="submit">Confirm</button>
                </form>
            </div>
        </div>
    );
} 