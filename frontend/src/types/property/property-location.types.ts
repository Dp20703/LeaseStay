import type { Coordinates } from "../common/common.types";

/* ============================================================================
 * Property Location Types
 * ============================================================================
 * NOTE: The backend model stores `coordinates` (GeoJSON Point) with a
 * default of [0, 0] and a 2dsphere index, but neither
 * createPropertyValidation nor updatePropertyValidation accept a
 * coordinates/lat/lng field from the client — there is currently no way to
 * set real coordinates through the API. `coordinates` is therefore typed as
 * present on read models, but no write/payload type is provided for it
 * until the backend actually supports it.
 * ========================================================================== */

export interface PropertyLocation {
  location: string;
  address: string;
  zipCode: string;
  coordinates: Coordinates;
}
