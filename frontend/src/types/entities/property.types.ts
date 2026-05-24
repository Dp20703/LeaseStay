import type { User } from "./user.types";

export type PropertyStatus =
  | "Active"
  | "Inactive";

export type PropertyType = {
  _id: string;

  title: string;

  description: string;

  location: string;

  address: string;

  zipCode: string;

  propertyType: string;

  category: string;

  size: number;

  price: number;

  bedrooms: number;

  bathrooms: number;

  amenities: string[];

  images: string[];

  propertyIdentityType: string;

  propertyProof: string;

  identityId: string;

  status: PropertyStatus;

  owner: User | string;

  createdAt: string;

  updatedAt: string;
};