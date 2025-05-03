import FoodModel from "../models/food.models.js";

export const FoodService = async ({
  name,
  description,
  price,
  image,
  category,
}) => {
  try {
    if (!name || !description || !price || !image || !category) {
      throw new Error("All fields are required");
    }
    const createFood = FoodModel.create({
      name,
      description,
      price,
      image,
      category,
    });
    return createFood;
  } catch (error) {
    throw new error(error.massage);
  }
};
