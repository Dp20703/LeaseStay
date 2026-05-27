import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadToCloudinary from "../utils/cloudinary/uploadToCloudinary.js";
import generateSlug from "../utils/slug/generateSlug.js";
import {
  createPropertyService,
  getAllPropertiesService,
  getSinglePropertyService,
  updatePropertyService,
  deletePropertyService,
  getOwnerPropertiesService,
} from "../services/property.service.js";
import Property from "../models/property.model.js";
import { CLOUDINARY_FOLDERS } from "../constants/cloudinary.constants.js";
import { ROLES } from "../constants/role.constants.js";

// CREATE PROPERTY
export const createProperty = asyncHandler(async (req, res) => {
  const property = await createPropertyService({
    body: req.body,
    files: req.files,
    ownerId: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Property created successfully", property));
});

// GET ALL PROPERTIES
export const getAllProperties = asyncHandler(async (req, res) => {
  const properties = await getAllPropertiesService(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", properties));
});

// SEARCH PROPERTIES
export const searchProperties = asyncHandler(async (req, res) => {
  const {
    location,
    category,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    page = 1,
    limit = 10,
    search,
  } = req.query;

  const query = {
    status: "Approved",
  };

  // TEXT SEARCH
  if (search) {
    query.$or = [
      {
        title: {
          $regex: search,
          $options: "i",
        },
      },
      {
        description: {
          $regex: search,
          $options: "i",
        },
      },
    ];
  }

  // LOCATION
  if (location) {
    query.location = {
      $regex: location,
      $options: "i",
    };
  }

  // CATEGORY
  if (category) {
    query.category = category;
  }

  // PROPERTY TYPE
  if (propertyType) {
    query.propertyType = propertyType;
  }

  // BEDROOMS
  if (bedrooms) {
    query.bedrooms = Number(bedrooms);
  }

  // BATHROOMS
  if (bathrooms) {
    query.bathrooms = Number(bathrooms);
  }

  // PRICE FILTER
  if (minPrice || maxPrice) {
    query.price = {};

    if (minPrice) {
      query.price.$gte = Number(minPrice);
    }

    if (maxPrice) {
      query.price.$lte = Number(maxPrice);
    }
  }

  const skip = (page - 1) * limit;

  const properties = await Property.find(query)
    .populate("owner", "userName fullName profileImage")
    .skip(skip)
    .limit(Number(limit))
    .sort({ createdAt: -1 })
    .lean();

  const total = await Property.countDocuments(query);

  return res.status(200).json(
    new ApiResponse(200, "Properties fetched successfully", {
      properties,
      total,
      page: Number(page),
      totalPages: Math.ceil(total / limit),
    }),
  );
});

// GET SINGLE PROPERTY
export const getSingleProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const property = await getSinglePropertyService(id);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Property fetched successfully", property));
});

// GET OWNER PROPERTIES
export const getOwnerProperties = asyncHandler(async (req, res) => {
  const properties = await getOwnerPropertiesService(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner properties fetched successfully", properties),
    );
});

// UPDATE PROPERTY
export const updateProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const property = await Property.findById(id);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  // OWNER CHECK
  if (
    property.owner.toString() !== req.user._id.toString() &&
    req.user.role !== "admin"
  ) {
    throw new ApiError(403, "Unauthorized access");
  }

  // UPDATE DATA
  const updateData = {
    title: req.body.title || property.title,
    description: req.body.description || property.description,
    location: req.body.location || property.location,
    address: req.body.address || property.address,
    zipCode: req.body.zipCode || property.zipCode,
    propertyType: req.body.propertyType || property.propertyType,
    category: req.body.category || property.category,
    size: req.body.size ? Number(req.body.size) : property.size,
    price: req.body.price ? Number(req.body.price) : property.price,
    bedrooms: req.body.bedrooms ? Number(req.body.bedrooms) : property.bedrooms,
    bathrooms: req.body.bathrooms
      ? Number(req.body.bathrooms)
      : property.bathrooms,
    amenities: req.body.amenities
      ? JSON.parse(req.body.amenities)
      : property.amenities,
  };

  // UPDATE SLUG IF TITLE CHANGED
  if (req.body.title && req.body.title !== property.title) {
    updateData.slug = generateSlug(req.body.title);
  }

  // IMAGE UPDATE
  const imageFiles = req.files?.images || [];

  if (imageFiles.length) {
    const uploadedImages = await Promise.all(
      imageFiles.map((file) =>
        uploadToCloudinary(file.buffer, CLOUDINARY_FOLDERS.PROPERTY_IMAGES),
      ),
    );

    updateData.images = uploadedImages.map((img) => ({
      url: img.secure_url,
      publicId: img.public_id,
    }));

    // UPDATE THUMBNAIL TO FIRST IMAGE
    if (updateData.images.length > 0) {
      updateData.thumbnail = {
        url: updateData.images[0].url,
        publicId: updateData.images[0].publicId,
      };
    }
  } else {
    updateData.images = property.images;
    updateData.thumbnail = property.thumbnail;
  }

  // PROPERTY DOCUMENTS UPDATE
  const documentFiles = req.files?.propertyDocuments || [];

  if (documentFiles.length) {
    const uploadedDocs = await Promise.all(
      documentFiles.map((file) =>
        uploadToCloudinary(file.buffer, CLOUDINARY_FOLDERS.PROPERTY_DOCUMENTS),
      ),
    );

    updateData.propertyDocuments = uploadedDocs.map((doc) => ({
      type: "rental_agreement",
      url: doc.secure_url,
      publicId: doc.public_id,
    }));
  } else {
    updateData.propertyDocuments = property.propertyDocuments;
  }

  // UPDATE STATUS IF PROVIDED
  if (req.body.status) {
    updateData.status = req.body.status;
  }

  // UPDATE AVAILABILITY STATUS IF PROVIDED
  if (req.body.availabilityStatus) {
    updateData.availabilityStatus = req.body.availabilityStatus;
  }

  // UPDATE PROPERTY
  const updatedProperty = await updatePropertyService(id, updateData);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Property updated successfully", updatedProperty),
    );
});

// DELETE PROPERTY
export const deleteProperty = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const property = await getSinglePropertyService(id);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  // OWNER CHECK
  if (
    property.owner._id.toString() !== req.user._id.toString() &&
    req.user.role !== ROLES.ADMIN
  ) {
    throw new ApiError(403, "Unauthorized access");
  }

  await deletePropertyService(id);

  return res
    .status(200)
    .json(new ApiResponse(200, "Property deleted successfully"));
});
