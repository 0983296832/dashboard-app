import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import { facilitiesKPITable, yearlyKPI } from "../../../mocks/kpi";

export default function KPIPage() {
  const router = useRouter();

  const [expandedId, setExpandedId] = useState<number | null>(null);
  const [sortField, setSortField] = useState<
    "pctReg" | "pctNb" | "pctNe" | "reg" | "nb" | "ne"
  >("pctReg");

  const sortedFacilities = [...facilitiesKPITable].sort((a, b) => {
    const av = (a as any)[sortField] ?? -1;
    const bv = (b as any)[sortField] ?? -1;
    return (bv as number) - (av as number);
  });

  const pctColor = (v: number | null) => {
    if (v === null || v === 0) return "text-red-500";
    if (v >= 30) return "text-emerald-600";
    if (v >= 15) return "text-amber-600";
    return "text-red-500";
  };

  const pctBg = (v: number | null) => {
    if (v === null || v === 0) return "bg-red-50";
    if (v >= 30) return "bg-emerald-50";
    if (v >= 15) return "bg-amber-50";
    return "bg-red-50";
  };

  return (
    <View className="flex-1 bg-gray-50 pb-20">
      <ScrollView className="px-3 py-4">
        {/* ===== TỔNG QUAN ===== */}

        <View className="bg-white rounded-xl overflow-hidden mb-4">
          <View className="px-4 py-2 bg-gray-50 border-b border-gray-100">
            <Text className="text-xs font-bold text-gray-500 uppercase">
              Tổng Quan Kế Hoạch Năm
            </Text>
          </View>

          <View className="p-4 border-b border-gray-100">
            <Text className="text-xs text-gray-400">Số Lead</Text>
            <Text className="text-3xl font-bold text-gray-900">
              {yearlyKPI.soLead.toLocaleString("vi-VN")}
            </Text>
          </View>
          <View className="flex ">
            {/* REG */}

            <View className="p-4 border-b border-gray-100 flex-1">
              <Text className="text-xs text-gray-400">KPI REG</Text>
              <Text className="text-2xl font-bold text-gray-900">
                {yearlyKPI.reg.target.toLocaleString("vi-VN")}
              </Text>

              <View className="flex-row justify-between items-end mt-2">
                <View>
                  <Text className="text-xs text-gray-400">REG</Text>
                  <Text className="text-lg font-bold text-gray-700">
                    {yearlyKPI.reg.achieved.toLocaleString("vi-VN")}
                  </Text>
                </View>

                <Text className="text-xl font-bold text-orange-500">
                  {yearlyKPI.reg.percent}%
                </Text>
              </View>

              <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-orange-400"
                  style={{ width: `${Math.min(yearlyKPI.reg.percent, 100)}%` }}
                />
              </View>
            </View>

            {/* NB */}

            <View className="p-4 border-b border-gray-100 flex-1">
              <Text className="text-xs text-gray-400">KPI NB</Text>
              <Text className="text-2xl font-bold text-gray-900">
                {yearlyKPI.nb.target.toLocaleString("vi-VN")}
              </Text>

              <View className="flex-row justify-between items-end mt-2">
                <View>
                  <Text className="text-xs text-gray-400">NB</Text>
                  <Text className="text-lg font-bold text-gray-700">
                    {yearlyKPI.nb.achieved.toLocaleString("vi-VN")}
                  </Text>
                </View>

                <Text className="text-xl font-bold text-orange-500">
                  {yearlyKPI.nb.percent}%
                </Text>
              </View>

              <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-orange-400"
                  style={{ width: `${Math.min(yearlyKPI.nb.percent, 100)}%` }}
                />
              </View>
            </View>
          </View>

          {/* NE */}

          <View className="p-4">
            <Text className="text-xs text-gray-400">KPI NE</Text>
            <Text className="text-2xl font-bold text-gray-900">
              {yearlyKPI.ne.target.toLocaleString("vi-VN")}
            </Text>

            <View className="flex-row justify-between items-end mt-2">
              <View>
                <Text className="text-xs text-gray-400">Thực tế</Text>
                <Text className="text-lg font-bold text-gray-700">
                  {yearlyKPI.ne.achieved.toLocaleString("vi-VN")}
                </Text>
              </View>

              <Text className="text-xl font-bold text-orange-500">
                {yearlyKPI.ne.percent}%
              </Text>
            </View>

            <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <View
                className="h-full bg-orange-400"
                style={{ width: `${Math.min(yearlyKPI.ne.percent, 100)}%` }}
              />
            </View>
          </View>
        </View>

        {/* ===== CHI TIẾT CƠ SỞ ===== */}

        <View className="bg-white rounded-xl overflow-hidden">
          <View className="px-4 py-2 bg-gray-50 border-b border-gray-100 flex-row justify-between items-center">
            <Text className="text-xs font-bold text-gray-500 uppercase">
              Chi Tiết Theo Cơ Sở
            </Text>

            <View className="flex-row gap-x-1">
              {(["pctReg", "pctNb", "pctNe"] as const).map((f) => (
                <Pressable
                  key={f}
                  onPress={() => setSortField(f)}
                  className={`px-2 py-1 rounded-full ${
                    sortField === f ? "bg-orange-500" : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-[10px] font-semibold ${
                      sortField === f ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {f === "pctReg" ? "% REG" : f === "pctNb" ? "% NB" : "% NE"}
                  </Text>
                </Pressable>
              ))}
            </View>
          </View>

          {sortedFacilities.map((f, idx) => {
            const isExpanded = expandedId === f.id;
            const pct = f[sortField] as number | null;

            return (
              <View key={f.id}>
                <Pressable
                  className="flex-row items-center px-4 py-3"
                  onPress={() => setExpandedId(isExpanded ? null : f.id)}
                >
                  <Text className="text-xs text-gray-400 w-5">{idx + 1}.</Text>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-800">
                      {f.name}
                    </Text>

                    <View className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-orange-400"
                        style={{
                          width: `${Math.min(Math.max(pct ?? 0, 0), 100)}%`,
                        }}
                      />
                    </View>
                  </View>

                  <View className={`ml-2 px-2 py-1 rounded-lg ${pctBg(pct)}`}>
                    <Text className={`text-sm font-bold ${pctColor(pct)}`}>
                      {pct !== null ? `${pct}%` : "—"}
                    </Text>
                  </View>

                  <Ionicons
                    name={isExpanded ? "chevron-up" : "chevron-down"}
                    size={18}
                    color="#9ca3af"
                    style={{ marginLeft: 6 }}
                  />
                </Pressable>

                {isExpanded && (
                  <View className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                    <View className="flex-row gap-2 mt-3 mb-3">
                      {/* Thực đạt */}
                      <View className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                        <Text className="text-[10px] text-gray-400 font-semibold uppercase mb-2">
                          Thực đạt
                        </Text>

                        <View className="gap-y-1.5">
                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">Lead</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {f.soLead.toLocaleString("vi-VN")}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">REG</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {f.reg.toLocaleString("vi-VN")}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NB</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {f.nb.toLocaleString("vi-VN")}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NE</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {f.ne.toLocaleString("vi-VN")}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* KPI */}
                      <View className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                        <Text className="text-[10px] text-amber-600 font-semibold uppercase mb-2">
                          KPI
                        </Text>

                        <View className="gap-y-1.5">
                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">REG</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {f.kpiReg.toLocaleString("vi-VN")}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NB</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {f.kpiNb > 0
                                ? f.kpiNb.toLocaleString("vi-VN")
                                : "—"}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NE</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {f.kpiNe.toLocaleString("vi-VN")}
                            </Text>
                          </View>
                        </View>
                      </View>

                      {/* % KPI */}
                      <View className="flex-1 bg-white rounded-xl p-3 shadow-sm">
                        <Text className="text-[10px] text-emerald-600 font-semibold uppercase mb-2">
                          % KPI
                        </Text>

                        <View className="gap-y-1.5">
                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">REG</Text>
                            <Text
                              className={`text-xs font-bold ${pctColor(f.pctReg)}`}
                            >
                              {f.pctReg}%
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NB</Text>
                            <Text
                              className={`text-xs font-bold ${pctColor(f.pctNb)}`}
                            >
                              {f.pctNb !== null ? `${f.pctNb}%` : "—"}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text
                              className={`text-xs font-bold ${pctColor(f.pctNe)}`}
                            >
                              {f.pctNe}%
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Button */}

                    <Pressable
                      onPress={() => router.push(`/facility-detail/${f.id}`)}
                      className="w-full py-2 bg-orange-500 rounded-xl flex-row justify-center items-center"
                    >
                      <Text className="text-xs font-semibold text-white mr-1">
                        Xem chi tiết cơ sở
                      </Text>

                      <Ionicons name="arrow-forward" size={14} color="white" />
                    </Pressable>
                  </View>
                )}
              </View>
            );
          })}
        </View>
        <View className="flex-row gap-3 mt-6">
          {/* Card 1 */}
          <View className="flex-1 bg-white rounded-xl shadow-sm p-4 items-center justify-center">
            <View className="w-10 h-10 items-center justify-center bg-orange-50 rounded-full mb-2">
              <Ionicons name="bar-chart-outline" size={20} color="#f97316" />
            </View>

            <Text className="text-2xl font-bold text-orange-500">
              {yearlyKPI.reg.percent}%
            </Text>

            <Text className="text-xs text-gray-500 mt-0.5 text-center">
              Tỷ lệ hoàn thành KPI
            </Text>
          </View>

          {/* Card 2 */}
          <View className="flex-1 bg-white rounded-xl shadow-sm p-4 items-center justify-center">
            <View className="w-10 h-10 items-center justify-center bg-orange-50 rounded-full mb-2">
              <Ionicons name="calendar-outline" size={20} color="#f97316" />
            </View>

            <Text className="text-2xl font-bold text-orange-500">
              {yearlyKPI.monthsPassed}/12
            </Text>

            <Text className="text-xs text-gray-500 mt-0.5 text-center">
              Tháng đã qua
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
