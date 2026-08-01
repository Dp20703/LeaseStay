import type { Nullable } from "./common.types";

/* ============================================================================
 * Cloudinary Types
 * ============================================================================
 */

export interface CloudinaryFile {
  url: string;
  publicId: string;
}

export interface ProfileImage extends CloudinaryFile {
  uploadedAt: Nullable<string>;
}

export interface PropertyImage extends CloudinaryFile {}

export interface PropertyThumbnail extends CloudinaryFile {}

export type VerificationDocumentType =
  | "aadhaar"
  | "pan"
  | "passport"
  | "driving_license";

export interface VerificationDocument extends CloudinaryFile {
  type: VerificationDocumentType;
  uploadedAt: string;
}

export type PropertyDocumentType =
  | "sale_deed"
  | "tax_receipt"
  | "electricity_bill"
  | "rental_agreement";

export interface PropertyDocument extends CloudinaryFile {
  type: PropertyDocumentType;
  uploadedAt: string;
}
