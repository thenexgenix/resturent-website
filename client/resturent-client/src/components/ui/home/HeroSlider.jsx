import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import SlideArrowButton from "./../../Button";

// Custom hook for gradual scaling effect
const useGradualScale = (isActive, maxScale = 1.1, speed = 0.0005) => {
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let scaleInterval;
    if (isActive) {
      setScale(1); // reset when active
      scaleInterval = setInterval(() => {
        setScale((prev) => (prev < maxScale ? prev + speed : maxScale));
      }, 16); // approx 60fps
    }
    return () => clearInterval(scaleInterval);
  }, [isActive]);

  return scale;
};

const HeroSlider = ({ images, autoSlide = true, intervalTime = 4000 }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    if (!autoSlide) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % images.length);
    }, intervalTime);
    return () => clearInterval(interval);
  }, [images.length, autoSlide, intervalTime]);

  const slideWidth = 100;

  return (
    <section className="relative rounded-b-2xl overflow-hidden w-full h-[100vh]">
      {/* Slider Track */}
      <motion.div
        className="flex w-full h-full"
        animate={{ x: `-${currentIndex * slideWidth}%` }}
        transition={{ type: "tween", ease: "easeInOut", duration: 0.8 }}
      >
        {images.map((image, index) => {
          const isActive = index === currentIndex;
          const scale = useGradualScale(isActive);

          return (
            <div
              key={image.id}
              className="flex-shrink-0 w-full h-full relative overflow-hidden"
            >
              {/* Background image with gradual scale */}
              <motion.div
                className="absolute inset-0 bg-cover bg-center"
                style={{
                  backgroundImage: `url(${image.url})`,
                  scale,
                }}
              />

              {/* Black opacity overlay */}
              <motion.div
                className="absolute inset-0 bg-black"
                animate={isActive ? { opacity: 0 } : { opacity: 0.4 }}
                transition={{ duration: 1, ease: "easeInOut" }}
              />

              {/* Content Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent flex flex-col items-center justify-center p-4 md:p-12 lg:p-16 text-white text-center">
                {/* Title with red line */}
                <div className="flex items-center mb-4">
                  <svg
                    width="40"
                    height="10"
                    viewBox="0 0 40 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-3 rounded-2xl"
                  >
                    <line
                      x1="0"
                      y1="5"
                      x2="40"
                      y2="5"
                      stroke="#EF4444"
                      strokeWidth="10"
                    />
                  </svg>

                  {isActive && currentIndex === 0 ? (
                    <motion.h1
                      className="text-4xl md:text-6xl italic lg:text-9xl tracking-tight leading-tight"
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                    >
                      {image.heading}
                    </motion.h1>
                  ) : (
                    <h1 className="text-4xl italic md:text-6xl lg:text-9xl tracking-tight leading-tight">
                      {image.heading}
                    </h1>
                  )}
                </div>

                {/* Highlight text */}
                <div className="mb-8 relative inline-block italic">
                  {isActive && currentIndex === 0 ? (
                    <motion.p
                      className="text-lg md:text-2xl mb-2 max-w-2xl leading-relaxed"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: 0.8,
                        ease: "easeOut",
                        delay: 0.3,
                      }}
                    >
                      {image.description}
                    </motion.p>
                  ) : (
                    <p className="text-lg md:text-2xl mb-2 max-w-2xl leading-relaxed">
                      {image.description}
                    </p>
                  )}

                  {/* Curved SVG line */}
                  <svg
                    viewBox="0 0 160 30"
                    xmlns="http://www.w3.org/2000/svg"
                    className="absolute bottom-[-10px] left-1/2 -translate-x-1/2"
                  >
                    <path
                      d="M5 20 Q 80 0, 155 20"
                      stroke="#EF4444"
                      strokeWidth="3"
                      fill="transparent"
                      strokeLinecap="round"
                    />
                  </svg>
                </div>

                {/* Button */}
                {isActive && currentIndex === 0 ? (
                  <motion.button
                    
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                  >
                    <SlideArrowButton text={image.buttonText}/>
                  </motion.button>
                ) : (
                  <button >
                    <SlideArrowButton text={image.buttonText}/>
                  </button>
                )}
              </div>
            </div>
          );
        })}
      </motion.div>

      {/* Dots - left center */}
      <div className="absolute top-1/2 left-4 -translate-y-1/2 flex flex-col space-y-3 z-10">
        {images.map((_, index) => (
          <motion.button
            key={index}
            onClick={() => setCurrentIndex(index)}
            initial={false}
            animate={{
              backgroundColor:
                index === currentIndex ? "#EF4444" : "rgba(255,255,255,0.4)",
              height: index === currentIndex ? "40px" : "20px",
            }}
            transition={{
              duration: 0.5,
              ease: "easeInOut",
            }}
            className="w-1 rounded-full"
          />
        ))}
      </div>
    </section>
  );
};

export default HeroSlider;
