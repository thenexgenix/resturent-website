import React from 'react';
import { motion } from 'motion/react';

const MenuHeader = () => {
  return (
    <motion.div 
      className="text-center mb-8"
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <motion.h1 
        className="text-4xl md:text-5xl font-bold mb-2 text-bg-primary"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        Our Menu
      </motion.h1>
      <motion.p 
        className="text-gray-600 max-w-2xl mx-auto px-4"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Discover our carefully crafted selection of dishes, bringing together the finest flavors from 
        Bengali, Mexican, and Indian cuisines. Each dish is prepared with fresh, locally-sourced ingredients 
        and authentic recipes handed down through generations.
      </motion.p>
    </motion.div>
  );
};

export default MenuHeader;