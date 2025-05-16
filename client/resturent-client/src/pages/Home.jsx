import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ExploreMenu from "./../components/ui/home/ExploreMenu";
import Menu from "../components/ui/home/Menu";

const heroImages = [
  {
    id: 1,
    url: "https://images.unsplash.com/photo-1629390411759-66d56e76705c?q=80&w=2052&auto=format&fit=crop",
    heading: "Order your favourite food here",
    description:
      "Choose from a diverse menu featuring a delectable array of dishes crafted with the finest ingredients and culinary expertise.",
    buttonText: "View Menu",
  },
  {
    id: 2,
    url: "https://images.unsplash.com/photo-1642574551546-c71ccd2e37f6?q=80&w=2070&auto=format&fit=crop",
    heading: "Delicious meals delivered",
    description:
      "Craving something special? Our chefs are ready to serve you fresh and tasty dishes right at your doorstep.",
    buttonText: "Order Now",
  },
  {
    id: 3,
    url: "https://images.unsplash.com/photo-1728287506854-e3de67cbac24?q=80&w=2070&auto=format&fit=crop",
    heading: "Experience fine dining",
    description:
      "Step into a world of gourmet flavors and exquisite presentation in a cozy, welcoming atmosphere.",
    buttonText: "Book a Table",
  },
];

const Home = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto slide
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % heroImages.length);
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  // Slide width
  const slideWidth = 100;

  return (
    <main className="w-full mt-20  md:px-[3%] lg:px-[4%] xl:px-[5%]">
      <section className="relative rounded-2xl overflow-hidden w-full h-[60vh] md:h-[70vh]">
        {/* Slider track */}
        <motion.div
          className="flex w-full h-full "
          animate={{ x: `-${currentIndex * slideWidth}%` }}
          transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
        >
          {heroImages.map((image) => (
            <div
              key={image.id}
              className="flex-shrink-0 w-full h-full bg-cover bg-center relative rounded-2xl "
              style={{ backgroundImage: `url(${image.url})` }}
            >
              {/* Overlay */}
              <motion.div
                key={image.id} // 👈 important!
                className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col items-center justify-center p-4 md:p-12 lg:p-16 text-white"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.6 }}
              >
                <motion.h1
                  className="text-3xl md:text-5xl font-bold mb-4 text-center"
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut" }}
                >
                  {image.heading}
                </motion.h1>

                <motion.p
                  className="text-base md:text-xl mb-6 text-center max-w-2xl"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.3 }}
                >
                  {image.description}
                </motion.p>

                <motion.button
                  className="px-6 py-3 bg-white text-black rounded-full hover:bg-gray-200 transition"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                >
                  {image.buttonText}
                </motion.button>
              </motion.div>
            </div>
          ))}
        </motion.div>

        {/* Dot indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentIndex(index)}
              className={`w-3 h-3 rounded-full ${
                index === currentIndex ? "bg-white" : "bg-white/40"
              }`}
            />
          ))}
        </div>
      </section>

      {/* Explore Menu */}
      <section>
        <ExploreMenu />
      </section>
      {/* Food menu  */}
      <section className="py-8">
        <Menu />
      </section>
    </main>
  );
};

export default Home;
