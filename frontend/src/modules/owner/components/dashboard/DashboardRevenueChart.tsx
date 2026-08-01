import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

import type { OwnerDashboard } from "../../types/dashboard.types";

interface Props {
  dashboard: OwnerDashboard;
}

const DashboardRevenueChart = ({ dashboard }: Props) => {
  return (
    <div className="ls-card p-6">
      {/* Header */}

      <div className="mb-6">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>

        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Monthly revenue generated from successful bookings.
        </p>
      </div>

      {/* Chart */}

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={dashboard.revenue.monthlyRevenue}
            margin={{
              top: 10,
              right: 10,
              left: -20,
              bottom: 0,
            }}
          >
            <defs>
              <linearGradient id="ownerRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#4F46E5" stopOpacity={0.35} />

                <stop offset="95%" stopColor="#4F46E5" stopOpacity={0} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" strokeOpacity={0.25} />

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <YAxis tickLine={false} axisLine={false} />

            <Tooltip
              formatter={(value) => [
                `₹${Number(value ?? 0).toLocaleString()}`,
                "Revenue",
              ]}
              contentStyle={{
                borderRadius: 14,
                border: "none",
                background: "#111827",
              }}
              labelStyle={{
                color: "#fff",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#4F46E5"
              strokeWidth={3}
              fill="url(#ownerRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>

      {/* Footer */}

      <div className="mt-5 flex items-center justify-between border-t border-border-light pt-4 dark:border-border-dark">
        <div>
          <p className="text-sm text-text-muted dark:text-text-darkMuted">
            Total Revenue
          </p>

          <p className="text-xl font-bold">
            ₹{dashboard.revenue.total.toLocaleString()}
          </p>
        </div>

        <div className="rounded-xl bg-primary/10 px-4 py-2 text-sm font-semibold text-primary">
          This Year
        </div>
      </div>
    </div>
  );
};

export default DashboardRevenueChart;
