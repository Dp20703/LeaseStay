export type PropertyFormData = {
  title: string;

  description: string;

  location: string;

  address: string;

  zipCode: string;

  propertyType: string;

  category: string;

  size: number | "";

  price: number | "";

  bedrooms: number | "";

  bathrooms: number | "";

  amenities: string[];

  images: File[];

  propertyIdentityType: string;

  propertyProof: File | null;

  identityId: string;
};