import React from 'react'
import { Player, Controls } from '@lottiefiles/react-lottie-player';
import loadingAnim from '../../assets/images/loading.json';

const Loading = () => {
  return (
      <div className='w-full h-screen flex justify-center content-center'>
          <Player autoplay loop src={loadingAnim} style={{ height: '100%', width: '100%' }} />
    </div>
  )
}

export default Loading