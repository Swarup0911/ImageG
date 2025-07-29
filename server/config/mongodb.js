import mongoose from "mongoose";
import 'dotenv/config';

const connectDB = async () => {
  try {
    // Connection event listeners
    mongoose.connection.on('connected', () => {
      console.log("✅ MongoDB Connected Successfully");
    });

    mongoose.connection.on('error', (err) => {
      console.error("❌ MongoDB Connection Error:", err);
    });

    // Modern connection with updated options
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "ImageG",  // Specify database name
      ssl: true,        // Required for MongoDB Atlas
      retryWrites: true,
      w: 'majority'
    });

  } catch (err) {
    console.error("❌ Failed to connect to MongoDB:", err.message);
    process.exit(1);
  }
};

export default connectDB;