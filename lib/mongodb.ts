import mongoose from "mongoose";


export const connectDB = async () => {
  try {
    const { connection } = await mongoose.connect(process.env.MONGODB_URL as string);
    if (connection.readyState === 1) {
      console.log(`MongoDB Connected: ${connection.host}`);
      return Promise.resolve(true);
    }
  } catch (error) {
    console.error(error);
    return Promise.reject(error);
  }
};