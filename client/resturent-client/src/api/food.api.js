import axios from "axios";

// Create an instance of axiox with  a base URL
const foodApi = axios.create({
  baseURL: "http://localhost:8000/api/v1/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
});
//all foods items
export const getAllFoods = async () => {
  const {data} = await foodApi.get("/listitem");
  return data;
};
