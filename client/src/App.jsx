import './App.scss'
import { BrowserRouter as Router } from 'react-router-dom';
import AnimatedRoutes from './components/AnimatedRoutes'
import magic from './utils/magic';
import useAuthStore from './store/useAuthStore';
import useUserStore from './store/useUserStore';
import { useEffect } from 'react';
import { checkAuth } from './utils/checkAuth';

function App() {
  const setAuth = useAuthStore(state => state.setAuth);
  const setUser = useUserStore(state => state.setUser);
  const logout = useAuthStore(state => state.logout);

  useEffect(() => {
    checkAuth(setAuth, setUser, logout);
  }, []);

  return (
    <div className="App">
      <Router>
        <AnimatedRoutes />
      </Router>
    </div>
  )
}

export default App
