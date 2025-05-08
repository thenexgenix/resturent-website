import express from "express";
import { body } from "express-validator";
import {
  registerUser,
  loginUser,
  logoutUser,
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

//
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

//
export default userRouter;
