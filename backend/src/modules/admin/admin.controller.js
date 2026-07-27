import { ROLES } from "../../constants/roles.constants.js";
import { ApiError, ApiResponse, asyncHandler } from "../../helpers/index.js";
import sendToken from "../../utils/auth/sendToken.js";
import { loginUserService } from "../auth/auth.service.js";
import * as AdminService from "./services/index.js";

/* ─────────────────────────────────────────────
   AUTH
───────────────────────────────────────────── */

export const adminLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await loginUserService(email, password);

  if (user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized");
  }

  const token = user.generateAuthToken();

  sendToken(res, token);

  return res.status(200).json(
    new ApiResponse(200, "Admin logged in successfully", {
      user,
      token,
    }),
  );
});

/* ─────────────────────────────────────────────
   USERS
───────────────────────────────────────────── */

export const fetchAllUsers = asyncHandler(async (_, res) => {
  const users = await AdminService.fetchAllUsersService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Users fetched successfully", users));
});

export const blockUser = asyncHandler(async (req, res) => {
  const user = await AdminService.blockUserService(req.params.userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "User blocked successfully", user));
});

export const unblockUser = asyncHandler(async (req, res) => {
  const user = await AdminService.unblockUserService(req.params.userId);

  return res
    .status(200)
    .json(new ApiResponse(200, "User unblocked successfully", user));
});

/* ─────────────────────────────────────────────
   OWNERS
───────────────────────────────────────────── */

export const fetchAllOwners = asyncHandler(async (_, res) => {
  const owners = await AdminService.fetchAllOwnersService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Owners fetched successfully", owners));
});

export const getPendingOwnerVerifications = asyncHandler(async (_, res) => {
  const owners = await AdminService.getPendingOwnerVerificationsService();

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Pending owner verifications fetched successfully",
        owners,
      ),
    );
});

export const approveOwnerVerification = asyncHandler(async (req, res) => {
  const owner = await AdminService.approveOwnerVerificationService(
    req.params.userId,
    req.user.id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner verification approved successfully", owner),
    );
});

export const rejectOwnerVerification = asyncHandler(async (req, res) => {
  const owner = await AdminService.rejectOwnerVerificationService(
    req.params.userId,
    req.user.id,
    req.body.reason,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner verification rejected successfully", owner),
    );
});

/* ─────────────────────────────────────────────
   PROPERTIES
───────────────────────────────────────────── */

export const fetchAllProperties = asyncHandler(async (_, res) => {
  const properties = await AdminService.fetchAllPropertiesService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", properties));
});

export const getPendingPropertyVerifications = asyncHandler(async (_, res) => {
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
});

export const getApprovedProperties = asyncHandler(async (_, res) => {
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

export const getRejectedProperties = asyncHandler(async (_, res) => {
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

export const approvePropertyVerification = asyncHandler(async (req, res) => {
  const property = await AdminService.approvePropertyVerificationService(
    req.params.propertyId,
    req.user.id,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Property approved successfully", property));
});

export const rejectPropertyVerification = asyncHandler(async (req, res) => {
  const property = await AdminService.rejectPropertyVerificationService(
    req.params.propertyId,
    req.user.id,
    req.body.reason,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Property rejected successfully", property));
});

export const hideProperty = asyncHandler(async (req, res) => {
  const property = await AdminService.hidePropertyService(
    req.params.propertyId,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Property hidden", property));
});

export const restoreProperty = asyncHandler(async (req, res) => {
  const property = await AdminService.restorePropertyService(
    req.params.propertyId,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Property restored", property));
});

/* ─────────────────────────────────────────────
   BOOKINGS
───────────────────────────────────────────── */

export const getAllBookings = asyncHandler(async (_, res) => {
  const bookings = await AdminService.getAllBookingsService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Bookings fetched", bookings));
});

export const updateBookingStatus = asyncHandler(async (req, res) => {
  const booking = await AdminService.updateBookingStatusService(
    req.params.id,
    req.body.status,
  );

  return res.status(200).json(new ApiResponse(200, "Booking updated", booking));
});

export const updatePaymentStatus = asyncHandler(async (req, res) => {
  const booking = await AdminService.updatePaymentStatusService(
    req.params.id,
    req.body.paymentStatus,
  );

  return res.status(200).json(new ApiResponse(200, "Payment updated", booking));
});

/* ─────────────────────────────────────────────
   PAYMENTS
───────────────────────────────────────────── */

export const fetchAllPayments = asyncHandler(async (_, res) => {
  const payments = await AdminService.fetchAllPaymentsService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Payments fetched", payments));
});

export const getPaymentStats = asyncHandler(async (_, res) => {
  const stats = await AdminService.getPaymentStatsService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Payment stats fetched", stats));
});

/* ─────────────────────────────────────────────
   SETTINGS
───────────────────────────────────────────── */

export const updateAdminProfile = asyncHandler(async (req, res) => {
  const admin = await AdminService.updateAdminProfileService(
    req.user.id,
    req.body,
  );

  return res.status(200).json(new ApiResponse(200, "Profile updated", admin));
});

export const updateAdminPassword = asyncHandler(async (req, res) => {
  const result = await AdminService.updateAdminPasswordService(
    req.user.id,
    req.body,
  );

  return res.status(200).json(new ApiResponse(200, "Password updated", result));
});

export const updatePlatformPreferences = asyncHandler(async (req, res) => {
  const preferences = await AdminService.updatePlatformPreferencesService(
    req.body,
  );

  return res
    .status(200)
    .json(new ApiResponse(200, "Preferences updated", preferences));
});

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */

export const getDashboardStats = asyncHandler(async (_, res) => {
  const dashboard = await AdminService.getDashboardStatsService();

  return res
    .status(200)
    .json(new ApiResponse(200, "Dashboard fetched", dashboard));
});
