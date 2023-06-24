import React, { useState } from 'react'
import './Auth.scss'
import {
    Card,
    Input,
    Checkbox,
    Button,
    Typography,
} from "@material-tailwind/react";
import Axios from 'axios'
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie'
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';

import googleIcon from "../../assets/icons/google.svg";
import loginimg from "../../assets/images/loginimage.png";
import magic from '../../services/magic';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Login = () => {
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [inputError, setInputError] = useState(false);
    const setAuth = useAuthStore(state => state.setAuth);
    const setUser = useUserStore(state => state.setUser);
    const navigate = useNavigate();

    const handleInput = (e) => {
        setEmail(e.target.value);
        if (e.target.value) {
            setInputError(false);
        }
    }

    const handleLogin = async () => {
        setLoading(true);
        if (!email) {
            alert("Please provide your email!");
            setInputError(true);
            setLoading(false);
            return;
        } else {
            //check valid email
            if (!email.includes("@")) {
                alert("Please enter a valid email address!");
                setInputError(true);
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
                    navigate("/app");
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
            <div className='auth-con '>
                <div className='left-con'>
                    <Card color="transparent" shadow={false} >
                        <Typography variant="h4" color="blue-gray" >
                            Log in
                        </Typography>
                        <Typography color="gray" className="mt-1 ">
                            Log in to your account
                        </Typography>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col gap-6">
                                <Button
                                    size="sm"
                                    variant="outlined"
                                    color="blue-gray"
                                    className="flex items-center justify-center gap-3 "
                                >
                                    <img src={googleIcon} alt="logo"  />
                                    Continue with Google
                                </Button>
                                <p class="or">or</p>
                                <Input size="lg" label="Email" onChange={(e) => handleInput(e)} error={inputError} />
                            </div>
                            <Button className="mt-6 " fullWidth onClick={handleLogin}>
                                Log in
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                New to Lern?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                                    onClick={()=>navigate("/register")}
                                >
                                    Sign up
                                </a>
                            </Typography>
                        </form>
                    </Card>
                </div>
                <div className='right-con'>
                    <img src={loginimg} alt="image" />
                </div>
            </div>
        </section>
    )
}

export default Login