import Booking from "../../bookings/booking.model.js";
import Payment from "../../payments/payment.model.js";
import Property from "../../properties/property.model.js";

export const getDashboardService = async (ownerId) => {
  /* -----------------------------------------------------
     Dashboard Counts
  ----------------------------------------------------- */

  const [
    totalProperties,
    approvedProperties,
    pendingProperties,
    rejectedProperties,

    totalBookings,
    pendingBookings,
    underVerificationBookings,
    acceptedBookings,
    completedBookings,
    rejectedBookings,

    totalRevenue,
  ] = await Promise.all([
    // Properties
    Property.countDocuments({
      owner: ownerId,
      isDeleted: false,
    }),

    Property.countDocuments({
      owner: ownerId,
      status: "Approved",
      isDeleted: false,
    }),

    Property.countDocuments({
      owner: ownerId,
      status: "Pending",
      isDeleted: false,
    }),

    Property.countDocuments({
      owner: ownerId,
      status: "Rejected",
      isDeleted: false,
    }),

    // Bookings
    Booking.countDocuments({
      owner: ownerId,
    }),

    Booking.countDocuments({
      owner: ownerId,
      status: "pending",
    }),

    Booking.countDocuments({
      owner: ownerId,
      status: "under_verification",
    }),

    Booking.countDocuments({
      owner: ownerId,
      status: "accepted",
    }),

    Booking.countDocuments({
      owner: ownerId,
      status: "completed",
    }),

    Booking.countDocuments({
      owner: ownerId,
      status: "rejected",
    }),

    // Total Revenue
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
          totalRevenue: {
            $sum: "$amount",
          },
        },
      },
    ]),
  ]);

  /* -----------------------------------------------------
     Monthly Revenue
  ----------------------------------------------------- */

  const monthlyRevenue = await Payment.aggregate([
    {
      $match: {
        landlord: ownerId,
        status: "paid",
      },
    },
    {
      $group: {
        _id: {
          $month: "$createdAt",
        },

        revenue: {
          $sum: "$amount",
        },
      },
    },
    {
      $sort: {
        _id: 1,
      },
    },
  ]);

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const revenueMap = new Map(
    monthlyRevenue.map((item) => [item._id, item.revenue]),
  );

  const formattedMonthlyRevenue = months.map((month, index) => ({
    month,
    revenue: revenueMap.get(index + 1) || 0,
  }));

  /* -----------------------------------------------------
     Recent Bookings
  ----------------------------------------------------- */

  const recentBookings = await Booking.find({
    owner: ownerId,
  })
    .populate("tenant", "fullName profileImage email")
    .populate("property", "title slug location thumbnail price")
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .lean();

  /* -----------------------------------------------------
     Recent Properties
  ----------------------------------------------------- */

  const recentProperties = await Property.find({
    owner: ownerId,
    isDeleted: false,
  })
    .sort({
      createdAt: -1,
    })
    .limit(5)
    .lean();

  /* -----------------------------------------------------
     Response
  ----------------------------------------------------- */

  return {
    properties: {
      total: totalProperties,
      approved: approvedProperties,
      pending: pendingProperties,
      rejected: rejectedProperties,
    },

    bookings: {
      total: totalBookings,
      pending: pendingBookings,
      underVerification: underVerificationBookings,
      accepted: acceptedBookings,
      completed: completedBookings,
      rejected: rejectedBookings,
    },

    revenue: {
      total: totalRevenue?.[0]?.totalRevenue ?? 0,
      monthlyRevenue: formattedMonthlyRevenue,
    },

    recentBookings,
    recentProperties,
  };
};
