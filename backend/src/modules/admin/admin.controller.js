import { ROLES } from "../../constants/roles.constants.js";
import { ApiError, ApiResponse, asyncHandler } from "../../helpers/index.js";
import sendToken from "../../utils/auth/sendToken.js";
import { loginUserService } from "../auth/auth.service.js";
import * as AdminService from "./admin.service.js";

// LOGIN
export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);

  if (user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized");
  }
  const token = user.generateAuthToken();

  sendToken(res, token);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Admin logged in successfully", { user, token }),
    );
});

// FETCH ALL USERS
export const fetchAllUsers = asyncHandler(async (req, res) => {
  const users = await AdminService.fetchAllUsersService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

// FETCH ALL OWNERS
export const fetchAllOwners = asyncHandler(async (req, res) => {
  const owners = await AdminService.fetchAllOwnersService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Owners fetched successfully", owners));
});

// FETCH ALL PROPERTIES
export const fetchAllProperties = asyncHandler(async (req, res) => {
  const properties = await AdminService.fetchAllPropertiesService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", properties));
});

// GET PENDING OWNER VERIFICATIONS
export const getPendingOwnerVerifications = asyncHandler(async (req, res) => {
  const users = await AdminService.getPendingOwnerVerificationsService();

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

  const user = await AdminService.approveOwnerVerificationService(
    userId,
    req.user._id,
  );

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

  const user = await AdminService.rejectOwnerVerificationService(
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
    const properties =
      await AdminService.getPendingPropertyVerificationsService();

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

  const property = await AdminService.approvePropertyVerificationService(
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

  const property = await AdminService.rejectPropertyVerificationService(
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
  const properties = await AdminService.getRejectedPropertiesService();

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
  const properties = await AdminService.getApprovedPropertiesService();

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

  const property = await AdminService.hidePropertyService(propertyId);

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

  const property = await AdminService.restorePropertyService(propertyId);

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

  const user = await AdminService.blockUserService(userId);

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

  const user = await AdminService.unblockUserService(userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "User unblocked successfully", user));
});

// ADMIN DASHBOARD STATS
export const getDashboardStats = asyncHandler(async (req, res) => {
  const stats = await AdminService.getDashboardStatsService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Dashboard stats fetched successfully", stats));
});
