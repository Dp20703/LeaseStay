import { ROLES } from "../../../constants/index.js";
import { ApiError } from "../../../helpers/index.js";
import User from "../../users/user.model.js";

const OWNER_POPULATE = "userName fullName profileImage";

/* ─────────────────────────────────────────────
   OWNERS
───────────────────────────────────────────── */

// FETCH ALL OWNERS
export const fetchAllOwnersService = async () => {
  return await User.find({
    role: ROLES.OWNER,
  })
    .select("-password")
    .sort({
      createdAt: -1,
    });
};

// GET PENDING OWNER VERIFICATIONS
export const getPendingOwnerVerificationsService = async () => {
  return await User.find({
    ownerVerificationStatus: "pending",
  })
    .select("-password")
    .sort({
      updatedAt: -1,
    });
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

export { OWNER_POPULATE };
