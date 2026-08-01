import type { PropertyThumbnail } from "../common/cloudinary.types";
import type {
  BaseEntity,
  Coordinates,
  ID,
  Nullable,
} from "../common/common.types";
import type { User } from "../user/user.types";
import type { PropertyDocumentItem } from "./property-document.types";
import type { PropertyImageItem } from "./property-image.types";

/* ============================================================================
 * Property Types
 * ============================================================================
 * Frontend DTOs derived from the backend Property model
 * (modules/properties/property.model.js).
 * ========================================================================== */

/* -------------------------------------------------------------------------- */
/* Enums / Unions (from property.constants.js) */
/* -------------------------------------------------------------------------- */

export type PropertyCategory = "Rent" | "Sale";

export type PropertyKind =
  | "Apartment"
  | "Villa"
  | "House"
  | "Studio"
  | "PG"
  | "Office";

export type PropertyStatus =
  | "draft"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Hidden"
  | "Inactive";

export type AvailabilityStatus = "available" | "occupied" | "reserved";

/* -------------------------------------------------------------------------- */
/* Owner (populated ref) */
/* -------------------------------------------------------------------------- */

/**
 * Every property read endpoint populates `owner` with
 * "userName email fullName profileImage" — matches OWNER_POPULATE in
 * property.service.js and adminProperty.service.js.
 */
export interface PropertyOwner extends Pick<
  User,
  "_id" | "userName" | "email" | "fullName" | "profileImage"
> {}

/* -------------------------------------------------------------------------- */
/* Core Property (matches backend model; owner always populated on reads) */
/* -------------------------------------------------------------------------- */

export interface Property extends BaseEntity {
  slug: string;
  title: string;
  description: string;
  location: string;
  address: string;
  zipCode: string;
  category: PropertyCategory;
  size: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: PropertyImageItem[];
  thumbnail: PropertyThumbnail;
  propertyType: PropertyKind;
  propertyDocuments: PropertyDocumentItem[];
  verifiedAt: Nullable<string>;
  verifiedBy: Nullable<ID>;
  verificationRejectedReason?: string;
  status: PropertyStatus;
  owner: PropertyOwner;
  availabilityStatus: AvailabilityStatus;
  isVerifiedProperty: boolean;
  isDeleted: boolean;
  deletedAt: Nullable<string>;
  isFeatured: boolean;
  views: number;
  shareCount: number;
  savedBy: ID[];
  coordinates: Coordinates;
}

/* -------------------------------------------------------------------------- */
/* Detail View */
/* -------------------------------------------------------------------------- */

/**
 * Single-property page (getSinglePropertyService). Identical shape to
 * `Property` — every list/detail endpoint in this backend returns the full
 * document (with populated owner), there is no server-side field trimming.
 */
export type PropertyDetails = Property;

/* -------------------------------------------------------------------------- */
/* Table / Summary Views (frontend-side projections) */
/* -------------------------------------------------------------------------- */

/** Row shape for the Admin Properties table. */
export interface PropertySummary extends Pick<
  Property,
  | "_id"
  | "slug"
  | "title"
  | "location"
  | "category"
  | "price"
  | "propertyType"
  | "status"
  | "availabilityStatus"
  | "isVerifiedProperty"
  | "isFeatured"
  | "owner"
  | "createdAt"
  | "updatedAt"
> {}

/** Public listing/search-results grid card. */
export interface PropertyCard extends Pick<
  Property,
  | "_id"
  | "slug"
  | "title"
  | "location"
  | "address"
  | "category"
  | "price"
  | "bedrooms"
  | "bathrooms"
  | "size"
  | "propertyType"
  | "thumbnail"
  | "availabilityStatus"
  | "isFeatured"
  | "views"
> {}
