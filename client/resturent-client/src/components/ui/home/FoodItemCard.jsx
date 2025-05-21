import React, { useState } from "react";
import { motion } from "framer-motion";
import { FiMinus, FiPlus } from "react-icons/fi";
import { FaShoppingCart, FaClock, FaStar } from "react-icons/fa";
import { Link } from "react-router";
import useFoodAndCartStore from "../../../hooks/useFoodAndCartStore";

const FoodItemCard = ({ item, index }) => {
  const [quantity, setQuantity] = useState(0);
  const [hovered, setHovered] = useState(false);
  const { addToCart, cartItems } = useFoodAndCartStore();

  // Increment and decrement quantity
  const increment = () => setQuantity((q) => q + 1);
  const decrement = () => setQuantity((q) => (q > 1 ? q - 1 : 0));

  // Add to cart logic
  const handleAddToCart = () => {
    if (quantity === 0) return;
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      addToCart({ ...item, quantity: existingItem.quantity + quantity });
    } else {
      addToCart({ ...item, quantity });
    }
  };

  return (
    <motion.div
      className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 * index }}
      whileHover={{ y: -5 }}
    >
      <div className="relative h-48 overflow-hidden group">
        <motion.img
          src={`http://localhost:8000/images/${item.images[0]}`}
          alt={item.name}
          className="w-full h-full object-cover transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
        {!item.isAvailable && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white font-semibold">
              Currently Unavailable
            </span>
          </div>
        )}
      </div>

      <div className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between mb-2">
          <Link to={`/menu/${item._id}`} className="text-gray-800">
            <h3 className="text-lg font-bold text-gray-800">{item.name}</h3>
          </Link>
          <span className="text-xl font-bold text-red-600">৳{item.price}</span>
        </div>

        <div className="flex items-center mt-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <FaStar
              key={i}
              className={`h-4 w-4 ${
                i < Math.round(item.starRating)
                  ? "text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
          <span className="ml-2 text-sm text-gray-600">
            {item.starRating.toFixed(1)}
          </span>
        </div>

        <p className="text-gray-600 text-sm mb-3 line-clamp-2">
          {item.description}
        </p>

        <div className="flex flex-wrap gap-2 mb-3">
          {item.tags?.slice(0, 2).map((tag, i) => (
            <span
              key={i}
              className="bg-gray-100 text-xs text-gray-600 px-2 py-1 rounded-full"
            >
              {tag}
            </span>
          ))}
        </div>

        <div className="flex items-center justify-between text-sm text-gray-600 mb-2">
          <div className="flex items-center">
            <FaClock size={14} className="mr-1" />
            {item.preparationTime}
          </div>
          <div className="flex items-center justify-between mt-auto">
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

        <motion.button
          onClick={handleAddToCart}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{
            scale: 1.05,
            boxShadow: "0 0 10px rgba(249, 8, 6, 0.6)",
          }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center justify-center mt-4 px-4 py-2 rounded-full text-white font-medium transition-opacity duration-300"
          style={{
            backgroundColor: "#F90806",
            opacity: hovered ? 1 : 0.9,
          }}
        >
          {hovered ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }}
            >
              <FaShoppingCart size={18} />
            </motion.div>
          ) : (
            <motion.span
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              Add to Cart
            </motion.span>
          )}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FoodItemCard;
