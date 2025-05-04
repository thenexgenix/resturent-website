import { validationResult } from "express-validator";
import UserModel from "../models/user.model.js";
import BlacklistUser from "../models/BlacklistToken.model.js";

// Register User Route Handler
export const registerUser = async (req, res) => {
  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  const { name, email, password } = req.body;

  try {
    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists",
      });
    }

    // Create new user
    const newUser = await UserModel.create({ name, email, password });

    // Generate auth token
    const authToken = newUser.generateAuthToken();

    // Set auth token in header and cookie
    res.set("Authorization", `Bearer ${authToken}`);
    res.cookie("x-auth-token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return success response
    return res.status(201).json({
      success: true,
      message: "User registered successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: err.message || "Server error",
    });
  }
};

// login User Route Handlers
export const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //find the user
    const user = await UserModel.findOne({ email });
    if (!user) {
      // Intentional delay to prevent user enumeration
      await new Promise((resolve) => setTimeout(resolve, 500));
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // verify the password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid password",
      });
    }

    const authToken = user.generateAuthToken();
    // Set auth token in header and cookie
    res.set("Authorization", `Bearer ${authToken}`);
    res.cookie("x-auth-token", authToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });
    return res.status(200).json({
      success: true,
      message: "Logged in successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//logout user Route Handlers
export const logoutUser = async (req, res) => {
  try {
    // Clear cookie
    res.clearCookie("x-auth-token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
    });

    // Remove Authorization header
    res.removeHeader("Authorization");
    // Get token from middleware
    const token = req.token;
    // Add token to blacklist
    await BlacklistUser.create({ token });

    return res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal Server Error",
    });
  }
};


//forget password route handler
export const forgetPassword = async (req, res) => {
  const { email } = req.body;
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    // Check if user exists
    const user = await UserModel.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP and send email (implementation not shown)
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    return res.status(200).json({
      success: true,
      message: "OTP sent to your email",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
}
