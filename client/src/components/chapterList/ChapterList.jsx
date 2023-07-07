import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Checkbox, Progress ,Typography} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import useCourseStore from '../../store/useCourseStore';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const ChapterList = ({ course }) => {
    const navigate = useNavigate();
    const setCourse = useCourseStore(state => state.setCourse);
    const [completionPercentage, setCompletionPercentage] = useState(0);

    useEffect(() => {
        if (course) {
            let completedChapters = 0;
            course.chapters.forEach(chapter => {
                if (chapter.completed) completedChapters++;
            });
            setCompletionPercentage(completedChapters / course.chapters.length * 100);
        }        
    },[course])

    const handleChaterCompletion = async(chapterId) => {
        try {
            const completionResp = await Axios.post(APP_SERVER + `/api/user/chapter/complete`, {courseId:course._id, chapterId},{
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            setCourse(completionResp.data.course);
        } catch (error) {
            toast.error("Something went wrong!");
            console.log(error);
        }
    }

    return (
        <div className='mt-10 grow'>
        <Toaster/>
            <div className="w-full mb-10">
                <div className="flex items-center justify-between gap-4 mb-2">
                    <Typography color="blue" variant="h6">Completed</Typography>
                    <Typography color="blue" variant="h6">{completionPercentage}%</Typography>
                </div>
                <Progress value={completionPercentage} />
            </div>
            <div className="mt-6"></div>
            <List>
                {course?.chapters?.map((chapter, index) => {
                    return (
                        <ListItem ripple={false} className="py-1 pr-1 pl-4" key={index} >
                            <ListItemPrefix className='z-100'>
                                <Checkbox
                                    key={chapter._id+index}
                                    onChange={() => handleChaterCompletion(chapter._id)}
                                    defaultChecked={chapter?.completed}
                                    ripple={false}
                                    className="hover:before:opacity-0"
                                    containerProps={{
                                        className: "p-0"
                                    }} />
                            </ListItemPrefix>
                            <div className="w-full" onClick={() => navigate("chapter/" + chapter._id)}>
                                {chapter?.title}
                            </div>

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
    )
}

export default ChapterList