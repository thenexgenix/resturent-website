import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { Link } from "react-router";
import { FaSearch } from "react-icons/fa";
import { FaCartArrowDown } from "react-icons/fa";
import MobileMenu from "./MobileMenu";
import { assets } from "../assets/frontend_assets/assets.js";
import { RiMenu3Line } from "react-icons/ri";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  useEffect(() => {
    const handleScroll = () => {
      const isScrolled = window.scrollY > 10;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isMenuOpen]);

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] ${
          scrolled ? "shadow-md bg-white" : "bg-white bg-opacity-95"
        } transition-all duration-300`}
      >
        <div className="container mx-auto px-4 md:px-0 py-4 flex items-center justify-between ">
          <Link to="/" className="flex-shrink-0">
            {/* <img src={assets.logo} alt="" /> */}
            <h2 className="text-4xl text-bg-primary font-bold ">QuickBite</h2>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden  md:flex items-center md:gap-6 lg:gap-10 text-medium lg:text-xl ">
            <Link
              to="/"
              className="text-navbar-text hover:text-navbar-hover  transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-navbar-hover after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-navbar-text hover:text-navbar-hover  transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-navbar-hover after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              About
            </Link>
            <Link
              to="/mobile-app"
              className="text-navbar-text hover:text-navbar-hover  transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-navbar-hover after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Mobile App
            </Link>
            <Link
              to="/contact"
              className="text-navbar-text hover:text-navbar-hover  transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:bg-navbar-hover after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left"
            >
              Contact Us
            </Link>
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button
              className="text-navbar-text hover:text-navbar-hover transition-colors"
              aria-label="Search"
            >
              <FaSearch size={20} weight="bold" />
            </button>
            <button
              className="text-navbar-text hover:text-navbar-hover transition-colors"
              aria-label="Cart"
            >
              <FaCartArrowDown size={20} weight="bold" />
            </button>
            <Link to="/login">
              <button className="border bg-bg-primary hover:bg-[#ff4c24e7] active:scale-95 transition-all ease-linear text-white  hover:bg-opacity-90  font-medium py-2 px-4 rounded  duration-150">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className="md:hidden text-navbar-text hover:text-navbar-hover transition-colors"
            aria-label="Toggle menu"
          >
            <RiMenu3Line size={24} weight="bold" />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-1 blur-2xl bg-opacity-50 z-40"
          onClick={toggleMenu}
          aria-hidden="true"
        />
      )}

      {/* Mobile Menu */}
      <MobileMenu isOpen={isMenuOpen} toggleMenu={toggleMenu} />
    </>
  );
};

export default Navbar;
