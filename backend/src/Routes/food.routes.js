import express from "express";
import multer from "multer";
import { body } from "express-validator";
import { addFood } from "../controllers/food.controller";

const foodRouter = express.Router();

//multer file upload
const storage = multer.diskStorage({
  destination: "upload",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});
const upload = multer({ storage: storage });

//food router
foodRouter.post("/add", [
  upload.single("image"),
  body("name")
    .not()
    .isEmpty()
    .withMessage("Food item name is required")
    .isLength({ min: 2 })
    .withMessage("Food item Name must be at least 3 characters long"),
],addFood);

//export the food router
export default foodRouter;
