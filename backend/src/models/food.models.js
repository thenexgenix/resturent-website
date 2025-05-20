import mongoose from "mongoose";
import jwt from "jsonwebtoken";

// create a schema for food upload
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Food name must be at least 2 characters long"],
    },
    shortDescription: {
      type: String,
      required: true,
      minlength: [5, "Short description must be at least 5 characters long"],
      maxlength: [120, "Short description can't exceed 120 characters"],
    },
    detailsDescription: {
      type: String,
      required: true,
      minlength: [20, "Details description must be at least 20 characters long"],
    },
    price: {
      type: Number,
      required: true,
      min: [10, "Food price must be at least 10 taka"],
    },
    images: {
      type: [String], // array of image URLs
      required: true,
      validate: [arrayLimit, "At least one image is required"],
    },
    category: {
      type: String,
      required: true,
      enum: [
        "Salad",
        "Rolls",
        "Deserts",
        "Sandwich",
        "Cake",
        "Pure Veg",
        "Pasta",
        "Noodles",
      ],
    },
    starRating: {
      type: Number,
      default: 0,
      min: 0,
      max: 5,
    },
    ingredients: {
      type: [String],
      default: [],
    },
    calories: {
      type: Number,
      min: 0,
    },
    isAvailable: {
      type: Boolean,
      default: true,
    },
    preparationTime: {
      type: String,
      required: true,
    },
    origin: {
      type: String,
      default: "Unknown",
    },
    tags: {
      type: [String],
      default: [],
    },
  },
  { timestamps: true }
);

// array validator for images
function arrayLimit(val) {
  return val.length > 0;
}

// method to generate auth token
foodSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// export the food model
const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default FoodModel;
