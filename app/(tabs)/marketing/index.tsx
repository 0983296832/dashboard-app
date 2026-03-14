import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

import kpiServices from "@/api/kpi";
import overviewServices from "@/api/overview";
import SelectCustom from "@/components/select-custom";
import SelectInput from "@/components/select-input";
import { ChartColors } from "@/constants";
import { formatNumber } from "@/lib/numberHelper";
import { useLoadingStore } from "@/stores/useLoadingStore";

type Period = "week" | "month" | "quarter" | "year";

const PERIODS: { value: Period; label: string }[] = [
  { value: "week", label: "Tuần" },
  { value: "month", label: "Tháng" },
  { value: "quarter", label: "Quý" },
  { value: "year", label: "Năm" },
];

export default function MKTPage() {
  const [selectedFacility, setSelectedFacility] = useState("Tất cả");
  const [periods, setPeriods] = useState("month");
  const [showFilter, setShowFilter] = useState(false);
  const [filterForm, setFilterForm] = useState<{
    co_so: null | string;
    period: string;
  }>({
    co_so: null,
    period: "month",
  });
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);
  const [totalLeads, setTotalLeads] = useState(0);
  const [sourceData, setSourceData] = useState<
    {
      name: string;
      value: number;
      color: string;
      percent: number;
      prev_percent: number;
    }[]
  >([]);
  const [kpiYear, setKpiYear] = useState<{
    soLead: number;
    percent_reg_rate: string;
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
    percent_reg_rate: "0%",
    reg: { achieved: 0, target: 0, percent: 0 },
    nb: { achieved: 0, target: 0, percent: 0 },
    ne: { achieved: 0, target: 0, percent: 0 },
  });
  const [facilitiesKPITable, setFacilitiesKPITable] = useState<any>([]);

  const MAX_ITEM = 5;

  const [showAll, setShowAll] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const reloadScreen = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await Promise.all([getLeadKpis(), getSources()]);
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
        period_type: filterForm?.co_so,
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
      const Total_prev = data?.totals?.total_lead;
      const reg_rate = parseFloat(
        ((reg_val?.actual / Total_prev) * 100).toFixed(2),
      );

      setKpiYear({
        soLead: data?.totals?.total_lead,
        percent_reg_rate: reg_rate + "%",
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
        data?.by_group?.map((v: any, index: number) => {
          const reg_val = v?.criteria_breakdown?.find(
            (v: any) => v?.filter_value == "REG",
          );
          const nb_val = v?.criteria_breakdown?.find(
            (v: any) => v?.filter_value == "NB",
          );
          const ne_val = v?.criteria_breakdown?.find(
            (v: any) => v?.filter_value == "NE",
          );
          return {
            id: index + 1,
            ...v,
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
          };
        }),
      );
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  const getSources = async () => {
    showLoading();
    try {
      const data: any = await overviewServices.getLeadPie({
        period_type: filterForm?.period,
        limit: 1000,
        group_by: "nguon_khach_hang",
        date_column: "ngay_tao",
        compare: "both",
        filter: {
          co_so: filterForm?.co_so || undefined,
        },
      });

      setSourceData(
        data?.data?.data?.map((v: any, idx: number) => ({
          name: v?.nguon_khach_hang,
          value: v?.count,
          color: ChartColors[idx + 1],
          percent: v?.percent,
          prev_percent: v?.change?.vs_previous?.percent,
        })) || [],
      );
      setTotalLeads(data?.data?.total);
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };

  useEffect(() => {
    getLeadKpis();
    getSources();
  }, [filterForm?.co_so, filterForm?.period]);

  return (
    <View className="flex-1 bg-gray-50 pb-24">
      {/* Facility filter */}
      <Pressable
        onPress={() => {
          setShowFilter(true);
        }}
        className="flex-row items-center bg-orange-500 px-4 py-2 rounded-xl  active:opacity-70 w-28 mt-2 mr-4 ml-auto"
      >
        <Ionicons name="filter" size={18} color="#fff" />

        <Text className="ml-2 text-white font-medium">Bộ lọc</Text>
      </Pressable>

      <ScrollView
        className="px-4 py-4"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadScreen} />
        }
      >
        {/* KPI */}
        <View className="flex-row gap-3 mb-4">
          {/* Lead */}
          <View className="flex-1 bg-white rounded-2xl p-3 shadow-sm items-center">
            <Text className="text-xs text-gray-400 mb-1">Tổng Lead</Text>

            <Text className="text-2xl font-bold text-gray-900">
              {formatNumber(kpiYear?.soLead)}
            </Text>
          </View>

          {/* REG */}
          <View className="flex-1 bg-white rounded-2xl p-3 shadow-sm items-center">
            <Text className="text-xs text-gray-400 mb-1">REG</Text>

            <Text className="text-2xl font-bold text-orange-500">
              {formatNumber(kpiYear?.reg?.achieved)}
            </Text>
          </View>

          {/* NB */}
          <View className="flex-1 bg-white rounded-2xl p-3 shadow-sm items-center">
            <Text className="text-xs text-gray-400 mb-1">NB Mới</Text>

            <Text className="text-2xl font-bold text-teal-500">
              {formatNumber(kpiYear?.nb?.achieved)}
            </Text>
          </View>
        </View>

        {/* Hiệu quả theo nguồn */}
        <View className="bg-white rounded-2xl shadow-sm mb-4">
          <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
            <Text className="text-sm font-bold text-gray-900">
              Hiệu Quả Theo Nguồn
            </Text>

            <Text className="text-xs text-gray-400">
              {formatNumber(totalLeads)} leads
            </Text>
          </View>

          <View className="px-4 pb-4">
            {(showAll ? sourceData : sourceData.slice(0, MAX_ITEM)).map(
              (ch) => (
                <View key={ch?.name} className="mb-3">
                  <View className="flex-row items-center justify-between mb-1">
                    <View className="flex-row items-center gap-2">
                      <Text className="text-sm text-gray-700 font-medium">
                        {ch?.name}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-3 w-max">
                      <Text className="text-sm font-bold text-gray-900">
                        {formatNumber(ch?.value)}
                      </Text>

                      <View className="flex-row items-center">
                        <Ionicons
                          name={
                            ch?.prev_percent >= 0 ? "arrow-up" : "arrow-down"
                          }
                          size={12}
                          color={ch?.prev_percent >= 0 ? "#10b981" : "#ef4444"}
                        />

                        <Text
                          className={`text-xs font-medium ${
                            ch?.prev_percent >= 0
                              ? "text-emerald-500"
                              : "text-red-500"
                          }`}
                        >
                          {ch?.prev_percent}%
                        </Text>
                      </View>

                      <Text className="text-xs text-gray-400  text-right">
                        {ch?.percent}%
                      </Text>
                    </View>
                  </View>

                  {/* Progress */}
                  <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${ch?.percent}%`,
                        backgroundColor: ch?.color,
                      }}
                    />
                  </View>
                </View>
              ),
            )}
            {sourceData.length > MAX_ITEM && (
              <Pressable onPress={() => setShowAll(!showAll)}>
                <Text className="text-xs text-blue-500 mt-2 mx-auto">
                  {showAll ? "Thu gọn" : "Xem thêm"}
                </Text>
              </Pressable>
            )}
          </View>
        </View>

        {!filterForm?.co_so && (
          <View className="bg-white rounded-2xl  overflow-hidden mb-6">
            {/* header */}
            <View className="px-4 pt-4 pb-3 border-b border-gray-50">
              <Text className="text-sm font-bold text-gray-900">
                Hiệu Quả Theo Cơ Sở
              </Text>
            </View>

            <View>
              {/* table head */}
              <View className="px-4 py-2 flex-row">
                <View className="flex-[2]">
                  <Text className="text-xs text-gray-400">Cơ sở</Text>
                </View>

                <View className="flex-1 items-center">
                  <Text className="text-xs text-gray-400">Lead</Text>
                </View>

                <View className="flex-1 items-center">
                  <Text className="text-xs text-gray-400">REG</Text>
                </View>

                <View className="flex-1 items-center">
                  <Text className="text-xs text-gray-400">NB</Text>
                </View>
              </View>

              {facilitiesKPITable.map((f: any, idx: number) => {
                return (
                  <View
                    key={idx}
                    className="px-4 py-3 flex-row items-center border-t border-gray-50"
                  >
                    {/* facility */}
                    <View className="flex-[2] flex-row items-center gap-2">
                      <View
                        className="w-7 h-7 rounded-lg items-center justify-center"
                        style={{ backgroundColor: `${ChartColors[idx]}18` }}
                      >
                        <Ionicons
                          name="business-outline"
                          size={14}
                          color={ChartColors[idx]}
                        />
                      </View>

                      <Text className="text-sm font-medium text-gray-800">
                        {f?.co_so}
                      </Text>
                    </View>

                    {/* lead */}
                    <View className="flex-1 items-center">
                      <Text className="text-sm font-bold text-gray-900">
                        {formatNumber(f?.total_lead)}
                      </Text>
                    </View>

                    {/* reg */}
                    <View className="flex-1 items-center">
                      <Text
                        className="text-sm font-bold"
                        style={{ color: ChartColors[idx] }}
                      >
                        {f?.reg?.achieved}
                      </Text>

                      {f?.reg?.percent > 0 && (
                        <Text className="text-xs text-emerald-500">
                          {f.reg?.percent}%
                        </Text>
                      )}
                    </View>

                    {/* nb */}
                    <View className="flex-1 items-center">
                      <Text className="text-sm font-bold text-teal-500">
                        {formatNumber(f?.nb?.achieved)}
                      </Text>

                      {f?.nb?.percent > 0 && (
                        <Text className="text-xs text-emerald-500">
                          {f?.nb?.percent}%
                        </Text>
                      )}
                    </View>
                  </View>
                );
              })}
            </View>
          </View>
        )}

        {/* Tỷ lệ chuyển đổi */}
        <View className="flex-row gap-3 mb-4">
          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-8 h-8 bg-orange-50 rounded-lg items-center justify-center">
                <Ionicons name="swap-horizontal" size={18} color="#f97316" />
              </View>

              <Text className="text-xs font-semibold text-gray-700">
                Tỷ lệ chuyển đổi
              </Text>
            </View>

            <Text className="text-3xl font-bold text-orange-500">
              {kpiYear?.percent_reg_rate}
            </Text>

            <Text className="text-xs text-gray-400 mt-1">
              Lead → REG trung bình
            </Text>
          </View>
        </View>
      </ScrollView>

      {/* FORM MODAL */}
      <Modal visible={showFilter} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[90%]">
            <View className="px-5 pt-5 pb-3 border-b border-gray-100 flex-row justify-between">
              <Text className="text-base font-bold">{"Bộ lọc Marketing"}</Text>

              <Pressable
                onPress={() => {
                  setShowFilter(false);
                }}
              >
                <Ionicons name="close" size={22} />
              </Pressable>
            </View>

            <View className="px-5 py-4">
              <View className="mb-4">
                <Text className="text-xs font-semibold text-gray-600 mb-1">
                  Cơ sở
                </Text>
                <View className="relative">
                  <Ionicons
                    name="business-outline"
                    size={18}
                    color="#9ca3af"
                    className="absolute top-[12px] left-[8px] z-10"
                  />
                  <SelectCustom
                    type="co_so"
                    placeholder="Chọn cơ sở"
                    isClearable
                    className="!py-3 !pr-2 !pl-10 !h-12"
                    value={selectedFacility}
                    onChange={(value) => {
                      setSelectedFacility(value);
                    }}
                  />
                </View>
              </View>
              <View className=" mb-2">
                <Text className="text-xs font-semibold text-gray-600 mb-2">
                  Thời gian
                </Text>
                <View className="relative">
                  <Ionicons
                    name="time-outline"
                    size={18}
                    color="#9ca3af"
                    className="absolute top-[12px] left-[8px] z-10"
                  />

                  <View className=" rounded-lg bg-gray-50">
                    <SelectInput
                      className="!py-3 !pr-2 !pl-10 !h-12"
                      value={periods}
                      onChange={(v) => setPeriods(v)}
                      options={PERIODS}
                    />
                  </View>
                </View>
              </View>
            </View>
            <View className="flex-row gap-2 p-2">
              <Pressable
                onPress={() => {
                  setFilterForm({ co_so: null, period: "month" });
                  setShowFilter(false);
                  setSelectedFacility("");
                }}
                className="flex-1 py-2.5 rounded-xl  items-center"
              >
                <Text className="text-sm font-semibold text-gray-600">Huỷ</Text>
              </Pressable>

              <Pressable
                onPress={() => {
                  setFilterForm({ co_so: selectedFacility, period: periods });
                  setShowFilter(false);
                }}
                className="flex-1 py-2.5 rounded-xl bg-orange-500 items-center"
              >
                <Text className="text-white text-sm font-semibold">
                  {"Áp dụng"}
                </Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}
