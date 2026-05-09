import mongoose from "mongoose";
import dotenv from "dotenv/config";
const connectDB = process.env.DB_URI;

mongoose.connect(connectDB)

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

export default mongoose;