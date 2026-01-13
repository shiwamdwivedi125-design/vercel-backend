const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 1. .env Configuration
dotenv.config();

const app = express();

// 2. Middleware
app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true
}));
app.use(express.json());

// 3. Database Connection
const connectDB = async () => {
    try {
        const uri = process.env.MONGO_URI;
        if (!uri) {
            console.error("Error: MONGO_URI missing!");
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

// Main Route
app.get('/', (req, res) => {
    res.json({ message: 'Dharti Ka Swad Backend is running live on Railway!' });
});

// ZAROORI: Routes ko sirf EK BAAR define karein
const userRoutes = require('./routes/userRoutes');
app.use('/api/users', userRoutes);

// 404 Route (Ise hamesha routes ke niche rakhein)
app.use((req, res) => {
    res.status(404).json({ error: "Route not found. Please check your API path." });
});

// 5. Port Setting
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;