import React from "react";
import useFoodAndCartStore from "../../../hooks/useFoodAndCartStore";
import FoodItemCard from "./FoodItemCard";

const Menu = () => {
    // Zustand store
    
  const { foodData } = useFoodAndCartStore();

  return (
    <>
      <div className="text-2xl font-bold mb-4">Top Dishes Near You</div>

      <div className="flex flex-wrap gap-6">
        {foodData.length > 0 ? (
          foodData.map((item) => <FoodItemCard key={item._id} item={item} />)
        ) : (
          <p>No dishes found.</p>
        )}
      </div>
    </>
  );
};

export default Menu;
