import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
    console.log('Successfully connected to Mongo');
  } catch (error) {
    console.error(`Error: ${error.message}`);  // Fixed string interpolation here
    process.exit(1);
  }
}

export default connectDB;
