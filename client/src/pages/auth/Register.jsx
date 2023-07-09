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
import appLogo from '../../assets/icons/logo.svg'
import toast, { Toaster } from 'react-hot-toast';
import { motion } from 'framer-motion';
import { Spinner } from "@material-tailwind/react";

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Register = () => {
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [loading, setLoading] = useState(false);
    const [inputNameError, setNameError] = useState(false);
    const [inputEmailError, setEmailError] = useState(false);
    const navigate = useNavigate();

    const handleInput = (e, func) => {
        func(e.target.value);
        if (e.target.value) {
            setEmailError(false);
            setNameError(false);
        }
    }

    const handleRegistration = async () => {
        if (!email) {
            toast("Please provide your email!",
            {
                icon: '⚠️'
            });
            setEmailError(true);
            return;
        }
        if (!userName) {
            toast("Please provide your name!",
            {
                icon: '⚠️'
            });
            setNameError(true);
            return;
        }

        console.log(email, userName);

        setLoading(true);
        try {
            const checkResp = await Axios.post(APP_SERVER + '/api/auth/check', { email });
            if (checkResp.data.status) {
                toast("User already exists",
            {
                icon: '⚠️'
            });
                setLoading(false);
                return;
            }
            const registerResp = await Axios.post(APP_SERVER + "/api/auth/register", {
                email,
                userName
            });
            if (registerResp.status === 201) {
                toast.success("Registration Successful");
                setLoading(false);
                navigate("/login");
            }
        } catch (error) {
            toast.error("Something went wrong!");
            setLoading(false);
            console.log(err);
        }
    }

    return (
        <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.2 }}>
        <Toaster/>
            <div className='auth-con '>
                <div className='left-con'>
                <img src={appLogo} alt="logo" className='w-24 lg:w-30 self-start cursor-pointer' onClick={()=>navigate("/")}/>
                    <Card color="transparent" shadow={false} >
                        <Typography variant="h4" color="blue-gray" >
                            Sign Up
                        </Typography>
                        <Typography color="gray" className="mt-1 ">
                            Enter your details to register.
                        </Typography>
                        <form className="mt-8 mb-2 w-80 max-w-screen-lg sm:w-96">
                            <div className="mb-4 flex flex-col gap-6">
                                
                                <Input size="lg" label="Name" onChange={(e) => handleInput(e, setUserName)} error={inputNameError} />
                                <Input size="lg" label="Email" onChange={(e) => handleInput(e, setEmail)} error={inputEmailError} />
                            </div>
                            <Button className="mt-6 bg-cblack hover:shadow-sd flex justify-center" fullWidth onClick={handleRegistration} disabled={loading}>
                                { loading? <Spinner color="white" className="h-4 w-4" />: "Sign up"}
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
                    <p className='text-center text-gray-500 text-xs'>
                        &copy;2023 Lern
                    </p>
                </div>
                <div className='right-con'>
                    {/* <img src={loginimg} alt="image" /> */}
                </div>
            </div>
        </motion.div>
    )
}

export default Register