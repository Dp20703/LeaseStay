import type {
  ProfileImage,
  VerificationDocument,
  VerificationDocumentType,
} from "../common/cloudinary.types";
import type { BaseEntity, ID, Nullable } from "../common/common.types";

/* ============================================================================
 * User Types
 * ============================================================================
 * Frontend DTOs derived from the backend User model (modules/users/user.model.js).
 * This is the single source of truth for `role` and the base `User` shape —
 * every other domain (auth, owner, admin, property.owner, booking.tenant, etc.)
 * imports from here instead of redefining it.
 * ========================================================================== */

/* -------------------------------------------------------------------------- */
/* Role */
/* -------------------------------------------------------------------------- */

export type UserRole = "user" | "owner" | "admin";

/* -------------------------------------------------------------------------- */
/* Owner Verification Lifecycle */
/* -------------------------------------------------------------------------- */

export type OwnerVerificationStatus =
  | "not_applied"
  | "pending"
  | "approved"
  | "rejected";

/* -------------------------------------------------------------------------- */
/* Full Name */
/* -------------------------------------------------------------------------- */

/**
 * The backend only requires `firstName`; `lastName` is optional/trim-only.
 * Distinct from the generic `FullName` in common.types (which requires both).
 */
export interface UserFullName {
  firstName: string;
  lastName?: string;
}

/* -------------------------------------------------------------------------- */
/* Core User (matches backend User model, password/tokens stripped) */
/* -------------------------------------------------------------------------- */

export interface User extends BaseEntity {
  userName: string;
  fullName: UserFullName;
  email: string;
  phone?: string;
  role: UserRole;
  profileImage?: ProfileImage;
  isGoogleUser: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  deletedAt: Nullable<string>;

  /* Owner verification (present on all users, meaningful once role becomes "owner") */
  ownerVerificationStatus: OwnerVerificationStatus;
  ownerVerifiedAt: Nullable<string>;
  ownerVerifiedBy: Nullable<ID>;
  ownerVerificationRejectedReason?: string;
  verificationDocuments: VerificationDocument[];

  /* Wishlist — property refs only; hydrated shape lives in property/ */
  savedProperties: ID[];
}

/* -------------------------------------------------------------------------- */
/* Session User */
/* -------------------------------------------------------------------------- */

/**
 * The user object returned on login/register/"me" — identical shape to `User`.
 * Kept as a distinct alias so auth/ can depend on session semantics rather
 * than the raw model directly.
 */
export type CurrentUser = User;

/* -------------------------------------------------------------------------- */
/* Table / Summary Views */
/* -------------------------------------------------------------------------- */

/** Row shape for the Admin Users table. */
export interface UserSummary extends Pick<
  User,
  | "_id"
  | "userName"
  | "fullName"
  | "email"
  | "role"
  | "profileImage"
  | "isBlocked"
  | "isDeleted"
  | "createdAt"
  | "updatedAt"
> {}

/* -------------------------------------------------------------------------- */
/* Profile Page */
/* -------------------------------------------------------------------------- */

export interface UserProfile extends Pick<
  User,
  | "_id"
  | "userName"
  | "fullName"
  | "email"
  | "phone"
  | "role"
  | "profileImage"
  | "isVerified"
  | "isGoogleUser"
  | "createdAt"
  | "updatedAt"
> {}

/* -------------------------------------------------------------------------- */
/* Request Payloads */
/* -------------------------------------------------------------------------- */

export interface UpdateProfilePayload {
  firstName?: string;
  lastName?: string;
  userName?: string;
  phone?: string;
}

export interface ChangePasswordPayload {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

/** Matches backend `changeEmailValidation` — body key is `newEmail`, not `email`. */
export interface ChangeEmailPayload {
  newEmail: string;
  password: string;
}

export interface ApplyOwnerPayload {
  documentType: VerificationDocumentType;
}
