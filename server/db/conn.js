const  mongoose = require("mongoose");
const path = require('path');
const dotenv = require('dotenv');

const envPath = path.resolve(__dirname, '../config.env');

dotenv.config({ path: envPath });
const db = process.env.DATABASE_URL;

const connectDB = async () => {
    try {
        console.log('Connecting to mongoose...')
        mongoose.set('strictQuery', true);
        await mongoose.connect(db);

        console.log('Mongoose is connected...');
    } catch (err) {
        console.error(err.message);
        process.exit(1)
    }
};

module.exports = connectDB;