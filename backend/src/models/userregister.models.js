import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import e from "cors";

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
      minlength: [6, "Email must be at least 6 characters"],
      maxlength: [30, "Email must be at most 30 characters"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
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

userRegisterSchema.methods.generateAuthToken = async function (id) {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET);
};
userRegisterSchema.static.hashPassowrd(async (password) => {
  return await bcrypt.hash(password, 10);
});
userRegisterSchema.methods.comparePassword = async (password) => {
  return await bcrypt.compare(password, hash);
};

const userRegisterModel = mongoose.model("userLogin", userRegisterSchema);
export default userRegisterModel;
