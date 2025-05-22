import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  FaStar,
  FaClock,
  FaLeaf,
  FaMapMarkerAlt,
  FaUtensils,
} from "react-icons/fa";
import { MdCategory, MdLocalDining } from "react-icons/md";
import { GiFire } from "react-icons/gi";
import useFoodDetails from "../../../hooks/useFoodDetails";

const MenuDetailsPage = ({ productId }) => {
  const { data, isLoading, isError } = useFoodDetails(productId);
console.log(data)
  if (isLoading) {
    return (
      <AnimatePresence>
        <motion.div
          className="fixed inset-0 bg-white flex justify-center items-center z-50"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="text-center">
            <div className="text-4xl font-semibold text-primary animate-pulse">
              Preparing your plate...
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    );
  }

  if (isError || !data?.data) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <p className="text-red-600 text-xl font-semibold">
          Failed to load food details. Please try again.
        </p>
      </div>
    );
  }

  const food = data.data;

  return (
    <motion.div
      className="max-w-6xl mx-auto px-4 py-10 md:py-20"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="grid md:grid-cols-2 gap-10 items-start">
        {/* Images */}
        <motion.div
          className="rounded-2xl overflow-hidden shadow-lg"
          initial={{ scale: 0.95 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <img
            src={`http://localhost:8000/images/${data.data.images[0]}`}
            alt={food.name}
            className="w-full h-[400px] object-cover"
          />
        </motion.div>

        {/* Details */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 space-y-5 text-gray-800">
          <motion.h2
            className="text-3xl md:text-4xl font-extrabold text-primary"
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.3 }}
          >
            {food.name}
          </motion.h2>

          <p className="text-sm text-gray-600">{food.shortDescription}</p>

          <div className="flex flex-wrap gap-4 text-sm text-gray-700">
            <div className="flex items-center gap-2">
              <MdCategory className="text-primary" /> {food.category}
            </div>
            <div className="flex items-center gap-2">
              <FaStar className="text-yellow-500" /> {food.starRating}/5
            </div>
            <div className="flex items-center gap-2">
              <GiFire className="text-red-500" /> {food.calories} cal
            </div>
            <div className="flex items-center gap-2">
              <FaClock className="text-indigo-500" /> {food.preparationTime}
            </div>
            <div className="flex items-center gap-2">
              <FaMapMarkerAlt className="text-pink-500" /> {food.origin}
            </div>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-lg">Description</h4>
            <p className="text-gray-700 leading-relaxed">
              {food.detailsDescription}
            </p>
          </div>

          <div className="space-y-1">
            <h4 className="font-semibold text-lg">Ingredients</h4>
            <p className="text-gray-700 text-sm">
              {food.ingredients.join(", ")}
            </p>
          </div>

          {food.tags?.length > 0 && (
            <div className="flex flex-wrap gap-2 pt-2">
              {food.tags.map((tag, i) => (
                <span
                  key={i}
                  className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          <div className="flex justify-between items-center mt-6">
            <span className="text-xl font-bold text-black">৳ {food.price}</span>
            <span
              className={`text-sm font-medium ${
                food.isAvailable ? "text-green-600" : "text-red-500"
              }`}
            >
              {food.isAvailable ? "Available" : "Not Available"}
            </span>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default MenuDetailsPage;
