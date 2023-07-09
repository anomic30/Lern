import React, { useState } from 'react'
import './Generate.scss'
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import Axios from 'axios';
import Cookies from 'js-cookie';
import ReactMarkdown from 'react-markdown'
import { Button, Card, Input, Chip, List, ListItem, ListItemSuffix, IconButton, } from '@material-tailwind/react';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import { suggestions } from './suggestions';
import ChapterList from '../../components/chapterList/ChapterList';
import useCourseStore from '../../store/useCourseStore';
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import hourglass from '../../assets/images/hourglass.json';
import Loading from '../../components/loading/Loading';
import toast, { Toaster } from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Generate = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);
    const user = useUserStore(state => state.user);
    const [topicName, setTopicName] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [showCourse, setShowCourse] = useState(false);
    const setCourse = useCourseStore(state => state.setCourse);
    const addCourse = useUserStore(state => state.addCourse);
    const course = useCourseStore(state => state.course);

    const handleTopicGeneration = async () => {
        if (!topicName) {
            toast("Please enter a topic name!",
            {
                icon: '⚠️'
            });
            return;
        }
        console.log("Generating topic...");
        try {
            setIsGenerating(true);
            const genResp = await Axios.post(APP_SERVER + "/api/user/generateCourse", { topic: topicName }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            setCourse(genResp.data.newCourse);
            addCourse(genResp.data.courseMetadata);
            setShowCourse(true);
            setIsGenerating(false);
            navigate("/app/course/"+genResp.data.newCourse._id);
            console.log(genResp.data.newCourse);
        } catch (error) {
            setIsGenerating(false);
            toast.error("Something went wrong. Please generate again!");
            console.log(error);
        }
    }

    if (!auth) return <Loading/>

    return (
        <Card className="w-full p-2" id="resp-con">
        <Toaster/>
            <div className="flex flex-wrap h-screen">
                <div className="relative w-full lg:w-1/2 md:w-2/3 px-4">
                    <h1 className="text-2xl md:text-3xl lg:text-5xl">Generate</h1>
                    {isGenerating? <p className="text-md md:text-1xl lg:text-2xl mt-2">Generating course, stay tuned...</p>:showCourse ?
                        <p className="text-md md:text-1xl lg:text-2xl mt-2">Here is your generated course!</p> :
                        <p className="text-md md:text-1xl lg:text-2xl mt-2">What do you want to learn today?</p>
                    }
                    {isGenerating ? <div className="flex-1 flex flex-col justify-center items-center mt-10 md:mt-0">
                        <Player autoplay loop src={hourglass} style={{ height: '100%', width: '100%' }} />
                    </div> : showCourse ?
                        <ChapterList course={course} />
                        :
                        <div>
                            <div className="mt-16 md:mt-32"></div>

                            <div className="gap-2 flex flex-wrap w-full lg:gap-0">
                                <div className="w-full lg:w-3/4">
                                        <Input size="lg" label="Enter a topic" className='lg:h-20 md:text-xl lg:rounded-r-none' color="blue" onChange={(e) => setTopicName(e.target.value)} value={topicName} />
                                </div>
                                <div className="w-full lg:w-1/4">
                                    <Button fullWidth className='lg:h-20 lg:rounded-l-none lg:text-sm lg:p-0 flex justify-center items-center' onClick={handleTopicGeneration}>
                                        Generate
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-10"></div>

                            <h3 className='md:text-xl xl:text-2xl font-medium'>Suggested Topics</h3>

                            <div className="mt-6"></div>

                            <div className='flex flex-wrap gap-2'>
                                {suggestions.map((suggestion, index) => {
                                    return <div onClick={() => setTopicName(suggestion.name)} key={index}>
                                        <Chip value={suggestion.name} className='cursor-pointer'/>
                                    </div>
                                })}
                            </div>
                        </div>}
                </div>
                <div className="hidden w-full lg:w-1/2 md:w-1/3 md:block overflow-hidden generate-img"></div>
            </div>
        </Card>
    )
}

export default Generate