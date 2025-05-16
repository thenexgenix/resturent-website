import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name should be at least 3 characters long"],
    },
    email: {
      type: String,
      unique: true,
      required: true,
      match: [
        /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
        "Please fill a valid email address",
      ],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password should be at least 6 characters long"],
      select: false,
    },
    // Email verification fields
    verifyOTP: {
      type: String,
      default: "",
    },
    verifyOTPExpireAt: {
      type: Number,
      default: 0,
    },
    isAccountVerified: {
      type: Boolean,
      default: false,
    },

    // Forgot password fields
    resetOTP: {
      type: String,
      default: "",
    },
    resetOTPExpireAt: {
      type: Number,
      default: 0,
    },
  },
  { timestamps: true }
);

// Hash the password before saving
userSchema.statics.hashPassword = async function (password) {
  return await bcrypt.hash(password, 10);
};

// Compare the user password
userSchema.methods.comparePassword = async function (password) {
  return await bcrypt.compare(password, this.password);
};

// Generate auth token
userSchema.methods.generateAuthToken = async function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

const UserModel = mongoose.models.User || mongoose.model("User", userSchema);

export default UserModel;
