import type { Coordinates } from "../common/common.types";

export interface PropertyLocation {
  location: string;
  address: string;
  zipCode: string;
  coordinates: Coordinates;
}
