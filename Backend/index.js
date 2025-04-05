// Packages
import express from 'express';
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import path from "path";

// Files
import connectDB from './config/db.js';
import userRoutes from './routes/userRoutes.js';
import genreRoutes from './routes/genreRoutes.js';
import moviesRoutes from './routes/moviesRoutes.js';
import uploadRoutes from './routes/uploadRoutes.js';

// Config
dotenv.config();
connectDB();

const app = express();
const _dirname = path.resolve();

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Serve Static Files
app.use("/uploads", express.static(path.join(_dirname +"/uploads")));

// Routes
app.use("/api/v1/users", userRoutes);
app.use('/api/v1/genre', genreRoutes);
app.use('/api/v1/movies', moviesRoutes);
app.use('/api/v1/upload', uploadRoutes);

// Port
const PORT = process.env.PORT || 5000;

// Server
app.listen(PORT, () => console.log(`🚀 Server is running on Port: ${PORT}`));
