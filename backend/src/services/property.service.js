import Property from "../models/property.model.js";
import deleteFromCloudinary from "../utils/cloudinary/deleteFromCloudinary.js";

// CREATE PROPERTY
export const createPropertyService = async (propertyData) => {
  const property = await Property.create(propertyData);

  return await Property.findById(property._id).populate(
    "owner",
    "userName email fullName profileImage",
  );
};

// GET ALL PROPERTIES
export const getAllPropertiesService = async (page = 1, limit = 10) => {
  const skip = (page - 1) * limit;

  const properties = await Property.find(
    { status: "Active" },
    "-propertyProof -identityId",
  )
    .lean()
    .populate("owner", "userName fullName profileImage")
    .skip(skip)
    .limit(limit)
    .sort({ createdAt: -1 });

  const total = await Property.countDocuments({
    status: "Active",
  });

  return {
    properties,
    total,
    page,
    totalPages: Math.ceil(total / limit),
  };
};

// GET SINGLE PROPERTY
export const getSinglePropertyService = async (propertyId) => {
  return await Property.findById(
    propertyId,
    "-propertyProof -identityId",
  ).populate("owner", "userName email fullName profileImage");
};

// GET OWNER PROPERTIES
export const getOwnerPropertiesService = async (ownerId) => {
  return await Property.find({ owner: ownerId })
    .populate("owner", "userName email fullName profileImage")
    .sort({ createdAt: -1 });
};

// UPDATE PROPERTY
export const updatePropertyService = async (propertyId, updateData) => {
  return await Property.findByIdAndUpdate(
    propertyId,
    { $set: updateData },
    { new: true, runValidators: true },
  ).populate("owner", "userName email fullName profileImage");
};

// DELETE PROPERTY
export const deletePropertyService = async (propertyId) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    return null;
  }

  // DELETE PROPERTY IMAGES
  if (property.images?.length) {
    await Promise.all(
      property.images.map((image) => deleteFromCloudinary(image)),
    );
  }

  // DELETE PROPERTY PROOF
  if (property.propertyProof) {
    await deleteFromCloudinary(property.propertyProof);
  }

  // DELETE IDENTITY ID
  if (property.identityId) {
    await deleteFromCloudinary(property.identityId);
  }

  // DELETE PROPERTY FROM DATABASE
  return await Property.findByIdAndDelete(propertyId);
};
