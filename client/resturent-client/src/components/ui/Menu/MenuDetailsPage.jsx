import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import useFoodDetails from "../../../hooks/useFoodDetails";

const MenuDetailsPage = ({ productId }) => {
  //tanstack query hook for fetching food details
  const { data, isLoading, error, isError } = useFoodDetails(productId);
  //check if data is loading
  if (isLoading) {
    return (
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
  }
  //check if data is error
  if (isError) {
    return (
      <div className="text-red-600 text-xl font-semibold w-full h-[100vh] text-center ">
        Failed to load Data. Please try again later.
      </div>
    );
  }
  const foodItem = data?.data;

  return (
    <>
      <section className="mx-auto px-10 md:px-0 w-full mt-20 text-black">
        <h2>{foodItem.name}</h2>
        <p>
          <strong>Category:</strong> {foodItem.category}
        </p>
        <p>
          <strong>Price:</strong> ${foodItem.price}
        </p>
        <p>
          <strong>Description:</strong> {foodItem.description}
        </p>
        {/* add more as needed */}
      </section>
    </>
  );
};

export default MenuDetailsPage;
