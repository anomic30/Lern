import React, { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom';
import useCourseStore from '../../store/useCourseStore';
import useQuizStore from '../../store/useQuizStore';
import { Breadcrumbs, Button, Card } from '@material-tailwind/react';
import ReactMarkdown from 'react-markdown';
import Axios from 'axios';
import "./Chapter.scss"
import Cookies from 'js-cookie';
import useUserStore from '../../store/useUserStore';

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


    useEffect(() => {
        // if (!course || !chapter) navigate('/app/courses');
        console.log("Course: ", course);
        console.log("Chapter: ", chapter);
        fetchCourseDetails();
    }, []);

    const fetchCourseDetails = async () => {
        if (course?._id === courseId) {
            console.log("Already fetched course details");
            return
        }
        try {
            const courseResp = await Axios.get(APP_SERVER + `/api/user/course/${courseId}`, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            // setCourseResp(courseResp.data.course);
            setCourse(courseResp.data.course);
            console.log(courseResp.data.course);
        } catch (err) {
            console.log(err);
        }
    }

    const generateQuiz = async () => {
        if (chapter.quizId) return navigate(`/app/quiz/${chapter.quizId}`);
        let courseId = course._id;
        let chapterId = chapter._id;
        let topic = chapter.title;

        try {
            const quizResp = await Axios.post(APP_SERVER + "/api/user/generateQuiz", { courseId, chapterId, topic }, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            addQuiz(quizResp.data.quizMetadata);
            setQuiz(quizResp.data.newQuiz);
            setChapterQuizId(chapterId, quizResp.data.newQuiz._id);
            console.log(quizResp.data.newQuiz);
            navigate(`/app/quiz/${quizResp.data.newQuiz._id}`);
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <Card className='w-full p-2 md:px-6 flex items-center justify-center overflow-y-scroll'>
            <div className='w-full max-w-screen-xl h-full'>
                <div className='flex justify-between'>
                    <h1 className='text-xl md:text-3xl lg:text-5xl text-black'>{chapter?.title}</h1>
                    <Button onClick={generateQuiz}>Quiz</Button>
                </div>
                <div className='flex pt-2'>
                    <p className='cursor-pointer' onClick={() => navigate("/app/courses")}>Courses</p>
                    <p className='mx-2'>/</p>
                    <p className='cursor-pointer' onClick={() => navigate(-1)}>{course?.title}</p>
                </div>
                <div className='pt-4 pb-8'>
                    <ReactMarkdown className="line-break">{chapter?.content}</ReactMarkdown>
                </div>
            </div>
        </Card>
    )
}

export default Chapter