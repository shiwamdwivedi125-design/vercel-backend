const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Product = require('./models/Product');
const Farmer = require('./models/Farmer');

dotenv.config();

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`Error: ${error.message}`);
        process.exit(1);
    }
};

const seedDosaLocal = async () => {
    await connectDB();

    try {
        // 1. Delete old Broken Masala Dosa
        await Product.deleteMany({ name: 'Special Masala Dosa' }); // clear potential duplicates
        console.log('Cleaned old Dosa entries.');

        // 2. Get Farmer
        let farmer = await Farmer.findOne();

        // 3. Add Masala Dosa with Local Image
        const dosa = {
            name: 'Special Masala Dosa',
            description: 'Crispy rice crepe stuffed with spiced potato filling. Classic South Indian breakfast.',
            price: 149,
            category: 'Breakfast', // Matches 'Breakfast / Dosa' category logic
            farmer: farmer._id,
            image: '/images/masala_dosa_final.jpg', // Guaranteed to exist (Local)
            stock: 50,
            unit: 'plate',
            source: 'Farm Fresh', // User mentioned this tag
            rating: 4.8,
            reviews: [],
            ingredients: ['Rice', 'Dal', 'Potatoes', 'Spices'],
            nutrition: { calories: 350 },
            customization: {
                spiceLevel: true,
                jainOption: true,
                addOns: [{ name: 'Extra Butter', price: 20 }]
            },
            availabilityTime: 'All Day', // Valid Enum
            isSeasonal: false,
            rewardPoints: 15
        };

        const createdProduct = await Product.create(dosa);
        console.log('Masala Dosa Added Successfully with Local Image:', createdProduct.name);

    } catch (error) {
        console.error('Error adding Dosa:', error);
    } finally {
        mongoose.connection.close();
        process.exit();
    }
};

seedDosaLocal();
