export type User = {
  _id: string;
  profileImage: string;
  userName: string;
  email: string;
  phone?: string;
  role: "user" | "seller" | "admin";
  isGoogleUser: boolean;
  isVerified: boolean;
  isBlocked: boolean;
  fullName: {
    firstName: string;
    lastName?: string;
  };
  createdAt: string;
  updatedAt: string;
};