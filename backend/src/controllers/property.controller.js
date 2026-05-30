import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  addPropertyImagesService,
  changePropertyAvailabilityService,
  contactPropertyOwnerService,
  createPropertyService,
  deletePropertyDocumentService,
  deletePropertyImageService,
  deletePropertyService,
  getAllPropertiesService,
  getFeaturedPropertiesService,
  getOwnerPropertiesService,
  getRecommendedPropertiesService,
  getRelatedPropertiesService,
  getSinglePropertyService,
  savePropertyService,
  setPropertyThumbnailService,
  unsavePropertyService,
  updatePropertyService,
} from "../services/property.service.js";
import { Result } from "express-validator";

// Create a new property listing.
export const createProperty = asyncHandler(async (req, res) => {
  console.log("Create property req.body", req.body);
  console.log("Create property req.files", req?.files);
  const property = await createPropertyService({
    body: req.body,
    files: req.files,
    ownerId: req.user._id,
  });

  return res
    .status(201)
    .json(new ApiResponse(201, "Property created successfully", property));
});

// Fetch all approved properties with filtering and pagination.
export const getAllProperties = asyncHandler(async (req, res) => {
  const result = await getAllPropertiesService(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", result));
});

// Fetch a single property by slug.
export const getSingleProperty = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const property = await getSinglePropertyService(slug);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Property fetched successfully", property));
});

// Fetch all properties owned by the authenticated user.
export const getOwnerProperties = asyncHandler(async (req, res) => {
  const properties = await getOwnerPropertiesService(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner properties fetched successfully", properties),
    );
});

// Update an existing property listing.
export const updateProperty = asyncHandler(async (req, res) => {
  const property = await updatePropertyService({
    propertyId: req.params.id,
    body: req.body,
    files: req.files,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property updated successfully", property));
});

// Change a property's availability status.
export const changeAvailabilityStatus = asyncHandler(async (req, res) => {
  const property = await changePropertyAvailabilityService({
    propertyId: req.params.id,
    availabilityStatus: req.body.availabilityStatus,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property availability updated", property));
});

// Add images to an existing property.
export const addPropertyImages = asyncHandler(async (req, res) => {
  const property = await addPropertyImagesService({
    propertyId: req.params.id,
    files: req.files,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property images added successfully", property));
});

// Delete a property image.
export const deletePropertyImage = asyncHandler(async (req, res) => {
  const property = await deletePropertyImageService({
    propertyId: req.params.id,
    imageId: req.params.imageId,
    user: req.user,
  });

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Property image deleted successfully", property),
    );
});

// Save a property for the authenticated user.
export const saveProperty = asyncHandler(async (req, res) => {
  const result = await savePropertyService({
    propertyId: req.params.id,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property saved successfully", result));
});

// Remove a saved property for the authenticated user.
export const unsaveProperty = asyncHandler(async (req, res) => {
  const result = await unsavePropertyService({
    propertyId: req.params.id,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property removed from wishlist", result));
});

// Set a property image as the thumbnail.
export const setPropertyThumbnail = asyncHandler(async (req, res) => {
  const property = await setPropertyThumbnailService({
    propertyId: req.params.id,
    imageId: req.params.imageId,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property thumbnail updated", property));
});

// Delete a property document.
export const deletePropertyDocument = asyncHandler(async (req, res) => {
  const property = await deletePropertyDocumentService({
    propertyId: req.params.id,
    documentId: req.params.documentId,
    user: req.user,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property document deleted", property));
});

// Fetch related properties.
export const getRelatedProperties = asyncHandler(async (req, res) => {
  const properties = await getRelatedPropertiesService({
    propertyId: req.params.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Related properties fetched", properties));
});

// Contact the property owner.
export const contactPropertyOwner = asyncHandler(async (req, res) => {
  const result = await contactPropertyOwnerService({
    propertyId: req.params.id,
    userId: req.user._id,
    message: req.body.message,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Owner contacted successfully", result));
});

// Fetch featured properties.
export const getFeaturedProperties = asyncHandler(async (req, res) => {
  console.log("req.query", req.query);
  const properties = await getFeaturedPropertiesService(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Featured properties fetched successfully",
        properties,
      ),
    );
});

// Fetch recommended properties.
export const getRecommendedProperties = asyncHandler(async (req, res) => {
  const properties = await getRecommendedPropertiesService(req.query);

  return res
    .status(200)
    .json(
      new ApiResponse(
        200,
        "Recommended properties fetched successfully",
        properties,
      ),
    );
});

// Delete a property listing.
export const deleteProperty = asyncHandler(async (req, res) => {
  const property = await deletePropertyService({
    propertyId: req.params.id,
    user: req.user,
  });

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Property deleted successfully"));
});
