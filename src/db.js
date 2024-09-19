import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

export const connectDB = async () => {
    try {
        await mongoose.connect(process.env.URI, {
            dbName: 'A-react',
        });
        console.log('MongoDB conectado');
    } catch (error) {
        console.log('Error al conectar con MongoDB:', error);
        process.exit(1);
    }
};
