const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const mongoose = require('mongoose');

// 1. .env Configuration
dotenv.config();

const app = express();

// 2. Middleware
// CORS ko update kiya gaya hai taaki frontend connect ho sake
app.use(cors({
    origin: "*", // Testing ke liye sab allow hai, baad mein apna frontend URL daal sakte hain
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

// Yeh wo route hai jo aapko browser mein dikhta hai
app.get('/', (req, res) => {
    // Ise JSON mein badal dete hain taaki frontend crash na ho agar yahan hit kare
    res.json({ message: 'Dharti Ka Swad Backend is running live on Railway!' });
});

// Yahan apne routes import aur use karein (Example)
// app.use('/api/users', require('./routes/userRoutes'));
// app.use('/api/products', require('./routes/productRoutes'));

// 404 Route: Agar koi galat URL hit kare toh HTML ke badle JSON mile
app.use((req, res) => {
    res.status(404).json({ error: "Route not found. Please check your API path." });
});

// 5. Port Setting
const PORT = process.env.PORT || 5000;

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on port ${PORT}`);
});

module.exports = app;