import React from 'react'
import './Courses.scss'
import { Button, Card, Input, Chip, List, ListItem, ListItemSuffix, IconButton, } from '@material-tailwind/react';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';


const Courses = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);
    const user = useUserStore(state => state.user);

    if (!auth) return <h1>Loading...</h1>

    return (
        <Card className="w-full p-2">
            <div className="relative w-full lg:w-1/2 md:w-2/3 pl-8 pr-8">
                <h1 className="text-xl md:text-3xl lg:text-5xl">Hello {user?.userName},</h1>
                <p className="text-md md:text-1xl lg:text-2xl mt-2">View all of your courses here!</p>
            </div>
            {/* <div className='w-full py-8 px-8 flex flex-wrap gap-2 justify-start overflow-scroll'>
                <div className='w-96 h-64 bg-black'></div>
                <div className='w-96 h-64 bg-black'></div>
                <div className='w-96 h-64 bg-black'></div>
                <div className='w-96 h-64 bg-black'></div>
                <div className='w-96 h-64 bg-black'></div>
                <div className='w-96 h-64 bg-black'></div>
            </div> */}
            <div className='py-4 sm:py-8 sm:px-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 2xl:grid-cols-4 gap-4 overflow-y-auto'>
                {user?.courses?.map((course, index) => {
                    return <Card key={index} className='w-full h-64' onClick={()=>navigate("/app/course/"+course.courseId)}>
                        <p className='text-xl text-cyan-400'>{course.title}</p>
                        <p className='text-xl text-orange-500'>Finished: {course.finished}</p>
                        <p className='text-xl text-green-500'>Started At: {course.startedAt}</p>
                        <p className='text-xl text-green-500'>Course ID: {course.courseId}</p>

                    </Card>
                })}
            </div>
        </Card>
    )
}

export default Courses