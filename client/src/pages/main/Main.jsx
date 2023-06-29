import React, { useEffect } from 'react'
import "./Main.scss";
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import Axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { checkAuth } from '../../services/checkAuth';
import { useMediaQuery } from 'react-responsive';
import app_logo from '../../assets/icons/logo.svg'

const Main = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);
    const setAuth = useAuthStore(state => state.setAuth);
    const setUser = useUserStore(state => state.setUser);
    const logout = useAuthStore(state => state.logout);
    const isMobile = useMediaQuery({ query: '(max-width: 896px)' });

    useEffect(() => {
        !auth && checkAuth(setAuth, setUser, logout);
    }, []);

    if (!auth) return <h1>Loading...</h1>

    return (
        <div className={`w-full relative ${isMobile ? 'block' : 'flex max-h-screen sm:p-4'} gap-4 bg-gray-100 box-border`}>
            <Sidebar />
            <div className={`w-full z-10 h-16 bg-gray-100 ${isMobile ? 'sticky top-0' : 'hidden'} flex items-center justify-center`}>
                <img src={app_logo} alt="Lern" className='app-logo cursor-pointer' onClick={() => navigate("/")} />
            </div>
            <Outlet />
        </div>
    )
}

export default Main