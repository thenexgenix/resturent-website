import mongoose from "mongoose";

async function db() {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/Rasturent-db";
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    const dbConnect = await mongoose.connect(uri, {});
    console.log("MongoDB connected successfully:", dbConnect.connection.host);
  } catch (error) {
    console.log("Error connecting to MongoDB:", error.message);
    // Exit process with failure
    process.exit(1);
  }
}
export default db;
