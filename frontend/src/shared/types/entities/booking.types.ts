export interface Booking {
  _id: string;

  property: Property;

  moveInDate: string;

  moveOutDate?: string;

  phoneNumber: string;

  message?: string;

  status: "pending" | "accepted" | "rejected" | "cancelled";

  paymentStatus: "pending" | "paid";
}
