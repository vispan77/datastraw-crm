import express from "express";
const app = express();
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser"
import proxy from "express-http-proxy";
import cors from "cors";
import isAuth from "./middleware/authMiddleware.js";
import { proxyWithHeaders, proxyWithHeadersForSPecificRoute } from "./utils/proxyWithHeaders.js";







app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));
app.use(cors({
    origin: [process.env.FRONTEND_URL, "http://localhost:5173"],
    credentials: true
}))


//wroking path per isko koi bhi access ker sakta hai 
app.use("/api/auth", proxy(process.env.AUTH_SERVICE));
app.use("/api/ticket", proxy(process.env.TICKET_SERVICE));
// app.use("/api/message", proxy(process.env.MESSAGES_SERVICE));

//path jo ki header may userId leke jaye or sirf jo loggin user hi access ker
// app.use("/api/ticket", isAuth, proxyWithHeaders(process.env.TICKET_SERVICE));
app.use("/api/message", isAuth, proxyWithHeaders(process.env.MESSAGES_SERVICE));



app.get("/api/me", isAuth, proxyWithHeadersForSPecificRoute(process.env.AUTH_SERVICE));



const port = process.env.PORT;

app.get("/", (req, res) => {
    res.send("Welcome to the Gateway")
})

app.listen(port, () => {
    console.log(`Gateway is listening on port ${port}`)
})