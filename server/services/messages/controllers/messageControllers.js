import Message from "../model/message.js"


const createMessage = async (req, res) => {
    try {
        const { ticketId } = req.params;
    
        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "ticketId is required"
            })
        }

        const { role, message_text } = req.body;
    

        const message = await Message.create({
            ticketId,
            role,
            message_text
        })

        return res.status(201).json({
            success: true,
            message: "message created successfully",
            message
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `cannot create a message = ${error}`
        })
    }
}

const getMessages = async (req, res) => {
    try {
        const { ticketId } = req.params;

        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "ticketId is required"
            })
        }

        const messages = await Message.find({ ticketId });

        if (messages.length === 0) {
            return res.status(404).json({
                success: false,
                message: "no messages found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "messages fetched successfully",
            messageCount: messages.length,
            messages
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: `cannot geat a message = ${error}`
        })
    }
}


const deleteMessages = async (req, res) => {
    try {
        const { ticketId } = req.params;

        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "ticketId is required"
            })
        }

        await Message.deleteMany({ ticketId });

        return res.status(200).json({
            success: true,
            message: "messages deleted successfully"
        })

    } catch (error) {
        console.log(error);;
        return res.status(500).json({
            success: false,
            message: `cannot delete a message = ${error}`
        })
    }
}

export {
    createMessage,
    getMessages,
    deleteMessages
}