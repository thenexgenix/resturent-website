import axios from "axios";

const userApi = axios.create({
  baseURL: "http://localhost:8000/api/v1/user",
  withCredentials: true,
});

//register user
export const registerUser = async (userData) => {
  try {
    const response = await userApi.post("/register", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};

//login user
export const LoginUser = async (userData) => {
  try {
    const response = await userApi.post("/login", userData);
    return response.data;
  } catch (error) {
    throw error.response?.data || error;
  }
};
