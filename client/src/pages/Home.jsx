import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';


function Home() {
    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-gray-100'>

            <Navbar />

            <div className=" min-h-screen flex items-center justify-center gap-2">
                <button
                    onClick={() => navigate("/create-ticket")}
                    className='px-5 py-2 bg-black text-white rounded-lg cursor-pointer 
                hover:bg-black/90'
                >
                    Create Ticket
                </button>
                <button
                    onClick={() => navigate("/track-ticket")}
                    className='px-5 py-2 bg-black text-white rounded-lg cursor-pointer 
                hover:bg-black/90'
                >
                    TrackTicket
                </button>

                <button
                    onClick={() => navigate("/dashboard")}
                    className='px-5 py-2 bg-black text-white rounded-lg cursor-pointer 
                hover:bg-black/90'
                >
                    Dashboard
                </button>
            </div>



        </div>
    )
}

export default Home
