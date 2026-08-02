import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import dbConnect from "./config/dbConnect.js";
import ticketRouter from "./routes/ticketRoutes.js";
import noteRouter from "./routes/noteRoutes.js";


dbConnect();

app.use(express.json());

app.use((req, res, next) => {
    console.log(req.method, req.originalUrl);
    console.log("req ki header", req.headers)
    console.log("cookie in header", req.headers.cookie)

    next();
});

app.use("/", ticketRouter);
app.use("/notes", noteRouter)


const port = process.env.PORT;

app.get("/check", (req, res) => {
    res.send("Welcome to the Ticket Services")
})

app.listen(port, () => {
    console.log(`Ticket service is listening on port ${port}`);

})