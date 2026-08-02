import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import getAllMessages from '../features/getAllMessages'
import { setMessagesData, addMessageData, clearMessageData } from '../redux/slice/messageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import Message from './Message'
import createMessage from '../features/createMessage'
import { ArrowLeft, ArrowLeftIcon, Plus, Send } from 'lucide-react'
import { setSelectedTicket, setTicketData, updateSelectedData, updateTicketStatus } from '../redux/slice/ticketSlice'
import updateStatus from '../features/updateStatus'

function AgentChat() {

    const { messageData } = useSelector((state) => state.message);
    const { selectedTicket } = useSelector((state) => state.ticket);


    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = useParams();
    const ticketId = params.id;


    const fetchAllMesages = async () => {
        try {

            const data = await getAllMessages(ticketId);
            if (!data) {
                return;
            };
            dispatch(setMessagesData(data));
        } catch (error) {
            console.log(`error in geting message ${error}`)
        }
    }

    const sendMessage = async () => {
        try {
            if (!newMessage || !ticketId) {
                setError("Message is required");
                return;
            }

            const payload = {
                role: "agent",
                message_text: newMessage
            }

            const data = await createMessage(ticketId, payload);

            dispatch(addMessageData(data));
            setNewMessage("");
        } catch (error) {
            console.error(`error in sending message: ${error}`);
        }
    }

    const goBack = async () => {
        navigate('/dashboard/ticket');


    }

    const handleStatusChange = async (status) => {
        const updatedTicket = await updateStatus(ticketId, status);
        if (updatedTicket) {
            dispatch(updateTicketStatus({ ticketId, status }));
        }
    }


    useEffect(() => {
        if (!ticketId) {
            return;
        }
        fetchAllMesages();
    }, [])


    return (
        <div className="h-full">
            <div className='flex items-center justify-between'>
                <div className="flex items-center">
                    <div className='text-black mb-1.5 cursor-pointer ml-2'
                    >
                        <button className="cursor-pointer" onClick={() => {
                            dispatch(clearMessageData());
                            goBack();
                        }}>
                            <ArrowLeftIcon size={20} />
                        </button>
                    </div>

                    <h2 className="ml-2 text-xl font-bold mb-4 text-gray-800 ">
                        Details
                    </h2>
                </div>
                <div className='flex gap-5'>

                    <div className='flex gap-2'>
                        <h2 className='text-md font-semibold text-gray-800 mt-1'>
                            Update - Status
                        </h2>
                        <select
                            value={selectedTicket ? selectedTicket.status : ''}
                            onChange={(e) => {
                                const status = e.target.value;
                                handleStatusChange(status);
                                dispatch(updateSelectedData(status))

                            }}
                            className="px-3 py-1 border border-gray-300 rounded-lg shadow-sm 
                        focus:outline-none focus:ring-2 focus:ring-black/50 text-md mb-4"

                        >
                            <option value="Open">Open</option>
                            <option value="In-Progress">In-Progress</option>
                            <option value="Closed">Closed</option>

                        </select>
                    </div>

                    <button onClick={() => navigate(`/dashboard/ticket/${ticketId}/note`)}
                        className="flex items-center px-3 py-1 bg-black text-white rounded-md 
                    mb-4 gap-1 text-sm cursor-pointer hover:bg-black/90">
                        <Plus size={20} />
                        Add Note
                    </button>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='w-full bg-white p-6 rounded-xl shadow-lg flex flex-col h-[550px]'
            >
                <div className="flex-grow overflow-y-auto pr-2 pl-2 pb-2 [scrollbar-width:none] 
                    border border-gray-200 rounded-lg bg-gray-50"
                >
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
                            <div className="text-gray-600 text-center py-4">
                                No messages found for this ticket.
                            </div>
                        )
                    }
                </div>

                <div className="">
                    <div className='w-full flex gap-2 items-center'>
                        <input
                            type="text"
                            placeholder='Type your message...'
                            value={newMessage}
                            onChange={(e) => {
                                setNewMessage(e.target.value);
                                setError(null)
                            }}
                            className="px-4 py-2 border border-black/20 rounded-lg w-full mt-4 bg-white"
                        />

                        <motion.button
                            onClick={sendMessage}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className='w-10 h-10 rounded-full bg-black flex items-center justify-center
                            text-white cursor-pointer mt-3'
                        >
                            <Send size={18} />
                        </motion.button>
                    </div>
                </div>

            </motion.div >

        </div >
    )
}

export default AgentChat
