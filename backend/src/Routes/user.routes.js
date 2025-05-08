import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  logoutUser,
  updatePassword,
} from "./../controllers/user.controller.js";
import { authUser } from "../middlewares/auth.user.js";
//initiallize the express router
const userRouter = express.Router();

//register router
userRouter.post(
  "/register",
  [
    body("name")
      .notEmpty()
      .withMessage("Name is required")
      .isLength({ min: 2 })
      .withMessage("user name must be at least 3 characters long"),
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  registerUser
);

//login user
userRouter.post(
  "/login",
  [
    body("email").isEmail().withMessage("Please enter a valid email"),
    body("password")
      .isLength({ min: 6 })
      .withMessage("Password must be at least 6 characters long"),
  ],
  loginUser
);

//logout user
userRouter.post("/logout", authUser, logoutUser);

//forget password
userRouter.post(
  "/forgetpassword",
  authUser,
  [body("email").isEmail().withMessage("Please enter a valid email")],
  forgetPassword
);

//reset otp
userRouter.post(
  "/resetotp",
  authUser,
  [
    body("resetOTP")
      .notEmpty()
      .withMessage("OTP is required")
      .isLength({ min: 6 })
      .withMessage("OTP must be at least 6 characters long"),
  ],
  resetOTP
);

//update password
userRouter.post(
  "/updatepassword",
  authUser,
  [
    body("oldPassword")
      .notEmpty()
      .withMessage("Old password is required")
      .isLength({ min: 6 })
      .withMessage("Old password must be at least 6 characters long"),
    body("newPassword")
      .notEmpty()
      .withMessage("New password is required")
      .isLength({ min: 6 })
      .withMessage("New password must be at least 6 characters long"),
  ],
  updatePassword
);

export default userRouter;
