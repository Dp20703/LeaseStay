export interface OwnerPaymentSummary {
  totalRevenue: number;
  totalPaid: number;
  totalPending: number;
  totalFailed: number;
}

export interface OwnerPayment {
  _id: string;
  amount: number;
  status: string;
  paymentType: string;
  paymentMethod: string;
  orderId: string;
  createdAt: string;
  paidAt?: string;
  tenant: {
    _id: string;
    fullName: {
      firstName: string;
      lastName: string;
    };
    email: string;
    profileImage?: {
      url: string;
    };
  };

  property: {
    _id: string;
    title: string;
    location: string;
  };
}

export interface OwnerPaymentsResponse {
  summary: OwnerPaymentSummary;
  payments: OwnerPayment[];
}
