import Property from "../models/property.model.js";

// CREATE PROPERTY
export const createPropertyService = async (propertyData) => {
    const property = await Property.create(propertyData);

    return await Property.findById(property._id).populate("seller","userName email fullName profileImage");
};

// GET ALL PROPERTIES
export const getAllPropertiesService = async () => {
    return await Property.find().populate("seller","userName email fullName profileImage")
      .sort({createdAt: -1,});
  };

// GET SINGLE PROPERTY
export const getSinglePropertyService =
  async (propertyId) => {return await Property.findById(propertyId)
    .populate("seller","userName email fullName profileImage");
  };

// UPDATE PROPERTY
export const updatePropertyService = async (propertyId,updateData) => {
    return await 
    Property.findByIdAndUpdate(propertyId,updateData,{new: true,runValidators: true,});
  };

// DELETE PROPERTY
export const deletePropertyService = async (propertyId) => {
    return await Property.findByIdAndDelete(propertyId);
  };