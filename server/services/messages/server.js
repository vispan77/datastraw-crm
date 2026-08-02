import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import messageRouter from "./routes/messageRoutes.js";
import dbConnect from "./config/dbConnect.js";

dbConnect();

app.use(express.json());

//check userId
app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    console.log("userId in the message service from the",req.headers["x-user-id"]);

    next();
});


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