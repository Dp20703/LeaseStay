import bcrypt from "bcrypt";
import { ROLES } from "../../constants/index.js";
import { ApiError } from "../../helpers/index.js";
import Booking from "../bookings/booking.model.js";
import Payment from "../payments/payment.model.js";
import Property from "../properties/property.model.js";
import User from "../users/user.model.js";

// Populate owner
const OWNER_POPULATE = "userName fullName profileImage";

// FETCH ALL USERS
export const fetchAllUsersService = async () => {
  return await User.find({ role: ROLES.USER })
    .select("-password")
    .sort({ createdAt: -1 });
};

// FETCH ALL OWNERS
export const fetchAllOwnersService = async () => {
  return await User.find({ role: ROLES.OWNER })
    .select("-password")
    .sort({ createdAt: -1 });
};

// FETCH ALL PROPERTIES
export const fetchAllPropertiesService = async () => {
  return await Property.find()
    .lean()
    .populate("owner", OWNER_POPULATE)
    .sort({ createdAt: -1 });
};

// GET PENDING OWNER VERIFICATIONS
export const getPendingOwnerVerificationsService = async () => {
  return await User.find({ ownerVerificationStatus: "pending" })
    .select("-password")
    .sort({ updatedAt: -1 });
};

// APPROVE OWNER VERIFICATION
export const approveOwnerVerificationService = async (userId, adminId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.role = ROLES.OWNER;
  user.ownerVerificationStatus = "approved";
  user.ownerVerifiedAt = new Date();
  user.ownerVerifiedBy = adminId;

  await user.save();
  return user;
};

// REJECT OWNER VERIFICATION
export const rejectOwnerVerificationService = async (
  userId,
  adminId,
  reason,
) => {
  console.log("userid:",userId)
  console.log("adminId:",adminId)
  console.log("reason:",reason)
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (user.role !== ROLES.OWNER) {
    throw new ApiError(400, "User is not an owner");
  }

  user.ownerVerificationStatus = "rejected";
  user.ownerVerificationRejectedReason =
    reason || "Verification rejected by admin";
  user.ownerVerifiedBy = adminId;

  await user.save();
  return user;
};

// GET PENDING PROPERTY VERIFICATIONS
export const getPendingPropertyVerificationsService = async () => {
  return await Property.find({ status: "Pending" })
    .populate("owner", OWNER_POPULATE)
    .sort({ updatedAt: -1 });
};

// APPROVE PROPERTY VERIFICATION
export const approvePropertyVerificationService = async (
  propertyId,
  adminId,
) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  property.status = "Approved";
  property.verifiedAt = new Date();
  property.verifiedBy = adminId;

  await property.save();
  return property.populate("owner", OWNER_POPULATE);
};

// REJECT PROPERTY VERIFICATION
export const rejectPropertyVerificationService = async (
  propertyId,
  adminId,
  reason,
) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  property.status = "Rejected";
  property.verificationRejectedReason =
    reason || "Property verification rejected by admin";
  property.verifiedBy = adminId;

  await property.save();
  return property.populate("owner", OWNER_POPULATE);
};

// GET REJECTED PROPERTIES
export const getRejectedPropertiesService = async () => {
  return await Property.find({ status: "Rejected" })
    .populate("owner", OWNER_POPULATE)
    .sort({ updatedAt: -1 });
};

// GET APPROVED PROPERTIES
export const getApprovedPropertiesService = async () => {
  return await Property.find({ status: "Approved" })
    .populate("owner", OWNER_POPULATE)
    .sort({ updatedAt: -1 });
};

// HIDE PROPERTY
export const hidePropertyService = async (propertyId) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  property.status = "Hidden";
  await property.save();
  return await property.populate("owner", OWNER_POPULATE);
};

// RESTORE PROPERTY
export const restorePropertyService = async (propertyId) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  property.status = "Approved";
  await property.save();
  return await property.populate("owner", OWNER_POPULATE);
};

// BLOCK USER
export const blockUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isBlocked = true;
  await user.save();
  return await User.findById(userId).select("-password");
};

// UNBLOCK USER
export const unblockUserService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  user.isBlocked = false;
  await user.save();
  return await User.findById(userId).select("-password");
};

/* ─────────────────────────────────────────────
   BOOKINGS RELATED SERVICES
───────────────────────────────────────────── */

export const getAllBookingsService = async () => {
  const bookings = await Booking.find()
    .populate("property", "title location images")
    .populate("tenant", "fullName email profileImage")
    .populate("owner", "fullName email profileImage")
    .sort({ createdAt: -1 }); // Newest first

  return bookings;
};

export const updateBookingStatusService = async (bookingId, status) => {
  const validStatuses = [
    "pending",
    "accepted",
    "rejected",
    "cancelled",
    "completed",
  ];
  if (!validStatuses.includes(status)) {
    throw new ApiError(400, "Invalid booking status");
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { status },
    { new: true, runValidators: true },
  );

  if (!updatedBooking) throw new ApiError(404, "Booking not found");
  return updatedBooking;
};

export const updatePaymentStatusService = async (bookingId, paymentStatus) => {
  const validStatuses = ["pending", "paid", "failed", "refunded"];
  if (!validStatuses.includes(paymentStatus)) {
    throw new ApiError(400, "Invalid payment status");
  }

  const updatedBooking = await Booking.findByIdAndUpdate(
    bookingId,
    { paymentStatus },
    { new: true, runValidators: true },
  );

  if (!updatedBooking) throw new ApiError(404, "Booking not found");
  return updatedBooking;
};

/* ─────────────────────────────────────────────
   PAYMENTS RELATED SERVICES
───────────────────────────────────────────── */

// FETCH ALL PAYMENTS
export const fetchAllPaymentsService = async () => {
  return await Payment.find()
    .populate("property", "title location")
    .populate("tenant", "fullName email profileImage")
    .populate("landlord", "fullName email profileImage")
    .populate("booking", "bookingReference")
    .sort({ createdAt: -1 });
};

// GET PAYMENT REVENUE STATS
export const getPaymentStatsService = async () => {
  const stats = await Payment.getStats();

  // Calculate aggregate totals
  let totalRevenue = 0;
  let successfulCount = 0;
  let pendingCount = 0;

  stats.forEach((item) => {
    if (item._id === "paid") {
      totalRevenue += item.totalAmount;
      successfulCount += item.count;
    } else if (item._id === "pending" || item._id === "created") {
      pendingCount += item.count;
    }
  });

  return {
    stats,
    totalRevenue,
    successfulCount,
    pendingCount,
  };
};

/* ─────────────────────────────────────────────
   SETTINGS RELATED SERVICES
───────────────────────────────────────────── */

// UPDATE ADMIN PROFILE
export const updateAdminProfileService = async (adminId, profileData) => {
  const { fullName, email } = profileData;

  const admin = await User.findById(adminId);
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  if (fullName) admin.fullName = fullName;
  if (email) admin.email = email;

  await admin.save();
  return await User.findById(adminId).select("-password");
};

// UPDATE ADMIN PASSWORD
export const updateAdminPasswordService = async (adminId, passwordData) => {
  const { currentPassword, newPassword } = passwordData;

  const admin = await User.findById(adminId);
  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  // Verify current password
  const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);
  if (!isPasswordValid) {
    throw new ApiError(400, "Incorrect current password");
  }

  // Hash new password
  const salt = await bcrypt.genSalt(10);
  admin.password = await bcrypt.hash(newPassword, salt);

  await admin.save();
  return { message: "Password updated successfully" };
};

// UPDATE PLATFORM PREFERENCES (Stored on Admin or global system config model)
export const updatePlatformPreferencesService = async (preferencesData) => {
  // If you save preferences to a System/Settings collection or an Admin document, update it here.
  // For demonstration, we return the payload as confirmation.
  return preferencesData;
};

// ADMIN DASHBOARD STATS
export const getDashboardStatsService = async () => {
  const [
    totalUsers,
    totalOwners,
    totalProperties,
    pendingOwnerVerifications,
    pendingPropertyVerifications,
    approvedProperties,
    rejectedProperties,
    hiddenProperties,
  ] = await Promise.all([
    User.countDocuments({ role: ROLES.USER, isDeleted: false }),
    User.countDocuments({ role: ROLES.OWNER, isDeleted: false }),
    Property.countDocuments({ isDeleted: false }),
    User.countDocuments({ ownerVerificationStatus: "pending" }),
    Property.countDocuments({ status: "Pending" }),
    Property.countDocuments({ status: "Approved" }),
    Property.countDocuments({ status: "Rejected" }),
    Property.countDocuments({ status: "Hidden" }),
  ]);

  return {
    totalUsers,
    totalOwners,
    totalProperties,
    pendingOwnerVerifications,
    pendingPropertyVerifications,
    approvedProperties,
    rejectedProperties,
    hiddenProperties,
  };
};
