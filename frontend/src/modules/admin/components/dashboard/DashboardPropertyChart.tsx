import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";

import { propertyStatus } from "./dashboard.data";

const DashboardPropertyChart = () => {
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
