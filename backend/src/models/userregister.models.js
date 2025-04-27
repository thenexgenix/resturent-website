import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userRegisterSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      match : []
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);
userRegisterSchema.static.hashPassowrd(async (password) => {
  return await bcrypt.hash(password, 10);
});

const userRegisterModel = mongoose.model("userLogin", userRegisterSchema);
