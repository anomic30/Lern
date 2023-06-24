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
import googleIcon from "../../assets/icons/google.svg";
import loginimg from "../../assets/images/loginimage.png";

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
        <section>
            <div className='auth-con '>
                <div className='left-con'>
                    <Card color="transparent" shadow={false} >
                        <Typography variant="h4" color="blue-gray" >
                            Sign Up
                        </Typography>
                        <Typography color="gray" className="mt-1 ">
                            Enter your details to register.
                        </Typography>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col gap-6">
                                <Button
                                    size="sm"
                                    variant="outlined"
                                    color="blue-gray"
                                    className="flex items-center justify-center gap-3 "
                                >
                                    <img src={googleIcon} alt="logo" />
                                    Continue with Google
                                </Button>
                                <p class="or">or</p>
                                <Input size="lg" label="Name" />
                                <Input size="lg" label="Email" />
                            </div>
                            <Button className="mt-6 " fullWidth>
                                Sign up
                            </Button>
                            <Typography color="gray" className="mt-4 text-center font-normal">
                                Already have an account?{" "}
                                <a
                                    href="#"
                                    className="font-medium text-blue-500 transition-colors hover:text-blue-700"
                                    onClick={() => navigate("/login")}
                                >
                                    Log In
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

export default Register