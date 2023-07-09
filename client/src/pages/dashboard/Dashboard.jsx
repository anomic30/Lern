import React from 'react'
import './Dashboard.scss'
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { Card, Button } from '@material-tailwind/react';
import { useNavigate } from 'react-router-dom'
import dtopic from '../../assets/images/dtopic.webp';
import dperf from '../../assets/images/dperf.webp';
import dtest from '../../assets/images/dtest.webp';
import Loading from '../../components/loading/Loading';
import { motion } from 'framer-motion';

const Dashboard = () => {
  const navigate = useNavigate();
  const auth = useAuthStore(state => state.auth);
  const user = useUserStore(state => state.user);


  if (!auth) return <Loading />

  return (
    <motion.div initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
      className='w-full box-border'>
      <Card className="w-full h-full p-2 box-border Dashboard overflow-y-auto">
        <div className='dashboard-hero py-16 pl-6 mb-4 bg-slate-100 rounded-lg shadow-md'>
          <h1 className="text-4xl sm:text-5xl xl:text-6xl">Welcome {user?.userName}</h1>
        </div>
        <div className='flex flex-col md:flex-row gap-4 h-full '>
          <Card className=" bg-dshcard hover:bg-dblue transition duration-500 w-full h-min-60 md:h-full generate text-center p-6 lg:p-12 basis-2/5">
            <div className='flex justify-center'>
              <img src={dtopic} alt="image" loading="lazy" />
            </div>

            <h1 className="text-2xl md:text-3xl 2xl:text-5xl">Explore New Topics</h1>
            <p className='text-lg md:text-xl pt-4'>Generate new topic of your choice using our AI powered topic generator.</p>
            <Button className='hidden lg:block mt-8 font-medium text-sm' onClick={() => navigate("/app/generate")}>Generate</Button>
          </Card>
          <div className=' flex flex-col w-full h-full basis-3/5'>
            <Card className=" bg-dshcard hover:bg-dteal transition duration-500 mb-4 p-6 h-60 md:h-2/4 quiz flex flex-row justify-between items-center">
              <div >
                <h1 className="text-2xl md:text-3xl 2xl:text-5xl">Quiz Yourself</h1>
                <p className='text-lg md:text-xl pt-4'>Test your knowledge by playing chapter specific quizzes</p>
                <Button className='hidden lg:block mt-8 bg-cteal font-medium text-sm hover:shadow-tsd' onClick={() => navigate("/app/quizzes")}>Test</Button>
              </div>
              <div className='flex '>
                <img src={dtest} alt="image" className='object-contain' loading="lazy" />
              </div>
            </Card>
            <Card className="bg-dshcard hover:bg-dpink transition duration-500 p-6 h-60 md:h-2/4 analytics flex flex-row justify-between items-center">
              <div className="">
                <h1 className="text-2xl md:text-3xl 2xl:text-5xl">Your Performance</h1>
                <p className='text-lg md:text-xl pt-4'>Track your progress and check your quiz performance </p>
                <Button className='hidden lg:block mt-8 bg-cpink font-medium text-sm hover:shadow-sd' onClick={() => navigate("/app/insights")}>Check</Button>
              </div>
              <div className='flex '>
                <img src={dperf} alt="image" className='object-contain' loading="lazy" />
              </div>
            </Card>
          </div>
        </div>
      </Card>
    </motion.div>
  )
}

export default Dashboard