import mongoose from "mongoose";
const uri = process.env.MONGODB_URI || "mongodb://localhost:27017/Rasturent-db";

async function db() {
  try {
    await mongoose.connect(uri);
  } catch (error) {
    // Exit process with failure
    process.exit(1);
  }
}
export default db;