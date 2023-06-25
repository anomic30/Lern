import React, { useEffect } from 'react'
import { AnimatePresence } from 'framer-motion'
import { Routes, Route, useLocation } from 'react-router-dom';
import Landing from '../pages/landing/Landing';
import Login from '../pages/auth/Login';
import Register from '../pages/auth/Register';
import Main from '../pages/main/Main';
import Dashboard from '../pages/dashboard/Dashboard';
import Generate from '../pages/generate/Generate';
import Courses from '../pages/courses/Courses';
import Course from '../pages/course/Course';
import Chapter from '../pages/chapter/Chapter';

const AnimatedRoutes = () => {
    const location = useLocation();

    return (
        <AnimatePresence mode="wait">
            <Routes location={location} key={location.pathname}>
                <Route exact path="/" element={<Landing />} />
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/app" element={<Main />}>
                    <Route path="/app" element={<Dashboard />} />
                    <Route path="/app/generate" element={<Generate />} />
                    <Route path="/app/generate/chapter/:chapterId" element={<Chapter />} />
                    <Route path="/app/courses" element={<Courses />} />
                    <Route path="/app/course" element={<Course />} />
                    <Route path="/app/course/:courseId" element={<Course />} />
                    <Route path="/app/course/:courseId/chapter/:chapterId" element={<Chapter />} />
                </Route>
            </Routes>
        </AnimatePresence>
    )
}

export default AnimatedRoutes