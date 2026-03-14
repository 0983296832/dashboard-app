import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import kpiServices from "@/api/kpi";
import { formatNumber } from "@/lib/numberHelper";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { yearlyKPI } from "../../../mocks/kpi";

type Period = "week" | "month" | "quarter" | "year";

const PERIODS: { key: Period; label: string }[] = [
  { key: "week", label: "Tuần" },
  { key: "month", label: "Tháng" },
  { key: "quarter", label: "Quý" },
  { key: "year", label: "Năm" },
];

interface PeriodFilterProps {
  value: Period;
  onChange: (p: Period) => void;
}
function PeriodFilter({ value, onChange }: PeriodFilterProps) {
  return (
    <View className="flex-row gap-1">
      {PERIODS.map((p) => {
        const active = value === p.key;

        return (
          <Pressable
            key={p.key}
            onPress={() => onChange(p.key)}
            className={`px-2 py-0.5 rounded-full ${
              active ? "bg-orange-500" : "bg-gray-100 active:bg-gray-200"
            }`}
          >
            <Text
              className={`text-[10px] font-semibold ${
                active ? "text-white" : "text-gray-500"
              }`}
            >
              {p.label}
            </Text>
          </Pressable>
        );
      })}
    </View>
  );
}

export default function KPIPage() {
  const router = useRouter();
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);
  const [expandedId, setExpandedId] = useState<number | null>(null);

  const [facilityPeriod, setFacilityPeriod] = useState<Period>("month");
  const [kpiYear, setKpiYear] = useState<{
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
  }>({
    soLead: 0,
    reg: { achieved: 0, target: 0, percent: 0 },
    nb: { achieved: 0, target: 0, percent: 0 },
    ne: { achieved: 0, target: 0, percent: 0 },
  });
  const [facilitiesKPITable, setFacilitiesKPITable] = useState<any>([]);
  const [refreshing, setRefreshing] = useState(false);

  const reloadScreen = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await Promise.all([getLeadKpis()]);
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const getLeadKpis = async () => {
    try {
      showLoading();
      const { data } = await kpiServices.getLeadKpi({
        period_type: facilityPeriod,
        group_by: "co_so",
        status_values: ["REG", "NB", "NE"].join(","),
        date_column: "ngay_tao",
      });
      const reg_val = data?.totals?.criteria_breakdown?.find(
        (v: any) => v?.filter_value == "REG",
      );
      const nb_val = data?.totals?.criteria_breakdown?.find(
        (v: any) => v?.filter_value == "NB",
      );
      const ne_val = data?.totals?.criteria_breakdown?.find(
        (v: any) => v?.filter_value == "NE",
      );

      setKpiYear({
        soLead: data?.totals?.total_lead,
        reg: {
          achieved: reg_val?.actual,
          target: reg_val?.target,
          percent: reg_val?.percent,
        },
        nb: {
          achieved: nb_val?.actual,
          target: nb_val?.target,
          percent: nb_val?.percent,
        },
        ne: {
          achieved: ne_val?.actual,
          target: ne_val?.target,
          percent: ne_val?.percent,
        },
      });
      setFacilitiesKPITable(
        data?.by_group?.map((v: any, index: number) => ({
          id: index + 1,
          ...v,
        })),
      );
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    getLeadKpis();
  }, [facilityPeriod]);

  return (
    <View className="flex-1 bg-gray-50 pb-20">
      <ScrollView
        className="px-3 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadScreen} />
        }
      >
        <Pressable
          onPress={() => router.push("/kpi-config")}
          className="w-full flex-row items-center justify-between px-4 py-3 bg-white rounded-xl border border-orange-100"
        >
          <View className="flex-row items-center gap-3">
            <View className="w-9 h-9 items-center justify-center bg-orange-50 rounded-xl">
              <Ionicons name="settings-outline" size={20} color="#f97316" />
            </View>

            <View>
              <Text className="text-sm font-semibold text-gray-800">
                Cấu hình KPI Target
              </Text>
              <Text className="text-xs text-gray-400">
                Thêm, sửa, xoá chỉ tiêu theo kỳ
              </Text>
            </View>
          </View>

          <Ionicons name="chevron-forward-outline" size={22} color="#9ca3af" />
        </Pressable>
        {/* ===== TỔNG QUAN ===== */}

        <View className="bg-white rounded-xl overflow-hidden mb-4">
          <View className="flex-row justify-between items-center px-4 py-2 bg-gray-50 border-b border-gray-100">
            <Text className="text-xs font-bold text-gray-500 uppercase">
              Tổng Quan Kế Hoạch Năm
            </Text>
            <PeriodFilter value={facilityPeriod} onChange={setFacilityPeriod} />
          </View>

          <View className="p-4 border-b border-gray-100">
            <Text className="text-xs text-gray-400">Số Lead</Text>
            <Text className="text-3xl font-bold text-gray-900">
              {kpiYear?.soLead.toLocaleString("vi-VN")}
            </Text>
          </View>
          <View className="flex flex-row">
            {/* REG */}

            <View className="p-4 border-b border-gray-100 flex-1">
              <Text className="text-xs text-gray-400">KPI REG</Text>
              <Text className="text-2xl font-bold text-gray-900">
                {kpiYear?.reg.target.toLocaleString("vi-VN")}
              </Text>

              <View className="flex-row justify-between items-end mt-2">
                <View>
                  <Text className="text-xs text-gray-400">REG</Text>
                  <Text className="text-lg font-bold text-gray-700">
                    {kpiYear?.reg.achieved.toLocaleString("vi-VN")}
                  </Text>
                </View>

                <Text className="text-xl font-bold text-orange-500">
                  {kpiYear?.reg.percent}%
                </Text>
              </View>

              <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-orange-400"
                  style={{ width: `${Math.min(kpiYear?.reg.percent, 100)}%` }}
                />
              </View>
            </View>

            {/* NB */}

            <View className="p-4 border-b border-gray-100 flex-1">
              <Text className="text-xs text-gray-400">KPI NB</Text>
              <Text className="text-2xl font-bold text-gray-900">
                {kpiYear?.nb.target.toLocaleString("vi-VN")}
              </Text>

              <View className="flex-row justify-between items-end mt-2">
                <View>
                  <Text className="text-xs text-gray-400">NB</Text>
                  <Text className="text-lg font-bold text-gray-700">
                    {kpiYear?.nb.achieved.toLocaleString("vi-VN")}
                  </Text>
                </View>

                <Text className="text-xl font-bold text-orange-500">
                  {kpiYear?.nb.percent}%
                </Text>
              </View>

              <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                <View
                  className="h-full bg-orange-400"
                  style={{ width: `${Math.min(kpiYear?.nb.percent, 100)}%` }}
                />
              </View>
            </View>
          </View>

          {/* NE */}

          <View className="p-4">
            <Text className="text-xs text-gray-400">KPI NE</Text>
            <Text className="text-2xl font-bold text-gray-900">
              {kpiYear?.ne.target.toLocaleString("vi-VN")}
            </Text>

            <View className="flex-row justify-between items-end mt-2">
              <View>
                <Text className="text-xs text-gray-400">Thực tế</Text>
                <Text className="text-lg font-bold text-gray-700">
                  {kpiYear?.ne.achieved.toLocaleString("vi-VN")}
                </Text>
              </View>

              <Text className="text-xl font-bold text-orange-500">
                {kpiYear?.ne.percent}%
              </Text>
            </View>

            <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
              <View
                className="h-full bg-orange-400"
                style={{ width: `${Math.min(kpiYear?.ne.percent, 100)}%` }}
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
          </View>

          {facilitiesKPITable.map((f: any, idx: number) => {
            const isExpanded = expandedId === f?.id;
            const reg_val = f?.criteria_breakdown?.find(
              (v: { filter_value: string }) => v?.filter_value == "REG",
            );
            const nb_val = f?.criteria_breakdown?.find(
              (v: { filter_value: string }) => v?.filter_value == "NB",
            );
            const ne_val = f?.criteria_breakdown?.find(
              (v: { filter_value: string }) => v?.filter_value == "NE",
            );
            return (
              <View key={idx}>
                <Pressable
                  className="flex-row items-center px-4 py-3"
                  onPress={() => setExpandedId(isExpanded ? null : f?.id)}
                >
                  <Text className="text-xs text-gray-400 w-5">{idx + 1}.</Text>

                  <View className="flex-1">
                    <Text className="text-sm font-semibold text-gray-800">
                      {f?.co_so}
                    </Text>

                    <View className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                      <View
                        className="h-full bg-orange-400"
                        style={{
                          width: `${Math.min(
                            Math.max(f?.total_kpi_percent ?? 0, 0),
                            100,
                          )}%`,
                        }}
                      />
                    </View>
                  </View>

                  <View className={`ml-2 px-2 py-1 rounded-lg bg-amber-50`}>
                    <Text className={`text-sm font-bold text-amber-600`}>
                      {f?.total_kpi_percent !== null
                        ? `${f?.total_kpi_percent}%`
                        : "—"}
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
                              {formatNumber(f?.total_lead)}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">REG</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {formatNumber(reg_val?.actual)}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NB</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {formatNumber(nb_val?.actual)}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NE</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {formatNumber(ne_val?.actual)}
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
                              {formatNumber(reg_val?.target)}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NB</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {formatNumber(nb_val?.target)}
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NE</Text>
                            <Text className="text-xs font-bold text-gray-800">
                              {formatNumber(ne_val?.target)}
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
                              className={`text-xs font-bold text-amber-600`}
                            >
                              {formatNumber(reg_val?.percent)}%
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NB</Text>
                            <Text
                              className={`text-xs font-bold text-amber-600`}
                            >
                              {formatNumber(nb_val?.percent)}%
                            </Text>
                          </View>

                          <View className="flex-row justify-between items-center">
                            <Text className="text-xs text-gray-500">NE</Text>
                            <Text
                              className={`text-xs font-bold text-amber-600`}
                            >
                              {formatNumber(ne_val?.percent)}%
                            </Text>
                          </View>
                        </View>
                      </View>
                    </View>

                    {/* Button */}

                    <Pressable
                      onPress={() =>
                        router.push(
                          (`/facility-detail/${f?.co_so}` +
                            "?source=kpi") as any,
                        )
                      }
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
