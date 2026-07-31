import { z } from "zod";

const bookingSchema = z.object({
  moveInDate: z.string(),
  moveOutDate: z.string().optional({ nullable: true, checkFalsy: true }),
  phoneNumber: z.string(),
  message: z.string().optional(),
});

export type CreateBookingFormData = z.infer<typeof bookingSchema>;
