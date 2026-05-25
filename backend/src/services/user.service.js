import User from "../models/user.model.js";
import ApiError from "../utils/errors/ApiError.js";
import uploadToCloudinary from "../utils/cloudinary/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/cloudinary/deleteFromCloudinary.js";
import { CLOUDINARY_FOLDERS } from "../constants/cloudinary.constants.js";

// UPDATE PROFILE

export const updateProfileService = async ({ userId, body, file }) => {
  const { firstName, lastName, userName, phone } = body;

  // FIND USER

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // USERNAME CHECK

  if (userName && userName !== user.userName) {
    const existingUser = await User.findOne({
      userName,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new ApiError(409, "Username already taken");
    }

    user.userName = userName;
  }

  // UPDATE FIELDS

  if (firstName) {
    user.fullName.firstName = firstName;
  }

  if (lastName !== undefined) {
    user.fullName.lastName = lastName;
  }

  if (phone !== undefined) {
    user.phone = phone;
  }

  // PROFILE IMAGE
  if (file) {
    const oldImage = user.profileImage;

    // UPLOAD NEW IMAGE
    const uploadedImage = await uploadToCloudinary(
      file.buffer,
      CLOUDINARY_FOLDERS.PROFILE_IMAGES,
    );

    user.profileImage = uploadedImage.secure_url;

    // DELETE OLD IMAGE
    await deleteFromCloudinary(oldImage);
  }

  // SAVE USER
  await user.save();

  user.password = undefined;

  return user;
};

// CHANGE PASSWORD

export const changePasswordService = async ({ userId, body }) => {
  const { currentPassword, newPassword } = body;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // GOOGLE USER

  if (user.isGoogleUser) {
    throw new ApiError(400, "Google users cannot change password");
  }

  // VERIFY PASSWORD

  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Current password incorrect");
  }

  user.password = newPassword;

  await user.save();
};

// CHANGE EMAIL

export const changeEmailService = async ({ userId, body }) => {
  const { newEmail, password } = body;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // GOOGLE USER

  if (user.isGoogleUser) {
    throw new ApiError(400, "Google users cannot change email");
  }

  // PASSWORD VERIFY

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Password incorrect");
  }

  // EMAIL EXISTS

  const existingEmail = await User.findOne({ email: newEmail });

  if (existingEmail) {
    throw new ApiError(409, "Email already exists");
  }

  user.email = newEmail;

  user.isVerified = false;

  await user.save();

  return await User.findById(user._id).select("-password");
};

// DELETE PROFIE IMAGE

export const deleteProfileImageService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // DELETE CLOUDINARY IMAGE
  if (!user.profileImage) {
    throw new ApiError(404, "Profile image not found");
  }

  try {
    await deleteFromCloudinary(user.profileImage);
  } catch (error) {
    console.log("Profile image delete failed:", error.message);

    throw new ApiError(500, "Failed to delete profile image");
  }

  user.profileImage = "";

  await user.save();

  return await User.findById(user._id).select("-password");
};

// DELETE ACCOUNT

export const deleteAccountService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // ALREADY DELETED

  if (user.isDeleted) {
    throw new ApiError(400, "Account already deleted");
  }

  // STORE TIMESTAMP

  const timestamp = Date.now();

  // DELETE PROFILE IMAGE

  if (user.profileImage) {
    try {
      await deleteFromCloudinary(user.profileImage);
    } catch (error) {
      console.log("Profile image delete failed:", error.message);
    }
  }

  // SOFT DELETE

  user.isDeleted = true;

  user.deletedAt = new Date();

  user.email = `deleted_${timestamp}_${user.email}`;

  user.userName = `deleted_${timestamp}`;

  user.profileImage = "";

  user.phone = "";

  user.googleId = null;

  user.password = null;

  await user.save();

  return true;
};
