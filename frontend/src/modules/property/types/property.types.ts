import type {
  AvailabilityStatus,
  PropertyOwner as CentralPropertyOwner,
  PropertyCard,
  PropertyDetails,
  PropertyDocumentItem,
  PropertyDocumentType,
  PropertyImageItem,
  PropertyKind,
  PropertyStatus,
  PropertyThumbnail,
} from "@/types";

/**
 * Sourced from the central type system (`@/types/property`). Kept under
 * this module's original local names so existing component imports keep
 * working. Fixes vs. the previous local definitions: `category` is now
 * the real `"Rent" | "Sale"` union (was loosely `string`), `PropertyOwner`
 * `profileImage` is now the real object shape (was `string`), and the
 * full `Property` now includes the fields the backend actually returns
 * (views, shareCount, savedBy, isFeatured, isVerifiedProperty, coordinates)
 * that were previously missing.
 */
export type Property = PropertyDetails;
export type { PropertyDocumentType, PropertyStatus };
export type PropertyAvailabilityStatus = AvailabilityStatus;
export type PropertyType = PropertyKind;
export type PropertyImage = PropertyThumbnail;
export type PropertyDocument = PropertyDocumentItem;
export type PropertyOwner = CentralPropertyOwner;
export type PropertyCardProps = PropertyCard;

export const PropertyAmenities = [
  "WiFi",
  "Parking",
  "Security",
  "Lift",
  "Gym",
  "Garden",
  "Balcony",
  "Power Backup",
  "CCTV",
  "Swimming Pool",
];

/** Kept for callers that specifically need the images array item shape (with `_id`). */
export type { PropertyImageItem };
