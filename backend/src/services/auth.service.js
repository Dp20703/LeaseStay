import User from "../models/user.model.js";
import ApiError from "../utils/errors/ApiError.js";

// REGISTER

export const registerUserService = async ({
  userName,
  email,
  password,
  phone,
  role,
  firstName,
  lastName,
  verificationDocuments,
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

  // CREATE USER

  const user = await User.create({
    userName,
    email,
    password,
    phone,
    role,
    verificationDocuments,
    ownerVerificationStatus: role === "owner" ? "pending" : "not_applied",
    fullName: {
      firstName,
      lastName,
    },
  });

  // REMOVE PASSWORD
  return await User.findById(user._id).select("-password");
};

// LOGIN

export const loginUserService = async (email, password) => {
  // FIND USER

  const user = await User.findOne({ email }).select("+password");

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

  // PASSWORD CHECK

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Invalid email or password");
  }

  // REMOVE PASSWORD

  user.password = undefined;
  return user;
};
