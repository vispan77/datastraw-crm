import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import messageRouter from "./routes/messageRoutes.js";
import dbConnect from "./config/dbConnect.js";

dbConnect();

app.use(express.json());



app.use("/", messageRouter)


const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Welcome to the Messages Service")
})

app.use("/check", (req, res) => {
    res.send("Welcome to the create message Page");
})

app.listen(port, () => {
    console.log(`Message Services is listening on port ${port}`);
    
})