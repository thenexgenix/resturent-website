import FoodModel from "../models/food.models.js";
import { validationResult } from "express-validator";

export const addFood = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ errors: error.array() });
    }
    const { name, description, price, image, category } = req.body;
    // create new food document
    const newfooditem = new FoodModel({
      name,
      description,
      price,
      image,
      category,
    });
    //save to database
    await newfooditem.save();

    return res.status(201).json({
      message: "Food item added successfully",
    });
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Server error, please try again later." });
  }
};
