import React from 'react'
import './Dashboard.scss'
import useAuthStore from '../../store/useAuthStore';
import useUserStore from '../../store/useUserStore';
import { Card } from '@material-tailwind/react';
import dashboard_hero from '../../assets/images/dashboard-hero.png';

const Dashboard = () => {
  const auth = useAuthStore(state => state.auth);
  const user = useUserStore(state => state.user);


  if (!auth) return <h1>Loading...</h1>

  return (
    <Card className="w-full p-2">
      <div className='dashboard-hero p-16'>
        <h1 className="text-6xl">Welcome</h1>
      </div>
    </Card>
  )
}

export default Dashboard