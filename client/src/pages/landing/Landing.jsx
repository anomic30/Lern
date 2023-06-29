import React from 'react'
import './Landing.scss'
import useAuthStore from '../../store/useAuthStore'
import useUserStore from '../../store/useUserStore'
import { useNavigate } from 'react-router-dom'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import {
  Navbar,
  MobileNav,
  Typography,
  Button,
  IconButton,
} from "@material-tailwind/react";
import book from '../../assets/images/dancingbook.json'
import f1 from '../../assets/images/F1.png'
import f2 from '../../assets/images/F2.png'
import f3 from '../../assets/images/F3.png'
import appLogo from '../../assets/icons/logo.svg'


const Landing = () => {
  const navigate = useNavigate();
  return (
    <div className='Landing'>

      <Navbar className="nav-con max-w-7xl">
        <div className="container mx-auto flex items-center justify-between ">
          <img src={appLogo} alt="logo" className='w-20' />
          <Button size="md" className="bg-cblack font-medium text-sm hover:shadow-sd" onClick={()=>navigate("/login")}>
            Sign In
          </Button>
        </div>
      </Navbar>

      <section className='mt-10 py-10 px-6 md:py-15 md:px-8 xl:py-28 xl:px-10 flex flex-col md:flex-row max-w-7xl bg-gray-50 rounded-xl'>
        <div className="flex flex-1 items-center justify-center md:justify-start flex-col gap-10 md:pr-10 xl:pr-20">
          <div className="hero-head text-center md:text-left">
            <p className="text-4xl md:text-5xl lg:text-7xl ">
              Learn <span className='text-4xl md:text-5xl lg:text-7xl text-cteal'>Anything</span>,
            </p>
            <p className="text-4xl md:text-5xl lg:text-7xl ">
              <span className='text-4xl md:text-5xl lg:text-7xl text-cpink'>Anytime</span>, <span className='text-4xl md:text-5xl lg:text-7xl text-cblue'>Anywhere</span>
            </p>
          </div>
          <div className="hero-subhead text-2xl text-center md:text-left text-cblack">
            Experience a customized learning journey that adapts to your unique needs and empowers you to excel in any subject.
          </div>
          <div className="w-full hero-btn flex items-center justify-center md:justify-start gap-10">
            <Button size="md" className="bg-cblack font-medium text-sm hover:shadow-sd" onClick={()=>navigate("/login")}>
            Start Learning
            </Button>
            <Button size="md" variant='outlined' className="border-cblack font-medium text-cblack text-sm">
            Join Us
            </Button>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
          <Player autoplay loop src={book} style={{ height: '100%', width: '100%' }} />
        </div>
      </section>


      <p className="feature-head text-4xl md:text-5xl lg:text-7xl text-center pt-20 md:py-20">Features</p>

      {/* Feature 1 */}

      <section className='py-20 w-full max-w-7xl'>
        <div className="flex flex-col lg:flex-row justify-between item-center flex-wrap flex-container">
          <img src={f1} alt="AI" className='feature-image' />
          <div className='max-w-xl flex flex-col justify-center item-center'>
            <div className="feature-head text-center lg:text-left py-10">
              <p className="text-3xl md:text-4xl lg:text-5xl">
                <span className="text-3xl md:text-4xl lg:text-5xl text-cblue">Learn</span> with
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl">
                AI <span className="text-3xl md:text-4xl lg:text-5xl text-cblue">assistance</span>
              </p>
            </div>
            <div className="feature-subhead text-xl md:text-2xl py-4 px-4 lg:px-0 text-cblack text-left">
              Enhance your learning experience by harnessing the power of AI. Generate and explore topics with AI, gain comprehensive knowledge and insights to accelerate your learning journey.
            </div>
          </div>
        </div>
      </section>

      {/* Feature 2 */}

      <section className='py-20 w-full max-w-7xl'>
        <div className="flex flex-col lg:flex-row-reverse justify-between item-center flex-wrap flex-container">
          <img src={f2} alt="AI" className='feature-image' />
          <div className='max-w-xl flex flex-col justify-center item-center'>
            <div className="feature-head text-center lg:text-left py-10">
              <p className="text-3xl md:text-4xl lg:text-5xl">
                <span className="text-3xl md:text-4xl lg:text-5xl text-cpink">Progress</span>  Monitoring
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl">
                Made <span className="text-3xl md:text-4xl lg:text-5xl text-cpink">Simple</span>
              </p>
            </div>
            <div className="feature-subhead text-xl md:text-2xl py-4 px-4 lg:px-0 text-cblack text-left">
              Keep tabs on your educational achievements and stay informed about your progress at every step. Our dashboard provides real-time updates, empowering you to make informed decisions on your learning journey.
            </div>
          </div>
        </div>
      </section>

      {/* Feature 3 */}

      <section className='py-20 w-full max-w-7xl'>
        <div className="flex flex-col lg:flex-row justify-between item-center flex-wrap flex-container">
          <img src={f3} alt="AI" className='feature-image' />
          <div className='max-w-xl flex flex-col justify-center item-center'>
            <div className="feature-head text-center lg:text-left py-10">
              <p className="text-3xl md:text-4xl lg:text-5xl">
                <span className="text-3xl md:text-4xl lg:text-5xl text-cteal">Test</span> Your
              </p>
              <p className="text-3xl md:text-4xl lg:text-5xl">
                Subject <span className="text-3xl md:text-4xl lg:text-5xl text-cteal">Expertise</span>
              </p>
            </div>
            <div className="feature-subhead text-xl md:text-2xl py-4 px-4 lg:px-0 text-cblack text-left">
              Engage in interactive quizzes that challenge your understanding of the topics you have learned, allowing you to assess your proficiency and gain valuable insights for further growth.
            </div>
          </div>
        </div>
      </section>

      <footer className="w-full bg-white p-4 max-w-7xl">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
          <img src={appLogo} alt="logo-ct" className="w-20" />
          <div className="flex items-center gap-x-6 mt-4 md:mt-0">
            <Button
              size="md"
              className="bg-cblack font-medium text-white hover:shadow-blue-gray-50 p-2 rounded-md shadow-none"
            >
              Start Learning
            </Button>
            <Button
              size="md"
              variant="outlined"
              className="border-cblack p-2 font-medium text-cblack hover:bg-gray-100 rounded-md shadow-none"
            >
              Join Us
            </Button>
          </div>
        </div>
      </footer>

    </div>
  )
}

export default Landing