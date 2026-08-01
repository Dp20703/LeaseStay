import type {
  ChangeEmailPayload,
  ChangePasswordPayload,
  CurrentUser,
  OwnerVerificationStatus,
  UpdateProfilePayload,
  User as CentralUser,
  UserFullName,
  UserRole,
  VerificationDocument,
  VerificationDocumentType,
} from "@/types";

export type User = CentralUser;
export type { UserRole, OwnerVerificationStatus, VerificationDocumentType, VerificationDocument };
export type FullName = UserFullName;
export type AuthUser = CurrentUser;

export type UpdateProfileFormData = {
  firstName: string;
  lastName: string;
  userName: string;
  phone: string;
  profileImage: File | null;
};

export type UpdateProfilePayloadData = UpdateProfilePayload;
export type ChangePasswordFormData = ChangePasswordPayload;
export type ChangeEmailFormData = ChangeEmailPayload;

export type BecomeOwnerFormData = {
  documentType: VerificationDocumentType;
  document: File | null;
};
