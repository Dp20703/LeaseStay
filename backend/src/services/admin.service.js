import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import ApiError from "../utils/ApiError.js";
import { ROLES } from "../constants/role.constants.js";

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
    .populate("owner", "userName email fullName profileImage")
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
    .populate("owner", "userName email fullName profileImage")
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

  return property.populate("owner", "userName email fullName profileImage");
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

  return property.populate("owner", "userName email fullName profileImage");
};
