import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { saleByFacilityData } from "../../../../mocks/sale";

type SortKey = "leads" | "reg" | "regRate" | "nb" | "ne";

const SORT_OPTIONS: { key: SortKey; label: string }[] = [
  { key: "regRate", label: "% REG" },
  { key: "leads", label: "Lead" },
  { key: "reg", label: "REG" },
  { key: "nb", label: "NB" },
];

const groupByFacility = (data: typeof saleByFacilityData) => {
  const map: Record<string, typeof saleByFacilityData> = {};

  data.forEach((r) => {
    if (!map[r.facility]) map[r.facility] = [];
    map[r.facility].push(r);
  });

  return Object.entries(map).map(([facility, members]) => {
    const leads = members.reduce((s, m) => s + m.leads, 0);
    const reg = members.reduce((s, m) => s + m.reg, 0);
    const nb = members.reduce((s, m) => s + m.nb, 0);
    const ne = members.reduce((s, m) => s + m.ne, 0);

    const regRate =
      leads > 0 ? parseFloat(((reg / leads) * 100).toFixed(2)) : 0;

    return { facility, members, leads, reg, nb, ne, regRate };
  });
};

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

export default function FacilityLeadTable() {
  const router = useRouter();

  const [expandedFacility, setExpandedFacility] = useState<string | null>(null);
  const [sortKey, setSortKey] = useState<SortKey>("regRate");

  const groups = groupByFacility(saleByFacilityData);

  const sorted = [...groups].sort((a, b) => b[sortKey] - a[sortKey]);

  const totals = groups.reduce(
    (acc, g) => ({
      leads: acc.leads + g.leads,
      reg: acc.reg + g.reg,
      nb: acc.nb + g.nb,
      ne: acc.ne + g.ne,
    }),
    { leads: 0, reg: 0, nb: 0, ne: 0 },
  );

  return (
    <View className="bg-white rounded-2xl overflow-hidden mb-3">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100 flex-row items-center justify-between">
        <Text className="text-sm font-bold text-gray-800">
          Cơ Sở / Sale / Lead
        </Text>

        <View className="flex-row gap-1">
          {SORT_OPTIONS.map((opt) => (
            <Pressable
              key={opt.key}
              onPress={() => setSortKey(opt.key)}
              className={`px-2 py-1 rounded-full ${
                sortKey === opt.key ? "bg-emerald-500" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-[10px] font-semibold ${
                  sortKey === opt.key ? "text-white" : "text-gray-500"
                }`}
              >
                {opt.label}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* TOTAL */}
      <View className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex-row justify-between">
        {[
          { label: "Tổng Lead", value: totals.leads, color: "text-gray-900" },
          { label: "REG", value: totals.reg, color: "text-emerald-600" },
          { label: "NB", value: totals.nb, color: "text-amber-600" },
          { label: "NE", value: totals.ne, color: "text-gray-700" },
        ].map((item) => (
          <View key={item.label} className="items-center flex-1">
            <Text className="text-[10px] text-gray-400">{item.label}</Text>
            <Text className={`text-sm font-bold ${item.color}`}>
              {item.value.toLocaleString("vi-VN")}
            </Text>
          </View>
        ))}
      </View>

      {/* LIST */}
      {sorted.map((group, idx) => {
        const isExpanded = expandedFacility === group.facility;

        return (
          <View key={group.facility} className="border-b border-gray-100">
            {/* ROW */}
            <Pressable
              onPress={() =>
                setExpandedFacility(isExpanded ? null : group.facility)
              }
              className="px-4 py-3 flex-row items-center gap-3"
            >
              <Text className="text-xs text-gray-400 w-5">{idx + 1}.</Text>

              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-800">
                  {group.facility}
                </Text>

                {/* progress bar */}
                <View className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    style={{
                      width: `${Math.min(Math.max(group.regRate, 0), 100)}%`,
                      backgroundColor: barColor(group.regRate),
                    }}
                    className="h-full rounded-full"
                  />
                </View>
              </View>

              <View className={`px-2 py-1 rounded-lg ${rateBg(group.regRate)}`}>
                <Text
                  className={`text-sm font-bold ${rateColor(group.regRate)}`}
                >
                  {group.regRate}%
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
                      value: group.leads,
                      color: "text-gray-900",
                    },
                    {
                      label: "REG",
                      value: group.reg,
                      color: "text-emerald-600",
                    },
                    { label: "NB", value: group.nb, color: "text-amber-600" },
                    { label: "NE", value: group.ne, color: "text-gray-700" },
                  ].map((item) => (
                    <View
                      key={item.label}
                      className="bg-white rounded-xl p-2.5 flex-1 items-center"
                    >
                      <Text className="text-[10px] text-gray-400">
                        {item.label}
                      </Text>
                      <Text className={`text-sm font-bold ${item.color}`}>
                        {item.value.toLocaleString("vi-VN")}
                      </Text>
                    </View>
                  ))}
                </View>

                {/* MEMBERS */}
                <View className="gap-2">
                  {group.members.map((member) => (
                    <View key={member.id} className="bg-white rounded-xl p-3">
                      <Text className="text-xs font-semibold text-gray-700 mb-2">
                        {member.person}
                      </Text>

                      <View className="flex-row justify-between">
                        <View className="items-center flex-1">
                          <Text className="text-[10px] text-gray-400">
                            Lead
                          </Text>
                          <Text className="text-xs font-bold text-gray-800">
                            {member.leads}
                          </Text>
                        </View>

                        <View className="items-center flex-1">
                          <Text className="text-[10px] text-gray-400">REG</Text>
                          <Text
                            className={`text-xs font-bold ${rateColor(
                              member.regRate,
                            )}`}
                          >
                            {member.reg} ({member.regRate}%)
                          </Text>
                        </View>

                        <View className="items-center flex-1">
                          <Text className="text-[10px] text-gray-400">NB</Text>
                          <Text className="text-xs font-bold text-amber-600">
                            {member.nb}
                          </Text>
                        </View>

                        <View className="items-center flex-1">
                          <Text className="text-[10px] text-gray-400">NE</Text>
                          <Text className="text-xs font-bold text-gray-700">
                            {member.ne}
                          </Text>
                        </View>
                      </View>
                    </View>
                  ))}
                </View>

                <Pressable
                  onPress={() => router.push("/facility-detail/1")}
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
