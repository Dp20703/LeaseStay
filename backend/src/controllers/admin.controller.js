import asyncHandler from "../utils/handlers/asyncHandler.js";
import ApiResponse from "../utils/errors/ApiResponse.js";
import {
  fetchAllUsersService,
  fetchAllPropertiesService,
  fetchAllOwnersService,
} from "../services/admin.service.js";

// FETCH ALL USERS
export const fetchAllUsers = asyncHandler(async (req, res) => {
  const users = await fetchAllUsersService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

// FETCH ALL OWNERS
export const fetchAllOwners = asyncHandler(async (req, res) => {
  const owners = await fetchAllOwnersService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Owners fetched successfully", owners));
});

// FETCH ALL PROPERTIES
export const fetchAllProperties = asyncHandler(async (req, res) => {
  const properties = await fetchAllPropertiesService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", properties));
});
