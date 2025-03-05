// Packages
import express from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// Files
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js'
// Config
dotenv.config();
connectDB();

const app = express();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

const PORT = process.env.PORT || 5000;

// Routes
app.use("/api/v1/users",userRoutes);

app.listen(PORT, () => console.log(`Server is running on Port: ${PORT}`));
