import React from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { RiCloseLine } from "react-icons/ri";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";

const MobileMenu = ({ isOpen, toggleMenu }) => {
  const menuVariants = {
    open: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
    closed: {
      x: "100%",
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: "easeInOut",
      },
    },
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? "open" : "closed"}
      variants={menuVariants}
      className=" md:hidden fixed  top-0 right-0 h-screen w-[60vw]  bg-white shadow-lg py-6 px-8 flex flex-col z-[800]"
    >
      <div className="flex justify-end items-center mb-8">
        <button
          onClick={toggleMenu}
          className="text-navbar-text hover:text-navbar-hover transition-colors hover:bg-gray-200 rounded-4xl p-2"
          aria-label="Close menu"
        >
          <RiCloseLine size={24} weight="bold" />
        </button>
      </div>

      <nav className="flex flex-col space-y-6 mb-8">
        {[
          { MenuName: "Home", path: "/", id: 1 },
          { MenuName: "About", path: "/about", id: 2 },
          { MenuName: "Menu", path: "/menu", id: 3 },
          { MenuName: "Contact Us", path: "/contact", id: 4 },
        ].map((label) => (
          <Link
            key={label.id}
            to={`${label?.path.replace(/\s/g, "-").toLowerCase()}`}
            className={`relative transition-all duration-300 ease-in-out group `}
          >
            {label?.MenuName}
            <span
              className={`absolute left-0 -bottom-1 h-0.5 bg-bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left`}
              style={{ width: "100%" }}
            ></span>
          </Link>
        ))}

        <Link to="/login">
          <button className="border bg-[#FF4C24] hover:bg-[#ff4c24e7] active:scale-95 transition-all ease-linear text-white  hover:bg-opacity-90  font-medium py-2 px-4 rounded  duration-150">
            Login
          </button>
        </Link>
      </nav>

      <div className="flex flex-col space-y-4 mt-auto">
        <div className="flex space-x-4">
          <button
            className="text-navbar-text hover:text-navbar-hover transition-colors"
            aria-label="Search"
          >
            <FaSearch size={24} weight="bold" />
          </button>
          <button
            className="text-navbar-text hover:text-navbar-hover transition-colors"
            aria-label="Cart"
          >
            <FaCartArrowDown size={24} weight="bold" />
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
