import { ChevronRightIcon } from '@heroicons/react/24/outline'
import { IconButton, List, ListItem, ListItemPrefix, ListItemSuffix, Checkbox, Progress ,Typography} from '@material-tailwind/react'
import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';
import Axios from 'axios';
import useCourseStore from '../../store/useCourseStore';
import Cookies from 'js-cookie';
import toast, { Toaster } from 'react-hot-toast';
import useUserStore from '../../store/useUserStore';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const ChapterList = ({ course }) => {
    const navigate = useNavigate();
    const setCourse = useCourseStore(state => state.setCourse);
    const [completionPercentage, setCompletionPercentage] = useState(0);
    const user = useUserStore(state => state.user);
    const setUser = useUserStore((state) => state.setUser);

    useEffect(() => {
        if (course) {
            let completedChapters = 0;
            course.chapters.forEach(chapter => {
                if (chapter.completed) completedChapters++;
            });
            let percentage = (completedChapters / course.chapters.length) * 100;
            setCompletionPercentage(completedChapters / course.chapters.length * 100);
            //find the course with course.id present in user.courses array
            const courseObj = user.courses.find(courseObj => courseObj.courseId === course._id);
            if (courseObj.finished) return;
            if (percentage === 100) {
                markCourseAsCompleted();
            }
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

    const markCourseAsCompleted = async () => {
        try {
            const resp = await Axios.post(APP_SERVER + `/api/user/course/complete/${course._id}`, {}, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            setUser(resp.data.userData);
            toast.success("Course completed successfully!");
        } catch (err) {
            console.log(err);
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

                            <ListItemSuffix onClick={() => navigate("chapter/" + chapter._id)}>
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