import mongoose from "mongoose";

// create a schema for food upload
const foodSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minLength: [2, "Food name must be at least 2 characters long"],
  },
  description: {
    type: String,
    required: true,
    minLength: [10, "Food description must be at least 10 characters long"],
  },
  price: {
    type: Number,
    required: true,
    min: [10, "Food price must be at least 10 taka"],
  },
  image: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
});

// export the food model
const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default FoodModel;
