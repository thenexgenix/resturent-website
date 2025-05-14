import React from "react";
import { create } from "zustand";

const useFoodAndCartStore = create((set, get) => {
  return {
    //all foods data
    foodData: [],
    setFoodData: (foods) => set({ foodData: foods }),
    // Category state for filtering menu / cart
    selectedCategory: "all",
    setSelectedCategory: (category) => set({ selectedCategory: category }),

    // Filtered foods (for rendering on menu page)
    getFilteredFoods: () => {
      const { foods, selectedCategory } = get();
      if (selectedCategory === "all") return foods;
      return foods.filter((food) => food.category === selectedCategory);
    },

    //cart state
    cartItems: [],
    addToCart: (item) => {
      const existingItem = get().cartItems.find(
        (cartItem) => cartItem._id === item._id
      );

      if (existingItem) {
        set({
          cartItems: get().cartItems.map((cartItem) =>
            cartItem._id === item._id
              ? { ...cartItem, quantity: cartItem.quantity + 1 }
              : cartItem
          ),
        });
      } else {
        set({
          cartItems: [...get().cartItems, { ...item, quantity: 1 }],
        });
      }
    },
  };
});

export default useFoodAndCartStore;
