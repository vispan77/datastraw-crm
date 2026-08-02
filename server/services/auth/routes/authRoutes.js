import express from "express"
import { googleAuth, logout, getMe } from "../controllers/authController.js";
const authRouter = express.Router();




authRouter.post("/google-auth", googleAuth);
authRouter.get("/logout", logout);
authRouter.get("/getme", getMe);



export default authRouter;