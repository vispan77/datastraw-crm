import express from "express";
import { createTicket, getAllTicket } from "../controllers/ticketControllers.js";

const ticketRouter = express.Router();


ticketRouter.post("/create-ticket", createTicket);
ticketRouter.get("/get-all-ticket", getAllTicket);



export default ticketRouter;