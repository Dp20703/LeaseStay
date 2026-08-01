import type { User } from "./user.types";

export interface AdminRef extends Pick<User, "_id" | "fullName" | "email"> {
  role: Extract<User["role"], "admin">;
}

export interface AdminUser
  extends Pick<
    User,
    | "_id"
    | "userName"
    | "fullName"
    | "email"
    | "profileImage"
    | "createdAt"
    | "updatedAt"
  > {
  role: Extract<User["role"], "admin">;
}
