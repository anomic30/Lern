import React from 'react'
import './Landing.scss'
import useAuthStore from '../../store/useAuthStore'
import useUserStore from '../../store/useUserStore'

const Landing = () => {
  const auth = useAuthStore(state => state.auth);
  const user = useUserStore(state => state.user);
  
  if (!auth) return <h1>Loading...</h1>
  return (
    <div>
      <h1>This is the Landing page</h1>
      <h2>Auth: {JSON.stringify(auth)}</h2>
      <h2>User: {JSON.stringify(user)}</h2>
    </div>
  )
}

export default Landing