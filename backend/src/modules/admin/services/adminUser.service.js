import { ROLES } from "../../../constants/index.js";
import { ApiError } from "../../../helpers/index.js";
import User from "../../users/user.model.js";

/* ─────────────────────────────────────────────
   USERS
───────────────────────────────────────────── */

// FETCH ALL USERS
export const fetchAllUsersService = async () => {
  return await User.find({
    role: ROLES.USER,
  })
    .select("-password")
    .sort({
      createdAt: -1,
    });
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
