import asyncHandler from "../utils/asyncHandler.js";
import ApiError from "../utils/ApiError.js";
import ApiResponse from "../utils/ApiResponse.js";
import uploadToCloudinary from "../utils/uploadToCloudinary.js";
import {createPropertyService, getAllPropertiesService,getSinglePropertyService,updatePropertyService,deletePropertyService,} from "../services/property.service.js";

// CREATE PROPERTY
export const createProperty =
  asyncHandler(async (req, res) => {
    const {
      title,
      description,
      location,
      address,
      zipCode,
      propertyType,
      category,
      size,
      price,
      bedrooms,
      bathrooms,
      propertyIdentityType,
    } = req.body;

    // AMENITIES
    const amenities =
      req.body.amenities
        ? JSON.parse(
            req.body.amenities
          )
        : [];

    // REQUIRED VALIDATION
    if (!title ||!description ||!location ||!address ||!zipCode ||!propertyType ||!category ||!size ||!price ||!bedrooms ||!bathrooms ||!propertyIdentityType)
         {
      throw new ApiError(400,"All fields are required");
    }
    // IMAGE FILES
    const imageFiles =
      req.files?.images || [];

    if (!imageFiles.length) {
      throw new ApiError(400,"Property images required");
    }

    // PROPERTY PROOF
    const propertyProofFile =
      req.files?.propertyProof?.[0];

    if (!propertyProofFile) {
      throw new ApiError(400,"Property proof required");
    }

    // OPTIONAL IDENTITY FILE
    const identityIdFile =req.files?.identityId?.[0];

    // UPLOAD PROPERTY IMAGES
    const uploadedImages =
      await Promise.all(
        imageFiles.map((file) =>
          uploadToCloudinary(
            file.buffer,
            "LeaseStay/properties"
          )
        )
      );

    const imageUrls =
      uploadedImages.map(
        (img) => img.secure_url
      );

    // UPLOAD PROPERTY PROOF
    const uploadedProof =
      await uploadToCloudinary(
        propertyProofFile.buffer,
        "LeaseStay/propertyProofs"
      );

    // OPTIONAL IDENTITY UPLOAD
    let identityId = "";
    if (identityIdFile) {
      const uploadedIdentity =
        await uploadToCloudinary(
          identityIdFile.buffer,
          "LeaseStay/identityIds"
        );

      identityId =
        uploadedIdentity.secure_url;
    }

    // CREATE PROPERTY
    const property =
      await createPropertyService({
        title,
        description,
        location,
        address,
        zipCode,
        propertyType,
        category,

        size:
          Number(size),

        price:
          Number(price),

        bedrooms:
          Number(bedrooms),

        bathrooms:
          Number(bathrooms),

        propertyIdentityType,

        amenities,

        images: imageUrls,

        propertyProof:
          uploadedProof.secure_url,

        identityId,

        seller:
          req.user._id,
      });

    return res.status(201).json(new ApiResponse(201,"Property created successfully",property));
  });


// GET ALL PROPERTIES
export const getAllProperties = asyncHandler(async (req, res) => {
    const properties =await getAllPropertiesService();

    return res.status(200).json(
      new ApiResponse(200,"Properties fetched successfully",properties)
    );});

    
// GET SINGLE PROPERTY
export const getSingleProperty =asyncHandler(async (req, res) =>{
    const { id } = req.params;

    const property =await getSinglePropertyService(id);

    if (!property) {throw new ApiError(404,"Property not found");}

    return res.status(200).json(new ApiResponse(200,"Property fetched successfully",property));
  });

// DELETE PROPERTY
export const deleteProperty = asyncHandler(async (req, res) => {
    const { id } = req.params;

    const property = await getSinglePropertyService(id);

    if (!property) {throw new ApiError(404,"Property not found");
    }

    // OWNER CHECK
    if (property.seller._id.toString() !== req.user._id.toString() && req.user.role !== "admin") {
      throw new ApiError(403,"Unauthorized access");
    }

    await deletePropertyService(id);

    return res.status(200).json(new ApiResponse(200,"Property deleted successfully"));
  });