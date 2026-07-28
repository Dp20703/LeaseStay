import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

import type { OwnerDashboard } from "../../types/dashboard.types";

const COLORS = {
  pending: "#f59e0b",
  underVerification: "#3b82f6",
  accepted: "#22c55e",
  completed: "#10b981",
  rejected: "#ef4444",
};

interface Props {
  dashboard: OwnerDashboard;
}

const DashboardBookingChart = ({ dashboard }: Props) => {
  const bookingStatus = [
    {
      name: "Pending",
      value: dashboard.bookings.pending,
      color: COLORS.pending,
    },
    {
      name: "Under Verification",
      value: dashboard.bookings.underVerification,
      color: COLORS.underVerification,
    },
    {
      name: "Accepted",
      value: dashboard.bookings.accepted,
      color: COLORS.accepted,
    },
    {
      name: "Completed",
      value: dashboard.bookings.completed,
      color: COLORS.completed,
    },
    {
      name: "Rejected",
      value:
        dashboard.bookings.total -
        dashboard.bookings.pending -
        dashboard.bookings.underVerification -
        dashboard.bookings.accepted -
        dashboard.bookings.completed,
      color: COLORS.rejected,
    },
  ];

  return (
    <div className="ls-card p-6">
      {/* Header */}

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Booking Status</h3>

        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Current booking distribution
        </p>
      </div>

      {/* Chart */}

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={bookingStatus}
              dataKey="value"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {bookingStatus.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>

            <Tooltip
              formatter={(value: number) => [value, "Bookings"]}
              contentStyle={{
                borderRadius: 16,
                border: "none",
                background: "#111827",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Legend */}

      <div className="mt-4 space-y-3">
        {bookingStatus.map((item) => (
          <div key={item.name} className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <span
                className="h-3 w-3 rounded-full"
                style={{
                  background: item.color,
                }}
              />

              <span>{item.name}</span>
            </div>

            <span className="font-semibold">{item.value}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DashboardBookingChart;
