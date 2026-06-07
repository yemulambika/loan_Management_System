import React from "react";

interface StatCardProps {
  label: string;
  value: string | number;
  icon?: React.ReactNode;
  color?: "blue" | "green" | "purple" | "orange" | "red";
  trend?: "up" | "down";
  trendValue?: string;
}

const colorMap = {
  blue: "from-blue-500 to-blue-600",
  green: "from-green-500 to-green-600",
  purple: "from-purple-500 to-purple-600",
  orange: "from-orange-500 to-orange-600",
  red: "from-red-500 to-red-600",
};

export default function StatCard({
  label,
  value,
  icon,
  color = "blue",
  trend,
  trendValue,
}: StatCardProps) {
  return (
    <div
      className={`
        bg-gradient-to-br ${colorMap[color]}
        rounded-lg p-6 text-white shadow-lg
        transform hover:scale-105 transition-all duration-300
      `}
    >
      <div className="flex items-start justify-between mb-4">
        <div>
          <p className="text-sm font-medium opacity-90">{label}</p>
          <p className="text-3xl font-bold mt-2">{value}</p>
        </div>
        {icon && <div className="text-white/80">{icon}</div>}
      </div>

      {trend && trendValue && (
        <div
          className={`text-sm font-semibold ${
            trend === "up" ? "text-green-100" : "text-red-100"
          }`}
        >
          {trend === "up" ? "↑" : "↓"} {trendValue}
        </div>
      )}
    </div>
  );
}
