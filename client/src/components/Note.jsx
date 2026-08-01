import { ArrowLeftIcon } from 'lucide-react';
import React from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from "motion/react"
import { create } from 'axios';
import createNote from '../features/createNote';
import { useState } from 'react';







function Note() {

    const navigate = useNavigate();

    // const { selectedTicket } = useSelector((state) => state.ticket);
    // console.log(selectedTicket._id);

    const [noteText, setNoteText] = useState("");

    const params = useParams();
    const ticketId = params.id;
    console.log(ticketId)

    const goBack = async () => {
        navigate(`/dashboard/ticket/${ticketId}}`);
    }

    const sendNote = async () => {
        try {
            const data = await createNote(ticketId, noteText);
            console.log(data);
            setNoteText("");
        } catch (error) {
            console.log(`error in sending noet ${error}`)
        }
    }

    const getAllNote = async () => {
        try {
            const data = await getNote(ticketId);
            console.log(data);
        } catch (error) {
            console.log(`error in getting note ${error}`)
        }
    }


    return (
        <div className="h-full">
            <div className='flex items-center justify-between'>
                <div className="flex items-center">
                    <div className='text-black mb-1.5 cursor-pointer ml-2'
                    >
                        <button className="cursor-pointer" onClick={() => {
                            // dispatch(clearMessageData());
                            goBack();
                        }}>
                            <ArrowLeftIcon size={20} />
                        </button>
                    </div>

                    <h2 className="ml-2 text-xl font-semibold mb-4 text-gray-800 ">
                        Note
                    </h2>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ duration: 0.3 }}
                className='w-full bg-white p-6 rounded-xl shadow-lg flex flex-col h-[550px] gap-3'
            >
                <div className="h-30 overflow-y-auto pr-2 pl-2 pb-2 [scrollbar-width:none] 
                                border border-gray-200 rounded-lg bg-gray-50"
                >
                    {/* //create noet */}

                </div>

                <div className="flex-grow overflow-y-auto pr-2 pl-2 pb-2 [scrollbar-width:none] 
                                border border-gray-200 rounded-lg bg-gray-50"
                >
                    {/* //getnote */}

                </div>



            </motion.div >
        </div>
    )
}

export default Note
