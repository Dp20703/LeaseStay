import type { PropertyDocumentType } from "../common/cloudinary.types";
import type {
  AvailabilityStatus,
  PropertyCategory,
  PropertyKind,
  PropertyStatus,
} from "./property.types";

/* ============================================================================
 * Property Form / Request Types
 * ============================================================================
 * Create/update are sent as multipart FormData (images + propertyDocuments
 * files alongside these fields) — these types describe the non-file fields
 * per createPropertyValidation.js / updatePropertyValidation.js.
 * ========================================================================== */

export interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  address: string;
  zipCode: string;
  category: PropertyCategory;
  propertyType: PropertyKind;
  size: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  documentType: PropertyDocumentType;
  images: File[];
  propertyDocuments: File[];
}

export interface CreatePropertyPayload {
  title: string;
  description: string;
  location: string;
  address: string;
  zipCode: string;
  category: PropertyCategory;
  propertyType: PropertyKind;
  size: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities?: string[];
  documentType?: PropertyDocumentType;
}

export interface UpdatePropertyPayload extends Partial<CreatePropertyPayload> {
  availabilityStatus?: AvailabilityStatus;
  status?: PropertyStatus;
}

export interface ChangePropertyAvailabilityPayload {
  availabilityStatus: AvailabilityStatus;
}
