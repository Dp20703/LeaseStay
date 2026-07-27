import { ROLES } from "../../../constants/index.js";
import Booking from "../../bookings/booking.model.js";
import Payment from "../../payments/payment.model.js";
import Property from "../../properties/property.model.js";
import User from "../../users/user.model.js";

/* ─────────────────────────────────────────────
   DASHBOARD
───────────────────────────────────────────── */

export const getDashboardStatsService = async () => {
  const [
    totalUsers,
    totalOwners,
    totalProperties,
    pendingOwnerVerifications,
    pendingPropertyVerifications,
    approvedProperties,
    rejectedProperties,
    hiddenProperties,
  ] = await Promise.all([
    User.countDocuments({
      role: ROLES.USER,
      isDeleted: false,
    }),

    User.countDocuments({
      role: ROLES.OWNER,
      isDeleted: false,
    }),

    Property.countDocuments({
      isDeleted: false,
    }),

    User.countDocuments({
      ownerVerificationStatus: "pending",
      isDeleted: false,
    }),

    Property.countDocuments({
      status: "Pending",
      isDeleted: false,
    }),

    Property.countDocuments({
      status: "Approved",
      isDeleted: false,
    }),

    Property.countDocuments({
      status: "Rejected",
      isDeleted: false,
    }),

    Property.countDocuments({
      status: "Hidden",
      isDeleted: false,
    }),
  ]);

  /* ─────────────────────────────────────────────
     RECENT ACTIVITIES
  ───────────────────────────────────────────── */

  const recentActivities = [];

  // Owner Verification
  const recentOwners = await User.find({
    ownerVerificationStatus: {
      $in: ["approved", "rejected"],
    },
  })
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();

  recentOwners.forEach((owner) => {
    recentActivities.push({
      type: owner.ownerVerificationStatus,
      title:
        owner.ownerVerificationStatus === "approved"
          ? "Owner Approved"
          : "Owner Rejected",

      subtitle: `${owner.fullName.firstName} ${owner.fullName.lastName}`,

      createdAt: owner.updatedAt,
    });
  });

  // Property Moderation
  const recentProperties = await Property.find({
    status: {
      $in: ["Approved", "Rejected", "Hidden"],
    },
  })
    .populate("owner", "fullName")
    .sort({ updatedAt: -1 })
    .limit(5)
    .lean();

  recentProperties.forEach((property) => {
    recentActivities.push({
      type: property.status,
      title: `Property ${property.status}`,
      subtitle: property.title,
      createdAt: property.updatedAt,
    });
  });

  // Bookings
  const recentBookings = await Booking.find()
    .populate("property", "title")
    .sort({ createdAt: -1 })
    .limit(5)
    .lean();

  recentBookings.forEach((booking) => {
    recentActivities.push({
      type: "booking",
      title: "Booking Created",
      subtitle: booking.property?.title ?? "Property",
      createdAt: booking.createdAt,
    });
  });

  // Payments
  const recentPayments = await Payment.find({
    status: "paid",
  })
    .populate("property", "title")
    .sort({ paidAt: -1 })
    .limit(5)
    .lean();

  recentPayments.forEach((payment) => {
    recentActivities.push({
      type: "payment",
      title: "Payment Received",
      subtitle: payment.property?.title ?? "Property",
      createdAt: payment.paidAt ?? payment.createdAt,
    });
  });

  // Sort all activities
  recentActivities.sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  );

  return {
    totalUsers,
    totalOwners,
    totalProperties,
    pendingOwnerVerifications,
    pendingPropertyVerifications,
    approvedProperties,
    rejectedProperties,
    hiddenProperties,
    recentActivities: recentActivities.slice(0, 5),
  };
};
