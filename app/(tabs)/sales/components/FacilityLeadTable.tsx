import { formatNumber } from "@/lib/numberHelper";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

type SortKey = "leads" | "reg" | "regRate" | "nb" | "ne";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "regRate", label: "% REG" },
  { key: "leads", label: "Lead" },
  { key: "reg", label: "REG" },
  { key: "nb", label: "NB" },
];

const rateColor = (rate: number) => {
  if (rate >= 20) return "text-emerald-600";
  if (rate >= 10) return "text-amber-600";
  return "text-red-500";
};

const rateBg = (rate: number) => {
  if (rate >= 20) return "bg-emerald-50";
  if (rate >= 10) return "bg-amber-50";
  return "bg-red-50";
};

const barColor = (rate: number) => {
  if (rate >= 20) return "#10b981";
  if (rate >= 10) return "#f59e0b";
  return "#ef4444";
};

export default function FacilityLeadTable({ data }: { data: any }) {
  const router = useRouter();

  const [expandedFacility, setExpandedFacility] = useState<string | null>(null);

  return (
    <View className="bg-white rounded-2xl overflow-hidden mb-3">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100 flex-row items-center justify-between">
        <Text className="text-sm font-bold text-gray-800">
          Cơ Sở / Sale / Lead
        </Text>
      </View>

      {/* TOTAL */}
      <View className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex-row justify-between">
        {[
          {
            label: "Tổng Lead",
            value: data?.totals?.lead,
            color: "text-gray-900",
          },
          { label: "REG", value: data?.totals?.reg, color: "text-emerald-600" },
          { label: "NB", value: data?.totals?.nb, color: "text-amber-600" },
          { label: "NE", value: data?.totals?.ne, color: "text-gray-700" },
        ].map((item) => (
          <View key={item?.label} className="items-center flex-1">
            <Text className="text-[10px] text-gray-400">{item?.label}</Text>
            <Text className={`text-sm font-bold ${item?.color}`}>
              {formatNumber(item?.value)}
            </Text>
          </View>
        ))}
      </View>

      {/* LIST */}
      {data?.by_co_so?.map((group: any, idx: number) => {
        const isExpanded = expandedFacility === group?.co_so;

        return (
          <View key={idx} className="border-b border-gray-100">
            {/* ROW */}
            <Pressable
              onPress={() =>
                setExpandedFacility(isExpanded ? null : group?.co_so)
              }
              className="px-4 py-3 flex-row items-center gap-3"
            >
              <Text className="text-xs text-gray-400 w-5">{idx + 1}.</Text>

              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-800">
                  {group?.co_so}
                </Text>

                {/* progress bar */}
                <View className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    style={{
                      width: `${Math.min(Math.max(group?.reg_percent, 0), 100)}%`,
                      backgroundColor: barColor(group?.reg_percent),
                    }}
                    className="h-full rounded-full"
                  />
                  <Text>0</Text>
                </View>
              </View>

              <View
                className={`px-2 py-1 rounded-lg ${rateBg(group?.reg_percent)}`}
              >
                <Text
                  className={`text-sm font-bold ${rateColor(group?.reg_percent)}`}
                >
                  {group?.reg_percent}%
                </Text>
              </View>

              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={18}
                color="#9ca3af"
              />
            </Pressable>

            {/* EXPANDED */}
            {isExpanded && (
              <View className="px-4 pb-4 bg-gray-50">
                {/* FACILITY TOTAL */}
                <View className="flex-row gap-2 mt-3 mb-3">
                  {[
                    {
                      label: "Lead",
                      value: formatNumber(group?.lead),
                      color: "text-gray-900",
                    },
                    {
                      label: "REG",
                      value: formatNumber(group?.reg),
                      color: "text-emerald-600",
                    },
                    {
                      label: "NB",
                      value: formatNumber(group?.nb),
                      color: "text-amber-600",
                    },
                    {
                      label: "NE",
                      value: formatNumber(group?.ne),
                      color: "text-gray-700",
                    },
                  ].map((item) => (
                    <View
                      key={item?.label}
                      className="bg-white rounded-xl p-2.5 flex-1 items-center"
                    >
                      <Text className="text-[10px] text-gray-400">
                        {item?.label}
                      </Text>
                      <Text className={`text-sm font-bold ${item?.color}`}>
                        {item?.value}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* MEMBERS */}
                <View className="gap-2">
                  {group?.children?.map((member: any, index: number) => (
                    <View key={index} className="bg-white rounded-xl p-3">
                      <Text className="text-xs font-semibold text-gray-700 mb-2">
                        {member?.nguoi_phu_trach}
                      </Text>

                      <View className="flex-row justify-between">
                        <View className="items-center flex-1">
                          <Text className="text-[10px] text-gray-400">
                            Lead
                          </Text>
                          <Text className="text-xs font-bold text-gray-800">
                            {formatNumber(member?.lead)}
                          </Text>
                        </View>

                        <View className="items-center flex-1">
                          <Text className="text-[10px] text-gray-400">REG</Text>
                          <Text
                            className={`text-xs font-bold ${rateColor(
                              member?.reg_percent,
                            )}`}
                          >
                            {formatNumber(member?.reg)} ({member?.reg_percent}%)
                          </Text>
                        </View>

                        <View className="items-center flex-1">
                          <Text className="text-[10px] text-gray-400">NB</Text>
                          <Text className="text-xs font-bold text-amber-600">
                            {formatNumber(member?.nb)}
                          </Text>
                        </View>

                        <View className="items-center flex-1">
                          <Text className="text-[10px] text-gray-400">NE</Text>
                          <Text className="text-xs font-bold text-gray-700">
                            {formatNumber(member?.ne)}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                <Pressable
                  onPress={() =>
                    router.push(
                      ("/facility-detail/" +
                        group?.co_so +
                        "?source=sale") as any,
                    )
                  }
                  className="mt-3 py-2 bg-emerald-500 rounded-xl items-center"
                >
                  <Text className="text-white text-xs font-semibold">
                    Xem chi tiết cơ sở →
                  </Text>
                </Pressable>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
