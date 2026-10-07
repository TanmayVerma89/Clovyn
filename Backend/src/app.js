import express from "express";
import morgan from "morgan";
import cookieParser from "cookie-parser";
<<<<<<< HEAD
import cors from 'cors';
=======
>>>>>>> feature/auth
import authRouter from "./routes/auth.routes.js";

const app = express();
app.use(express.json());
app.use(morgan("dev"));
app.use(cookieParser()); // Middleware to parse cookies
<<<<<<< HEAD
app.use(express.urlencoded({ extended: true }));
app.use(cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    credentials: true, // Allow cookies to be sent 
}));

// Import and use your routes here

app.use("/auth", authRouter)
=======


// Import and use your routes here

app.use("/auth",authRouter)
>>>>>>> feature/auth

export default app;
