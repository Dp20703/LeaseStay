import type { Nullable } from "../common/common.types";
import type { VerificationDocument } from "../common/cloudinary.types";
import type { OwnerVerificationStatus, User } from "./user.types";

export interface OwnerSummary
  extends Pick<
    User,
    | "_id"
    | "userName"
    | "fullName"
    | "email"
    | "profileImage"
    | "isBlocked"
    | "createdAt"
    | "updatedAt"
  > {
  role: Extract<User["role"], "owner">;
  ownerVerificationStatus: OwnerVerificationStatus;
  ownerVerificationRejectedReason?: string;
  ownerVerifiedAt: Nullable<string>;
}

export interface OwnerVerificationRequest
  extends Pick<
    User,
    "_id" | "userName" | "fullName" | "email" | "profileImage" | "updatedAt"
  > {
  ownerVerificationStatus: Extract<OwnerVerificationStatus, "pending">;
  verificationDocuments: VerificationDocument[];
}

export interface RejectOwnerVerificationPayload {
  reason?: string;
}
