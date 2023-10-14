import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useCourseStore from '../../store/useCourseStore';
import useQuizStore from '../../store/useQuizStore';
import { Breadcrumbs, Button, Card, Typography } from '@material-tailwind/react';
import ReactMarkdown from 'react-markdown';
import Axios from 'axios';
import "./Chapter.scss"
import Cookies from 'js-cookie';
import useUserStore from '../../store/useUserStore';
import { Spinner } from "@material-tailwind/react";
import toast, { Toaster } from 'react-hot-toast';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;

const Chapter = () => {
    const navigate = useNavigate();
    const { courseId, chapterId } = useParams();
    const course = useCourseStore(state => state.course);
    const chapter = useCourseStore(state => state.course?.chapters.find(c => c._id === chapterId));
    const setQuiz = useQuizStore(state => state.setQuiz);
    const setChapterQuizId = useCourseStore(state => state.setChapterQuizId);
    const addQuiz = useUserStore(state => state.addQuiz);
    const setCourse = useCourseStore(state => state.setCourse);
    const [loading, setLoading] = useState(false);


    useEffect(() => {
        fetchCourseDetails();
    }, []);

    const fetchCourseDetails = async () => {
        if (!courseId) return;
        if (courseId && (course?._id === courseId)) {
            return
        }
        try {
            const courseResp = await Axios.get(APP_SERVER + `/api/course/${courseId}`, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            setCourse(courseResp.data.course);
        } catch (err) {
            toast.error("Something went wrong!");
            console.log(err);
        }
    }

    const findNextChapterId = () => {
        if (!courseId) return;
        let nextChapterId = "";
        let chapterIndex = course?.chapters.findIndex(c => c._id === chapterId);
        if (chapterIndex === course?.chapters.length - 1) return null;
        nextChapterId = course?.chapters[chapterIndex + 1]._id;
        return nextChapterId;
    }

    const findPrevChapterId = () => {
        if (!courseId) return;
        let prevChapterId = "";
        let chapterIndex = course?.chapters.findIndex(c => c._id === chapterId);
        if (chapterIndex === 0) return 0;
        prevChapterId = course?.chapters[chapterIndex - 1]._id;
        return prevChapterId;
    }

    const generateQuiz = async () => {
        if (chapter.quizId) return navigate(`/app/quiz/${chapter.quizId}`);
        let courseId = course._id;
        let chapterId = chapter._id;
        let topic = chapter.title;

        try {
            setLoading(true)
            const quizResp = await Axios.post(APP_SERVER + "/api/quiz/generate", { courseId, chapterId, topic }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            addQuiz(quizResp.data.quizMetadata);
            setQuiz(quizResp.data.newQuiz);
            setChapterQuizId(chapterId, quizResp.data.newQuiz._id);
            setLoading(false);
            navigate(`/app/quiz/${quizResp.data.newQuiz._id}`);
        } catch (error) {
            setLoading(false);
            toast.error("Something went wrong!");
            console.log(error);
        }
    }

    const handleChaterCompletion = async (chapterId) => {
        try {
            const completionResp = await Axios.post(APP_SERVER + `/api/course/chapter/complete`, { courseId: course._id, chapterId }, {
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
        <Card className='w-full p-2 md:px-6 flex items-center justify-center overflow-y-scroll'>
            <Toaster />
            <div className='w-full max-w-screen-xl h-full'>
                <div className='flex justify-between'>
                    <h1 className='text-xl md:text-3xl lg:text-5xl text-black'>{chapter?.title}</h1>
                    <Button className="bg-cteal" onClick={generateQuiz} disabled={loading}>{loading ? <Spinner /> : "Quiz"}</Button>
                </div>
                <Breadcrumbs className='px-0 bg-color-white my-2'>
                    <Typography color="black" className='cursor-pointer opacity-60' variant="p" onClick={() => navigate(`/app/course/${course._id}`)}>{course?.title}</Typography>
                    <Typography color="blue" variant="p">{chapter?.title}</Typography>
                </Breadcrumbs>
                <div className='pt-4 pb-8'>
                    <ReactMarkdown className="line-break">{chapter?.content}</ReactMarkdown>
                </div>
                <div className='w-full py-4 flex gap-2 justify-between'>
                    {findPrevChapterId() ? <Button color='gray' onClick={() => navigate(`/app/course/${course._id}/chapter/${findPrevChapterId()}`)}>Back</Button> : "_"}
                    <div>
                        <Button variant={chapter?.completed ? "filled" : "outlined"} onClick={() => handleChaterCompletion(chapter._id)} className='box-border'>{chapter?.completed ? "Completed" : "Mark as complete"}</Button>
                        {findNextChapterId() ? <Button color='gray' className="ml-2"onClick={() => navigate(`/app/course/${course._id}/chapter/${findNextChapterId()}`)}>Next chapter</Button> : null}
                    </div>
                </div>
            </div>
        </Card>
    )
}

export default Chapter



































