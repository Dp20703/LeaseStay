import { z } from "zod";

export const createPropertySchema = z.object({
  title: z
    .string()
    .trim()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title cannot exceed 120 characters"),

  description: z
    .string()
    .trim()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description cannot exceed 2000 characters"),

  location: z
    .string()
    .trim()
    .min(10, "Location must be at least 10 characters")
    .max(120, "Location cannot exceed 120 characters"),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .max(200, "Address cannot exceed 200 characters"),

  zipCode: z
    .string()
    .trim()
    .min(4, "Invalid zip code")
    .max(10, "Invalid zip code"),

  category: z.enum(["Rent", "Sale"]),

  propertyType: z.enum([
    "Apartment",
    "Villa",
    "House",
    "Studio",
    "PG",
    "Office",
  ]),

  size: z.coerce
    .number({ message: "Size must be a number" })
    .positive("Size must be greater than 0")
    .max(1_000_000, "Size is too large"),

  price: z.coerce
    .number({ message: "Price must be a number" })
    .positive("Price must be greater than 0")
    .max(1_000_000_000, "Price is too large"),

  bedrooms: z.coerce
    .number({ message: "Bedrooms must be a number" })
    .int("Bedrooms must be a whole number")
    .min(0, "Bedrooms cannot be negative")
    .max(50, "Bedrooms cannot exceed 50"),

  bathrooms: z.coerce
    .number({ message: "Bathrooms must be a number" })
    .int("Bathrooms must be a whole number")
    .min(0, "Bathrooms cannot be negative")
    .max(50, "Bathrooms cannot exceed 50"),

  amenities: z.array(z.string()).max(30, "Select at most 30 amenities").optional(),

  documentType: z.string().optional(),
});

export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;
