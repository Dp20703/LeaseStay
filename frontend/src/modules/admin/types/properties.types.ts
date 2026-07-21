/**
 * Represents the shape of the name object if the backend returns it as an object
 * instead of a flat string.
 */
export interface IOwnerName {
  firstName?: string;
  lastName?: string;
}

/**
 * Represents the populated owner data inside a property.
 */
export interface IPropertyOwner {
  _id: string;
  fullName: string | IOwnerName;
  userName: string;
  profileImage?: string;
}

/**
 * Represents the pure business data for a Property returned by the backend.
 */
export interface IProperty {
  _id: string;
  title: string;
  description: string;
  price: number;
  location: string;
  images: string[];
  owner: IPropertyOwner; // Populated by Mongoose

  // Verification & Moderation Status
  status: "Pending" | "Approved" | "Rejected" | "Hidden";
  verificationRejectedReason?: string;
  verifiedAt?: string;
  verifiedBy?: string; // Admin ID

  isDeleted: boolean;
  createdAt: string;
  updatedAt: string;
}

/**
 * Filter state managed by the parent PropertiesPage
 */
export interface IPropertiesFilterState {
  search: string;
  status: "ALL" | "PENDING" | "APPROVED" | "REJECTED" | "HIDDEN";
  page: number;
  limit: number;
}
