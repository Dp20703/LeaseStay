import User from "../models/user.model.js";
import ApiError from "../utils/errors/ApiError.js";
import uploadToCloudinary from "../helpers/cloudinary/uploadToCloudinary.js";
import deleteFromCloudinary from "../utils/cloudinary/deleteFromCloudinary.js";
import { CLOUDINARY_FOLDERS } from "../constants/cloudinary.constants.js";
import { ROLES } from "../constants/role.constants.js";

// UPDATE PROFILE

export const updateProfileService = async ({ userId, body, file }) => {
  const { firstName, lastName, userName, phone } = body;

  // FIND USER

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // USERNAME CHECK

  if (userName && userName !== user.userName) {
    const existingUser = await User.findOne({
      userName,
      _id: { $ne: userId },
    });

    if (existingUser) {
      throw new ApiError(409, "Username already taken");
    }

    user.userName = userName;
  }

  // UPDATE FIELDS

  if (firstName) {
    user.fullName.firstName = firstName;
  }

  if (lastName !== undefined) {
    user.fullName.lastName = lastName;
  }

  if (phone !== undefined) {
    user.phone = phone;
  }

  // PROFILE IMAGE

  if (file) {
    const oldImage = user.profileImage;

    /* UPLOAD NEW IMAGE */

    const { url, publicId } = await uploadToCloudinary(
      file,
      CLOUDINARY_FOLDERS.PROFILE_IMAGES,
    );

    /* SAVE NEW IMAGE */

    user.profileImage = {
      url,
      publicId,
      uploadedAt: new Date(),
    };

    /* DELETE OLD IMAGE */

    if (oldImage?.publicId) {
      try {
        await deleteFromCloudinary(oldImage.publicId);
      } catch (error) {
        console.log("Old image delete failed:", error.message);
      }
    }
  }

  // SAVE USER
  await user.save();

  user.password = undefined;

  return user;
};

// CHANGE PASSWORD

export const changePasswordService = async ({ userId, body }) => {
  const { currentPassword, newPassword } = body;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // GOOGLE USER

  if (user.isGoogleUser) {
    throw new ApiError(400, "Google users cannot change password");
  }

  // VERIFY PASSWORD

  const isPasswordCorrect = await user.comparePassword(currentPassword);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Current password incorrect");
  }

  user.password = newPassword;

  await user.save();
};

// CHANGE EMAIL

export const changeEmailService = async ({ userId, body }) => {
  const { newEmail, password } = body;

  const user = await User.findById(userId).select("+password");

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  // GOOGLE USER

  if (user.isGoogleUser) {
    throw new ApiError(400, "Google users cannot change email");
  }

  // PASSWORD VERIFY

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect) {
    throw new ApiError(401, "Password incorrect");
  }

  // EMAIL EXISTS

  const existingEmail = await User.findOne({ email: newEmail });

  if (existingEmail) {
    throw new ApiError(409, "Email already exists");
  }

  user.email = newEmail;

  user.isVerified = false;

  await user.save();

  return await User.findById(user._id).select("-password");
};

// DELETE PROFIE IMAGE

export const deleteProfileImageService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  /* PROFILE IMAGE EXISTS */

  if (!user.profileImage?.publicId) {
    throw new ApiError(404, "Profile image not found");
  }

  /* DELETE CLOUDINARY IMAGE */

  try {
    await deleteFromCloudinary(user.profileImage.publicId);
  } catch (error) {
    console.log("Profile image delete failed:", error.message);

    throw new ApiError(500, "Failed to delete profile image");
  }

  /* REMOVE IMAGE FROM DB */

  user.profileImage = {
    url: "",
    publicId: "",
    uploadedAt: null,
  };

  await user.save();

  return await User.findById(user._id).select("-password");
};

// DELETE ACCOUNT
export const deleteAccountService = async (userId) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  /* ALREADY DELETED */

  if (user.isDeleted) {
    throw new ApiError(400, "Account already deleted");
  }

  const timestamp = Date.now();

  /* DELETE PROFILE IMAGE */

  if (user.profileImage?.publicId) {
    try {
      await deleteFromCloudinary(user.profileImage.publicId);
    } catch (error) {
      console.log("Profile image delete failed:", error.message);
    }
  }

  /* SOFT DELETE */

  user.isDeleted = true;
  user.deletedAt = new Date();
  user.email = `deleted_${timestamp}_${user.email}`;
  user.userName = `deleted_${timestamp}`;
  user.profileImage = {
    url: "",
    publicId: "",
    uploadedAt: null,
  };
  user.phone = "";
  user.googleId = null;
  user.password = null;

  await user.save();

  return true;
};

// APPLY OWNER

export const applyOwnerService = async ({ userId, file, documentType }) => {
  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  /* ALREADY OWNER */

  if (user.role === ROLES.OWNER) {
    throw new ApiError(400, "You are already an owner");
  }

  /* ALREADY APPLIED */

  if (user.ownerVerificationStatus === "pending") {
    throw new ApiError(400, "Owner verification already pending");
  }

  /* FILE REQUIRED */

  if (!file) {
    throw new ApiError(400, "Verification document is required");
  }

  /* UPLOAD DOCUMENT */

  const { url, publicId } = await uploadToCloudinary(
    file,
    CLOUDINARY_FOLDERS.OWNER_VERIFICATION,
  );

  /* REMOVE OLD DOCS */

  if (user.verificationDocuments?.length) {
    await Promise.all(
      user.verificationDocuments.map((doc) =>
        deleteFromCloudinary(doc.publicId),
      ),
    );
  }

  /* SAVE NEW DOCUMENT */

  user.verificationDocuments = [
    {
      documentType,
      url,
      publicId,
      uploadedAt: new Date(),
    },
  ];

  /* IMPORTANT */

  user.ownerVerificationStatus = "pending";
  user.ownerVerificationRejectedReason = "";

  /* DO NOT CHANGE ROLE YET */
  await user.save();
  user.password = undefined;

  return user;
};
