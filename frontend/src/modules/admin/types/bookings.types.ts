/**
 * Represents the shape of a name object if the backend returns it as an object.
 */
export interface INameObject {
  firstName?: string;
  lastName?: string;
}

/**
 * Represents the populated User data for both Tenants and Owners.
 */
export interface IBookingUser {
  _id: string;
  fullName: string | INameObject;
  email: string;
  profileImage?: string;
}

/**
 * Represents the populated Property data inside a booking.
 */
export interface IBookingProperty {
  _id: string;
  title: string;
  location: string;
  images: string[];
}

/**
 * Represents the pure business data for a Booking returned by your Mongoose backend.
 */
export interface IBooking {
  _id: string;

  // Populated References
  property: IBookingProperty;
  tenant: IBookingUser;
  owner: IBookingUser;

  // Dates
  moveInDate: string;
  moveOutDate: string | null;

  // Financials
  monthlyRent: number;
  securityDeposit: number;
  totalAmount: number;

  // Additional Info
  phoneNumber: string;
  message?: string;

  // Statuses
  status: "pending" | "accepted" | "rejected" | "cancelled" | "completed";
  paymentStatus: "pending" | "paid" | "failed" | "refunded";
  paymentMethod?: "card" | "upi" | "net_banking" | "wallet" | "cash";
  payment?: string; // Payment ObjectId reference

  // Owner Responses & Timestamps
  ownerResponse?: string;
  respondedAt?: string | null;
  cancelledAt?: string | null;
  completedAt?: string | null;

  createdAt: string;
  updatedAt: string;
}

/**
 * Filter state managed by the parent BookingsPage
 */
export interface IBookingsFilterState {
  search: string;
  status:
    | "ALL"
    | "PENDING"
    | "ACCEPTED"
    | "REJECTED"
    | "CANCELLED"
    | "COMPLETED";
  page: number;
  limit: number;
}
