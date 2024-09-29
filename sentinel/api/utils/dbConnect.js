import mongoose from 'mongoose';

export default async function dbConnect() {
    if (!mongoose.connections[0].readyState) {
        try {
            console.log('Connected to MongoDB! (dbConnect)');
            return await mongoose.connect(process.env.MONGO_URL);
        } catch (error) {
            return console.error('Error connecting to MongoDB:', error);
        }
    }
}