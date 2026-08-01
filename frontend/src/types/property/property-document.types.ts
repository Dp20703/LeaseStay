import type { ID } from "../common/common.types";
import type { PropertyDocument, PropertyDocumentType } from "../common/cloudinary.types";

/* ============================================================================
 * Property Document Types
 * ============================================================================
 * `propertyDocuments` is a subdocument array; each entry has an `_id`.
 *
 * NOTE: The schema marks `url` and `publicId` as `select: false`. They are
 * populated on the in-memory document immediately after create/upload, but
 * are excluded by default on plain `findById`/`find` reads (no service in
 * property.service.js explicitly re-selects them). Marking both optional
 * here reflects that real inconsistency rather than assuming they're always
 * present — treat their absence as "not returned in this response", not as
 * "document has no file".
 * ========================================================================== */

export interface PropertyDocumentItem
  extends Omit<PropertyDocument, "url" | "publicId"> {
  _id: ID;
  url?: string;
  publicId?: string;
}

export type { PropertyDocumentType };
