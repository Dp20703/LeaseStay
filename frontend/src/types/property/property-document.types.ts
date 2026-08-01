import type { ID } from "../common/common.types";
import type { PropertyDocument, PropertyDocumentType } from "../common/cloudinary.types";

export interface PropertyDocumentItem
  extends Omit<PropertyDocument, "url" | "publicId"> {
  _id: ID;
  url?: string;
  publicId?: string;
}

export type { PropertyDocumentType };
