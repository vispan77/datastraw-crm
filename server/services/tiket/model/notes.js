import mongoose from "mongoose"

const notesSchema = new mongoose.Schema({
    ticketId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Ticket",
        required: true
    },
    note_text: {
        type: String,
        required: true
    }
}, {timestamps: true})

const Note = mongoose.model("Note", notesSchema);

export default Note;