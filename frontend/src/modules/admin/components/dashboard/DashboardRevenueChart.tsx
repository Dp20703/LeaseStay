import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis } from "recharts";
import type { AdminDashboardData } from "../../types";

interface DashboardRevenueChartProps {
  stats: AdminDashboardData | null;
}

const DashboardRevenueChart = ({ stats }: DashboardRevenueChartProps) => {
  return (
    <div className="ls-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Revenue Overview</h3>

        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Monthly revenue generated
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart data={stats?.monthlyRevenue}>
            <defs>
              <linearGradient id="revenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#6366F1" stopOpacity={0.45} />
                <stop offset="95%" stopColor="#6366F1" stopOpacity={0} />
              </linearGradient>
            </defs>

            <XAxis dataKey="month" tickLine={false} axisLine={false} />

            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "none",
                background: "#111827",
              }}
            />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#6366F1"
              strokeWidth={3}
              fill="url(#revenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default DashboardRevenueChart;
