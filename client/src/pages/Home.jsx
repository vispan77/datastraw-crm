import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbar from '../components/Navbar';
import { useSelector } from 'react-redux';




function Home() {

    const { userData } = useSelector((state) => state.user);

    const navigate = useNavigate();

    return (
        <div className='min-h-screen bg-gray-50'>
            <Navbar />

            <div className="container mx-auto px-4 py-8 md:py-12">

                <div className="flex flex-col md:flex-row items-center 
                justify-between bg-white rounded-lg shadow-lg p-6 md:p-8 mb-12"
                >
                    <div className="md:w-full text-center md:text-center mb-8 md:mb-0">

                        <h1 className="text-3xl md:text-4xl font-extrabold text-gray-900 leading-tight mb-4">
                            Streamline Your Customer Relationships
                        </h1>

                        <p className="text-base md:text-lg text-gray-700 mb-6">
                            Our CRM helps you manage customer interactions, track sales,
                            and improve service efficiency with ease.
                        </p>

                        <div className="flex flex-col sm:flex-row justify-center md:justify-center gap-4">

                            {
                                userData ? (
                                    <div>
                                        <button
                                            onClick={() => navigate("/dashboard/home")}
                                            className='px-7 py-3 bg-black text-white
                                            font-medium rounded-lg shadow-md
                                            transition duration-300
                                            cursor-pointer'
                                        >
                                            View Dashboard
                                        </button>
                                    </div>
                                ) : (
                                    <div className="flex flex-col sm:flex-row justify-center md:justify-center gap-4">
                                        <button
                                            onClick={() => navigate("/create-ticket")}
                                            className='px-7 py-3 bg-black text-white font-medium 
                                            rounded-lg shadow-md  transition duration-300
                                            cursor-pointer'
                                        >
                                            Create a New Ticket
                                        </button>
                                        <button
                                            onClick={() => navigate("/track-ticket")}
                                            className='px-7 py-3 bg-black text-white font-medium 
                                            rounded-lg shadow-md hover:bg-gray-900 transition 
                                            duration-300 cursor-pointer'
                                        >
                                            Track My Ticket
                                        </button>
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>


                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center mb-12">

                    <div className="bg-white p-6 rounded-lg shadow-md">

                        <h2 className="text-xl md:text-2xl font-bold text-gray-800 mb-3">
                            Efficient Ticketing
                        </h2>
                        <p className="text-gray-600">
                            Quickly create and manage support tickets, ensuring
                            no customer request goes unnoticed.
                        </p>
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">

                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Seamless
                            Tracking
                        </h2>

                        <p className="text-gray-600">
                            Track the status of your tickets in real-time,
                            from submission to resolution.
                        </p>

                    </div>

                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h2 className="text-2xl font-bold text-gray-800 mb-3">
                            Comprehensive Dashboard
                        </h2>

                        <p className="text-gray-600">
                            Gain insights with a powerful dashboard, summarizing
                            all your CRM activities.
                        </p>
                    </div>
                </div>



                <div
                    className="text-center bg-black text-white p-6 md:p-10 rounded-lg shadow-lg"
                >
                    <h2 className="text-2xl md:text-3xl font-bold mb-4">
                        Already Submitted a Ticket?
                    </h2>

                    <p className="text-base md:text-lg text-gray-300 mb-6 max-w-2xl mx-auto">
                        Check the latest status of your support request, view updates,
                        and stay informed throughout the resolution process.
                    </p>

                    <button
                        onClick={() => navigate("/track-ticket")}
                        className="px-8 py-3 bg-white text-black font-semibold rounded-lg
                        shadow-md hover:bg-gray-100 hover:scale-105 transition-all duration-300
                        cursor-pointer"
                    >
                        Track My Ticket
                    </button>
                </div>
            </div>
        </div>
    );
}

export default Home;
