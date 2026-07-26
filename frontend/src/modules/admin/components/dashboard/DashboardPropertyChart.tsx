import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts";

interface DashboardPropertyChartProps {
  approved: number;
  pending: number;
  rejected: number;
  hidden: number;
}

const COLORS = {
  approved: "#22c55e",
  pending: "#f59e0b",
  rejected: "#ef4444",
  hidden: "#6366f1",
};

const DashboardPropertyChart = ({
  approved,
  pending,
  rejected,
  hidden,
}: DashboardPropertyChartProps) => {
  const propertyStatus = [
    {
      name: "Approved",
      value: approved,
      color: COLORS.approved,
    },
    {
      name: "Pending",
      value: pending,
      color: COLORS.pending,
    },
    {
      name: "Rejected",
      value: rejected,
      color: COLORS.rejected,
    },
    {
      name: "Hidden",
      value: hidden,
      color: COLORS.hidden,
    },
  ];

  return (
    <div className="ls-card p-6">
      <div className="mb-6">
        <h3 className="text-lg font-semibold">Property Status</h3>

        <p className="text-sm text-text-muted dark:text-text-darkMuted">
          Current property distribution
        </p>
      </div>

      <div className="h-[320px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={propertyStatus}
              dataKey="value"
              innerRadius={65}
              outerRadius={95}
              paddingAngle={4}
            >
              {propertyStatus.map((item) => (
                <Cell key={item.name} fill={item.color} />
              ))}
            </Pie>

            <Tooltip
              contentStyle={{
                borderRadius: 16,
                border: "none",
                background: "#111827",
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>

      <div className="mt-4 space-y-3">
        {propertyStatus.map((item) => (
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

export default DashboardPropertyChart;
