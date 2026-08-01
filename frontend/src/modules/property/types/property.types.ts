import type {
  AvailabilityStatus,
  PropertyCard,
  PropertyDetails,
  PropertyDocumentItem,
  PropertyDocumentType,
  PropertyImageItem,
  PropertyKind,
  PropertyOwner as CentralPropertyOwner,
  PropertyStatus,
  PropertyThumbnail,
} from "@/types";

export type Property = PropertyDetails;
export type { PropertyStatus, PropertyDocumentType };
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

export type { PropertyImageItem };
