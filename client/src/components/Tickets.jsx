import React, { useState } from 'react'
import { motion } from "motion/react"
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom';
import getAllMessages from '../features/getAllMessages';
import { setMessagesData } from '../redux/slice/messageSlice';
import { removeDeletedTicketData, setSelectedTicket } from '../redux/slice/ticketSlice';
import { ArrowLeftIcon, Trash2 } from 'lucide-react';
import deleteTicket from '../features/deleteTicket';
import toast from 'react-hot-toast';





function Tickets() {

    const dispatch = useDispatch();
    const navigate = useNavigate();
    const [selectedStatus, setSelectedStatus] = useState("All");


    const { ticketData, selectedTicket } = useSelector((state) => state.ticket);


    const filteredTickets = ticketData ? ticketData.filter((ticket) => {
        if (selectedStatus === "All") {
            return ticket;
        } else {
            return ticket.status === selectedStatus
        }

    }) : [];



    const goBack = () => {
        navigate("/");
    };

    const removeTicket = async (e, ticketId) => {
        e.stopPropagation();
        try {
            await deleteTicket(ticketId);
            dispatch(removeDeletedTicketData(ticketId));
            toast.success("Ticket removed successfully!");
        } catch (error) {
            console.log(`error in removing ticket ${error}`)
        }
    }





    return (
        <div className="h-full">
            <div className='flex items-center justify-between'>
                <div className="flex items-center">
                    <button onClick={goBack}
                        className="text-gray-800  mb-3 cursor-pointer ml-2"
                    >
                        <ArrowLeftIcon size={25} className="font-semibold" />
                    </button>
                    <h2 className="ml-2 text-xl font-bold mb-4 text-gray-800">All Tickets</h2>
                </div>
                <div className='flex gap-3'>
                    <h2 className='text-lg font-semibold text-gray-800 mt-1'>
                        Filter -
                    </h2>
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
                        {filteredTickets.map((ticket) => {
                            const isActive = selectedTicket === ticket._id;
                            return <motion.div
                                key={ticket._id}
                                whileHover={{ scale: 1.01 }}
                                className="bg-gray-50 p-4 rounded-lg shadow-sm border
                                 border-gray-200 cursor-pointer"
                                onClick={() => {
                                    dispatch(setSelectedTicket(ticket));
                                    navigate(`/dashboard/ticket/${ticket._id}`);
                                }}
                            >
                                <div className="flex justify-between items-start">
                                    <div>
                                        <p className="text-lg font-medium text-gray-900 mb-1">
                                            <strong>Subject:</strong> {ticket.subject}
                                        </p>
                                        <p className="text-sm text-gray-700 mb-1">
                                            <strong>Customer: </strong>
                                            {ticket.customer_name} ({ticket.customer_email})
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
                                    </div>
                                    <button
                                        onClick={(e) => removeTicket(e, ticket._id)}
                                        className="text-gray-400 hover:text-red-500 
                                        transition-colors p-1"
                                    >
                                        <Trash2 size={18} />
                                    </button>
                                </div>
                            </motion.div>
                        })}
                    </div>
                ) : (
                    <p className="text-gray-600 text-center">No tickets found.</p>
                )}
            </motion.div>
        </div>

    )
}

export default Tickets
