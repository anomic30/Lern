import React, { useState } from 'react'
import './Sidebar.scss'
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { sidebarRoutes } from './sidebarRoutes';
import magic from '../../services/magic'; 
import Cookies from 'js-cookie'

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);

    const handleHover = () => {
        setIsExpanded(true);
    };

    const handleMouseLeave = () => {
        setIsExpanded(false);
    };

    // const handleExpand = () => {
    //     setIsExpanded(!isExpanded);
    // }

    const handleLogout = () => {
        magic.user.logout().then(() => {
            Cookies.remove("token");
            navigate("/");
        });
    }

    return (
        <motion.div
            initial={{ width: 75 }}
            animate={{ width: isExpanded ? 200 : 75}}
            transition={{ duration: 0.3 }}
            onMouseEnter={handleHover}
            onMouseLeave={handleMouseLeave}
            className="Sidebar">
            
            <div className='logo'>
                {/* <img src={codz_logo} alt="Codz" onClick={()=>navigate("/")} /> */}
                {isExpanded && <p className="logo-name">Lern</p>}
            </div>

            <div className="routes-con">
                <div className="routes">
                    {sidebarRoutes.map((route) => {
                        return <NavLink to={route.path} key={route.name}>
                                <motion.div className='route-box'>
                                    {/* <img src={route.icon} alt={route.name} className="route-icon" /> */}
                                    {isExpanded && <p className="route-name">{route.name}</p>}
                                </motion.div>
                        </NavLink>
                    })}
                </div>
                <div className="route-box" onClick={handleLogout}>
                    {/* <img src={logout_icon} alt="Logout" /> */}
                    {isExpanded && <p className="route-name">Logout</p>}
                </div>
            </div>
        </motion.div>
    )
}

export default Sidebar