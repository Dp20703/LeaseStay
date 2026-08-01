import type { BaseEntity, Coordinates, ID, Nullable } from "../common/common.types";
import type { PropertyThumbnail } from "../common/cloudinary.types";
import type { User } from "../user/user.types";
import type { PropertyImageItem } from "./property-image.types";
import type { PropertyDocumentItem } from "./property-document.types";

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

export interface PropertyOwner
  extends Pick<
    User,
    "_id" | "userName" | "email" | "fullName" | "profileImage"
  > {}

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

export type PropertyDetails = Property;

export interface PropertySummary
  extends Pick<
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

export interface PropertyCard
  extends Pick<
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
