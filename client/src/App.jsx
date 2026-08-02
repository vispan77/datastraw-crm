import React from 'react'
import getAllTicket from './features/getAllTicket'
import getAllMessages from './features/getAllMessages'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateTicket from './pages/CreateTicket';
import Home from './pages/Home';
import TrackTicket from './pages/TrackTicket';
import Dashboard from './pages/Dashboard';
import { useDispatch, useSelector } from 'react-redux';
import { setUserData } from './redux/slice/userSlice';
import getCurrentUser from './features/getCurrentUser';
import AuthForm from './components/AuthForm';






function App() {

  const { userData } = useSelector((state) => state.user);

  const dispatch = useDispatch();

  const getUser = async () => {
    const data = await getCurrentUser();
    dispatch(setUserData(data))
  }

  useEffect(() => {
    getUser();
  }, [])

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="track-ticket" element={<TrackTicket />} />
        <Route path="/dashboard/*" element={userData ? <Dashboard /> : <AuthForm />} />
      </Routes>
    </div>
  )
}

export default App
