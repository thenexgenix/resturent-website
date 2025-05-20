import React from "react";
import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";
import { motion } from "motion/react";
import { menu_list } from "../../../assets/frontend_assets/assets";
import useFoodAndCartStore from "../../../hooks/useFoodAndCartStore";
import useFoods from "../../../hooks/useFoods";
import { useEffect } from "react";

const ExploreMenu = () => {
  // tanstack query data
  // This hook fetches the food data from the server and manages loading and error states.
  const { data } = useFoods();
  // Zustand store
  // This store manages the food data, cart items, and selected category for filtering.
  const { selectedCategory, setSelectedCategory, setFoodData } =
    useFoodAndCartStore();
  const handleCategory = (categoryName) => {
    if (selectedCategory === categoryName) {
      setSelectedCategory("all");
    } else {
      setSelectedCategory(categoryName);
    }
  };
  // when data comes, push it into Zustand
  useEffect(() => {
    if (data) {
      setFoodData(data);
    } else {
      setFoodData([]);
    }
  }, [data, setFoodData]);
  return (
    <>
      <div className=" mx-auto mt-20 px-4">
        <section className=" italic flex flex-col items-start justify-start  mb-8">
          <motion.div
            className="max-w-3xl mb-8 text-start"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            viewport={{ once: true }}
          >
            <h1 className="text-4xl  lg:text-5xl xl:text-7xl font-bold mb-4">
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
                items: 6,
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
              superLargeDesktop: {
                breakpoint: { max: 4000, min: 3000 },
                items: 8,
                partialVisibilityGutter: 40,
              },
            }}
            showDots={false}
            slidesToSlide={2}
            swipeable
          >
            {menu_list?.map((items, index) => (
              <div
                key={index}
                className={`flex flex-col items-center justify-center p-4 `}
                onClick={() => handleCategory(items.menu_name)}
              >
                <motion.img
                  src={items.menu_image}
                  alt={items.menu_name}
                  whileHover={{
                    boxShadow: "0px 4px 15px rgba(0,0,0,0.2)",
                  }}
                  transition={{ type: "spring", stiffness: 300 }}
                  className={` overflow-hidden mb-4 w-40 h-40 rounded-full object-cover cursor-pointer ${
                    selectedCategory === items.menu_name
                      ? "border-4 border-bg-primary"
                      : ""
                  }`}
                />
                <p className="font-semibold">{items.menu_name}</p>
              </div>
            ))}
          </Carousel>
        </section>
      </div>
    </>
  );
};

export default ExploreMenu;
