import React, { useEffect } from 'react'
import "./Main.scss";
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import Axios from 'axios';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { checkAuth } from '../../services/checkAuth';

const Main = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);
    const setAuth = useAuthStore(state => state.setAuth);
    const setUser = useUserStore(state => state.setUser);
    const logout = useAuthStore(state => state.logout);
  
    useEffect(() => {
      !auth && checkAuth(setAuth, setUser, logout);
    }, []);

    if(!auth) return <h1>Loading...</h1>

    return (
        <div className='Main'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Main