import React, { useEffect } from 'react'
import "./Main.scss";
import { Outlet, useNavigate } from 'react-router-dom'
import Sidebar from '../../components/sidebar/Sidebar';
import Axios from 'axios';
import useAuthStore from '../../store/useAuthStore';

const Main = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);

    if(!auth) return <h1>Loading...</h1>

    return (
        <div className='Main'>
            <Sidebar />
            <Outlet />
        </div>
    )
}

export default Main