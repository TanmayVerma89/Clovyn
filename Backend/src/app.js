import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from 'cors';
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser()); // Middleware to parse cookies
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent 
}));

// Import and use your routes here

app.use("/auth", authRouter)

export default app;
