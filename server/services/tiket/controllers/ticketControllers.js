import Note from "../model/notes.js";
import Ticket from "../model/ticket.js";
import axios from "axios";




//ticket post kerne ke liye
const createTicket = async (req, res) => {
    try {
        const { customer_name, customer_email, subject, description } = req.body;

        if (!customer_name || !customer_email || !subject || !description) {
            return res.status(400).json({
                success: false,
                message: "All fields are required"
            })
        }

        const ticket = await Ticket.create({
            customer_name,
            customer_email,
            subject,
            description
        })

        await axios.post(`${process.env.MESSAGE_SERVICE}/create/${ticket._id}`, {
            role: "customer",
            message_text: description
        })
        

        return res.status(201).json({
            success: true,
            message: "Ticket is created Successfully",
            ticket: {
                _id: ticket._id,
                createdAt: ticket.createdAt
            }

        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while creating the ticket ${error}`
        })
    }
}

const getAllTicket = async (req, res) => {
    try {
        const ticket = await Ticket.find().sort({ createdAt: -1 });

        return res.status(200).json({
            success: true,
            message: "All tickets are fetched successfully",
            ticketCount: ticket.length,
            ticket

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while getting all the ticket ${error}`
        })
    }
}



const getTicketById = async (req, res) => {
    try {
        const { ticketId } = req.params;
        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "Ticket Id is required"
            })
        }

        const ticket = await Ticket.findById(ticketId);

        if (!ticket) {
            return res.status(404).json({
                success: false,
                message: "Ticket not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Ticket is fetched successfully",
            ticket

        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while getting ticket by id ${error}`
        })
    }
}


const updateTicketStatus = async (req, res) => {
    try {
        const { ticketId } = req.params;
        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "Ticket Id is required"
            })
        }

        const { status } = req.body;
        


        const ticket = await Ticket.findByIdAndUpdate(
            ticketId,
            { status },
            { returnDocument: "after" }
        )

        return res.status(200).json({
            success: true,
            message: "Ticket status is updated successfully",
            ticket
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while updating ticket status ${error}`
        })
    }
}

const deleteTicket = async (req, res) => {
    try {
        const { ticketId } = req.params;
        console.log("ticketId in delete controler", ticketId)

        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "Ticket Id is required"
            })
        }

        await Ticket.findByIdAndDelete(ticketId);

        await Note.deleteMany({
            ticketId
        })

        await axios.delete(`${process.env.MESSAGE_SERVICE}/delete/${ticketId}`);

        console.log("ticket is deleted along with the notes and messages");

        return res.status(200).json({
            success: true,
            message: "Ticket is deleted successfully"
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while deleting ticket ${error}`
        })
    }
}

export {
    createTicket,
    getAllTicket,
    getTicketById,
    updateTicketStatus,
    deleteTicket

}