import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router";
import { FaSearch, FaCartArrowDown } from "react-icons/fa";
import { RiMenu3Line } from "react-icons/ri";
import MobileMenu from "./MobileMenu";
import { assets } from "../assets/frontend_assets/assets.js";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMenuOpen ? "hidden" : "auto";
  }, [isMenuOpen]);

  const navLinkClass = `transition-colors relative after:absolute after:bottom-0 after:left-0 after:w-full after:h-0.5 after:scale-x-0 hover:after:scale-x-100 after:transition-transform after:origin-left`;

  const navLinkColor = scrolled
    ? "text-navbar-text"
    : "text-white hover:text-navbar-hover";

  const iconColor = scrolled
    ? "text-navbar-text"
    : "text-white hover:text-navbar-hover";

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.5 }}
        className={`fixed top-0 left-0 right-0 z-[100] ${
          scrolled ? "bg-white shadow-md" : "bg-transparent"
        } backdrop-blur-lg transition-all duration-300`}
      >
        <div className="container mx-auto px-4 md:px-0 py-4 flex items-center justify-between">
          <Link to="/" className="flex-shrink-0">
            <h2
              className={`text-4xl font-bold  text-bg-primary
              `}
            >
              QuickBite
            </h2>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center md:gap-6 lg:gap-10 text-medium lg:text-xl">
            {["Home", "About", "Menu", "Contact Us"].map((label, idx) => (
              <Link
                key={idx}
                to={`/${label.replace(/\s/g, "-").toLowerCase()}`}
                className={`relative transition-all duration-300 ease-in-out group ${
                  scrolled ? "text-navbar-text" : "text-white"
                }`}
              >
                {label}
                <span
                  className={`absolute left-0 -bottom-1 h-0.5 bg-bg-primary transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-in-out origin-left`}
                  style={{ width: "100%" }}
                ></span>
              </Link>
            ))}
          </nav>

          {/* Desktop Icons */}
          <div className="hidden md:flex items-center space-x-4">
            <button className={iconColor} aria-label="Search">
              <FaSearch size={20} />
            </button>
            <button className={iconColor} aria-label="Cart">
              <FaCartArrowDown size={20} />
            </button>
            <Link to="/login">
              <button className="border bg-bg-primary hover:bg-[#ff4c24e7] active:scale-95 transition-all ease-linear text-white hover:bg-opacity-90 font-medium py-2 px-4 rounded duration-150">
                Login
              </button>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={toggleMenu}
            className={`${iconColor} md:hidden`}
            aria-label="Toggle menu"
          >
            <RiMenu3Line size={24} />
          </button>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      {isMenuOpen && (
        <div
          className="fixed inset-0 backdrop-blur-2xl bg-black/40 z-40"
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
