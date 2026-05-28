import { CLOUDINARY_FOLDERS } from "../constants/cloudinary.constants.js";
import { PROPERTY_STATUS } from "../constants/property.constants.js";
import { ROLES } from "../constants/role.constants.js";
import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import ApiError from "../utils/ApiError.js";
import deleteFromCloudinary from "../helpers/cloudinary/deleteFromCloudinary.js";
import uploadToCloudinary from "../helpers/cloudinary/uploadToCloudinary.js";
import QueryBuilder from "../utils/queryBuilder.js";
import { generateSlug } from "../helpers/slug/generateSlug.js";

// Populate owner
const OWNER_POPULATE = "userName fullName profileImage";

// Normalize amenities input into a consistent array format.
const parseAmenities = (value) => {
  if (!value) return [];
  if (Array.isArray(value)) return value;

  if (typeof value === "string") {
    try {
      return JSON.parse(value);
    } catch {
      return value
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean);
    }
  }

  return [];
};

// Create a new property listing and upload related files.
export const createPropertyService = async ({ body, files, ownerId }) => {
  const user = await User.findById(ownerId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  /* MUST BE VERIFIED OWNER */

  if (user.role !== ROLES.OWNER) {
    throw new ApiError(403, "Only verified owners can create properties");
  }

  if (user.ownerVerificationStatus !== "approved") {
    throw new ApiError(403, "Owner verification pending");
  }

  const images = [];
  let thumbnail = {};

  if (files?.images?.length) {
    for (const file of files.images) {
      const { url, publicId } = await uploadToCloudinary(
        file,
        CLOUDINARY_FOLDERS.PROPERTY_IMAGES,
      );

      images.push({ url, publicId });
    }

    thumbnail = images[0];
  }

  const propertyDocuments = [];

  if (files?.propertyDocuments?.length) {
    for (const file of files.propertyDocuments) {
      const { url, publicId } = await uploadToCloudinary(
        file,
        CLOUDINARY_FOLDERS.PROPERTY_DOCUMENTS,
      );

      propertyDocuments.push({
        type: body.documentType,
        url,
        publicId,
      });
    }
  }

  const property = await Property.create({
    ...body,
    slug: generateSlug(body.title),
    images,
    thumbnail,
    propertyDocuments,
    amenities: parseAmenities(body.amenities),
    owner: ownerId,
  });

  await property.populate("owner", OWNER_POPULATE);

  return property;

  return property;
};

// Fetch approved properties with filtering, search, sorting, and pagination.
export const getAllPropertiesService = async (queryString) => {
  const resultPerPage = Number(queryString.limit) || 10;

  const totalProperties = await Property.countDocuments({
    status: "Approved",
    isDeleted: false,
  });

  const queryBuilder = new QueryBuilder(
    Property.find({ status: "Approved" }),
    queryString,
  )
    .search()
    .filter()
    .sort()
    .paginate(resultPerPage);

  const properties = await queryBuilder.mongooseQuery.lean();

  return {
    properties,
    pagination: {
      totalProperties,
      currentPage: Number(queryString.page) || 1,
      resultPerPage,
      totalPages: Math.ceil(totalProperties / resultPerPage),
    },
  };
};

// Fetch a single approved property by slug.
export const getSinglePropertyService = async (slug) => {
  return await Property.findOne({
    slug,
    isDeleted: false,
    status: PROPERTY_STATUS.APPROVED,
  })
    .populate("owner", OWNER_POPULATE)
    .lean();
};

// Fetch all properties owned by a specific user.
export const getOwnerPropertiesService = async (ownerId) => {
  return await Property.find({ owner: ownerId })
    .populate("owner", OWNER_POPULATE)
    .sort({ createdAt: -1 });
};

// Fetch featured properties for homepage or curated sections.
export const getFeaturedPropertiesService = async ({ limit = 6 } = {}) => {
  return await Property.find({
    status: PROPERTY_STATUS.APPROVED,
  })
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .populate("owner", "userName fullName profileImage")
    .lean();
};

// Fetch recommended available properties for users.
export const getRecommendedPropertiesService = async ({ limit = 6 } = {}) => {
  return await Property.find({
    status: PROPERTY_STATUS.APPROVED,
    availabilityStatus: "available",
  })
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .populate("owner", "userName fullName profileImage")
    .lean();
};

// Update a property's details and upload additional media if provided.
export const updatePropertyService = async ({
  propertyId,
  body,
  files,
  user,
}) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (!property.owner?.equals(user._id) && user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized access");
  }

  if (body.title && body.title !== property.title) {
    property.slug = generateSlug(body.title);
  }

  if (files?.images?.length) {
    for (const file of files.images) {
      const uploadedImage = await uploadToCloudinary(
        file,
        CLOUDINARY_FOLDERS.PROPERTY_IMAGES,
      );
      property.images.push(uploadedImage);
    }

    if (!property.thumbnail?.url && property.images.length) {
      property.thumbnail = property.images[0];
    }
  }

  if (files?.propertyDocuments?.length) {
    const documentType = body.documentType;

    for (const file of files.propertyDocuments) {
      const uploadedDocument = await uploadToCloudinary(
        file,
        CLOUDINARY_FOLDERS.PROPERTY_DOCUMENTS,
      );

      property.propertyDocuments.push({
        type: documentType,
        url: uploadedDocument.url,
        publicId: uploadedDocument.publicId,
      });
    }
  }

  const updatableFields = [
    "title",
    "description",
    "location",
    "address",
    "zipCode",
    "category",
    "size",
    "price",
    "bedrooms",
    "bathrooms",
    "amenities",
    "propertyType",
    "availabilityStatus",
  ];

  for (const field of updatableFields) {
    if (Object.prototype.hasOwnProperty.call(body, field)) {
      if (field === "amenities") {
        property[field] = parseAmenities(body[field]);
      } else {
        property[field] = body[field];
      }
    }
  }

  await property.save();

  await property.populate("owner", OWNER_POPULATE);
  return property;
};

// Change the availability status of a property.
export const changePropertyAvailabilityService = async ({
  propertyId,
  availabilityStatus,
  user,
}) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (!property.owner?.equals(user._id) && user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized access");
  }

  property.availabilityStatus = availabilityStatus;
  await property.save();

  await property.populate("owner", OWNER_POPULATE);
  return property;
};

// Add new images to an existing property listing.
export const addPropertyImagesService = async ({ propertyId, files, user }) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (!property.owner?.equals(user._id) && user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized access");
  }

  if (!files?.length) {
    throw new ApiError(400, "No images provided");
  }

  for (const file of files) {
    const uploadedImage = await uploadToCloudinary(
      file,
      CLOUDINARY_FOLDERS.PROPERTY_IMAGES,
    );

    property.images.push(uploadedImage);
  }

  if (!property.thumbnail?.url && property.images.length) {
    property.thumbnail = property.images[0];
  }

  await property.save();

  await property.populate("owner", OWNER_POPULATE);
  return property;
};

// Remove a specific image from a property and clean up cloud storage.
export const deletePropertyImageService = async ({
  propertyId,
  imageId,
  user,
}) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (!property.owner?.equals(user._id) && user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized access");
  }

  const image = property.images.find((img) => img._id.toString() === imageId);

  if (!image) {
    throw new ApiError(404, "Property image not found");
  }

  await deleteFromCloudinary(image.publicId);

  property.images = property.images.filter(
    (img) => img._id.toString() !== imageId,
  );

  if (property.thumbnail?.publicId === image.publicId) {
    property.thumbnail = property.images[0] || {};
  }

  await property.save();

  await property.populate("owner", OWNER_POPULATE);
  return property;
};

// Soft-delete a property listing and remove associated media.
export const deletePropertyService = async ({ propertyId, user }) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    return null;
  }

  if (!property.owner?.equals(user._id) && user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized access");
  }

  if (property.images?.length) {
    await Promise.all(
      property.images.map((image) => deleteFromCloudinary(image.publicId)),
    );
  }

  if (property.propertyDocuments?.length) {
    await Promise.all(
      property.propertyDocuments.map((document) =>
        deleteFromCloudinary(document.publicId),
      ),
    );
  }

  property.isDeleted = true;
  property.deletedAt = new Date();
  property.status = PROPERTY_STATUS.INACTIVE;
  await property.save();

  return property;
};
