export interface IPaymentUser {
  _id: string;
  fullName: string | { firstName?: string; lastName?: string };
  email: string;
  profileImage?: string;
}

export interface IPaymentProperty {
  _id: string;
  title: string;
  location: string;
}

export interface IPaymentBooking {
  _id: string;
  bookingReference?: string;
}

export interface IPayment {
  _id: string;
  property: IPaymentProperty;
  tenant: IPaymentUser;
  landlord: IPaymentUser;
  booking?: IPaymentBooking;
  amount: number;
  currency: string;
  status: "created" | "pending" | "paid" | "failed" | "refunded" | "cancelled";
  gateway: "razorpay" | "stripe" | "cashfree";
  paymentType:
    | "rent"
    | "security_deposit"
    | "booking"
    | "subscription"
    | "other";
  orderId: string;
  paymentId?: string;
  paymentMethod: "upi" | "card" | "netbanking" | "wallet" | "emi" | "unknown";
  paidAt?: string;
  createdAt: string;
  updatedAt: string;
}

export interface IPaymentsFilterState {
  search: string;
  status: "ALL" | "PAID" | "PENDING" | "FAILED" | "REFUNDED" | "CANCELLED";
  page: number;
  limit: number;
}
