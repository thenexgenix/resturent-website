import React from 'react';
import { motion } from 'motion/react';
import { Link } from 'react-router';
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
        ease: 'easeInOut',
      },
    },
    closed: {
      x: '100%',
      opacity: 0,
      transition: {
        duration: 0.3,
        ease: 'easeInOut',
      },
    },
  };

  return (
    <motion.div
      initial="closed"
      animate={isOpen ? 'open' : 'closed'}
      variants={menuVariants}
      className="fixed top-0 right-0 h-screen w-[75%] md:w-[50%] bg-white shadow-lg py-6 px-8 flex flex-col z-50"
    >
      <div className="flex justify-between items-center mb-8">
        <span className="font-semibold text-xl text-navbar-text">Menu</span>
        <button
          onClick={toggleMenu}
          className="text-navbar-text hover:text-navbar-hover transition-colors"
          aria-label="Close menu"
        >
          <RiCloseLine size={24} weight="bold" />
        </button>
      </div>

      <nav className="flex flex-col space-y-6 mb-8">
        <Link to="/" className="text-navbar-text hover:text-navbar-hover transition-colors text-lg font-medium">
          Home
        </Link>
        <Link to="/about" className="text-navbar-text hover:text-navbar-hover transition-colors text-lg font-medium">
          About
        </Link>
        <Link to="/mobile-app" className="text-navbar-text hover:text-navbar-hover transition-colors text-lg font-medium">
          Mobile App
        </Link>
        <Link to="/contact" className="text-navbar-text hover:text-navbar-hover transition-colors text-lg font-medium">
          Contact Us
        </Link>
      </nav>

      <div className="flex flex-col space-y-4 mt-auto">
        <div className="flex space-x-4">
          <button className="text-navbar-text hover:text-navbar-hover transition-colors" aria-label="Search">
            <FaSearch size={24} weight="bold" />
          </button>
          <button className="text-navbar-text hover:text-navbar-hover transition-colors" aria-label="Cart">
            <FaCartArrowDown size={24} weight="bold" />
          </button>
        </div>
        <Link to="/login" className="w-full">
          <button className="w-full bg-navbar-button hover:bg-opacity-90 text-white font-medium py-2 px-4 rounded transition-colors">
            Login
          </button>
        </Link>
      </div>
    </motion.div>
  );
};

export default MobileMenu;
