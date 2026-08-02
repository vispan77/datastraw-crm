import Note from "../model/notes.js";


const createNote = async (req, res) => {
    try {
        const { ticketId } = req.params;
        

        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "Ticket Id is required"
            })
        }

        const { note_text } = req.body;
        

        const note = await Note.create({
            ticketId,
            note_text
        })

        return res.status(201).json({
            success: true,
            message: "Note is created successfully",
            note
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while creating the notes ${error}`
        })
    }
}

const getNotes = async (req, res) => {
    try {
        const { ticketId } = req.params;
       

        if (!ticketId) {
            return res.status(400).json({
                success: false,
                message: "Ticket Id is required"
            })
        }

        const notes = await Note.find({
            ticketId: ticketId
        }).sort({ createdAt: -1 });

        if (!notes || notes.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Notes not found with this ticketId"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Notes are fetched successfully",
            notes
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: true,
            message: `Something went wrong while getting the notes ${error}`
        })
    }

}


export {
    createNote,
    getNotes
}