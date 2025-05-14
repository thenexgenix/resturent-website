import React, { useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";

const Loader = ({ ispageLoading, setIsPageLoading }) => {
  useEffect(() => {
    const handleLoad = () => {
      setTimeout(() => {
        setIsPageLoading(false);
      }, 1000); // wait 1s before animating out
    };

    window.addEventListener("load", handleLoad);

    return () => window.removeEventListener("load", handleLoad);
  }, [setIsPageLoading]);

  return (
    <AnimatePresence>
      {ispageLoading && (
        <motion.div
          className="fixed inset-0 z-50 flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8 }}
        >
          {/* Left Panel */}
          <motion.div
            className="absolute top-0 left-0 w-1/2 h-full bg-[#DC1D23]"
            initial={{ x: 0 }}
            animate={{ x: ispageLoading ? 0 : "-100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          {/* Right Panel */}
          <motion.div
            className="absolute top-0 right-0 w-1/2 h-full bg-[#DC1D23]"
            initial={{ x: 0 }}
            animate={{ x: ispageLoading ? 0 : "100%" }}
            transition={{ duration: 1, ease: "easeInOut" }}
          />

          <motion.svg
            xmlns="http://www.w3.org/2000/svg"
            width="300"
            height="300"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#FFFFFF"
            strokeWidth="1.5"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="mb-4"
            animate={{ rotate: 360 }}
            transition={{ repeat: Infinity, duration: 2, ease: "linear" }}
          >
            <circle
              cx="12"
              cy="12"
              r="10"
              stroke="#DC1D23"
              strokeWidth="2"
              fill="none"
            />
            <path d="M8 8 L8 16" stroke="#FFFFFF" strokeWidth="2" />
            <path d="M16 8 L16 16" stroke="#FFFFFF" strokeWidth="2" />
            {/* <path d="M8 12 L16 12" stroke="#FFFFFF" strokeWidth="2" /> */}
          </motion.svg>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Loader;
