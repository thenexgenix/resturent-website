import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import ExploreMenu from "./../components/ui/home/ExploreMenu";
import useFoods from "../hooks/useFoods";

const Home = () => {
  const { foods, setCategory, category, error, filteredFoods, isLoading } =
    useFoods();
    
  const [currentIndex, setCurrentIndex] = useState(0);
  const heroImages = [
    {
      id: 1,
      url: "https://images.unsplash.com/photo-1629390411759-66d56e76705c?q=80&w=2052&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Order your favourite food here",
      description:
        "Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.",
      buttonText: "View Menu",
    },
    {
      id: 2,
      url: "https://images.unsplash.com/photo-1642574551546-c71ccd2e37f6?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Delicious meals delivered",
      description:
        "Craving something special? Our chefs are ready to serve you fresh and tasty dishes right at your doorstep.",
      buttonText: "Order Now",
    },
    {
      id: 3,
      url: "https://images.unsplash.com/photo-1728287506854-e3de67cbac24?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      heading: "Experience fine dining",
      description:
        "Step into a world of gourmet flavors and exquisite presentation in a cozy, welcoming atmosphere.",
      buttonText: "Book a Table",
    },
  ];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, [heroImages.length]);

  return (
    <main className="w-full mt-20 ">
      {/* hero section */}
      <section className="md:container mx-auto md:rounded-3xl relative overflow-hidden w-full h-[40vh] md:h-[70vh]">
        {heroImages.map((image, index) => (
          <div
            key={image.id}
            className="absolute  top-0 left-0 w-full h-full transition-opacity duration-1000"
            style={{
              backgroundImage: `url(${image.url})`,
              backgroundSize: "cover",
              backgroundPosition: "center",
              opacity: index === currentIndex ? 1 : 0,
              backgroundAttachment: "fixed",
            }}
          >
            {index === currentIndex && (
              <AnimatePresence mode="wait">
                <motion.div
                  key={image.id}
                  initial={{ opacity: 0, y: 50, scale: 0.9 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -50, scale: 0.9 }}
                  transition={{ duration: 0.8, ease: "easeInOut" }}
                  className=" z-50 absolute inset-0 flex flex-col items-center justify-center p-4 sm:p-8 md:p-12 lg:p-16 bg-gradient-to-t from-black/60 via-black/10 to-transparent"
                >
                  <motion.h1
                    initial={{ opacity: 0, x: -100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: 100 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="text-white text-center text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-bold mb-4 drop-shadow-lg tracking-wide"
                  >
                    {image.heading}
                  </motion.h1>
                  <motion.p
                    initial={{ opacity: 0, x: 100 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -100 }}
                    transition={{ duration: 0.8, delay: 0.4 }}
                    className="text-white text-center text-sm sm:text-base md:text-lg lg:text-xl mb-6 max-w-lg sm:max-w-xl md:max-w-2xl drop-shadow tracking-wide"
                  >
                    {image.description}
                  </motion.p>
                  <motion.button
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="px-4 py-2 sm:px-5 sm:py-2.5 bg-white text-black font-medium rounded-full shadow hover:bg-gray-200 transition text-sm sm:text-base"
                  >
                    {image.buttonText}
                  </motion.button>
                </motion.div>
              </AnimatePresence>
            )}
          </div>
        ))}
      </section>

      {/* explore item menu */}
      <section>
        <ExploreMenu category={category} setCategory={setCategory} />
      </section>
    </main>
  );
};

export default Home;
