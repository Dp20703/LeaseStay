import * as PropertyService from "./property.service.js";
import { asyncHandler, ApiError, ApiResponse } from "../../helpers/index.js";

// Create a new property listing.
export const createProperty = asyncHandler(async (req, res) => {
  console.log("Create property req.body", req.body);
  console.log("Create property req.files", req?.files);
  const property = await PropertyService.createPropertyService({
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
  const result = await PropertyService.getAllPropertiesService(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", result));
});

// Fetch a single property by slug.
export const getSingleProperty = asyncHandler(async (req, res) => {
  const { slug } = req.params;

  const property = await PropertyService.getSinglePropertyService(slug);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  return res
    .status(200)
    .json(new ApiResponse(200, "Property fetched successfully", property));
});

// Fetch all properties owned by the authenticated user.
export const getOwnerProperties = asyncHandler(async (req, res) => {
  const properties = await PropertyService.getOwnerPropertiesService(
    req.user._id,
  );

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner properties fetched successfully", properties),
    );
});

// Update an existing property listing.
export const updateProperty = asyncHandler(async (req, res) => {
  const property = await PropertyService.updatePropertyService({
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
  const property = await PropertyService.changePropertyAvailabilityService({
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
  const property = await PropertyService.addPropertyImagesService({
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
  const property = await PropertyService.deletePropertyImageService({
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
  const result = await PropertyService.savePropertyService({
    propertyId: req.params.id,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property saved successfully", result));
});

// Remove a saved property for the authenticated user.
export const unsaveProperty = asyncHandler(async (req, res) => {
  const result = await PropertyService.unsavePropertyService({
    propertyId: req.params.id,
    userId: req.user._id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Property removed from wishlist", result));
});

// Set a property image as the thumbnail.
export const setPropertyThumbnail = asyncHandler(async (req, res) => {
  const property = await PropertyService.setPropertyThumbnailService({
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
  const property = await PropertyService.deletePropertyDocumentService({
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
  const properties = await PropertyService.getRelatedPropertiesService({
    propertyId: req.params.id,
  });

  return res
    .status(200)
    .json(new ApiResponse(200, "Related properties fetched", properties));
});

// Contact the property owner.
export const contactPropertyOwner = asyncHandler(async (req, res) => {
  const result = await PropertyService.contactPropertyOwnerService({
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
  const properties = await PropertyService.getFeaturedPropertiesService(
    req.query,
  );

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
  const properties = await PropertyService.getRecommendedPropertiesService(
    req.query,
  );

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
  const property = await PropertyService.deletePropertyService({
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

// Track Property Shares Count.
export const trackPropertyShareCount = asyncHandler(async (req, res) => {
  await PropertyService.trackPropertyShareCountService({
    propertyId: req.params.id,
  });

  return res.status(200).json(new ApiResponse(200, "Share count incremented"));
});
