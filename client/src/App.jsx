import React from 'react'
import getAllTicket from './features/getAllTicket'
import getAllMessages from './features/getAllMessages'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateTicket from './pages/CreateTicket';
import Home from './pages/Home';
import TrackTicket from './pages/TrackTicket';
import Dashboard from './pages/Dashboard';



function App() {

  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
        <Route path="track-ticket" element={<TrackTicket />} />
        <Route path="/dashboard/*" element={<Dashboard />} />
      </Routes>
    </div>
  )
}

export default App
