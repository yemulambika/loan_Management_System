import mongoose from "mongoose";

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI as string, {
      maxPoolSize: 20, // Increased from default 10 for better concurrency
      minPoolSize: 5,  // Keep minimum connections warm
      socketTimeoutMS: 30000,
      serverSelectionTimeoutMS: 5000,
      retryWrites: true,
    });
    console.log("MongoDB connected with optimized pool");
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

export default connectDB;
