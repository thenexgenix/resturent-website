import { validationResult } from "express-validator";
import { FoodService } from "../services/food.service.js";
import FoodModel from "../models/food.models.js";
import fs from "fs";

//add food controller
export const addFood = async (req, res) => {
  try {
    const error = validationResult(req);
    if (!error.isEmpty()) {
      return res.status(400).json({ success: false, massage: error.array() });
    }
    const {
      name,
      shortDescription,
      detailsDescription,
      price,
      images,
      category,
      starRating,
      ingredients,
      calories,
      isAvailable,
      preparationTime,
      origin,
      tags,
    } = req.body;
    // create new food document
    await FoodService({
      name,
      shortDescription,
      detailsDescription,
      price,
      images,
      category,
      starRating,
      ingredients,
      calories,
      isAvailable,
      preparationTime,
      origin,
      tags,

    });

    return res
      .status(201)
      .json({ success: true, message: "Food item added successfully" });
  } catch (error) {
    console.log(error);
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

//get food by id
export const getFoodById = async (req, res) => {
  const foodId = req.params.id;
  try {
    const foodItem = await FoodModel.findById(foodId);
    if (!foodItem) {
      return res.status(404).json({
        success: false,
        message: "Food item not found",
      });
    }
    return res.status(200).json({
      success: true,
      data: foodItem,
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
// update the food  ites and use own authencation middleware
