const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// Env variables load karein
dotenv.config();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database Connection Logic
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

// Connect to DB
connectDB();

// Basic Route
app.get('/', (req, res) => {
    res.send('Dharti Ka Swad Backend is running live!');
});

// Port setting
const PORT = process.env.PORT || 5000;

// Local development ke liye server start karein
if (process.env.NODE_ENV !== 'production') {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}

// Vercel ke liye app export karein
module.exports = app;