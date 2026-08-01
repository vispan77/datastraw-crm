import { ArrowLeftIcon } from 'lucide-react';
import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { motion } from "motion/react"
import { create } from 'axios';
import createNote from '../features/createNote';
import { useState } from 'react';
import { useDispatch } from 'react-redux';
import getNote from '../features/getNote';
import { addNoteData, setNotesData } from '../redux/slice/noteSlice';








function Note() {

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const { notesData } = useSelector((state) => state.note);

    const [noteText, setNoteText] = useState("");

    const params = useParams();
    const ticketId = params.id;


    const goBack = async () => {
        navigate(`/dashboard/ticket/${ticketId}}`);
    }

    const sendNote = async () => {
        try {
            const data = await createNote(ticketId, noteText);
            console.log("data after saving notes", data);
            dispatch(addNoteData(data))
            setNoteText("");
        } catch (error) {
            console.log(`error in sending noet ${error}`)
        }
    }

    const getAllNote = async () => {
        try {
            const data = await getNote(ticketId);
            dispatch(setNotesData(data))
            console.log(data);
        } catch (error) {
            console.log(`error in getting note ${error}`)
        }
    }

    useEffect(() => {
        if (!ticketId) {
            return;
        }
        getAllNote();
    }, [])



    return (
        <div className="h-full">
            <div className='flex items-center justify-between'>
                <div className="flex items-center">
                    <div className='text-black mb-1.5 cursor-pointer ml-2'
                    >
                        <button className="cursor-pointer" onClick={() => {
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
                <div className="h-29 overflow-y-auto pr-2 pl-2 pb-2 pt-2 [scrollbar-width:none] 
                                border border-gray-200 rounded-lg bg-gray-50"
                >
                    {/* //create noet */}
                    <div className='flex items-center'>
                        <textarea
                            className="w-3/4 p-3 border border-gray-300 rounded-lg focus:outline-none 
                            focus:ring-2 focus:ring-black/50"
                            rows="3"
                            placeholder="Add a new note..."
                            value={noteText}
                            onChange={(e) => setNoteText(e.target.value)}
                        />

                        <div className="flex items-center justify-center w-1/4">
                            <button onClick={sendNote}
                                className='px-4 py-2 bg-black text-white rounded-lg 
                                text-md cursor-pointer'
                            >
                                Save Note
                            </button>
                        </div>
                    </div>



                </div>

                <div className="flex-grow overflow-y-auto pr-2 pl-2 pb-2 [scrollbar-width:none] 
                                border border-gray-200 rounded-lg bg-gray-50 p-2"
                >
                    {notesData && notesData.length > 0 ? (
                        notesData.map((note) => (
                            <div key={note._id} className="bg-white p-3 rounded-lg shadow-sm 
                                mb-3 border border-gray-200"
                            >
                                <p className="text-gray-800 text-sm leading-relaxed">
                                    {note.note_text}
                                </p>
                                <p className="text-xs text-gray-500 mt-2 text-right">
                                    {new Date(note.createdAt).toLocaleString()}
                                </p>
                            </div>
                        ))
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <p className="text-gray-600 text-center">
                                No notes added for this ticket yet.
                            </p>
                        </div>
                    )}


                </div>



            </motion.div >
        </div>
    )
}

export default Note
