import React, { useState } from 'react'
import './Generate.scss'
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import Axios from 'axios';
import Cookies from 'js-cookie';
import ReactMarkdown from 'react-markdown'
import { Button, Card, Input, Chip, List, ListItem, ListItemSuffix, IconButton, } from '@material-tailwind/react';
import { ChevronRightIcon } from "@heroicons/react/24/outline";
import generate_img from '../../assets/images/generate.png';
import { suggestions } from './suggestions';


const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Generate = () => {
    const auth = useAuthStore(state => state.auth);
    const user = useUserStore(state => state.user);
    const [topicName, setTopicName] = useState('');
    const [suggestedTopic, setSuggestedTopic] = useState('');
    const [isGenerating, setIsGenerating] = useState(false);
    const [course, setCourse] = useState(null);
    const [showCourse, setShowCourse] = useState(false);

    const handleTopicGeneration = async () => {
        if (!topicName) {
            alert("Please enter a topic name!");
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
            setShowCourse(true);
            setIsGenerating(false);
            console.log(genResp.data);
        } catch (error) {
            setIsGenerating(false);
            console.log(error);
        }
    }

    const generateQuiz = async () => {
        let courseId = "64948e9dd086785f1c2b915e";
        let topic = "Introduction to Quantum Physics";

        try {
            const quizResp = await Axios.post(APP_SERVER + "/api/user/generateQuiz", { courseId, topic }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            console.log(quizResp);
        } catch (error) {
            console.log(error);
        }
    }

    if (!auth) return <h1>Loading...</h1>

    return (
        <Card className="w-full p-2">
            <div className="flex flex-wrap h-screen">
                <div className="relative w-full lg:w-1/2 md:w-2/3 pl-8 pr-8">
                    <h1 className="text-xl md:text-3xl lg:text-5xl">Hello {user?.userName},</h1>
                    {showCourse ?
                        <p className="text-md md:text-1xl lg:text-2xl mt-2">Here is your generated curriculum!</p> :
                        <p className="text-md md:text-1xl lg:text-2xl mt-2">What do you want to lean today?</p>
                    }
                    {isGenerating? <div>Generating your curriculum...</div>:showCourse ?
                        <div className='mt-20'>
                            <h3 className='md:text-xl xl:text-2xl font-medium text-black'>{course?.title}</h3>
                            <div className="mt-6"></div>

                            <List>
                                {course?.chapters.map((chapter, index) => {
                                    return (
                                        <ListItem ripple={false} className="py-1 pr-1 pl-4" key={index}>
                                            {chapter.title}
                                            <ListItemSuffix>
                                                <IconButton variant="text" color="blue-gray">
                                                    <ChevronRightIcon className="h-5 w-5" />
                                                </IconButton>
                                            </ListItemSuffix>
                                        </ListItem>
                                    )
                                })}
                            </List>
                        </div>
                        :
                        <div>
                            <div className="mt-32"></div>

                            <div className="gap-2 flex flex-wrap w-full lg:gap-0">
                                <div className="w-full lg:w-3/4">
                                    <Input size="lg" label="Type a topic" className='lg:h-20' onChange={(e) => setTopicName(e.target.value)} />
                                </div>
                                <div className="w-full lg:w-1/4">
                                    <Button fullWidth className='lg:h-20' onClick={handleTopicGeneration}>
                                        Generate
                                    </Button>
                                </div>
                            </div>

                            <div className="mt-10"></div>

                            <h3 className='md:text-xl xl:text-2xl font-medium'>Suggested Topics</h3>

                            <div className="mt-6"></div>

                            <div className='flex flex-wrap gap-2'>
                                {suggestions.map((suggestion, index) => {
                                    return <div onClick={() => setSuggestedTopic(suggestion.name)} key={index}>
                                        <Chip value={suggestion.name} />
                                    </div>
                                })}
                            </div>
                        </div>}

                    <p className='absolute bottom-4 w-[90%]'>Please note that the curriculum generated by this AI is based on a machine learning model and may not always reflect the latest advancements or widely accepted practices in the given field.</p>
                </div>
                <div className="hidden w-full lg:w-1/2 md:w-1/3 md:block overflow-hidden generate-img"></div>
            </div>
        </Card>
    )
}

export default Generate