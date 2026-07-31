import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/dbConnect.js";
import ticketRouter from "./routes/ticketRoutes.js";
import noteRouter from "./routes/noteRoutes.js";




app.use(express.json());

app.use("/", ticketRouter);
app.use("/notes", noteRouter)


const port = process.env.PORT;

app.get("/check", (req, res) => {
    res.send("Welcome to the Ticket Services")
})

app.listen(port, () => {
    console.log(`Ticket service is listening on port ${port}`);
    dbConnect();
})