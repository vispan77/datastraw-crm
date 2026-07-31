import express from "express";
import { createMessage, getMessages } from "../controllers/messageControllers.js";
const messageRouter = express.Router();



messageRouter.post("/create/:ticketId", createMessage);
messageRouter.get("/:ticketId", getMessages);


export default messageRouter;