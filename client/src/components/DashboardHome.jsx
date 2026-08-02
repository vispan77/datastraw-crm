import React from 'react';
import { useSelector } from 'react-redux';
import { motion } from "motion/react";
import { Ticket, Hourglass, CheckCircle, ClipboardList, ArrowLeftIcon } from 'lucide-react';
import { useNavigate } from 'react-router-dom';


function DashboardHome() {
    const { ticketData } = useSelector((state) => state.ticket);

    const navigate = useNavigate();


    const totalTickets = ticketData?.length || 0;
    const openTickets = ticketData.filter(ticket => ticket.status === 'Open').length || 0;
    const inProgressTickets = ticketData.filter(ticket => ticket.status === 'In-Progress').length || 0;
    const closedTickets = ticketData.filter(ticket => ticket.status === 'Closed').length || 0;

    const stats = [
        {
            title: "Total Tickets",
            count: totalTickets,
            icon: <ClipboardList size={28} className="text-blue-500" />,
            bgColor: "bg-blue-100",
        },
        {
            title: "Open Tickets",
            count: openTickets,
            icon: <Ticket size={28} className="text-green-500" />,
            bgColor: "bg-green-100",
        },
        {
            title: "In-Progress Tickets",
            count: inProgressTickets,
            icon: <Hourglass size={28} className="text-yellow-500" />,
            bgColor: "bg-yellow-100",
        },
        {
            title: "Closed Tickets",
            count: closedTickets,
            icon: <CheckCircle size={28} className="text-red-500" />,
            bgColor: "bg-red-100",
        }
    ];

    const goBack = () => {
        navigate("/");
    }

    return (
        <div className="p-4">

            <div className="flex gap-3">
                <button onClick={goBack}
                    className=" text-gray-800  mb-4 cursor-pointer"
                >
                    <ArrowLeftIcon size={30} className="font-semibold" />
                </button>
                <h1 className="text-2xl font-bold text-gray-800 mb-6">Dashboard Overview</h1>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
                {stats.map((stat, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: index * 0.1 }}
                        className="bg-white p-6 rounded-xl shadow-md flex items-center 
                        justify-between"
                    >
                        <div>

                            <p className="text-sm font-medium text-gray-500">
                                {stat.title}
                            </p>
                            <p className="text-3xl font-bold text-gray-900">{stat.count}</p>

                        </div>
                        <div className={`p-3 rounded-full ${stat.bgColor}`}>
                            {stat.icon}
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    );
}

export default DashboardHome;
