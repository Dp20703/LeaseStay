import { ApiResponse, asyncHandler } from "../../helpers/index.js";
import * as UserService from "./user.service.js";

// UPDATE PROFILE

export const updateProfile = asyncHandler(async (req, res) => {
  const updatedUser = await UserService.updateProfileService({
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
  await UserService.changePasswordService({
    userId: req.user._id,
    body: req.body,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Password changed successfully"));
});

// CHANGE EMAIL

export const changeEmail = asyncHandler(async (req, res) => {
  const updatedUser = await UserService.changeEmailService({
    userId: req.user._id,
    body: req.body,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Email updated successfully", updatedUser));
});

// DELETE PROFILE IMAGE

export const deleteProfileImage = asyncHandler(async (req, res) => {
  const updatedUser = await UserService.deleteProfileImageService(req.user._id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Profile image removed", updatedUser));
});

// GET SAVED PROPERTIES

export const getSavedProperties = asyncHandler(async (req, res) => {
  const savedProperties = await UserService.getSavedPropertiesService(
    req.user._id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Saved properties fetched successfully",
        savedProperties,
      ),
    );
});

// DELETE ACCOUNT

export const deleteAccount = asyncHandler(async (req, res) => {
  await UserService.deleteAccountService(req.user._id);

  res.clearCookie("token");

  return res
    .status(200)
    .json(new ApiResponse(200, "Account deleted successfully"));
});

// APPLY OWNER

export const applyOwner = asyncHandler(async (req, res) => {
  const user = await UserService.applyOwnerService({
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
