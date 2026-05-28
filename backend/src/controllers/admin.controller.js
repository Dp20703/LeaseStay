import asyncHandler from "../utils/asyncHandler.js";
import ApiResponse from "../utils/ApiResponse.js";
import ApiError from "../utils/ApiError.js";
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
  getRejectedPropertiesService,
  getApprovedPropertiesService,
  hidePropertyService,
  restorePropertyService,
  blockUserService,
  unblockUserService,
  getDashboardStatsService,
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

// GET REJECTED PROPERTIES
export const getRejectedProperties = asyncHandler(async (req, res) => {
  const properties = await getRejectedPropertiesService();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Rejected properties fetched successfully",
        properties,
      ),
    );
});

// GET APPROVED PROPERTIES
export const getApprovedProperties = asyncHandler(async (req, res) => {
  const properties = await getApprovedPropertiesService();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Approved properties fetched successfully",
        properties,
      ),
    );
});

// HIDE PROPERTY
export const hideProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  if (!propertyId) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await hidePropertyService(propertyId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Property hidden successfully", property));
});

// RESTORE PROPERTY
export const restoreProperty = asyncHandler(async (req, res) => {
  const { propertyId } = req.params;

  if (!propertyId) {
    throw new ApiError(400, "Property ID is required");
  }

  const property = await restorePropertyService(propertyId);

  return res
    .status(200)
    .json(new ApiResponse(200, "Property restored successfully", property));
});

// BLOCK USER
export const blockUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await blockUserService(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "User blocked successfully", user));
});

// UNBLOCK USER
export const unblockUser = asyncHandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const user = await unblockUserService(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "User unblocked successfully", user));
});

// ADMIN DASHBOARD STATS
export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await getDashboardStatsService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Dashboard stats fetched successfully", stats));
});
