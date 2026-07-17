import { ApiError } from "../../helpers/index.js";
import { getCache, setCache } from "../../utils/redis/redis.utils.js";
import User from "../users/user.model.js";

// REGISTER

export const registerUserService = async ({
  userName,
  email,
  password,
  confirmPassword,
  phone,
  firstName,
  lastName,
}) => {
  const [existingEmail, existingUsername] = await Promise.all([
    User.findOne({ email }),
    userName ? User.findOne({ userName }) : null,
  ]);

  // EMAIL EXISTS

  if (existingEmail) {
    throw new ApiError(409, "Email already exists");
  }

  // USERNAME EXISTS

  if (existingUsername) {
    throw new ApiError(409, "Username already taken");
  }

  if (password != confirmPassword) {
    throw new ApiError(401, "Password and Confirm Password do not match");
  }

  // CREATE USER

  const user = await User.create({
    userName,
    email,
    password,
    phone,
    fullName: { firstName, lastName },
  });

  // REMOVE PASSWORD
  return await User.findById(user._id).select("-password");
};

// LOGIN

export const loginUserService = async (email, password) => {
  const normalizedEmail = email?.trim().toLowerCase();

  const user = await User.findOne({ email: normalizedEmail }).select(
    "+password",
  );

  if (!user) {
    throw new ApiError(401, "Invalid email or password");
  }

  // BLOCKED USER

  if (user.isBlocked) {
    throw new ApiError(403, "Your account has been blocked");
  }

  // GOOGLE USER

  if (user.isGoogleUser) {
    throw new ApiError(401, "Please login using Google");
  }

  /* DELETED ACCOUNT */

  if (user.isDeleted) {
    throw new ApiError(403, "This account has been deleted");
  }

  // PASSWORD CHECK

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  // REMOVE PASSWORD

  user.password = undefined;
  return user;
};

// CURRENT USER

export const getCurrentUserService = async (userId) => {
  const cacheKey = `user:${userId}`;

  const cachedUser = await getCache(cacheKey);

  if (cachedUser) {
    console.log("FROM REDIS");
    return cachedUser;
  }

  console.log("FROM MONGODB");

  const user = await User.findById(userId).select("-password -token").lean();

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  await setCache(cacheKey, user, 300); // 5 minutes

  return user;
};
