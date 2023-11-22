import { User } from "../models/user.model.js";

export const createUser = async (email, userName) => {
  try {
    const existingUser = await User.findOne({ email: email });
    if (existingUser) {
      throw new Error("User already exists");
    }
    const existingUserName = await User.findOne({ userName: userName });
    if (existingUserName) {
      throw new Error("Username already exists");
    }
    const user = await User.create({ email, userName });
    return user;
  } catch (error) {
    console.error("❌ Error inside createUser:", error);
    throw error;
  }
}

export const validateEmail = async (email) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      return false;
    }
    return true;
  } catch (error) {
    console.error("❌ Error inside checkUser:", error);
    throw error;
  }
}

export const loginUser = async (email, issuer) => {
  try {
    const user = await User.findOne({ email: email });
    if (!user) {
      throw new Error("User does not exist");
    }
    user.magic_id = issuer;
    await user.save();

    return user;
  } catch (error) {
    console.error("❌ Error inside loginUser:", error);
    throw error;
  }
}