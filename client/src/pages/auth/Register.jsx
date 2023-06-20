import React, { useState } from 'react'
import './Auth.scss'
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleRegistration = async () => {
        if (!email || !userName) return
        console.log(email, userName);

        setLoading(true);
        try {
            const checkResp = await Axios.post(APP_SERVER + '/api/auth/check', { email });
            if (checkResp.data.status) {
                alert("User already exists");
                setLoading(false);
                return;
            }
            const registerResp = await Axios.post(APP_SERVER + "/api/auth/register", {
                email,
                userName
            });
            if (registerResp.status === 201) {
                alert("Registration Successful");
                setLoading(false);
                navigate("/login");
            }
        } catch (error) {
            alert("Something went wrong!");
            setLoading(false);
            console.log(err);
        }
    }

    return (
        <div>
            <h1>This is the Register Page</h1>
            <input type="text" placeholder="email" onChange={(e) => setEmail(e.target.value)} />
            <input type="text" placeholder="username" onChange={(e) => setUserName(e.target.value)} />
            <button onClick={handleRegistration}>Register</button>
            { loading && <h1>Loading...</h1> }
        </div>
    )
}

export default Register