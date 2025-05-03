import UserModel from "../models/user.model.js";

const createUser = async ({ name, email, password }) => {
  try {
    if (!name || !email || !password) {
      throw new Error("All fields are required");
    }
    const hashPassword = await UserModel.hashPassword(password);
    const registerUserData = await UserModel.create({
      name,
      email,
      password: hashPassword,
    });

    return registerUserData;
  } catch (error) {
    throw new error(error.massage);
  }
};

export default createUser;
