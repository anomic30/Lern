import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useCourseStore from '../../store/useCourseStore';
import { Breadcrumbs, Button, Card } from '@material-tailwind/react';
import ReactMarkdown from 'react-markdown';
import breaks from 'remark-breaks';
import "./Chapter.scss"

const Chapter = () => {
    const navigate = useNavigate();
    const { chapterId } = useParams();
    const course = useCourseStore(state => state.course);
    const chapter = useCourseStore(state => state.course?.chapters.find(c => c._id === chapterId));

    useEffect(() => {
        // if (!course || !chapter) navigate('/app/courses');
        console.log("Course: ", course);
        console.log("Chapter: ", chapter);
    }, []);

    return (
        <Card className='w-full p-2 flex items-center justify-center overflow-y-scroll'>
            <div className='w-full max-w-screen-xl h-full'>
                <div className='flex justify-between'>
                    <h1 className='text-xl md:text-3xl lg:text-5xl text-black'>{chapter.title}</h1>
                    <Button>Quiz</Button>
                </div>
                <div className='flex pt-2'>
                    <p className='cursor-pointer' onClick={() => navigate("/app/courses")}>Courses</p>
                    <p className='mx-2'>/</p>
                    <p className='cursor-pointer' onClick={() => navigate(-1)}>{course.title}</p>
                </div>
                <div className='pt-4 pb-8'>
                    <ReactMarkdown className="line-break">{chapter.content}</ReactMarkdown>
                </div>
            </div>
        </Card>
    )
}

export default Chapter