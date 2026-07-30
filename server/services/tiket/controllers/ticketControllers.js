import Ticket from "../model/ticket.js";


//ticket post kerne ke liye
const createTicket = async(req, res) => {
    try{
        const {customer_name, customer_email, subject, description} = req.body;

        if(!customer_name || !customer_email || !subject || !description){
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

        return res.status(201).json({
            success: true,
            message: "Ticket is created Successfully",
            ticket: { 
                _id: ticket._id,
                createdAt: ticket.createdAt
            }

        })
    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while creating the ticket ${error}`
        })
    }
}

const getAllTicket = async(req, res) => {
    try{
        const ticket = await Ticket.find();

        return res.status(200).json({
            success: true,
            message: "All tickets are fetched successfully",
            ticketCount: ticket.length,
            ticket
            
        })

    }catch(error){
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while getting all the ticket ${error}`
        })
    }
}

export {
    createTicket,
    getAllTicket
}