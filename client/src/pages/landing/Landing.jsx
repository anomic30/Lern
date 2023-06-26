import React from 'react'
import './Landing.scss'
import useAuthStore from '../../store/useAuthStore'
import useUserStore from '../../store/useUserStore'
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
  return (
    <div className='Landing'>

      <Navbar className="nav-con">
        <div className="container mx-auto flex items-center justify-between ">
          <img src={appLogo} alt="logo" className='w-20' />
          <Button size="md" className="bg-cblack font-medium shadow-none hover:shadow-sd">
            <span>Sign Up</span>
          </Button>
        </div>
      </Navbar>

      <section className='hero-con md:py-15 md:px-8 xl:py-28 xl:px-10'>

        <div className="hero-left flex item-center justify-center flex-col gap-10">
          <div className="hero-head">
            <p className="text-4xl md:text-5xl lg:text-7xl ">
              Learn <span className='text-4xl md:text-5xl lg:text-7xl text-cteal'>Anything</span>,
            </p>
            <p className="text-4xl md:text-5xl lg:text-7xl ">
              <span className='text-4xl md:text-5xl lg:text-7xl text-cpink'>Anytime</span>, <span className='text-4xl md:text-5xl lg:text-7xl text-cblue'>Anywhere</span>
            </p>
          </div>
          <div className="hero-subhead text-2xl  text-cblack">
            Experience a customized learning journey that adapts to your unique needs and empowers you to excel in any subject.
          </div>
          <div className="hero-btn flex item-center  gap-10 ">
            <Button size="md" className="bg-cblack font-medium  shadow-none hover:shadow-sd p-1">
              <span>Start Learning</span>
            </Button>
            <Button size="md" variant='outlined' className=" border-cblack p-1 font-medium  text-cblack shadow-none">
              <span>Join Us</span>
            </Button>
          </div>

        </div>

        <div className="hero-right">
          <Player
            autoplay
            loop
            src={book}
            style={{ height: '500px', width: '500px' }}
          >
          </Player>

        </div>
      </section>
      <br />
      <section className="feature-con mt-36 mb-36">
        <p className="feature-head text-4xl md:text-5xl lg:text-7xl  text-center mb-20">
          Features
        </p>
        <br />
        <div className="features flex item-center  flex-col gap-28">

          <div className="feature-1 flex justify-between item-center flex-wrap">
            <img src={f1} alt="" className='feature-image' />
            <div className='max-w-xl flex flex-col item-center justify-center'>
              <div className="feature-head">
                <p className="text-2xl md:text-3xl lg:text-5xl ">
                  <span className='text-2xl md:text-3xl lg:text-5xl text-cblue'>Learn</span> With
                </p>
                <p className="text-2xl md:text-3xl lg:text-5xl ">
                  AI <span className='text-3xl md:text-4xl lg:text-5xl text-cblue'>Assistance</span>
                </p>
              </div>
              <div className="feature-subhead text-2xl mt-8 text-cblack">
                Enhance your learning experience by harnessing the power of AI. Generate and explore topics with AI assistance, gaining comprehensive knowledge and insights to accelerate your learning journey.
              </div>
            </div>
          </div>

          <div className="feature-1 flex justify-between item-center flex-wrap">
            <div className='max-w-xl flex flex-col item-center justify-center'>
              <div className="feature-head">
                <p className="text-2xl md:text-3xl lg:text-5xl ">
                  <span className='text-2xl md:text-3xl lg:text-5xl text-cpink'>Progress</span>  Monitoring
                </p>
                <p className="text-2xl md:text-3xl lg:text-5xl ">
                  Made  <span className='text-3xl md:text-4xl lg:text-5xl text-cpink'>Simple</span>
                </p>
              </div>
              <div className="feature-subhead text-2xl mt-8 text-cblack">
                Keep tabs on your educational achievements and stay informed about your progress at every step. Our dashboard provides real-time updates, empowering you to make informed decisions on your learning journey.
              </div>
            </div>
            <img src={f2} alt="" className='feature-image' />
          </div>

          <div className="feature-1 flex justify-between item-center flex-wrap">
            <img src={f3} alt="" className='feature-image' />
            <div className='max-w-xl flex flex-col item-center justify-center'>
              <div className="feature-head">
                <p className="text-2xl md:text-3xl lg:text-5xl ">
                  <span className='text-2xl md:text-3xl lg:text-5xl text-cteal'>Test</span>  Your
                </p>
                <p className="text-2xl md:text-3xl lg:text-5xl ">
                  Subject <span className='text-3xl md:text-4xl lg:text-5xl text-cteal'>Expertise</span>
                </p>
              </div>
              <div className="feature-subhead text-2xl mt-8 text-cblack">
                Enhance your learning experience by harnessing the power of AI. Generate and explore topics with AI assistance, gaining comprehensive knowledge and insights to accelerate your learning journey.
              </div>
            </div>
          </div>


        </div>
      </section>

      <footer className="w-full bg-white p-8 foot">
        <div className="flex flex-row flex-wrap items-center justify-center gap-y-6 gap-x-12 text-center md:justify-between">
          <img src={appLogo} alt="logo-ct" className="w-20" />
          <ul className="flex flex-wrap items-center gap-y-2 gap-x-8">
            <li>
            <Button size="md" className="bg-cblack font-medium  shadow-none hover:shadow-sd p-1">
              <span>Start Learning</span>
            </Button>
            </li>
            <li>
            <Button size="md" variant='outlined' className=" border-cblack p-1 font-medium  text-cblack shadow-none">
              <span>Join Us</span>
            </Button>
            </li>
          </ul>
        </div>
        {/* <hr className="my-8 border-blue-gray-50" />
        <Typography color="blue-gray" className="text-center font-normal">
          &copy; 2023 Lern
        </Typography> */}
      </footer>
      
    </div>
  )
}

export default Landing