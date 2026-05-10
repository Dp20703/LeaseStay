import User from "../models/user.model.js";
import ApiError from "../utils/ApiError.js";

// ==========================
// REGISTER SERVICE
// ==========================

export const registerUserService = async ({
  userName,
  email,
  password,
  phone,
  role,
  firstName,
  lastName,
}) => {
  const [existingEmail, existingUsername] =
    await Promise.all([
      User.findOne({ email }),
      User.findOne({ userName }),
    ]);

  if (existingEmail) {
    throw new ApiError(409, "Email already exists");
  }

  if (existingUsername) {
    throw new ApiError(409, "Username already taken");
  }

  const user = await User.create({
    userName,
    email,
    password,
    phone,
    role,

    fullName: {
      firstName,
      lastName,
    },
  });
console.log("new user:",user)
  return await User.findById(user._id).select(
    "-password"
  );
};

// ==========================
// LOGIN SERVICE
// ==========================

export const loginUserService = async (
  email,
  password
) => {
  const user = await User.findOne({ email }).select(
    "+password"
  );

  if (!user) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  if (user.isGoogleUser) {
    throw new ApiError(
      401,
      "Please login using Google"
    );
  }

  const isPasswordCorrect =
    await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(
      401,
      "Invalid email or password"
    );
  }

  user.password = undefined;

  return user;
};