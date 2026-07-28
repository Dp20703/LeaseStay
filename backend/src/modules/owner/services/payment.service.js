import Payment from "../../payments/payment.model.js";

export const getOwnerPaymentsService = async (ownerId) => {
  const [payments, totalRevenue, totalPaid, totalPending, totalFailed] =
    await Promise.all([
      Payment.find({
        landlord: ownerId,
      })
        .populate("tenant", "fullName profileImage")
        .populate("property", "title location")
        .sort({
          createdAt: -1,
        })
        .lean(),

      Payment.aggregate([
        {
          $match: {
            landlord: ownerId,
            status: "paid",
          },
        },
        {
          $group: {
            _id: null,
            revenue: {
              $sum: "$amount",
            },
          },
        },
      ]),

      Payment.countDocuments({
        landlord: ownerId,
        status: "paid",
      }),

      Payment.countDocuments({
        landlord: ownerId,
        status: "pending",
      }),

      Payment.countDocuments({
        landlord: ownerId,
        status: "failed",
      }),
    ]);

  return {
    summary: {
      totalRevenue: totalRevenue[0]?.revenue ?? 0,
      totalPaid,
      totalPending,
      totalFailed,
    },

    payments,
  };
};
