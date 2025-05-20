import React from 'react';
import { motion } from 'framer-motion';
import { FaHeart, FaStar, FaUtensils } from 'react-icons/fa';

const Story = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.8,
        ease: 'easeOut',
      },
    },
  };

  return (
    <section id="story" className="py-20 md:py-28 bg-white overflow-hidden">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
            className="grid md:grid-cols-2 gap-10 md:gap-16 items-center"
          >
            <motion.div variants={itemVariants}>
              <div className="relative">
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-secondary-100 rounded-full z-0"></div>
                <img
                  src="https://images.pexels.com/photos/2762942/pexels-photo-2762942.jpeg?auto=compress&cs=tinysrgb&w=1200"
                  alt="Chef preparing food"
                  className="rounded-lg shadow-xl relative z-10 w-full h-96 object-cover"
                />
                <div className="absolute -bottom-4 -right-4 w-40 h-40 bg-primary-100 rounded-full z-0"></div>
              </div>
            </motion.div>

            <motion.div variants={itemVariants} className="flex flex-col justify-center">
              <span className="text-bg-primary font-medium mb-2">OUR STORY</span>
              <h2 className="font-serif text-3xl md:text-4xl font-bold text-gray-900 mb-6">
                Passion for Culinary Excellence
              </h2>
              <p className="text-gray-700 mb-6">
                Founded in 2005 by Chef Marco Rossi, Savore was born from a simple yet profound
                philosophy: to create dishes that celebrate the richness of Mediterranean ingredients
                while honoring time-tested culinary traditions.
              </p>
              <p className="text-gray-700 mb-8">
                What began as a small family restaurant quickly earned recognition for its commitment
                to excellence, genuine hospitality, and an atmosphere that makes every meal a memorable
                occasion. Today, we continue our founder's legacy, crafting experiences that delight the
                senses and bring people together.
              </p>

              <div className="grid grid-cols-3 gap-4">
                {[
                  { icon: <FaUtensils className="h-6 w-6 text-primary-700" />, label: 'Quality Ingredients' },
                  { icon: <FaHeart className="h-6 w-6 text-primary-700" />, label: 'Crafted with Love' },
                  { icon: <FaStar className="h-6 w-6 text-primary-700" />, label: 'Culinary Excellence' },
                ].map((item, index) => (
                  <div key={index} className="flex flex-col items-center text-center">
                    <div className="p-3 bg-primary-50 rounded-full mb-2">{item.icon}</div>
                    <span className="text-sm font-medium text-gray-700">{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Story;
