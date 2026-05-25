import type { User } from "./user.types";

export interface Owner {
  _id: string;
  userName: string;
  fullName: string;
  email?: string;
  profileImage?: string;
}

export interface Property {
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
  propertyProof?: string;
  identityId?: string;
  status: "Active" | "Inactive" | "Pending";
  owner: Owner;
  createdAt: string;
  updatedAt: string;
}

export interface PropertyResponse {
  properties: Property[];
  total: number;
  page: number;
  totalPages: number;
}


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

