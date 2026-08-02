import React, { useEffect } from 'react'
import { motion } from "motion/react"
import { Routes, useNavigate, Route } from 'react-router-dom'
import { useLocation } from 'react-router-dom'
import { useDispatch } from 'react-redux'
import getAllTicket from '../features/getAllTicket'
import Tickets from '../components/Tickets';
import SearchTicket from '../components/SearchTicket';
import { setTicketData } from '../redux/slice/ticketSlice';
import AgentChat from '../components/AgentChat'
import Note from '../components/Note'
import DashboardHome from '../components/DashboardHome'





function Dashboard() {

    const navigate = useNavigate();
    const location = useLocation();
    const dispatch = useDispatch();



    const sideBar = [
        { name: "Home", path: "/dashboard/home" },
        { name: "Tickets", path: "/dashboard/ticket" },
        { name: "Search Ticket", path: "/dashboard/search-ticket" }
    ]

    const fetchAllTickets = async () => {
        try {
            const data = await getAllTicket();

            dispatch(setTicketData(data));
        } catch (error) {
            console.log(`error in getiing all tickets ${error}`)
        }
    }

    useEffect(() => {
        fetchAllTickets();
    }, [])




    return (
        <div className="min-h-screen bg-gray-100 flex flex-col md:flex-row">

            <motion.div
                initial={{ x: -100, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.1 }}
                className='w-64 bg-white text-gray-700 border-r border-gray-100 
            rounded-lg shadow-md backdrop-blur-xl p-6 flex-col justify-start items-center'
            >
                <div onClick={() => navigate('/')}
                    className="text-2xl font-extrabold text-transparent bg-clip-text bg-gray-900 w-full 
                    text-center mb-5"
                >
                    DATASTRAW
                </div>

                <div>
                    {
                        sideBar.map((item, index) => (
                            <div key={index} className='flex flex-col w-full space-y-4 mt-2'>
                                <motion.button

                                    onClick={() => navigate(item.path)}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className={`w-full text-left px-4 py-2 cursor-pointer rounded-lg 
                                        font-semibold
                                        ${location.pathname === item.path ? "bg-black text-white border"
                                            : "text-slate-700 hover:bg-gray-100 hover:text-gray-600"}`}
                                >
                                    {item.name}
                                </motion.button>
                            </div>
                        ))
                    }
                </div>
            </motion.div >

            <div className="flex-grow p-4 md:p-8 w-full md:w-auto overflow-y-auto">
                <Routes>
                    <Route path="home" element={<DashboardHome />} />
                    <Route path="ticket" element={<Tickets />} />
                    <Route path="search-ticket" element={<SearchTicket />} />
                    <Route path="ticket/:id" element={<AgentChat />} />
                    <Route path="/ticket/:id/note" element={<Note />} />

                </Routes>
            </div>
        </div >
    )
}

export default Dashboard