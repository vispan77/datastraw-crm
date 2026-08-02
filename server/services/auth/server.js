import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import authRouter from "./routes/authRoutes.js";
import dbConnect from "./config/dbConnect.js"



dbConnect();

app.use(express.json());


app.use("/", authRouter)


const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Welcome to the Auth Service")
})


app.listen(port, () => {
    console.log(`Auth Service is listening on port ${port}`)
})