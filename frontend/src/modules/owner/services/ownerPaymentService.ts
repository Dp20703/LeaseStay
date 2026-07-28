import api from "@/core/api/axios";

import type { OwnerPaymentsResponse } from "../types/payment.types";

const ownerPaymentService = {
  getPayments: async (): Promise<OwnerPaymentsResponse> => {
    const response = await api.get("/owner/payments");

    return response.data.data;
  },
};

export default ownerPaymentService;
