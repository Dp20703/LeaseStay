import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  changeEmailService,
  changePasswordService,
  deleteAccountService,
  deleteProfileImageService,
  updateProfileService,
  applyOwnerService,
} from "../services/user.service.js";

// UPDATE PROFILE

export const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await updateProfileService({
    userId: req.user._id,
    body: req.body,
    file: req.file,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile updated successfully", updatedUser));
});

// CHANGE PASSWORD

export const changePassword = asyncHandler(async (req, res) => {
  await changePasswordService({
    userId: req.user._id,
    body: req.body,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

// CHANGE EMAIL

export const changeEmail = asyncHandler(async (req, res) => {
  const updatedUser = await changeEmailService({
    userId: req.user._id,
    body: req.body,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Email updated successfully", updatedUser));
});

// DELETE PROFILE IMAGE

export const deleteProfileImage = asyncHandler(async (req, res) => {
  const updatedUser = await deleteProfileImageService(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile image removed", updatedUser));
});

// DELETE ACCOUNT

export const deleteAccount = asyncHandler(async (req, res) => {
  await deleteAccountService(req.user._id);

  res.clearCookie("token");

  return res
    .status(200)
    .json(new ApiResponse(200, "Account deleted successfully"));
});

// APPLY OWNER

export const applyOwner = asyncHandler(async (req, res) => {
  const user = await applyOwnerService({
    userId: req.user._id,
    file: req.file,
    documentType: req.body.documentType,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner application submitted successfully", user),
    );
});
