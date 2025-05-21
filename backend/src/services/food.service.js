import FoodModel from "../models/food.models.js";

export const FoodService = async ({
  name,
  shortDescription,
  detailsDescription,
  price,
  images,
  category,
  starRating = 0,
  ingredients = [],
  calories,
  isAvailable = true,
  preparationTime,
  origin = "Unknown",
  tags = [],
}) => {
  try {
    // Required field validation
    if (
      !name ||
      !shortDescription ||
      !detailsDescription ||
      !price ||
      !images ||
      !Array.isArray(images) ||
      images.length === 0 ||
      !category ||
      !preparationTime
    ) {
      throw new Error("All required fields must be provided and valid");
    }

    // Normalize input in case strings are passed
    if (typeof ingredients === "string") {
      ingredients = ingredients.split(",").map((i) => i.trim());
    }

    if (typeof tags === "string") {
      tags = tags.split(",").map((t) => t.trim());
    }

    const createFood = await FoodModel.create({
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

    return createFood;
  } catch (error) {
    throw new Error(error.message || "Failed to create food item");
  }
};
