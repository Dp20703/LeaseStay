import type { PropertyType } from "../entities/property.types";

export interface PropertyFormData {
  title: string;
  description: string;
  location: string;
  address: string;
  zipCode: string;
  category: "Rent" | "Sale";
  propertyType:PropertyType;
  size: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  documentType?: string;
  images: File[];
  propertyDocuments?: File[];
}