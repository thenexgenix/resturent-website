import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaStar, FaClock, FaMapMarkerAlt } from "react-icons/fa";
import { MdCategory } from "react-icons/md";
import { GiFire } from "react-icons/gi";
import useFoodDetails from "../../../hooks/useFoodDetails";

// Loader
const Loader = ({ isLoading }) => (
  <AnimatePresence>
    {isLoading && (
      <motion.div
        className="fixed inset-0 bg-white flex justify-center items-center z-50"
        initial={{ scale: 1, opacity: 1 }}
        exit={{ scale: 1.2, opacity: 0 }}
        transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          version="1.1"
          className="w-[200px] h-[200px] text-bg-primary"
          viewBox="50 0 500 300"
        >
          <style>{`
              .pacman3351-dot {
                fill: currentColor;
              }
              .pacman3351-open,
              .pacman3351-mouth-top,
              .pacman3351-mouth-bottom {
                fill: currentColor;
              }
              .pacman3351-mouth-top,
              .pacman3351-mouth-bottom {
                animation-duration: 175ms;
                animation-timing-function: linear;
                animation-direction: alternate;
                animation-iteration-count: infinite;
                transform-origin: calc(300px/2) 150px;
              }
              .pacman3351-mouth-top {
                animation-name: rotate3351-counterclockwise;
              }
              .pacman3351-mouth-bottom {
                animation-name: rotate3351-clockwise;
              }
              @keyframes rotate3351-counterclockwise {
                100% {
                  transform: rotate(-30deg);
                }
              }
              @keyframes rotate3351-clockwise {
                100% {
                  transform: rotate(30deg);
                }
              }
              .pacman3351-dot {
                animation-name: dot3351-motion;
                animation-duration: 600ms;
                animation-timing-function: linear;
                animation-iteration-count: infinite;
              }
              @keyframes dot3351-motion {
                100% {
                  transform: translateX(-100px);
                }
              }
            `}</style>

          <circle className="pacman3351-dot" cx="250" cy="50%" r="20" />
          <circle className="pacman3351-dot" cx="350" cy="50%" r="20" />
          <circle className="pacman3351-dot" cx="450" cy="50%" r="20" />
          <circle className="pacman3351-dot" cx="550" cy="50%" r="20" />
          <circle className="pacman3351-dot" cx="650" cy="50%" r="20" />

          <path
            className="pacman3351-mouth-bottom"
            d="M 150,150 L 220.4,221.0 A 100 100 0 0 0 250,150 Z"
          />
          <path
            className="pacman3351-mouth-top"
            d="M 150,150 L 220.4,79.0 A 100 100 0 0 1 250,150 Z"
          />
          <path
            className="pacman3351-open"
            d="M 150,150 L 236.6,100 A 100 100 0 1 0 236.6,200 Z"
          />
        </svg>
      </motion.div>
    )}
  </AnimatePresence>
);

// Error
const ErrorMessage = ({ isError }) => (
  <div className="w-full h-screen flex items-center justify-center">
    <p className="text-red-600 text-xl font-semibold">
      Failed to load food details. Please try again.
    </p>
  </div>
);

// Info Item Component
const InfoItem = ({ icon: Icon, text, color = "text-gray-700" }) => (
  <motion.div
    className={`flex items-center gap-2 text-sm ${color}`}
    whileHover={{ scale: 1.05 }}
  >
    <Icon /> {text}
  </motion.div>
);

const MenuDetailsPage = ({ productId }) => {
  const { data, isLoading, isError } = useFoodDetails(productId);
  const [hovered, setHovered] = useState(false);

  if (isLoading) return <Loader isLoading={isLoading} />;
  if (isError || !data?.data || data.success === false) return <ErrorMessage />;

  const food = data.data;

  return (
    <motion.div
      className="min-h-[70vh] bg-gray-50 px-5 py-10 md:px-8 lg:px-16"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <div className=" mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-start">
        {/* LEFT */}
        <div className="space-y-8">
          <motion.h1
            className="text-4xl md:text-5xl text-bg-primary font-extrabold text-primary"
            initial={{ x: -30, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            {food.name}
          </motion.h1>

          <div className="flex items-center gap-3 text-yellow-500 text-xl">
            <FaStar />
            <span>{food.starRating}/5</span>
          </div>

          <div className="space-y-4 flex flex-col justify-start">
            <p className="text-2xl lg:text-xl font-bold capitalizem,">
              Item Description
            </p>
            <motion.p
              className="text-gray-700 text-lg leading-relaxed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }}
            >
              {food.detailsDescription}
            </motion.p>
          </div>

          <div className="grid grid-cols-2 gap-4 pt-4">
            <InfoItem
              icon={MdCategory}
              text={food.category}
              color="text-primary"
            />
            <InfoItem
              icon={GiFire}
              text={`${food.calories} cal`}
              color="text-red-500"
            />
            <InfoItem
              icon={FaClock}
              text={food.preparationTime}
              color="text-indigo-500"
            />
            <InfoItem
              icon={FaMapMarkerAlt}
              text={food.origin}
              color="text-pink-500"
            />
          </div>
        </div>

        {/* MIDDLE */}
        <div className="space-y-6">
          {food.images.map((image, index) => (
            <motion.div
              key={index}
              className="rounded-2xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.05 }}
              transition={{ type: "spring", stiffness: 180 }}
            >
              <img
                src={`http://localhost:8000/images/${image}`}
                alt={`Food ${index}`}
                className="w-full h-72 md:h-80 lg:h-96 object-cover"
              />
            </motion.div>
          ))}
        </div>

        {/* RIGHT */}
        <div className="space-y-6 bg-white rounded-3xl shadow-2xl p-8">
          <div>
            <h4 className="font-semibold text-xl">Ingredients</h4>
            <p className="text-gray-700 mt-2">{food.ingredients.join(", ")}</p>
          </div>

          {food.tags?.length > 0 && (
            <div className="flex flex-wrap gap-3 pt-2">
              {food.tags.map((tag, index) => (
                <motion.span
                  key={index}
                  className="px-3 py-1 bg-green-600 text-white rounded-full text-sm"
                  whileHover={{ scale: 1.05 }}
                >
                  {tag}
                </motion.span>
              ))}
            </div>
          )}

          <div>
            <h4 className="font-semibold text-xl">Price</h4>
            <p className="text-3xl font-bold text-black">৳ {food.price}</p>
          </div>

          <div>
            <h4 className="font-semibold text-xl">Availability</h4>
            <p
              className={`font-semibold mt-1 ${
                food.isAvailable ? "text-green-600" : "text-red-500"
              }`}
            >
              {food.isAvailable ? "Available" : "Not Available"}
            </p>
          </div>

          <motion.button
            // onClick={handleAddToCart}
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
      </div>
    </motion.div>
  );
};

export default MenuDetailsPage;
