import React, { useState } from 'react'
import './Sidebar.scss'
import { NavLink, useNavigate } from "react-router-dom"
import { motion } from 'framer-motion'
import { sidebarRoutes } from './sidebarRoutes';
import magic from '../../services/magic';
import Cookies from 'js-cookie'
import app_logo from '../../assets/icons/logo.svg'
import {
    Card,
    Typography,
    List,
    ListItem,
    ListItemPrefix,
    ListItemSuffix,
    Chip,
    Alert,
} from "@material-tailwind/react";
import {
    PresentationChartBarIcon,
    CubeTransparentIcon,
    ShoppingBagIcon,
    UserCircleIcon,
    Cog6ToothIcon,
    InboxIcon,
    PowerIcon,
    ArrowLeftOnRectangleIcon,
    RectangleGroupIcon
} from "@heroicons/react/24/solid";
import useAuthStore from '../../store/useAuthStore';

const Sidebar = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const logout = useAuthStore(state => state.logout);
    const navigate = useNavigate();

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
            logout();
            navigate("/", { replace: true });
        });
    }

    return (
        <Card className="mr-4 box-border h-[calc(100vh-2rem)] max-w-[18rem] p-2 shadow-xl shadow-blue-gray-900/5">
            <div className="mb-2 pl-4" onClick={()=>navigate("/")}>
                <img src={app_logo} alt="Lern" className='app-logo' />
            </div>
            <List className='w-full'>
                {sidebarRoutes.map((route, index) => {
                    return <NavLink to={route.path} key={route.name}>
                        <ListItem>
                            <ListItemPrefix>
                                <route.icon className="h-5 w-5" />
                            </ListItemPrefix>
                            {route.name}
                        </ListItem>
                    </NavLink>
                })}
            </List>
            <List className='absolute bottom-4 left-2'>
                <ListItem className='top-auto' onClick={handleLogout}>
                    <ListItemPrefix>
                        <ArrowLeftOnRectangleIcon className="h-5 w-5" />
                    </ListItemPrefix>
                    Logout
                </ListItem>
            </List>
        </Card>
    )
}

export default Sidebar