import mongoose from "mongoose";

const connectDB = "mongodb+srv://sergiotelos:12345@cluster0.23uy78y.mongodb.net/simulador8?appName=Cluster0";

mongoose.connect(connectDB)

mongoose.connection.on("connected", () => {
    console.log("MongoDB connected successfully");
});

mongoose.connection.on("error", (err) => {
    console.error("MongoDB connection error:", err);
});

export default mongoose;