import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";

interface StatsCardProps {
  title: string;
  value: string;
  change: string;
  isPositive: boolean;
  icon: any;
  color: "emerald" | "blue" | "purple" | "orange";
}

export default function StatsCard({
  title,
  value,
  change,
  isPositive,
  icon,
  color,
}: StatsCardProps) {
  const colorClasses = {
    emerald: "bg-emerald-500",
    blue: "bg-blue-500",
    purple: "bg-purple-500",
    orange: "bg-orange-500",
  };

  const bgColorClasses = {
    emerald: "bg-emerald-50",
    blue: "bg-blue-50",
    purple: "bg-purple-50",
    orange: "bg-orange-50",
  };

  return (
    <View
      className={`${bgColorClasses[color]} rounded-2xl p-4 shadow-sm w-[47.5%]`}
    >
      <View className="flex-row items-start justify-between mb-3">
        {/* Icon */}
        <View
          className={`w-10 h-10 items-center justify-center ${colorClasses[color]} `}
          style={{ borderRadius: 12 }}
        >
          <Ionicons name={icon} size={20} color="white" />
        </View>

        {/* Change */}
        <View
          className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
            isPositive ? "bg-green-100" : "bg-red-100"
          }`}
        >
          <Ionicons
            name={isPositive ? "arrow-up" : "arrow-down"}
            size={12}
            color={isPositive ? "#16a34a" : "#dc2626"}
          />
          <Text
            className={`text-xs font-medium ${
              isPositive ? "text-green-600" : "text-red-600"
            }`}
          >
            {change}
          </Text>
        </View>
      </View>

      {/* Value */}
      <Text className="text-2xl font-bold text-gray-800 mb-1">{value}</Text>

      {/* Title */}
      <Text className="text-xs text-gray-600 font-medium">{title}</Text>
    </View>
  );
}
