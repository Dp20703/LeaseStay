export interface Booking {
  _id: string;
  property: {
    _id: string;
    title: string;
    location: string;
  };
  totalAmount: number;
  moveInDate: string;
  paymentStatus: string;
}

export interface CreateOrderResponse {
  order: {
    id: string;
    amount: number;
    currency: string;
  };
}
