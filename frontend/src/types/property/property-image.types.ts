import type { ID } from "../common/common.types";
import type {
  PropertyImage as PropertyImageFile,
  PropertyThumbnail,
} from "../common/cloudinary.types";

export interface PropertyImageItem extends PropertyImageFile {
  _id: ID;
}

export type { PropertyThumbnail };
