import { validationResult } from "express-validator";
import UserModel from "../models/user.model.js";
import BlacklistUser from "../models/BlacklistToken.model.js";
import generateForgotOtpHtml from "../utils/generateForgotOtpHtml.js";
import transporter from "../config/nodemialer.config.js";

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
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }
  // Check if user is already logged in
  if (req.user) {
    return res.status(400).json({
      success: false,
      message: "User already logged in",
    });
  }
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    //find the user
    const user = await UserModel.findOne({ email }).select("password");
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
  const user = req.user;
  try {
    // Validate request body
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, message: errors.array() });
    }

    //check if email is same as the one in the token
    if (email !== user.email) {
      return res.status(400).json({
        success: false,
        message: "Email does not match",
      });
    }
    if (user.resetOTPExpireAt > Date.now()) {
      return res.status(400).json({
        success: false,
        message: "OTP already sent",
      });
    }
    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Generate OTP and send email (implementation not shown)
    const otp = Math.floor(100000 + Math.random() * 900000).toString(); // Generate a 6-digit OTP
    const otpExpireTime = Date.now() + 10 * 60 * 1000; // OTP valid for 10 minutes
    user.resetOTP = otp;
    user.resetOTPExpireAt = otpExpireTime;
    await user.save();
    console.log(
      `OTP for ${user.email}: ${otp} (expires at ${new Date(otpExpireTime)})`
    );

    // Send OTP email
    const mailOptions = {
      from: process.env.SMTP_USER,
      to: user.email,
      subject: "Password Reset OTP",
      html: generateForgotOtpHtml(user.email, user.name, otp),
    };
    await transporter.sendMail(mailOptions);

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
};

//verify OTP route handler

export const OTP = async (req, res) => {
  const { resetOTP: otp } = req.body;
  // Get user from middleware
  const user = req.user;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    //  Check if a user with the OTP exists

    if (!user || (user.resetOTP !== otp && otp.length !== 6)) {
      // Intentional delay to prevent user enumeration
      await new Promise((resolve) => setTimeout(resolve, 500));
      return res.status(400).json({
        success: false,
        message: "Invalid OTP",
      });
    }

    // Check if OTP is expired
    if (Date.now() > new Date(user.resetOTPExpireAt).getTime()) {
      // OTP is expired
      user.resetOTP = null;
      user.resetOTPExpireAt = null;
      await user.save();
      // Intentional delay to prevent user enumeration
      await new Promise((resolve) => setTimeout(resolve, 500));

      return res.status(400).json({
        success: false,
        message: "OTP expired",
      });
    }

    // OTP is valid – clear the OTP and save
    user.resetOTP = null;
    user.resetOTPExpireAt = null;
    await user.save();

    return res.status(200).json({
      success: true,
      message: "OTP verified successfully",
    });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update password route handler forget password
export const updateForgetPassword = async (req, res) => {
  const { password } = req.body;
  // Get user from middleware
  const user = req.user;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    // Check if user has a reset OTP and if it has expired
    if (user.resetOTP === null && user.resetOTPExpireAt === null) {
      await new promises((resolve) => setTimeout(resolve, 500));
      return res.status(400).json({
        success: false,
        message: "Please verify your OTP first",
      });
    }
    // Hash the new password and update it in the database
    user.password = await UserModel.hashPassword(password);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

//update password route handler
export const updatePassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;
  // Get user from middleware
  const user = req.user;

  // Validate request body
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ success: false, message: errors.array() });
  }

  try {
    // Check if user exists
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "User not found",
      });
    }

    // Verify the old password
    const isOldPasswordValid = await UserModel.comparePassword(oldPassword);
    if (!isOldPasswordValid) {
      return res.status(400).json({
        success: false,
        message: "Invalid old password",
      });
    }

    // Hash the new password and update it in the database
    user.password = await UserModel.hashPassword(newPassword);
    await user.save();

    return res.status(200).json({
      success: true,
      message: "Password updated successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
