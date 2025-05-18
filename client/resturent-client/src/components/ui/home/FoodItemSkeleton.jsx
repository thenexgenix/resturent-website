import React from "react";
import { motion } from "motion/react";

const FoodItemSkeleton = () => {
  return (
    <motion.div
      initial={{ opacity: 0.4 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.8, repeat: Infinity, repeatType: "reverse" }}
      className="w-64 bg-white rounded-xl shadow-lg overflow-hidden flex flex-col"
    >
      <div className="skeleton h-40 w-full rounded-t-xl" /> {/* Image */}
      <div className="p-4 flex flex-col flex-grow space-y-2">
        <div className="skeleton h-4 w-3/4 rounded" /> {/* Title */}
        <div className="flex space-x-1">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="skeleton h-4 w-4 rounded-full" />
          ))}
        </div>
        <div className="skeleton h-3 w-full rounded" /> {/* Description 1 */}
        <div className="skeleton h-3 w-5/6 rounded" /> {/* Description 2 */}
        <div className="flex items-center justify-between mt-4">
          <div className="skeleton h-5 w-16 rounded" /> {/* Price */}
          <div className="flex space-x-2">
            <div className="skeleton h-6 w-6 rounded-full" /> {/* - */}
            <div className="skeleton h-6 w-6 rounded" /> {/* Quantity */}
            <div className="skeleton h-6 w-6 rounded-full" /> {/* + */}
          </div>
        </div>
        <div className="skeleton h-10 w-full rounded-full mt-4" />{" "}
        {/* Button */}
      </div>
    </motion.div>
  );
};

export default FoodItemSkeleton;
