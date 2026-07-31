import express from "express"
import { createNote, getNotes } from "../controllers/noteController.js";
const noteRouter = express.Router();

noteRouter.post("/:ticketId", createNote);
noteRouter.get("/:ticketId", getNotes);

export default noteRouter;