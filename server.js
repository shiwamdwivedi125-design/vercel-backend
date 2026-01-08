import dotenv from 'dotenv';
dotenv.config(); // Ye line sabse upar honi chahiye

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

// Middleware
app.use(express.json());
app.use(cors());

// Logging Middleware
app.use((req, res, next) => {
    console.log(`[REQUEST] ${req.method} ${req.path}`);
    next();
});

// Database Connection
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB Connected');
    } catch (error) {
        console.error('MongoDB Connection Error:', error);
        // process.exit(1); // Keep server running even if DB fails
    }
};

connectDB();

// API Routes
const userRoutes = require('./routes/userRoutes');
const productRoutes = require('./routes/productRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const orderRoutes = require('./routes/orderRoutes');
const uploadRoutes = require('./routes/uploadRoutes');
const passwordResetRoutes = require('./routes/passwordResetRoutes');

// Use Routes
app.use('/api/users', userRoutes);
app.use('/api/products', productRoutes);
app.use('/api/payment', paymentRoutes);
app.use('/api/orders', orderRoutes); // Temporarily commented out
app.use('/api/farmers', require('./routes/farmerRoutes'));
app.use('/api/contact', require('./routes/contactRoutes')); // Add Contact Routes
app.use('/api/upload', uploadRoutes);
app.use('/api/password-reset', passwordResetRoutes);

const __dirname1 = path.resolve();
app.use('/uploads', express.static(path.join(__dirname1, 'frontend', 'public', 'images')));

// Serve Frontend in Production
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname1, 'frontend', 'dist')));

    app.get('*', (req, res) =>
        res.sendFile(path.resolve(__dirname1, 'frontend', 'dist', 'index.html'))
    );
} else {
    app.get('/', (req, res) => {
        res.send('API is running...');
    });
}
const { notFound, errorHandler } = require('./middleware/errorMiddleware');
app.use(notFound);
app.use(errorHandler);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});


