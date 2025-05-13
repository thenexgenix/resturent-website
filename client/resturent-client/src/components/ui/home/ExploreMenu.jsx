import React, { useEffect } from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "motion/react"; 
import { useState } from "react";
import { menu_list } from "../../../assets/frontend_assets/assets";

const ExploreMenu = ({  setCategory }) => {
  const handleCategory = (categoryName) => {
    setCategory(categoryName);
  };
  return (
    <>
      <div className="container mx-auto mt-20 px-4">
        <section className=" flex flex-col items-start justify-start  mb-8">
          <motion.div
            className="max-w-3xl mb-8 text-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl lg:text-5xl xl:text-7xl font-bold mb-4">
              Explore Our Menu
            </h1>
            <p className=" text-base md:text-lg xl:text-xl leading-relaxed">
              Discover a variety of delicious dishes and drinks that will
              tantalize your taste buds. From appetizers to desserts, we have
              something for everyone. Our menu is crafted with the freshest
              ingredients to deliver both flavor and quality.
            </p>
          </motion.div>
        </section>

        <section>
          <Carousel
            additionalTransfrom={0}
            autoPlaySpeed={2000}
            centerMode={true}
            className=""
            containerClass="container-with-dots"
            draggable
            infinite
            keyBoardControl
            minimumTouchDrag={80}
            pauseOnHover
            responsive={{
              desktop: {
                breakpoint: { max: 3000, min: 1024 },
                items: 5,
                partialVisibilityGutter: 40,
              },
              mobile: {
                breakpoint: { max: 464, min: 0 },
                items: 1,
                partialVisibilityGutter: 30,
              },
              tablet: {
                breakpoint: { max: 1024, min: 464 },
                items: 2,
                partialVisibilityGutter: 30,
              },
            }}
            showDots={false}
            slidesToSlide={2}
            swipeable
          >
            {menu_list?.map((items, index) => (
              <div
                key={index}
                className="flex flex-col items-center justify-center p-4"
                onClick={() => handleCategory(items.menu_name)}
              >
                <img
                  src={items.menu_image}
                  alt={items.menu_name}
                  className="mb-4 w-40 h-40 rounded-full object-cover"
                />
              </div>
            ))}
          </Carousel>
        </section>
      </div>
    </>
  );
};

export default ExploreMenu;
