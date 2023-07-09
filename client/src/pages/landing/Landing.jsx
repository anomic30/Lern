import React, { useEffect, useState } from 'react'
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
import f1 from '../../assets/images/F1.webp'
import f2 from '../../assets/images/F2.webp'
import f3 from '../../assets/images/F3.webp'
import appLogo from '../../assets/icons/logo.svg'
import gcp from '../../assets/icons/gcp.svg'
import mdb from '../../assets/icons/mongodb.svg'
import bard from '../../assets/icons/bard.svg'
import discord from '../../assets/icons/discord.svg'
import github from '../../assets/icons/github.svg'
import isLogged from '../../services/logged'
import { motion } from 'framer-motion';
import AOS from "aos";
import "aos/dist/aos.css";


const Landing = () => {
  const navigate = useNavigate();
  const auth = useAuthStore(state => state.auth);
  const [loggedIn, setLoggedIn] = useState(false);
  useEffect(() => {
    AOS.init();
    AOS.refresh();
    async function checkLogged() {
      const logged = await isLogged();
      setLoggedIn(logged);
    }
    checkLogged();
  }, [])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className='Landing'>
      <Navbar className="nav-con max-w-7xl">
        <div className="container mx-auto flex items-center justify-between ">
          <img src={appLogo} alt="logo" className='w-20' />
          <Button size="md" className="bg-cblack font-medium text-sm hover:shadow-sd rounded-md" onClick={() => navigate("/login")}>
            Sign In
          </Button>
        </div>
      </Navbar>

      <section className='mt-10 py-10 px-6 md:py-15 md:px-8 xl:py-28 xl:px-10 flex flex-col md:flex-row max-w-7xl bg-slate-50 rounded-xl'>
        <div className="flex flex-1 items-center justify-center md:justify-start flex-col gap-10 md:pr-10 xl:pr-20">
          <div className="hero-head text-center md:text-left">
            <p className="text-4xl md:text-5xl lg:text-7xl ">
              Learn <span className='text-4xl md:text-5xl lg:text-7xl text-cblue'>Anything</span>,
            </p>
            <p className="text-4xl md:text-5xl lg:text-7xl ">
              <span className='text-4xl md:text-5xl lg:text-7xl text-cpink'>Anytime</span>, <span className='text-4xl md:text-5xl lg:text-7xl text-cteal'>Anywhere</span>
            </p>
          </div>
          <div className="hero-subhead text-2xl text-center md:text-left text-cblack">
            Experience a customized learning journey that adapts to your unique needs and empowers you to excel in any subject.
          </div>
          <div className="w-full hero-btn flex items-center justify-center md:justify-start gap-5">
            <Button size="md" className="bg-cblack font-medium text-sm hover:shadow-sd" onClick={() => navigate("/login")}>
              Start Learning
            </Button>
            <a href="https://discord.gg/Ne58SwxSR9" target='_blank' className='text-cblack no-underline'>
              <Button size="md" variant="outlined" className="text-cblack font-medium text-sm hover:shadow-sd rounded-md border border-cblack">
                Join Us
              </Button>
            </a>
          </div>
        </div>

        <div className="flex-1 flex justify-center items-center mt-10 md:mt-0">
          <Player autoplay loop src={book} style={{ height: '100%', width: '100%' }} />
        </div>
      </section>


      <p className="feature-head text-4xl md:text-5xl lg:text-7xl text-center py-10 md:py-20">Features</p>

      {/* Feature 1 */}

      <section className='py-2 w-full max-w-7xl'>
        <div data-aos="fade-up" className="flex flex-col lg:flex-row justify-between item-center flex-wrap flex-container">
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
        <div data-aos="fade-up" className="flex flex-col lg:flex-row-reverse justify-between item-center flex-wrap flex-container">
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
        <div data-aos="fade-up" className="flex flex-col lg:flex-row justify-between item-center flex-wrap flex-container">
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

      <div className='bg-slate-50 w-full max-w-7xl p-8 mt-8 md:mt-20 rounded-xl'>
        <p className=" text-4xl md:text-5xl lg:text-7xl text-center md:pt-2 ">Powered By</p>
        <section className='py-10 w-full max-w-7xl'>
          <div className="flex lg:flex-row justify-between item-center flex-wrap flex-container">
            <img data-aos="fade-up" data-aos-duration="700" src={bard} alt={bard} className="company transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" />
            <img data-aos="fade-up" data-aos-duration="1000" src={mdb} alt={mdb} className="company transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" />
            <img data-aos="fade-up" data-aos-duration="1300" src={gcp} alt={gcp} className="company transition-all duration-300 cursor-pointer filter grayscale hover:grayscale-0" />
          </div>
        </section>
      </div>

      <p className="text-4xl md:text-5xl lg:text-7xl text-center mt-14 md:mt-24 ">Grow with Us</p>

      <section className='py-42md:py-10 w-full flex flex-col items-center justify-center max-w-7xl'>
        <p className="text-xl md:text-2xl py-4 px-4 lg:px-0 text-cblack text-center">
          Join our community to grow and study with other members
        </p>
        <a href="https://discord.gg/Ne58SwxSR9" target='_blank'>
          <Button size="md" className="bg-cblack font-medium text-sm hover:shadow-sd rounded-md">
            Join Us
          </Button>
        </a>
        <div className='w-full h-96 mt-8 community-img'></div>
      </section>

      <hr className="w-full my-8 border-gray-200" />
      <footer className="w-full bg-white p-4 max-w-7xl">
        <div className="flex flex-row flex-wrap items-center justify-between gap-y-6 gap-x-12 text-center md:justify-between">
          <img src={appLogo} alt="logo-ct" className="w-20" />
          {/* <p className="">
            ©2023 Lern
          </p> */}
          <div className="flex gap-4">
            <a href="https://github.com/anomic30/Lern"><img src={github} alt="github" className='w-8 cursor-pointer' /></a>
            <a href="https://discord.gg/Ne58SwxSR9"><img src={discord} alt="discord" className='w-8 cursor-pointer' /></a>
          </div>
        </div>
      </footer>

    </motion.div>
  )
}

export default Landing