import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:8000/api/v1/user",
});

//register user
export const registerUser = async (userData) => {
  const response = await userApi.post("/register", userData);
  return response.data;
};
