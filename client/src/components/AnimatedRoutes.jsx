import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes