import asyncHandler from "../utils/handlers/asyncHandler.js";
import ApiResponse from "../utils/errors/ApiResponse.js";
import ApiError from "../utils/errors/ApiError.js";
import {
  fetchAllUsersService,
  fetchAllPropertiesService,
  fetchAllOwnersService,
  getPendingOwnerVerificationsService,
  approveOwnerVerificationService,
  rejectOwnerVerificationService,
  getPendingPropertyVerificationsService,
  approvePropertyVerificationService,
  rejectPropertyVerificationService,
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

// GET PENDING OWNER VERIFICATIONS
export const getPendingOwnerVerifications = asyncHandler(async (req, res) => {
  const users = await getPendingOwnerVerificationsService();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Pending owner verifications fetched successfully",
        users,
      ),
    );
});

// APPROVE OWNER VERIFICATION
export const approveOwnerVerification = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await approveOwnerVerificationService(userId, req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner verification approved successfully", user),
    );
});

// REJECT OWNER VERIFICATION
export const rejectOwnerVerification = asyncHandler(async (req, res) => {
  const { userId } = req.params;
  const { reason } = req.body;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await rejectOwnerVerificationService(
    userId,
    req.user._id,
    reason,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner verification rejected successfully", user),
    );
});

// GET PENDING PROPERTY VERIFICATIONS
export const getPendingPropertyVerifications = asyncHandler(
  async (req, res) => {
    const properties = await getPendingPropertyVerificationsService();

    return res
      .status(200)
      .json(
        new ApiResponse(
          200,
          "Pending property verifications fetched successfully",
          properties,
        ),
      );
  },
);

// APPROVE PROPERTY VERIFICATION
export const approvePropertyVerification = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  if (!propertyId) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await approvePropertyVerificationService(
    propertyId,
    req.user._id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Property verification approved successfully",
        property,
      ),
    );
});

// REJECT PROPERTY VERIFICATION
export const rejectPropertyVerification = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;
  const { reason } = req.body;

  if (!propertyId) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await rejectPropertyVerificationService(
    propertyId,
    req.user._id,
    reason,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Property verification rejected successfully",
        property,
      ),
    );
});
