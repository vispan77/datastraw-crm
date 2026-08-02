import express from "express";
import { createMessage, getMessages, deleteMessages } from "../controllers/messageControllers.js";
const messageRouter = express.Router();



messageRouter.post("/create/:ticketId", createMessage);
messageRouter.get("/:ticketId", getMessages);
messageRouter.delete("/delete/:ticketId", deleteMessages);


export default messageRouter;