import React, { useRef, useEffect, useState } from 'react'
import { Button, Card, Input, Chip, List, ListItem, ListItemSuffix, IconButton, Container } from '@material-tailwind/react';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import './Insights.scss';
import Axios from 'axios';
import Cookies from 'js-cookie';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,

} from 'chart.js';
ChartJS.register(LinearScale, PointElement, CategoryScale, Tooltip, Legend, LineElement,
    Title);
import { Line } from 'react-chartjs-2';
import gradient from '../../assets/images/gradient.svg'
import Loading from '../../components/loading/Loading';
import { Spinner } from "@material-tailwind/react";
import { toast } from 'react-hot-toast';

const APP_SERVER = import.meta.env.VITE_APP_SERVER;




const Insights = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);
    const user = useUserStore(state => state.user);
    const canvasRef = useRef(null);
    const [completedCourse, setCompletedCourse] = useState(0);
    const [progressCourse, setProgressCourse] = useState(0);
    const [quizTime, setQuizTime] = useState([]);
    const [quizScore, setQuizScore] = useState([]);
    const [quizTopic, setQuizTopic] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        fetchAnalytics();
    }, []);

    useEffect(() => {
        calcCourses();
    }, [user]);

    const timeFormat = {
        hour: 'numeric',
        minute: 'numeric',
        hour12: true
    };

    const fetchAnalytics = async () => {
        try {
            setLoading(true);
            const analyticsResp = await Axios.get(APP_SERVER + `/api/user/analytics/`, {
                headers: {
                    Authorization: "Bearer " + Cookies.get('token')
                }
            });
            setLoading(false);
            console.log(analyticsResp.data);
            
            const sortDates=(analyticsResp.data.quizScoreOverTheTime.map(item => new Date(item.x)));
            sortDates.sort((a,b)=>a-b);
            setQuizTime(sortDates.map(date => {
                const day = date.getDate();
                const month = date.toLocaleString('default', { month: 'long' });
                return `${day}${getOrdinalSuffix(day)} ${month}`;
            }));
            setQuizScore(analyticsResp.data.quizScoreOverTheTime.map(item => item.y));
            setQuizTopic(analyticsResp.data.quizScoreOverTheTime.map(item => item.z));
            console.log(user.courses);
        } catch (err) {
            setLoading(false);
            toast.error("Something went wrong!");
            console.log(err);
        }
    }

    const getOrdinalSuffix = (day) => {
        const suffixes = ['th', 'st', 'nd', 'rd'];
        const relevantDigits = day % 100;
        const suffix = suffixes[(relevantDigits - 20) % 10] || suffixes[relevantDigits] || suffixes[0];
        return suffix;
    };


    const calcCourses = () => {
        let count = 0;
        for (let i = 0; i < user?.courses?.length; i++) {
            if (user.courses[i].finished) {
                count = count + 1;
            }
        }
        setCompletedCourse(count);
        setProgressCourse(user?.courses?.length - count);
    }

    const quizData = {
        labels: quizTime,
        datasets: [
            {
                label: 'Quiz Progress',
                data: quizScore,
                borderColor: 'pink',
                fill: false,
                tension: 0.8, //curve
                cubicInterpolationMode: 'monotone',
                topicNames: quizTopic,
            },
        ],
    };

    const options = {
        maintainAspectRatio: false,
        plugins: {
            tooltip: {
                callbacks: {
                    title: () => '',
                    label: (context) => quizData.datasets[0].topicNames[context.dataIndex],
                },
            },
        },
        scales: {
            x: {
                title: {
                    display: true,
                    text: 'Time',
                },
            },
            y: {
                title: {
                    display: true,
                    text: 'Quiz Score',
                },
                min: 0,
                max: 6,
            },
        },
    };



    if (!auth) return <Loading />

    return (
        <Card className="w-full p-2 overflow-y-auto" id="resp-con">
            <div className="relative w-full px-4 sm:px-8 ">
                <div>
                    <h1 className="text-2xl md:text-3xl lg:text-5xl">Insights</h1>
                    <p className="text-md md:text-1xl lg:text-2xl mt-2 mb-8">Track your progress here!</p>
                </div>

                <div className='flex flex-col lg:flex-row lg:gap-12'>
                    <Card className=" w-full bg-cardpink mb-8 p-6 " id='card'>
                        <h1 className="text-3xl md:text-3xl lg:text-5xl">Completed Courses</h1>
                        <h1 className="text-5xl md:text-5xl lg:text-7xl text-center lg:text-left">{completedCourse}</h1>
                    </Card>
                    <Card className=" w-full bg-cardpink mb-8 p-6 " id='card'>
                        <h1 className="text-3xl md:text-3xl lg:text-5xl">Courses in Progress</h1>
                        <h1 className="text-5xl md:text-5xl lg:text-7xl text-center lg:text-left">{progressCourse}</h1>
                    </Card>
                </div>
                <div className="card-con mb-8 w-full h-48 md:h-full shadow-[0_2px_5px_rgb(0,0,0,0.1)]">
                    {loading && <Spinner color="pink" className="h-12 w-12 absolute top-1/2 left-1/2" />}
                    <Line ref={canvasRef} data={quizData} options={options} className='chart-con' />
                </div>
            </div>
        </Card>
    )
}

export default Insights