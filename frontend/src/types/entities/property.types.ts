export type PropertyStatus =
  | "draft"
  | "Pending"
  | "Approved"
  | "Rejected"
  | "Hidden"
  | "Inactive";

export type PropertyAvailabilityStatus =
  | "available"
  | "occupied"
  | "reserved";

export type PropertyType =
  | "Apartment"
  | "Villa"
  | "House"
  | "Studio"
  | "PG"
  | "Office";

export type PropertyDocumentType =
  | "sale_deed"
  | "tax_receipt"
  | "electricity_bill"
  | "rental_agreement";

export type PropertyImage = {
  url: string;
  publicId: string;
};

export type PropertyDocument = {
  type: PropertyDocumentType;
  url: string;
  publicId: string;
  uploadedAt: string;
};

export type PropertyOwner = {
  _id: string;
  userName: string;
  email: string;
  profileImage: string;
  fullName: {
    firstName: string;
    lastName?: string;
  };
};

export type PropertyCardProps = {
  _id: string;
  slug: string;
  title: string;
  location: string;
  price: number;
  bedrooms: number;
  bathrooms: number;
  propertyType: PropertyType;
  availabilityStatus: PropertyAvailabilityStatus;
  thumbnail: PropertyImage;
  status: PropertyStatus;
};

export type Property = {
  _id: string;
  slug: string;
  title: string;
  description: string;
  location: string;
  address: string;
  zipCode: string;
  category: string;
  size: number;
  price: number;
  bedrooms: number;
  bathrooms: number;
  amenities: string[];
  images: PropertyImage[];
  thumbnail: PropertyImage;
  propertyType: PropertyType;
  propertyDocuments: PropertyDocument[];
  verifiedAt?: string;
  verifiedBy?: string;
  verificationRejectedReason?: string;
  status: PropertyStatus;
  owner: PropertyOwner;
  availabilityStatus: PropertyAvailabilityStatus;
  isDeleted: boolean;
  deletedAt?: string | null;
  createdAt: string;
  updatedAt: string;
};
