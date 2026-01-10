const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// MongoDB Connection with Error Handling for Vercel
const connectDB = async () => {
    try {
        if (mongoose.connection.readyState >= 1) return;
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (err) {
        console.error('DB Connection Error:', err.message);
    }
};
connectDB();

app.get('/', (req, res) => {
    res.send('Dharti Ka Swad Backend is Live and Working!');
});

// Vercel ke liye export zaroori hai
module.exports = app;

// Local testing ke liye
if (process.env.NODE_ENV !== 'production') {
    const PORT = process.env.PORT || 5000;
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}