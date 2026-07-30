import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();



app.use(express.json());





const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Welcome to the Auth Service")
})

app.use("/login", (req, res) => {
    res.send("Welcome to the Login Page");
})

app.listen(port, () => {
    console.log(`Gateway is listening on port ${port}`)
})