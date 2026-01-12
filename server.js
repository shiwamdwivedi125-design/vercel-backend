const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 1. .env Configuration
dotenv.config();

const app = express();

// 2. Middleware
app.use(cors());
app.use(express.json());

// 3. Database Connection logic
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error("Error: MONGO_URI is not defined in environment variables!");
            return;
        }
        await mongoose.connect(uri);
        console.log('MongoDB Connected successfully');
    } catch (error) {
        console.error('MongoDB Connection Error:', error.message);
    }
};

connectDB();

// 4. Routes
app.get('/', (req, res) => {
    res.send('Dharti Ka Swad Backend is running live on Railway!');
});

// 5. Port Setting (Railway ke liye Sabse Zaroori)
// Railway automatically 'PORT' environment variable deta hai
const PORT = process.env.PORT || 5000;

// '0.0.0.0' par listen karna Railway/Docker environments ke liye best hota hai
app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

const cors = require('cors');

// Ise setup karein taaki kisi bhi frontend se request aa sake
app.use(cors({
    origin: '*', 
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// Export (Optional: Isse Vercel par bhi kaam karega)
module.exports = app;\
