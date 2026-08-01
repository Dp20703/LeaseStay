import type {
  User as CentralUser,
  ChangeEmailPayload,
  ChangePasswordPayload,
  CurrentUser,
  OwnerVerificationStatus,
  UpdateProfilePayload,
  UserFullName,
  UserRole,
  VerificationDocument,
  VerificationDocumentType,
} from "@/types";

/**
 * Sourced from the central type system (`@/types/user`). Fixes vs. the
 * previous local definition: `VerificationDocumentType` was missing "pan"
 * (auth.constants.js's OWNER_VERIFICATION_DOCUMENTS has 4 values: aadhaar,
 * pan, passport, driving_license — this file only had 3).
 */
export type User = CentralUser;
export type {
  OwnerVerificationStatus,
  UserRole,
  VerificationDocument,
  VerificationDocumentType,
};

/** Kept as a distinct name (`FullName`) since components import it under this name locally. */
export type FullName = UserFullName;

/* ─────────────────────────────────────────────
   Auth User
───────────────────────────────────────────── */

export type AuthUser = CurrentUser;

/* ─────────────────────────────────────────────
   Update Profile Form
───────────────────────────────────────────── */

export type UpdateProfileFormData = {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  profileImage: File | null;
};

/** The actual JSON payload sent to PATCH /users/update-profile (file goes in the same FormData separately). */
export type UpdateProfilePayloadData = UpdateProfilePayload;

/* ─────────────────────────────────────────────
   Change Password Form
───────────────────────────────────────────── */

export type ChangePasswordFormData = ChangePasswordPayload;

/* ─────────────────────────────────────────────
   Change Email
───────────────────────────────────────────── */

/**
 * NOTE: userService.ts / authService.ts currently POST `{ email, password }`
 * for change-email, but changeEmailValidation.js requires
 * `{ newEmail, password }` — this is a real, pre-existing mismatch. This
 * type reflects what the backend actually requires.
 */
export type ChangeEmailFormData = ChangeEmailPayload;

/* ─────────────────────────────────────────────
   Become Owner Form
───────────────────────────────────────────── */

export type BecomeOwnerFormData = {
  documentType: VerificationDocumentType;
  document: File | null;
};
