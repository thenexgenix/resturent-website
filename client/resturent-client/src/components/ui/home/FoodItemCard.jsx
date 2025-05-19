import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaStar, FaShoppingCart } from "react-icons/fa";
import { FiMinus, FiPlus } from "react-icons/fi";
import useFoodAndCartStore from "../../../hooks/useFoodAndCartStore";

const FoodItemCard = ({ item }) => {
  const { addToCart, cartItems } = useFoodAndCartStore();
  const [quantitys, setQuantitys] = useState(0);
  const [hovered, setHovered] = useState(false);

  // Increment and decrement quantity
  const increment = () => setQuantitys((q) => q + 1);
  const decrement = () => setQuantitys((q) => (q > 1 ? q - 1 : 0));

  // Add to cart with current quantity
  const handleAddToCart = () => {
    if (quantitys === 0) return;
    const existingItem = cartItems.find(
      (cartItem) => cartItem._id === item._id
    );
    if (existingItem) {
      addToCart({ ...item, quantity: existingItem.quantity + quantitys });
    } else {
      addToCart({ ...item, quantity: quantitys });
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.02 }}
      transition={{ duration: 0.3 }}
      className="w-full bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      {/* Image Section */}
      <div className="relative overflow-hidden group h-52 w-full">
        {/* Yellow Background on Hover */}
        <motion.div
          className="absolute inset-0 bg-yellow-100 z-0"
          initial={{ opacity: 0 }}
          whileHover={{ opacity: 1 }}
          transition={{ duration: 0.3 }}
        />
        {/* Scalable Image */}
        <motion.img
          src={`http://localhost:8000/images/${item.image}`}
          alt={item.name}
          className="h-full w-full object-cover z-10 relative transition-transform duration-300 ease-in-out group-hover:scale-110"
        />
      </div>

      {/* Content Section */}
      <div className="p-4 flex flex-col flex-grow">
        <h3 className="text-lg font-semibold">{item.name}</h3>

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

        <p className="text-sm text-gray-600 flex-grow">{item.description}</p>

        <div className="flex items-center justify-between mt-4">
          <span className="text-xl font-bold text-red-600">৳{item.price}</span>

          <div className="flex items-center bg-gray-100 rounded-full px-3 py-1 space-x-2">
            <button
              onClick={decrement}
              className="text-gray-600 hover:text-red-500"
            >
              <FiMinus />
            </button>
            <span className="font-medium">{quantitys}</span>
            <button
              onClick={increment}
              className="text-gray-600 hover:text-green-500"
            >
              <FiPlus />
            </button>
          </div>
        </div>

        {/* Add to Cart button */}
        <motion.button
          onClick={handleAddToCart}
          onMouseEnter={() => setHovered(true)}
          onMouseLeave={() => setHovered(false)}
          whileHover={{ scale: 1.05 }}
          transition={{ type: "spring", stiffness: 300 }}
          className="flex items-center justify-center mt-4 px-4 py-2 rounded-full text-white font-medium"
          style={{
            backgroundColor: "#F90806",
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
