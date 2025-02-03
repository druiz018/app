import mongoose from 'mongoose';
process.loadEnvFile()
const MONGO_URI = process.env.URI || '';
const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('MongoDB connected');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;