import React from 'react'
import './Courses.scss'
import { Button, Card, Input, Chip, List, ListItem, ListItemSuffix, ListItemPrefix, IconButton } from '@material-tailwind/react';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import { MagnifyingGlassIcon, DocumentTextIcon } from "@heroicons/react/24/solid";


const Courses = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);
    const user = useUserStore(state => state.user);

    if (!auth) return <h1>Loading...</h1>

    return (
        <Card className="w-full p-2 overflow-hidden max-h-screen">
            <div className="flex flex-wrap h-screen">
                <div className="relative w-full lg:w-2/3 md:w-2/3 px-4 sm:px-8">
                    <h1 className="text-xl md:text-3xl lg:text-5xl">Hello {user?.userName},</h1>
                    <p className="text-md md:text-1xl lg:text-2xl mt-2 mb-8">View your course details here!</p>

                    {/* <div className="mt-8  flex border-5 border-neutral-800 gap-4 h-10 items-center px-4 rounded-xl bg-zinc-200
                    hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white">
                        <MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />

                        <input
                            type="text"
                            placeholder="Search"
                            className='outline-0 w-full bg-zinc-200 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white'
                        />
                    </div> */}
                    <Input
                        type="text"
                        placeholder="Search"
                        className="   w-full bg-zinc-200 focus:!border-t-blue-500 focus:!border-blue-500  rounded-lg
                        focus:!bg-white ring-4 ring-transparent focus:ring-blue-500/20 !border !border-blue-gray-50
                        bg-white hover:bg-white hover:ring-blue-500/20 shadow-lg shadow-blue-gray-900/5 placeholder:text-blue-gray-200 text-blue-gray-500 "

                        labelProps={{
                            className: "hidden"
                        }}
                        containerProps={{
                            className: "min-w-[100px]"
                        }}
                        icon={<MagnifyingGlassIcon className="h-5 w-5 text-gray-500" />}
                    />

                    <div className='mt-8 w-full py-4 px-4 flex flex-wrap gap-2 justify-start overflow-y-auto courses-con'>
                        {user?.courses?.map((course, index) => {
                            return <ListItem key={index} className="py-1  pl-4 pr-2 hover:bg-blue-500 hover:text-white focus:bg-blue-500 focus:text-white
                            h-16 bg-blue-100 hover:bg-blue-200 hover:text-black " onClick={() => navigate("/app/course/" + course.courseId)}>
                                <ListItemPrefix>
                                    <DocumentTextIcon className="h-5 w-5 text-blue-400" />
                                </ListItemPrefix>
                                <div></div>
                                <p className='text-xl '>{course.title}</p>

                                <ListItemSuffix>
                                    <p className='text-sm text-sky-600'>Finished: {course.finished} 12/22/2028</p>
                                    {/* <p className='text-sm text-green-500'>Started At: {course.startedAt}</p> */}
                                </ListItemSuffix>

                            </ListItem>
                        })}
                    </div>

                    {/* <p className='absolute bottom-4 w-[90%]'>The generated curriculum provided by this app aims to foster curiosity, knowledge, and learning. It should be used as a helpful tool to supplement your educational journey.</p> */}
                </div>
                <div className="hidden w-full lg:w-1/3 md:w-1/3 md:block overflow-hidden course-img"></div>
            </div>
        </Card>
    )
}

export default Courses