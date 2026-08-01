import type { BaseEntity, ID, Nullable } from "../common/common.types";
import type {
  ProfileImage,
  VerificationDocument,
  VerificationDocumentType,
} from "../common/cloudinary.types";

export type UserRole = "user" | "owner" | "admin";

export type OwnerVerificationStatus =
  | "not_applied"
  | "pending"
  | "approved"
  | "rejected";

export interface UserFullName {
  firstName: string;
  lastName?: string;
}

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
  ownerVerificationStatus: OwnerVerificationStatus;
  ownerVerifiedAt: Nullable<string>;
  ownerVerifiedBy: Nullable<ID>;
  ownerVerificationRejectedReason?: string;
  verificationDocuments: VerificationDocument[];
  savedProperties: ID[];
}

export type CurrentUser = User;

export interface UserSummary
  extends Pick<
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

export interface UserProfile
  extends Pick<
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

export interface ChangeEmailPayload {
  newEmail: string;
  password: string;
}

export interface ApplyOwnerPayload {
  documentType: VerificationDocumentType;
}
