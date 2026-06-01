import { z } from "zod";

export const createPropertySchema = z.object({
  title: z
    .string()
    .min(5, "Title must be at least 5 characters")
    .max(120, "Title cannot exceed 120 characters"),

  description: z
    .string()
    .min(20, "Description must be at least 20 characters")
    .max(2000, "Description cannot exceed 2000 characters"),

  location: z.string().min(10, "Location must be at least 10 characters"),

  address: z.string().min(5, "Address is required"),

  zipCode: z.string().min(4, "Invalid zip code").max(10, "Invalid zip code"),

  category: z.enum(["Rent", "Sale"]),

  propertyType: z.enum([
    "Apartment",
    "Villa",
    "House",
    "Studio",
    "PG",
    "Office",
  ]),

  size: z.coerce.number().positive("Size must be greater than 0"),

  price: z.coerce.number().positive("Price must be greater than 0"),

  bedrooms: z.coerce.number().min(0, "Bedrooms cannot be negative"),

  bathrooms: z.coerce.number().min(0, "Bathrooms cannot be negative"),

  amenities: z.array(z.string()).optional({ nullable: true, checkFalsy: true }),

  documentType: z.string().optional({ nullable: true, checkFalsy: true }),
});

export type CreatePropertyFormData = z.infer<typeof createPropertySchema>;
