import { validationResult } from "express-validator";
import { FoodService } from "../services/food.service.js";
import FoodModel from "../models/food.models.js";
import fs from "fs";

//add food controller
export const addFood = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success: false, massage : error.array() });
    }
    const { name, description, price, image, category } = req.body;
    // create new food document
    await FoodService({
      name,
      description,
      price,
      image,
      category,
    });
    return res
      .status(201)
      .json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};
//list all food
export const listFood = async (req, res) => {
  try {
    const fooditemlist = await FoodModel.find({});
    if (!fooditemlist || fooditemlist.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No food items found",
      });
    }
    return res.status(200).json({
      success: true,
      data: fooditemlist,
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};

//remove food items
export const removeItems = async (req, res) => {
  try {
    const removeFood = await FoodModel.findById(req.body.id);
    fs.unlink(`/upload/${removeFood.image}`, () => {});
    await FoodModel.findByIdAndDelete(req.body.id);
    return res.status(200).json({
      success: true,
      maggage: "Item Removed",
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Server error, please try again later.",
    });
  }
};
  // update the food  ites and use own authencation middleware for 