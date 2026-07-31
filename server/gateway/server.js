import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan"
import proxy from "express-http-proxy";





app.use(express.json());
app.use(morgan("dev"));


app.use("/api/auth",proxy(process.env.AUTH_SERVICE));
app.use("/api/ticket",proxy(process.env.TICKET_SERVICE));
app.use("/api/message",proxy(process.env.MESSAGES_SERVICE));



const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Welcome to the Gateway")
})

app.listen(port, () => {
    console.log(`Gateway is listening on port ${port}`)
})