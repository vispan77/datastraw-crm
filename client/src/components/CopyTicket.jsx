import React, { useState } from 'react'
import { motion } from "motion/react"
import { CheckIcon, CopyIcon } from 'lucide-react'
import { useNavigate } from 'react-router-dom'



function CopyTicket({ ticketId }) {

    const navigate = useNavigate();
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(ticketId);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy: ', err);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, x: -40 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-xl shadow-xl w-full md:w-150 text-center"
        >

            <h2 className="text-2xl font-semibold mb-4 text-gray-800">
                Ticket Created Successfully!
            </h2>

            <p className="text-gray-600 mb-6">
                Your support ticket has been created. Please save your Ticket ID:
            </p>

            <div className="flex items-center justify-between bg-gray-100 p-3 
            rounded-lg border border-gray-200 mb-6"
            >
                <span className="text-xl font-bold text-indigo-600 mr-3">
                    {ticketId}
                </span>
                <motion.button
                    onClick={handleCopy}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="p-2 bg-black text-white rounded-md flex 
                    items-center justify-center cursor-pointer"
                >
                    {copied ? <CheckIcon size={18} /> : <CopyIcon size={18} />}
                    <span className="ml-2">{copied ? "Copied!" : "Copy ID"}</span>
                </motion.button>
            </div>
            <p className="text-sm text-gray-500">
                You can use this ID to track your ticket status.
            </p>

            <button
                onClick={() => navigate("/track-ticket")}
                className='px-4 py-2 bg-black text-white font-medium 
                    rounded-lg shadow-md hover:bg-gray-900 transition duration-300 cursor-pointer mt-3'
            >
                Track Status
            </button>
        </motion.div>
    )
}

export default CopyTicket
