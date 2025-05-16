import jwt from "jsonwebtoken";
import UserModel from "../models/user.model.js";
import BlacklistUser from "../models/BlacklistToken.model.js";

export const authUser = async (req, res, next) => {
  // Extract token from cookies or authorization header
  const token =
    req.cookies?.["x-auth-token"] || req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({
      success: false,
      message: "Authorization denied. No token provided.",
    });
  }
  try {
    const isBlackList = await BlacklistUser.findOne({ token });
    // If token is blacklisted  return error
    if (isBlackList) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    if (!decode) {
      return res.status(401).json({
        success: false,
        message: "Invalid token",
      });
    }

    const user = await UserModel.findById(decode._id);
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found. Unauthorized access.",
      });
    }
    req.user = user;
    req.token = token;
    next();
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

// export const authUser = async (req, res, next) => {
//   // Extract token from cookies or authorization header
//   const token =
//     req.cookies?.["x-auth-token"] || req.headers.authorization?.split(" ")[1];
//   if (!token) {
//     return res.status(401).json({
//       success: false,
//       message: "Authorization denied. No token provided.",
//     });
//   }
//   try {
//     const decode = jwt.verify(token, process.env.JWT_SECRET);
//     if (!decode) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid token",
//       });
//     }

//     const user = await UserModel.findById(decode._id);
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User not found. Unauthorized access.",
//       });
//     }
//     req.user = user;
//     next();
//   } catch (error) {
//     return res.status(500).json({
//       success: false,
//       message: "Internal server error",
//     });
//   }
// }
