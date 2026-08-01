import React, { useState } from 'react';
import { motion } from "motion/react";
import trackingTicket from '../features/trackingTicket';
import Message from '../components/Message';
import { useEffect } from 'react';
import getAllMessages from '../features/getAllMessages';
import { Send } from 'lucide-react';
import createMessage from '../features/createMessage';
import { useDispatch, useSelector } from 'react-redux';
import { addMessageData, setMessagesData } from '../redux/slice/messageSlice';


function TrackTicket() {
    const [ticketId, setTicketId] = useState("");
    const [ticketData, setTicketData] = useState(null);
    const [error, setError] = useState(null);
    const [newMessage, setNewMessage] = useState("");

    const { messageData } = useSelector((state) => state.message);
    console.log("messageData from redus", messageData)

    const dispatch = useDispatch();

    const fetchMessage = async () => {
        try {
            const data = await getAllMessages(ticketId);
            if (!data) {
                return;
            };
            dispatch(setMessagesData(data));
        } catch (error) {
            console.log(error);
        }
    }

    const handleTrack = async () => {
        try {

            if (!ticketId) {
                setError("Please enter a Ticket ID.");
                setTicketData(null);
                setTimeout(() => setError(null), 3000);
                return;
            }

            const data = await trackingTicket(ticketId);

            if (data) {
                setTicketData(data);
            } else {
                setError("Ticket not found.");
            }

            await fetchMessage();
        } catch (err) {
            console.error("error in tracking ticket:", err);
            setError(err.response?.data?.message || "Failed to track ticket. Please try again.");
        }
    };

    const sendMessage = async () => {
        try {
            if (!newMessage || !ticketId) {
                setError("Message is required");
                return;
            }

            const payload = {
                role: "customer",
                message_text: newMessage
            }


            const data = await createMessage(ticketId, payload);


            dispatch(addMessageData(data));

            setNewMessage("");
        } catch (error) {
            console.log(`error in sending message: ${error}`);
        }

    }


    return (
        <div className="min-h-screen bg-gray-100 flex flex-col">

            <motion.div
                initial={{ opacity: 0, y: -40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-lg w-7xl mx-auto mt-7 "
            >
                <h2 className="text-2xl font-semibold mb-4 text-center text-gray-800">
                    Track Your Support Ticket
                </h2>

                <div className="mb-4">
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                        Ticket ID
                    </label>
                    <input
                        type="text"
                        id="ticketId"
                        placeholder="Enter your Ticket ID"
                        value={ticketId}
                        onChange={(e) => setTicketId(e.target.value)}
                        className="w-full border border-black/20 px-4 py-2 rounded-lg"
                    />
                </div>

                {error && (
                    <div className="text-red-500 text-sm mb-4 text-center">
                        {error}
                    </div>
                )}

                <div className='flex justify-center items-center'>
                    <motion.button
                        onClick={handleTrack}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className='px-5 py-2 bg-black text-white rounded-lg cursor-pointer
                         hover:bg-black/90'
                    >
                        Track Ticket
                    </motion.button>
                </div>

            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="bg-white p-8 rounded-xl shadow-lg w-7xl mx-auto mt-7 h-full mb-7"
            >

                {
                    ticketData && (
                        <div className='mt-1 p-3 border border-gray-200 rounded-lg
                         bg-green-50 h-full flex justify-between items-center'
                        >
                            <div className='flex gap-3'>
                                <p className='text-gray-700 mb-1'>
                                    <strong>Email : </strong>
                                    {ticketData.customer_email}
                                </p>
                                <p className='text-gray-700 mb-1'>
                                    <strong>Subject : </strong>
                                    {ticketData.subject}
                                </p>
                            </div>
                            <div className='px-4 py-1 rounded-full bg-red-200'>
                                {ticketData.status}
                            </div>

                        </div>
                    )
                }
                <div className="mt-6 p-4 border border-gray-200 rounded-lg bg-gray-50 h-full">

                    {
                        ticketData ? (

                            <div className="h-[500px] overflow-y-auto overflow-x-hidden pr-2">
                                {
                                    messageData.length > 0 ? (
                                        messageData.map((message) => (
                                            <Message
                                                key={message._id}
                                                role={message.role}
                                                message_text={message.message_text}
                                                createdAt={message.createdAt}
                                            />
                                        ))
                                    ) : (
                                        <div></div>
                                    )
                                }


                            </div>

                        ) : (
                            <h1 className='text-md text-gray-700 font-semibold text-center'>
                                No Tracking Data
                            </h1>
                        )
                    }



                    {
                        messageData.length > 0 && (
                            <div className="mt-5">
                                <div className='w-full flex gap-2 items-center'>
                                    <input
                                        type="text"
                                        placeholder='Ask anything'
                                        value={newMessage}
                                        onChange={(e) => setNewMessage(e.target.value)}
                                        className="px-4 py-2 border border-black/20 rounded-lg w-full 
                                        mt-4 bg-white"
                                    />

                                    <motion.button
                                        onClick={sendMessage}
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className='w-10 h-10 rounded-full bg-black flex items-center 
                                    justify-center
                                    text-white cursor-pointer mt-3'
                                    >
                                        <Send size={18} />
                                    </motion.button>

                                </div>

                            </div>
                        )
                    }

                </div>
            </motion.div>
        </div>
    )
}

export default TrackTicket
