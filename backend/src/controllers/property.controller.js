import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import {
  addPropertyImagesService,
  changePropertyAvailabilityService,
  createPropertyService,
  deletePropertyImageService,
  deletePropertyService,
  getAllPropertiesService,
  getFeaturedPropertiesService,
  getOwnerPropertiesService,
  getRecommendedPropertiesService,
  getSinglePropertyService,
  updatePropertyService,
} from "../services/property.service.js";

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

export const getAllProperties = asyncHandler(async (req, res) => {
  const result = await getAllPropertiesService(req.query);

  return res
    .status(200)
    .json(new ApiResponse(200, "Properties fetched successfully", result));
});

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

export const getOwnerProperties = asyncHandler(async (req, res) => {
  const properties = await getOwnerPropertiesService(req.user._id);

  return res
    .status(200)
    .json(
      new ApiResponse(200, "Owner properties fetched successfully", properties),
    );
});

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

export const getFeaturedProperties = asyncHandler(async (req, res) => {
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
