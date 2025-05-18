import React from "react";
import useFoodAndCartStore from "../../../hooks/useFoodAndCartStore";
import FoodItemCard from "./FoodItemCard";
import useFoods from "../../../hooks/useFoods";
import FoodItemSkeleton from "./FoodItemSkeleton";

const Menu = () => {
  const { isLoading, error } = useFoods();
  // Zustand store
  const { foodData } = useFoodAndCartStore();
  return (
    <>
      <section className="mx-auto">
        <div className="text-2xl font-bold mb-4">Top Dishes Near You</div>

        <div className="flex flex-wrap justify-center items-center md:grid md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-6 w-full">
          {isLoading ? (
            // Show 10 skeleton cards
            [...Array(10)].map((_, index) => <FoodItemSkeleton key={index} />)
          ) : error ? (
            <div className="text-red-600 text-xl font-semibold w-full text-center">
              Failed to load dishes. Please try again later.
            </div>
          ) : foodData.length > 0 ? (
            foodData.map((item) => <FoodItemCard key={item._id} item={item} />)
          ) : (
            <div className="text-4xl text-center lg:text-6xl font-semibold w-full h-[20vh] flex justify-center items-center animate-pulse">
              <p>No dishes found.</p>
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default Menu;
