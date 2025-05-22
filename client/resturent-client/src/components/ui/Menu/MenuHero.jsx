import React from "react";
import { motion } from "motion/react";
import { FaUtensils } from "react-icons/fa";
import SlideArrowButton from "../../Button";
import MenuHeroImage from "../../../assets/frontend_assets/menu-page-hero-image.png";

const MenuHero = () => {
  return (
    <div className="relative h-[80vh] w-full text-white overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="https://images.unsplash.com/photo-1496412705862-e0088f16f791?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          alt="Delicious Food"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-[#000000ae] bg-opacity-60 mix-blend-multiply"></div>
      </div>

      {/* Content */}
      <motion.div
        className="relative z-10 h-full w-full px-6 md:px-24 flex flex-col md:flex-row justify-center items-center"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1 }}
      >
        {/* Left - Text Section */}
        <div className="w-full md:w-1/2 space-y-6 text-left">
          <div className="flex items-center space-x-4">
            <div className="p-2 bg-[#F90806] rounded-full text-4xl">
              <FaUtensils className="text-white drop-shadow-lg" />
            </div>
            <h1 className="text-4xl italic md:text-6xl font-extrabold tracking-tight leading-tight drop-shadow-xl">
              Taste the Difference
            </h1>
          </div>
          <p className="text-lg italic md:text-xl text-gray-200 max-w-2xl leading-relaxed drop-shadow-lg">
            Explore an exquisite variety of gourmet meals crafted for your
            unique taste. From traditional favorites to bold new flavors —
            there’s something delicious waiting for everyone.
          </p>
          {/* Correct SlideArrowButton usage */}
          <button>
            <SlideArrowButton text={"Explore Our Menu"} />
          </button>
        </div>

        {/* Right - Rotating Image (Hidden on Mobile) */}
        <motion.div
          className="hidden md:flex w-full md:w-1/2 justify-center items-center mt-10 md:mt-0"
          animate={{ rotate: 360 }}
          transition={{ repeat: Infinity, duration: 20, ease: "linear" }}
        >
          <img
            src={MenuHeroImage}
            alt="Menu Showcase"
            className="w-60 md:w-80 lg:w-96 xl:w-8/12 object-contain"
          />
        </motion.div>
      </motion.div>
    </div>
  );
};

export default MenuHero;
