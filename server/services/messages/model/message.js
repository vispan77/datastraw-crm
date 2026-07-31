import mongoose from "mongoose";

const messageSchema = new mongoose.Schema({
    ticketId: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["customer", "agent"],
        required: true
    },
    message_text: {
        type: String,
        required: true
    }
}, { timestamps: true })

const Message = mongoose.model("Message", messageSchema);

export default Message;