import React from 'react'
import { motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import {  useNavigate  } from 'react-router-dom';
import { useState } from 'react';
import getAllMessages from '../features/getAllMessages';
import { setMessagesData } from '../redux/slice/messageSlice';




function Tickets() {
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState("All");

    const { ticketData } = useSelector((state) => state.ticket);


    const filteredTickets = ticketData ? ticketData.filter((ticket) => {
        if (selectedStatus === "All") {
            return ticket;
        } else {
            return ticket.status === selectedStatus
        }

    }) : [];

    const dispatch = useDispatch();


    const fetchAllMesages = async (ticketId) => {
        try {
            const data = await getAllMessages(ticketId);
            console.log("message data ", data)
            if (!data) {
                return;
            };
            dispatch(setMessagesData(data));
        } catch (error) {
            console.log(`error in geting message ${error}`)
        }
    }


    return (
        <div className="h-full">
            <div className='flex items-center justify-between'>
                <h2 className="ml-2 text-xl font-semibold mb-4 text-gray-800">All Tickets</h2>
                <select
                    value={selectedStatus}
                    onChange={(event) => setSelectedStatus(event.target.value)}
                    className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm 
                    focus:outline-none focus:ring-2 focus:ring-black/50 text-md mb-4"
                >
                    <option value="All">All</option>
                    <option value="Open">Open</option>
                    <option value="In-Progress">In-Progress</option>
                    <option value="Closed">Closed</option>
                </select>
            </div>
            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='w-full bg-white p-6 rounded-xl shadow-lg'
            >

                {filteredTickets && filteredTickets.length > 0 ? (
                    <div className="h-[490px] overflow-y-auto overflow-x-hidden [scrollbar-width:none] 
                    grid grid-cols-1 md:grid-cols-2 lg:grid-cols-1 gap-4">
                        {filteredTickets.map((ticket) => (
                            <motion.div
                                key={ticket._id}
                                whileHover={{ scale: 1.01 }}
                                whileTap={{ scale: 0.99 }}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm border
                                 border-gray-200 cursor-pointer"
                                onClick={() => {
                                    navigate(`/dashboard/ticket/${ticket._id}`);
                                    fetchAllMesages(ticket._id);
                                }}
                            >
                                <p className="text-lg font-medium text-gray-900 mb-1">
                                    <strong>Subject:</strong> {ticket.subject}
                                </p>
                                <p className="text-sm text-gray-700 mb-1">
                                    <strong>Customer:</strong> {ticket.customer_name} ({ticket.customer_email})
                                </p>
                                <p className={`text-sm font-semibold
                                 ${ticket.status === 'Open' ? 'text-green-600' :
                                        ticket.status === 'In-Progress' ? 'text-blue-600' :
                                            'text-red-600'}`}
                                >
                                    Status: {ticket.status}
                                </p>
                                <p className="text-xs text-gray-500 mt-2">
                                    Created: {new Date(ticket.createdAt).toLocaleString()}
                                </p>
                            </motion.div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">No tickets found.</p>
                )}
            </motion.div>
        </div>

    )
}

export default Tickets


