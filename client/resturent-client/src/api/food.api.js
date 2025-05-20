import axios from "axios";

// Create an instance of axiox with  a base URL
const foodApi = axios.create({
  baseURL: "http://localhost:8000/api/v1",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
//all foods items
export const getAllFoods = async () => {
  const response = await foodApi.get("/foods/listitem");
  return response.data.data;
};

// Get food item by ID
export const getFoodById = async (id) => {
  const response = await foodApi.get(`/foods/${id}`);
  return response.data;
};
