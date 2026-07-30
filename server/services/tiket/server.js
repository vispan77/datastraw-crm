import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/dbConnect.js";
import ticketRouter from "./routes/ticketRoutes.js";


dbConnect();

app.use(express.json());

app.use("/", ticketRouter)


const port = process.env.PORT;

app.get("/check", (req, res) => {
    res.send("Welcome to the Ticket Services")
})

app.listen(port, () => {
    console.log(`Gateway is listening on port ${port}`)
})