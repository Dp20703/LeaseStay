import { CLOUDINARY_FOLDERS } from "../constants/cloudinary.constants.js";
import { PROPERTY_STATUS } from "../constants/property.constants.js";
import { ROLES } from "../constants/role.constants.js";
import User from "../models/user.model.js";
import Property from "../models/property.model.js";
import ApiError from "../utils/ApiError.js";
import deleteFromCloudinary from "../helpers/cloudinary/deleteFromCloudinary.js";
import uploadToCloudinary from "../helpers/cloudinary/uploadToCloudinary.js";
import { sendMail } from "../helpers/mail/sendMail.js";
import QueryBuilder from "../utils/queryBuilder.js";
import { generateSlug } from "../helpers/slug/generateSlug.js";
import {
  deleteCache,
  deleteCacheByPattern,
  getCache,
  setCache,
} from "../helpers/redis/redis.utils.js";

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

  // if (user.ownerVerificationStatus !== "approved") {
  //   throw new ApiError(403, "Owner verification pending");
  // }

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
  const propertyData = {
    title: body.title,
    description: body.description,
    location: body.location,
    address: body.address,
    zipCode: body.zipCode,
    category: body.category,
    size: body.size,
    price: body.price,
    bedrooms: body.bedrooms,
    bathrooms: body.bathrooms,
    propertyType: body.propertyType,
    slug: generateSlug(body.title),
    images,
    thumbnail,
    propertyDocuments,
    amenities: parseAmenities(body.amenities),
    owner: ownerId,
  };
  const property = await Property.create(propertyData);

  await Promise.all([
    deleteCacheByPattern("featured:*"),
    deleteCacheByPattern("properties:*"),
  ]);

  await property.populate("owner", OWNER_POPULATE);

  return property;
};

// Fetch approved properties with filtering, search, sorting, and pagination.
export const getAllPropertiesService = async (queryString) => {
  const cacheKey = `properties:${new URLSearchParams(queryString || {}).toString() || "all"}`;

  const cachedProperties = await getCache(cacheKey);

  if (cachedProperties) {
    console.log("FROM REDIS");
    return cachedProperties;
  }

  console.log("FROM MONGODB");

  const resultPerPage = Number(queryString.limit) || 10;

  const totalProperties = await Property.countDocuments({
    status: "Approved",
    isDeleted: false,
  });

  const queryBuilder = new QueryBuilder(Property.find(), queryString)
    .search()
    .filter()
    .sort()
    .paginate(resultPerPage);

  const properties = await queryBuilder.mongooseQuery.lean();

  const allProperties = {
    properties,
    pagination: {
      totalProperties,
      currentPage: Number(queryString.page) || 1,
      resultPerPage,
      totalPages: Math.ceil(totalProperties / resultPerPage),
    },
  };

  if (allProperties) {
    await setCache(cacheKey, allProperties, 300);
  }

  return allProperties;
};

// Fetch a single approved property by slug.
export const getSinglePropertyService = async (slug) => {
  const cacheKey = `property:${slug}`;

  // CHECK CACHE
  const cachedProperty = await getCache(cacheKey);

  if (cachedProperty) {
    console.log("FROM REDIS");
    return cachedProperty;
  }

  console.log("FROM MONGODB");

  const property = await Property.findOne({
    slug,
    isDeleted: false,
  })
    .populate("owner", OWNER_POPULATE)
    .lean();

  await Property.updateOne({ slug }, { $inc: { views: 1 } });

  if (property) {
    await setCache(cacheKey, property, 300); // 5 min cache
  }

  return property;
};

// Fetch all properties owned by a specific user.
export const getOwnerPropertiesService = async (ownerId) => {
  const cacheKey = `properties:owner:${ownerId}`;

  const cachedProperties = await getCache(cacheKey);

  if (cachedProperties) {
    console.log("FROM REDIS");

    return cachedProperties;
  }

  console.log("FROM MONGODB");

  const properties = await Property.find({ owner: ownerId, isDeleted: false })
    .populate("owner", OWNER_POPULATE)
    .sort({ createdAt: -1 });

  if (properties) {
    await setCache(cacheKey, properties, 300);
  }

  return properties;
};

// Fetch featured properties
export const getFeaturedPropertiesService = async ({ limit = 6 } = {}) => {
  const cacheKey = `featured:${limit}`;

  const cachedProperties = await getCache(cacheKey);

  if (cachedProperties) {
    console.log("FROM REDIS");

    return cachedProperties;
  }

  console.log("FROM MONGODB");

  const properties = await Property.find({ isFeatured: true, isDeleted: false })
    .populate("owner", OWNER_POPULATE)
    .limit(Number(limit))
    .lean();

  await setCache(cacheKey, properties, 300);

  return properties;
};

// Fetch recommended available properties for users.
export const getRecommendedPropertiesService = async ({ limit = 6 } = {}) => {
  const cacheKey = `properties:recommended:${limit}`;

  const cachedProperties = await getCache(cacheKey);

  if (cachedProperties) {
    console.log("FROM REDIS");
    return cachedProperties;
  }

  console.log("FROM MONGODB");

  const properties = await Property.find({
    status: PROPERTY_STATUS.APPROVED,
    availabilityStatus: "available",
  })
    .sort({ createdAt: -1 })
    .limit(Number(limit))
    .populate("owner", OWNER_POPULATE)
    .lean();

  if (properties) {
    await setCache(cacheKey, properties, 300);
  }

  return properties;
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

  const oldSlug = property.slug;

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

  await deleteCache("featured:6");
  await deleteCache(`property:${oldSlug}`);

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

  await Promise.all([
    deleteCache(`property:${property.slug}`),
    deleteCacheByPattern("featured:*"),
    deleteCacheByPattern("properties:*"),
  ]);

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

  await deleteCache(`property:${property.slug}`);

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

  await deleteCache(`property:${property.slug}`);

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

  await deleteCache("featured:6");
  await deleteCache(`property:${property.slug}`);

  await property.save();

  return property;
};

// Save a property for the authenticated user.
export const savePropertyService = async ({ propertyId, userId }) => {
  const [user, property] = await Promise.all([
    User.exists({ _id: userId }),
    Property.exists({ _id: propertyId, isDeleted: false }),
  ]);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  await Promise.all([
    User.findByIdAndUpdate(userId, {
      $addToSet: { savedProperties: propertyId },
    }),

    Property.findByIdAndUpdate(propertyId, {
      $addToSet: { savedBy: userId },
    }),
  ]);

  await deleteCache(`wishlist:${userId}`);

  return {
    propertyId,
    saved: true,
  };
};

// Remove a saved property for the authenticated user.
export const unsavePropertyService = async ({ propertyId, userId }) => {
  const [user, property] = await Promise.all([
    User.exists({ _id: userId }),
    Property.exists({ _id: propertyId }),
  ]);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  await Promise.all([
    User.findByIdAndUpdate(userId, {
      $pull: { savedProperties: propertyId },
    }),

    Property.findByIdAndUpdate(propertyId, {
      $pull: { savedBy: userId },
    }),
  ]);

  await deleteCache(`wishlist:${userId}`);

  return {
    propertyId,
    saved: false,
  };
};

// Set a property image as the thumbnail.
export const setPropertyThumbnailService = async ({
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

  const image = property.images.find(
    (propertyImage) => propertyImage._id.toString() === imageId,
  );

  if (!image) {
    throw new ApiError(404, "Property image not found");
  }

  property.thumbnail = {
    url: image.url,
    publicId: image.publicId,
  };

  await property.save();

  await Promise.all([
    deleteCache(`property:${property.slug}`),
    deleteCacheByPattern?.("featured:*"),
    deleteCacheByPattern?.("properties:*"),
  ]);

  await property.populate("owner", OWNER_POPULATE);

  return property;
};

// Delete a property document and remove it from storage.
export const deletePropertyDocumentService = async ({
  propertyId,
  documentId,
  user,
}) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  if (!property.owner?.equals(user._id) && user.role !== ROLES.ADMIN) {
    throw new ApiError(403, "Unauthorized access");
  }

  const document = property.propertyDocuments.find(
    (propertyDocument) => propertyDocument._id.toString() === documentId,
  );

  if (!document) {
    throw new ApiError(404, "Property document not found");
  }

  await deleteFromCloudinary(document.publicId);

  property.propertyDocuments = property.propertyDocuments.filter(
    (propertyDocument) => propertyDocument._id.toString() !== documentId,
  );

  await property.save();
  await property.populate("owner", OWNER_POPULATE);

  await deleteCache(`property:${property.slug}`);

  return property;
};

// Fetch related properties based on category and location.
export const getRelatedPropertiesService = async ({ propertyId }) => {
  const property = await Property.findById(propertyId);

  if (!property) {
    throw new ApiError(404, "Property not found");
  }

  const relatedProperties = await Property.find({
    _id: { $ne: propertyId },
    isDeleted: false,
    category: property.category,
  })
    .sort({ createdAt: -1 })
    .limit(6)
    .populate("owner", OWNER_POPULATE)
    .lean();

  if (relatedProperties.length) {
    return relatedProperties;
  }

  return await Property.find({
    _id: { $ne: propertyId },
    isDeleted: false,
    location: property.location,
  })
    .sort({ createdAt: -1 })
    .limit(6)
    .populate("owner", OWNER_POPULATE)
    .lean();
};

// Contact the property owner through email.
export const contactPropertyOwnerService = async ({
  propertyId,
  userId,
  message,
}) => {
  const property = await Property.findById(propertyId).populate(
    "owner",
    "userName fullName profileImage email",
  );

  if (!property) {
    throw new ApiError(404, "Property not found");
  }
  console.log(property);

  if (!property.owner?.email) {
    throw new ApiError(404, "Owner email not found");
  }

  const user = await User.findById(userId);

  if (!user) {
    throw new ApiError(404, "User not found");
  }

  const senderName = user.fullName?.firstName || user.userName || "A user";
  const subject = `Inquiry about ${property.title}`;
  const html = `
    <div>
      <p>Hello ${property.owner.fullName?.firstName || property.owner.userName},</p>
      <p>${senderName} is interested in your property <strong>${property.title}</strong>.</p>
      <p><strong>Message:</strong> ${message || "No message provided"}</p>
      <p>Property link: ${process.env.FRONTEND_URL || "http://localhost:5173"}/properties/${property.slug}</p>
    </div>
  `;

  await sendMail({
    to: property.owner.email,
    subject,
    html,
  });

  return {
    propertyId: property._id,
    ownerEmail: property.owner.email,
    propertyTitle: property.title,
  };
};
