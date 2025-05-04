import express from "express";
import { body } from "express-validator";
import { registerUser, loginUser, logoutUser } from "./../controllers/user.controller.js";
import { authUserLogout } from "../middlewares/auth.user.js";
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
userRouter.post("/logout", authUserLogout ,logoutUser)
userRouter.post("forgetpassword",[body("email").isEmail().withMessage("Please enter a valid email")])
export default userRouter;
