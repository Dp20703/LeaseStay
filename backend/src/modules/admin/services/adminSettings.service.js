import bcrypt from "bcryptjs";
import { ApiError } from "../../../helpers/index.js";
import User from "../../users/user.model.js";

/* ─────────────────────────────────────────────
   SETTINGS
───────────────────────────────────────────── */

// UPDATE ADMIN PROFILE
export const updateAdminProfileService = async (adminId, profileData) => {
  const { fullName, email } = profileData;

  const admin = await User.findById(adminId);

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  if (fullName) {
    admin.fullName = fullName;
  }

  if (email) {
    admin.email = email;
  }

  await admin.save();

  return await User.findById(adminId).select("-password");
};

// UPDATE ADMIN PASSWORD
export const updateAdminPasswordService = async (adminId, passwordData) => {
  const { currentPassword, newPassword } = passwordData;

  const admin = await User.findById(adminId).select("+password");

  if (!admin) {
    throw new ApiError(404, "Admin not found");
  }

  const isPasswordValid = await bcrypt.compare(currentPassword, admin.password);

  if (!isPasswordValid) {
    throw new ApiError(400, "Incorrect current password");
  }

  const salt = await bcrypt.genSalt(10);

  admin.password = await bcrypt.hash(newPassword, salt);

  await admin.save();

  return {
    message: "Password updated successfully",
  };
};

// UPDATE PLATFORM PREFERENCES
export const updatePlatformPreferencesService = async (preferencesData) => {
  // Replace with your Settings model when implemented
  return preferencesData;
};
