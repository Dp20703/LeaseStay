import { CLOUDINARY_FOLDERS } from "../constants/cloudinary.constants.js";
import Property from "../models/property.model.js";
import deleteFromCloudinary from "../utils/cloudinary/deleteFromCloudinary.js";
import QueryBuilder from "../utils/queryBuilder.js";
import generateSlug from "../helpers/slug/generateSlug.js";

// CREATE PROPERTY

export const createPropertyService = async ({ body, files, ownerId }) => {
  const images = [];

  let thumbnail = {};

  // UPLOAD IMAGES

  if (files?.images?.length) {
    for (const file of files.images) {
      const uploadedImage = await uploadToCloudinary(
        file,
        CLOUDINARY_FOLDERS.PROPERTY_IMAGES,
      );

      images.push(uploadedImage);
    }

    thumbnail = images[0];
  }

  // PROPERTY DOCUMENTS

  const propertyDocuments = [];

  if (files?.propertyDocuments?.length) {
    for (const file of files.propertyDocuments) {
      const uploadedDocument = await uploadToCloudinary(
        file,
        CLOUDINARY_FOLDERS.PROPERTY_DOCUMENTS,
      );

      propertyDocuments.push({
        type: body.documentType,
        url: uploadedDocument.url,
        publicId: uploadedDocument.publicId,
      });
    }
  }

  // CREATE PROPERTY

  const property = await Property.create({
    ...body,
    slug: generateSlug(body.title),
    images,
    thumbnail,
    propertyDocuments,
    owner: ownerId,
  });

  return property;
};

// GET ALL PROPERTIES
export const getAllPropertiesService = async (queryString) => {
  const resultPerPage = 10;

  const queryBuilder = new QueryBuilder(
    Property.find({ status: "Approved" }),
    queryString,
  )
    .search()
    .filter()
    .sort()
    .paginate(resultPerPage);

  const properties = await queryBuilder.query;

  return properties;
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
