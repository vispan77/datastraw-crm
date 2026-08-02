import express from "express";
import { createTicket, getAllTicket, getTicketById, updateTicketStatus, deleteTicket } from "../controllers/ticketControllers.js";

const ticketRouter = express.Router();


ticketRouter.post("/create-ticket", createTicket);
ticketRouter.get("/get-all-ticket", getAllTicket);
ticketRouter.get("/:ticketId", getTicketById);
ticketRouter.put("/:ticketId", updateTicketStatus);
ticketRouter.delete("/:ticketId", deleteTicket);







export default ticketRouter;