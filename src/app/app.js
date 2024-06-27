import express from 'express';
import dotenv from 'dotenv';
import { authRoutes } from '../routes/auth.routes.js';
import connectDB from '../config/database.js';
import { postRoutes } from '../routes/post.routes.js';

const app = express();
dotenv.config();

// Database connection
connectDB();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/api/v1/health', (_req, res) => {
    res.json({
        status: 'success',
        message: 'Welcome to the API'
    });
});

// Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/', postRoutes)

export default app;