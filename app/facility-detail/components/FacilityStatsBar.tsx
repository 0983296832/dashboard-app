import { formatNumber } from "@/lib/numberHelper";
import { Text, View } from "react-native";

export default function FacilityStatsBar({
  facility,
}: {
  facility: {
    soLead: number;
    reg: {
      achieved: number;
      target: number;
      percent: number;
    };
    nb: {
      achieved: number;
      target: number;
      percent: number;
    };
    ne: {
      achieved: number;
      target: number;
      percent: number;
    };
    total_kpi_percent: number;
  };
}) {
  return (
    <View className="bg-white rounded-2xl shadow-sm p-4 gap-y-4">
      {/* Stats */}
      <View className="flex-row gap-3">
        <View className="flex-1 bg-emerald-50 rounded-xl p-3 items-center">
          <Text className="text-xs text-gray-500 mb-1">REG</Text>
          <Text className="text-2xl font-bold text-gray-800">
            {formatNumber(facility?.reg?.achieved)}
          </Text>
        </View>

        <View className="flex-1 bg-teal-50 rounded-xl p-3 items-center">
          <Text className="text-xs text-gray-500 mb-1">NB</Text>
          <Text className="text-2xl font-bold text-gray-800">
            {formatNumber(facility?.nb?.achieved)}
          </Text>
        </View>

        <View className="flex-1 bg-green-50 rounded-xl p-3 items-center">
          <Text className="text-xs text-gray-500 mb-1">NE</Text>
          <Text className="text-2xl font-bold text-gray-800">
            {formatNumber(facility?.ne?.achieved)}
          </Text>
        </View>
      </View>

      {/* KPI Progress */}
      <View>
        <View className="flex-row items-center justify-between mb-1">
          <Text className="text-xs text-gray-600 font-medium">Tiến độ KPI</Text>
          <Text className="text-xs font-bold text-gray-800">
            {facility?.total_kpi_percent}%
          </Text>
        </View>

        <View className="w-full h-3 bg-gray-100 rounded-full overflow-hidden">
          <View
            className={`h-full rounded-full bg-emerald-500`}
            style={{ width: `${Math.min(facility?.total_kpi_percent, 100)}%` }}
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
