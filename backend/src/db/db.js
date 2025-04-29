import mongoose from "mongoose";

async function db() {
  try {
    const uri =
      process.env.MONGODB_URI || "mongodb://localhost:27017/Rasturent-db";
    if (!uri) {
      throw new Error("MONGODB_URI is not defined in .env file");
    }
    await mongoose.connect(uri);
  } catch (error) {
    // Exit process with failure
    process.exit(1);
  }
}
export default db;