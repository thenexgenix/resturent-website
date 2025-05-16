import express from "express";
import multer from "multer";
import { body } from "express-validator";
import {
  addFood,
  listFood,
  removeItems,
} from "../controllers/food.controller.js";
import path from "path";
import fs from "fs";

const foodRouter = express.Router();

// Ensure 'upload' folder exists
const uploadDir = path.resolve("upload");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir);
}

// multer storage config
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  },
});

//  validate image type
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(
      new Error("Unsupported file type. Only JPG, PNG, and WEBP allowed."),
      false
    );
  }
};

const upload = multer({ storage, fileFilter });

// food router for  add food item
foodRouter.post(
  "/add",
  [
    upload.single("image"),
    body("name")
      .notEmpty()
      .withMessage("Food item name is required")
      .isLength({ min: 2 })
      .withMessage("Food item Name must be at least 2 characters long"),
    body("description")
      .notEmpty()
      .withMessage("Food description is required")
      .isLength({ min: 10 })
      .withMessage("Description must be at least 10 characters long"),
    body("price")
      .notEmpty()
      .withMessage("Price is required")
      .isNumeric()
      .withMessage("Price must be a number")
      .isFloat({ min: 10 })
      .withMessage("Price must be at least 10"),
    body("category").notEmpty().withMessage("Category is required"),
  ],
  (req, res, next) => {
    if (req.file) {
      req.body.image = req.file.filename;
    }
    next();
  },
  addFood
);
//food router for list all the  food
foodRouter.get("/listitem", listFood);
//rood router for remove food items
foodRouter.post("/remove/one", removeItems);
export default foodRouter;
