import mongoose, { omitUndefined } from "mongoose";
import jwt from "jsonwebtoken";

// create a schema for food upload
const foodSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: [2, "Food name must be at least 2 characters long"],
    },
    description: {
      type: String,
      required: true,
      minlength: [10, "Food description must be at least 10 characters long"],
    },
    price: {
      type: Number,
      required: true,
      minlength: [10, "Food price must be at least 10 taka"],
    },
    image: {
      type: String,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
  },
  { timestamps: true }
);

foodSchema.methods.generateAuthToken = function () {
  return jwt.sign({ _id: this._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};
// export the food model
const FoodModel = mongoose.models.Food || mongoose.model("Food", foodSchema);
export default FoodModel;
