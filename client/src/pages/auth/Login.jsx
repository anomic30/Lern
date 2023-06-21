import React, { useState } from 'react'
import './Auth.scss'
import { Button } from "@nextui-org/react";
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import magic from '../../utils/magic';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Login = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const setAuth = useAuthStore(state => state.setAuth);
    const setUser = useUserStore(state => state.setUser);
    const navigate = useNavigate();

    const handleLogin = async () => {
        setLoading(true);
        if (!email) {
            alert("Please provide your email!");
            setLoading(false);
            return;
        } else {
            //check valid email
            if (!email.includes("@")) {
                alert("Please enter a valid email address!");
                setLoading(false);
                return;
            }
            try {
                //checking if user exists
                const checkResp = await Axios.post(APP_SERVER + "/api/auth/check", { email: email });
                if (!checkResp.data.status) {
                    alert("Please register first!");
                    setLoading(false);
                    return navigate("/register");
                }
                // Trigger Magic link to be sent to user
                let didToken = await magic.auth.loginWithMagicLink({ email });

                // Validate didToken with server
                try {
                    const loginResp = await Axios.post(APP_SERVER + "/api/auth/login", { email }, {
                        headers: {
                            Authorization: "Bearer " + didToken
                        }
                    });
                    setUser(loginResp.data.user);
                    setAuth(loginResp.data.metadata);
                    Cookies.set('token', didToken);
                    setLoading(false);
                    navigate("/");
                } catch (err) {
                    alert("Login attempt failed. Please try again later!");
                    setLoading(false);
                    console.log(err);
                }
            } catch (err) {
                alert("Login attempt failed. Please try again later!");
                setLoading(false);
                console.log(err);
            }
        }
    }

    return (
        <section>
            <div className='auth-con'>
                <div className='left-con'>
                    <div className='auth-header'>
                        <h1>Log in to your account</h1>
                        <p>Continue with Google or enter your details </p>
                    </div>
                    <Button size="lg">
                        Google
                    </Button>
                </div>
                <div className='right-con'>
                    hello
                </div>

            </div>
        </section>
    )
}

export default Login