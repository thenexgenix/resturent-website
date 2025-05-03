import mongoose from "mongoose";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

const userSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [3, "Name should be at least 3 character long"],
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
      minlength: [6, "password should be at least 6 charcter long"],
      Select: false,
    },
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
      resetOTP: {
        type: String,
        default: "",
      },
      resetOTPExpireAt: {
        type: Number,
        default: 0,
      },
    },
  },
  { timestamps: true }
);

//hash the password before saving
userSchema.statics.hashPassword = async (password) => {
  return await bcrypt.hash(password, 10);
};
//compare the user password
userSchema.methods.comparePassword = (password) => {
  return bcrypt.compare(password, this.password);
};
//ganrate auth token
userSchema.methods.generateAuthToken = () => {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
const UserModel = mongoose.model.user || mongoose.model("user", userSchema);
export default UserModel;
