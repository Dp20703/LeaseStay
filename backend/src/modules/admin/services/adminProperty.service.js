import { ApiError } from "../../../helpers/index.js";
import Property from "../../properties/property.model.js";

const OWNER_POPULATE = "userName fullName profileImage";

/* ─────────────────────────────────────────────
   PROPERTIES
───────────────────────────────────────────── */

// FETCH ALL PROPERTIES
export const fetchAllPropertiesService = async () => {
  return await Property.find().lean().populate("owner", OWNER_POPULATE).sort({
    createdAt: -1,
  });
};

// GET PENDING PROPERTY VERIFICATIONS
export const getPendingPropertyVerificationsService = async () => {
  return await Property.find({
    status: "Pending",
  })
    .populate("owner", OWNER_POPULATE)
    .sort({
      updatedAt: -1,
    });
};

// GET APPROVED PROPERTIES
export const getApprovedPropertiesService = async () => {
  return await Property.find({
    status: "Approved",
  })
    .populate("owner", OWNER_POPULATE)
    .sort({
      updatedAt: -1,
    });
};

// GET REJECTED PROPERTIES
export const getRejectedPropertiesService = async () => {
  return await Property.find({
    status: "Rejected",
  })
    .populate("owner", OWNER_POPULATE)
    .sort({
      updatedAt: -1,
    });
};

// APPROVE PROPERTY
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

  return await property.populate("owner", OWNER_POPULATE);
};

// REJECT PROPERTY
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

  return await property.populate("owner", OWNER_POPULATE);
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

export { OWNER_POPULATE };
