import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import useFoodAndCartStore from "../../../hooks/useFoodAndCartStore";
import { useEffect } from "react";

const FoodItemCard = ({ item }) => {

  // Zustand store
  // This store manages the food data, cart items, and selected category for filtering.
  const { cartItems, addToCart } = useFoodAndCartStore();
  const [quantity, setQuantity] = useState(0);

  // Increment and decrement functions
  // These functions are used to increase or decrease the quantity of the food item.
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 0));
  // Add to cart when quantity changes
  useEffect(() => {
    if (quantity > 0) {
      const existingItem = cartItems.find(
        (cartItem) => cartItem._id === item._id
      );
      if (existingItem) {
        addToCart({ ...item, quantity });
      } else {
        addToCart({ ...item, quantity });
      }
    }
  }, [quantity]);
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.3 }}
      className="w-64 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      {/* Image */}
      <img
      
        src={`http://localhost:8000/images/${item.image}`}
        alt={item.name}
        className="h-40 w-full object-cover rounded-t-xl"
      />

      {/* Content */}
      <div className="p-4 flex flex-col flex-grow">
        {/* Name */}
        <h3 className="text-lg font-semibold">{item.name}</h3>

        {/* Star rating */}
        <div className="flex items-center mt-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={
                i < Math.round(item.starRating)
                  ? "text-orange-400"
                  : "text-gray-300"
              }
              size={18}
            />
          ))}
        </div>

        {/* Description */}
        <p className="text-sm text-gray-600 flex-grow">{item.description}</p>

        {/* Price and Quantity */}
        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-red-600">${item.price}</span>

          {/* Quantity control */}
          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 space-x-2">
            <button
              onClick={decrement}
              className="text-gray-600 hover:text-red-500"
            >
              <FiMinus />
            </button>
            <span className="font-medium">{quantity}</span>
            <button
              onClick={increment}
              className="text-gray-600 hover:text-green-500"
            >
              <FiPlus />
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default FoodItemCard;
