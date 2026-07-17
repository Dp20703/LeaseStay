/**
 * Represents the shape of the name object if the backend returns it as an object
 * instead of a flat string.
 */
export interface IOwnerName {
  firstName?: string;
  lastName?: string;
}

/**
 * Represents the pure business data for an Owner returned by the backend.
 */
export interface IOwner {
  _id: string;
  fullName: string | IOwnerName; // Safely handles the mixed data shape
  userName: string;
  email: string;
  role: "OWNER";
  isBlocked: boolean;
  profileImage?: string;

  // Specific to owners based on your backend admin.service.js
  ownerVerificationStatus: "pending" | "approved" | "rejected";
  ownerVerificationRejectedReason?: string;
  ownerVerifiedAt?: string;

  createdAt: string;
  updatedAt: string;
}

/**
 * Filter state managed by the parent OwnersPage
 */
export interface IOwnersFilterState {
  search: string;
  status: "ALL" | "PENDING" | "APPROVED" | "REJECTED";
  page: number;
  limit: number;
}
