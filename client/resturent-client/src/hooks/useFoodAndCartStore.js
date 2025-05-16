// This store manages the food data, cart items, and selected category for filtering.
// It provides functions to set food data, add/remove items from the cart, clear the cart, and calculate the total price of the cart items.

import { create } from "zustand";

const useFoodAndCartStore = create((set, get) => ({
  // all foods data
  foodData: [],
  setFoodData: (foods) => set({ foodData: foods }),

  // Category state for filtering menu/cart
  selectedCategory: "all",
  setSelectedCategory: (category) => set({ selectedCategory: category }),

  // Filtered foods (for rendering on menu page)
  getFilteredFoods: () => {
    const { foodData, selectedCategory } = get();
    if (selectedCategory === "all") return foodData;
    return foodData.filter(
      (food) => food.category.toLowerCase() === selectedCategory.toLowerCase()
    );
  },

  // cart state
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

  removeFromCart: (itemId) => {
    set({
      cartItems: get().cartItems.filter((cartItem) => cartItem._id !== itemId),
    });
  },

  // clear all cart items
  clearCart: () => set({ cartItems: [] }),

  // Get total price of cart items
  getTotalPrice: () => {
    const { cartItems } = get();
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },
}));

export default useFoodAndCartStore;
