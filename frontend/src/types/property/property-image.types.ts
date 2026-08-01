import type { ID } from "../common/common.types";
import type {
  PropertyImage as PropertyImageFile,
  PropertyThumbnail,
} from "../common/cloudinary.types";

/* ============================================================================
 * Property Image Types
 * ============================================================================
 * Images live as a Mongoose subdocument array (`property.images`), so each
 * entry carries its own `_id` — unlike `thumbnail`, which is a plain nested
 * object with no `_id`.
 * ========================================================================== */

export interface PropertyImageItem extends PropertyImageFile {
  _id: ID;
}

export type { PropertyThumbnail };
