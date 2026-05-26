export type UserRole =
  | "user"
  | "owner"
  | "admin";

export type OwnerVerificationStatus =
  | "not_applied"
  | "pending"
  | "approved"
  | "rejected";

export type VerificationDocumentType =
  | "aadhaar"
  | "passport"
  | "driving_license";

export type VerificationDocument = {
  type: VerificationDocumentType;
  url: string;
  publicId: string;
  uploadedAt: string;
};

export type FullName = {
  firstName: string;
  lastName?: string;
};

export type User = {
  _id: string;
  profileImage: string;
  userName: string;
  fullName: FullName;
  email: string;
  googleId?: string | null;
  isGoogleUser: boolean;
  phone?: string;
  role: UserRole;
  verificationDocuments: VerificationDocument[];
  ownerVerificationStatus: OwnerVerificationStatus;
  ownerVerifiedAt?: string;
  ownerVerifiedBy?: string;
  ownerVerificationRejectedReason?: string;
  isVerified: boolean;
  isBlocked: boolean;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};

/* ─────────────────────────────────────────────
   Auth User
───────────────────────────────────────────── */

export type AuthUser = Pick<
  User,
  | "_id"
  | "profileImage"
  | "userName"
  | "fullName"
  | "email"
  | "role"
  | "isVerified"
>;

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

/* ─────────────────────────────────────────────
   Change Password Form
───────────────────────────────────────────── */

export type ChangePasswordFormData = {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
};

/* ─────────────────────────────────────────────
   Become Owner Form
───────────────────────────────────────────── */

export type BecomeOwnerFormData = {
  documentType: VerificationDocumentType;
  document: File | null;
};