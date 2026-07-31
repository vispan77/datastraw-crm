import React from 'react'
import getAllTicket from './features/getAllTicket'
import getAllMessages from './features/getAllMessages'
import { useEffect } from 'react';
import { Route, Routes } from 'react-router-dom';
import CreateTicket from './pages/CreateTicket';
import Home from './pages/Home';

function App() {

  useEffect(() => {
    getAllTicket();
    getAllMessages("6a6b72cda566fb9625e6f105");
  }, [])
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/create-ticket" element={<CreateTicket />} />
      </Routes>
    </div>
  )
}

export default App
