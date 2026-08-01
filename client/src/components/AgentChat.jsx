import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import getAllMessages from '../features/getAllMessages'
import { setMessagesData, addMessageData } from '../redux/slice/messageSlice'
import { useDispatch, useSelector } from 'react-redux'
import { motion } from "motion/react"
import Message from './Message'
import createMessage from '../features/createMessage'
import { ArrowLeft, ArrowLeftIcon, Send } from 'lucide-react'
import { setSelectedTicket, setTicketData } from '../redux/slice/ticketSlice'






function AgentChat() {

    const { messageData } = useSelector((state) => state.message);
    const { selectedTicket } = useSelector((state) => state.ticket);
    console.log("selectedTicket from redux", selectedTicket)


    const [newMessage, setNewMessage] = useState("");
    const [error, setError] = useState(null);

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const fetchAllMesages = async () => {
        try {
            const data = await getAllMessages(selectedTicket);
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
            if (!newMessage || selectedTicket === null) {
                setError("Message is required");
                return;
            }

            const payload = {
                role: "agent",
                message_text: newMessage
            }

            const data = await createMessage(selectedTicket, payload);

            dispatch(addMessageData(data));
            setNewMessage("");
        } catch (error) {
            console.error(`error in sending message: ${error}`);
        }
    }



    const goBack = async () => {
        navigate('/dashboard/ticket');
        dispatch(setMessagesData([]));
        dispatch(setSelectedTicket(null));
    }


    useEffect(() => {
        if (!selectedTicket) {
            return;
        }
        fetchAllMesages();
    }, [selectedTicket])


    return (
        <div className="h-full">
            <div className='flex items-center'>
                <div className='text-black flex
                 items-center justify-center mb-4 cursor-pointer'
                >
                    <button className="cursor-pointer" onClick={goBack}>
                        <ArrowLeftIcon size={20} />
                    </button>
                </div>
                <h2 className="ml-2 text-xl font-semibold mb-4 text-gray-800 ">
                    Details
                </h2>
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
