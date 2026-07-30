import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    customer_name: {
        type: String,
        required: true
    },
    customer_email: {
        type: String,
        required: true
    },
    subject: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ["Open", "In-Progress", "Closed"],
        default: "Open"
    }
}, {
    timestamps: true
})

const Ticket = mongoose.model("Ticket", ticketSchema);

export default Ticket;