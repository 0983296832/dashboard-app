import { Text, View } from "react-native";

interface FacilityStatsBarProps {
  reg: number;
  ne: number;
  regRate: number;
  kpi: number;
  status: "excellent" | "good" | "warning" | "danger";
}

export default function FacilityStatsBar({
  reg,
  ne,
  regRate,
  kpi,
  status,
}: FacilityStatsBarProps) {
  const badgeColor = {
    excellent: "bg-emerald-500",
    good: "bg-blue-500",
    warning: "bg-yellow-500",
    danger: "bg-red-500",
  }[status];

  return (
    <View className="bg-white rounded-2xl shadow-sm p-4 gap-y-4">
      {/* Stats */}
      <View className="flex-row gap-3">
        <View className="flex-1 bg-emerald-50 rounded-xl p-3 items-center">
          <Text className="text-xs text-gray-500 mb-1">REG</Text>
          <Text className="text-2xl font-bold text-gray-800">{reg}</Text>
        </View>

        <View className="flex-1 bg-teal-50 rounded-xl p-3 items-center">
          <Text className="text-xs text-gray-500 mb-1">NE</Text>
          <Text className="text-2xl font-bold text-gray-800">{ne}</Text>
        </View>

        <View className="flex-1 bg-green-50 rounded-xl p-3 items-center">
          <Text className="text-xs text-gray-500 mb-1">REG Rate</Text>
          <Text className="text-2xl font-bold text-gray-800">{regRate}%</Text>
        </View>
      </View>

      {/* KPI Progress */}
      <View>
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-xs text-gray-600 font-medium">Tiến độ KPI</Text>
          <Text className="text-xs font-bold text-gray-800">{kpi}%</Text>
        </View>

        <View className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <View
            className={`h-full rounded-full ${badgeColor}`}
            style={{ width: `${Math.min(kpi, 100)}%` }}
          />
        </View>

        <View className="flex-row justify-between mt-1">
          <Text className="text-xs text-gray-400">0%</Text>
          <Text className="text-xs text-gray-400">Mục tiêu 100%</Text>
        </View>
      </View>
    </View>
  );
}
