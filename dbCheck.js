const mongoose = require('mongoose');
require('dotenv').config();

const checkConnection = async () => {
    try {
        console.log('Connecting to MongoDB...');
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connection successful!');
        process.exit(0);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

checkConnection();
