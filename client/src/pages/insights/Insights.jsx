import React from 'react'
import { Button, Card, Input, Chip, List, ListItem, ListItemSuffix, IconButton, } from '@material-tailwind/react';
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { useNavigate } from 'react-router-dom';
import './Insights.scss'
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    TimeScale,
  } from 'chart.js';
import { Line, Scatter  } from 'react-chartjs-2';
ChartJS.register(LinearScale, PointElement, Tooltip, Legend, TimeScale); 


  

const Insights = () => {
    const navigate = useNavigate();
    const auth = useAuthStore(state => state.auth);
    const user = useUserStore(state => state.user);



    if (!auth) return <h1>Loading...</h1>

    return (
        <Card className="w-full p-2">
            <div className="relative w-full h-full flex flex-col justify-between px-4 sm:px-8">
                <div>
                    <h1 className="text-xl md:text-3xl lg:text-5xl">Insights</h1>
                    <p className="text-md md:text-1xl lg:text-2xl mt-2 mb-8">Track your progress here!</p>
                </div>

                <div className='flex gap-16 w-full'>
                    <div className='basis-1/4 h-full'>
                        <Card className="card-con w-full bg-lpink mb-8 p-6">
                            <h1 className="text-xl md:text-3xl lg:text-5xl">Completed Courses</h1>
                            <h1 className="text-xl md:text-3xl lg:text-5xl ">69</h1>
                        </Card>
                        <Card className="card-con w-full bg-lpink p-6">
                            <h1 className="text-xl md:text-3xl lg:text-5xl">Unfinished Courses</h1>
                            <h1 className="text-xl md:text-3xl lg:text-5xl">69</h1>
                        
                        </Card>
                    </div>
                    <div className='basis-3/4'>
                        <Card className="card-con w-full bg-cpink mb-8">

                        </Card>
                        <Card className="card-con w-full  ">
                        {/* <Scatter data={quizData} options={options} /> */}
                        </Card>
                    </div>
                </div>
                <p className='pb-4'>This quiz is AI-generated and for entertainment purposes only.</p>
            </div>
        </Card>
    )
}

export default Insights