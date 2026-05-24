import Property from "../models/property.model.js";

// CREATE PROPERTY
export const createPropertyService = async (propertyData) => {
  const property = await Property.create(propertyData);

  return await Property.findById(property._id).populate(
    "owner",
    "userName email fullName profileImage",
  );
};

// GET ALL PROPERTIES
export const getAllPropertiesService = async () => {
  return await Property.find()
    .populate("owner", "userName email fullName profileImage")
    .sort({ createdAt: -1 });
};

// GET SINGLE PROPERTY
export const getSinglePropertyService = async (propertyId) => {
  return await Property.findById(propertyId).populate(
    "owner",
    "userName email fullName profileImage",
  );
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
  return await Property.findByIdAndDelete(propertyId);
};
