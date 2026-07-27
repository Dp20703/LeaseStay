import Payment from "../../payments/payment.model.js";

/* ─────────────────────────────────────────────
   PAYMENTS
───────────────────────────────────────────── */

// FETCH ALL PAYMENTS
export const fetchAllPaymentsService = async () => {
  return await Payment.find()
    .populate("property", "title location")
    .populate("tenant", "fullName email profileImage")
    .populate("landlord", "fullName email profileImage")
    .populate("booking", "bookingReference")
    .sort({
      createdAt: -1,
    });
};

// PAYMENT STATS
export const getPaymentStatsService = async () => {
  const stats = await Payment.getStats();

  let totalRevenue = 0;
  let successfulCount = 0;
  let pendingCount = 0;

  stats.forEach((item) => {
    if (item._id === "paid") {
      totalRevenue += item.totalAmount;
      successfulCount += item.count;
    }

    if (item._id === "pending" || item._id === "created") {
      pendingCount += item.count;
    }
  });

  return {
    stats,
    totalRevenue,
    successfulCount,
    pendingCount,
  };
};
