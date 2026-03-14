import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

import kpiServices from "@/api/kpi";
import overviewServices from "@/api/overview";
import { ChartColors } from "@/constants";
import { useLoadingStore } from "@/stores/useLoadingStore";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import FacilityMiniChart from "./components/FacilityMiniChart";
import FacilityStatsBar from "./components/FacilityStatsBar";
import LeadTable from "./components/LeadTable";

const tabs = [
  { id: "overview", label: "Tổng quan", icon: "bar-chart" },
  { id: "leads", label: "Danh sách Lead", icon: "person-add" },
];

type Period = "week" | "month" | "quarter" | "year";

const PERIODS: { key: Period; label: string }[] = [
  { key: "week", label: "Tuần" },
  { key: "month", label: "Tháng" },
  { key: "quarter", label: "Quý" },
  { key: "year", label: "Năm" },
];

interface Dataset {
  label: string;
  data: number[];
  color: string;
  dashed?: boolean;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

function PeriodFilter({
  value,
  onChange,
}: {
  value: Period;
  onChange: (p: Period) => void;
}) {
  return (
    <View className="flex-row justify-between gap-1">
      {PERIODS.map((p) => {
        const active = value === p.key;

        return (
          <Pressable
            key={p.key}
            onPress={() => onChange(p.key)}
            className={`px-6 py-2.5 flex-1 rounded-full ${
              active ? "bg-emerald-500" : "bg-emerald-100 active:bg-gray-200"
            }`}
          >
            <Text
              className={`text-[10px] text-center font-semibold ${
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

export default function FacilityDetail() {
  const { id } = useLocalSearchParams();
  const { source } = useLocalSearchParams();
  const [lineChartData, setLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const [activeTab, setActiveTab] = useState("overview");
  const [facilityPeriod, setFacilityPeriod] = useState<Period>("month");
  const [facility, setFacility] = useState<{
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
  }>({
    soLead: 0,
    reg: { achieved: 0, target: 0, percent: 0 },
    nb: { achieved: 0, target: 0, percent: 0 },
    ne: { achieved: 0, target: 0, percent: 0 },
    total_kpi_percent: 0,
  });
  const [leads, setLeads] = useState<
    {
      id: number;
      ma_kh: string;
      ten_hoc_sinh: string;
      co_so: "FSC Hòa Lạc";
      ngay_tao: string;
      tinh_trang_goi_dien: string;
    }[]
  >([]);
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);
  const [summaryData, setSummaryData] = useState<{
    period: string;
    reg_rate: number;
    total_employees: number;
    total_lead: number;
    total_reg: number;
  }>({
    period: "03/2026",
    reg_rate: 10.16,
    total_employees: 5,
    total_lead: 443,
    total_reg: 45,
  });
  const [leadBySourceData, setLeadBySourceData] = useState<
    {
      nguon_khach_hang: string;
      count: number;
      percent: number;
    }[]
  >([]);
  const [totalPage, setTotalPage] = useState(0);
  const [currentPage, setCurrentPage] = useState(0);
  const [totalLeads, setTotalLeads] = useState();
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  const [refreshing, setRefreshing] = useState(false);

  const reloadScreen = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await Promise.all([
        getLeadKpis(),
        getLeadKpiSummary(),
        getLeadByDate(),
        getLeadBySource(),
        getLeads(1),
      ]);
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
        status_values: ["REG", "NB", "NE"].join(","),
        date_column: "ngay_tao",
        filter: {
          co_so: id,
        },
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

      setFacility({
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
        total_kpi_percent: data?.totals?.total_kpi_percent,
      });
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };
  const getLeadKpiSummary = async () => {
    try {
      showLoading();
      const { data } = await kpiServices.getLeadKpiSummary({
        period_type: facilityPeriod,
        date_column: "ngay_tao",
        filter: {
          co_so: id,
        },
      });

      setSummaryData(data);
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  const getLeadByDate = async () => {
    try {
      showLoading();
      const { data } = await kpiServices.getLeadByDate({
        period_type: "month",
        year: year,
        // month: month,
        date_column: "ngay_tao",
        filter: {
          co_so: id,
        },
      });

      setLineChartData({
        labels: data?.current?.map(
          (v: { period_label: string }) => v?.period_label,
        ),
        datasets: [
          {
            label: id as string,
            data: data?.current?.map((v: { count: number }) => v?.count),
            color: "#10b981",
          },
        ],
      });
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  const getLeadBySource = async () => {
    try {
      showLoading();
      const { data } = await overviewServices.getLeadPie({
        period_type: facilityPeriod,
        group_by: "nguon_khach_hang",
        date_column: "ngay_tao",
        filter: {
          co_so: id,
        },
      });

      setLeadBySourceData(data?.data);
      hideLoading();
    } catch (error) {
      console.log(error);
      hideLoading();
    }
  };

  const getLeads = async (page: number) => {
    try {
      showLoading();
      const res: any = await kpiServices.getLeads({
        period_type: facilityPeriod,
        page: page,
        per_page: 20,
        date_column: "ngay_tao",
        filter: {
          co_so: id,
        },
        order: "desc",
      });
      setLeads(res?.data);
      setCurrentPage(res?.meta?.current_page);
      setTotalPage(res?.meta?.last_page);
      setTotalLeads(res?.meta?.total);
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  useEffect(() => {
    getLeadKpis();
    getLeadKpiSummary();
    // getLeadByDate();
    getLeadBySource();
    getLeads(1);
  }, [facilityPeriod]);

  useEffect(() => {
    getLeadByDate();
  }, []);

  if (!facility) {
    return (
      <View className="flex-1 items-center justify-center bg-emerald-50">
        <Ionicons name="business-outline" size={50} color="#d1d5db" />
        <Text className="text-gray-500 text-base font-medium mt-4">
          Không tìm thấy cơ sở
        </Text>

        <Pressable
          onPress={() =>
            router.push(source == "sale" ? "/sales" : "/yearly-plan")
          }
          className="mt-4 px-5 py-2 bg-emerald-500 rounded-full"
        >
          <Text className="text-white text-sm font-semibold">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  const pendingCount = leads.filter(
    (l) =>
      l.tinh_trang_goi_dien == "Chưa liên hệ" &&
      dayjs().diff(dayjs(l?.ngay_tao), "day", true) > 3,
  ).length;

  return (
    <View className="flex-1 bg-emerald-50">
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadScreen} />
        }
      >
        {/* HEADER */}

        <View className="bg-white shadow-sm">
          <View className="px-4 py-4 flex-row items-center gap-3">
            <Pressable
              onPress={() =>
                router.push(source == "sale" ? "/sales" : "/yearly-plan")
              }
              className="w-9 h-9 items-center justify-center bg-gray-100 rounded-lg"
            >
              <Ionicons name="arrow-back" size={20} color="#374151" />
            </Pressable>

            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800">{id}</Text>
            </View>
          </View>
        </View>

        {/* HERO */}

        <View className="px-4 pt-5 pb-2">
          <PeriodFilter value={facilityPeriod} onChange={setFacilityPeriod} />
          <LinearGradient
            colors={["#10b981", "#14b8a6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 16 }}
            className=" p-5 mt-4"
          >
            <View className="flex-row gap-3">
              <View className="flex-1 bg-white/20 rounded-xl p-3 items-center">
                <Text className="text-white/70 text-xs mb-1">Tổng Lead</Text>
                <Text className="text-white text-xl font-bold">
                  {summaryData?.total_lead}
                </Text>
              </View>

              <View className="flex-1 bg-white/20 rounded-xl p-3 items-center">
                <Text className="text-white/70 text-xs mb-1">Nhân viên</Text>
                <Text className="text-white text-xl font-bold">
                  {summaryData?.total_employees}
                </Text>
              </View>

              <View className="flex-1 bg-white/20 rounded-xl p-3 items-center">
                <Text className="text-white/70 text-xs mb-1">REG Rate</Text>
                <Text className="text-white text-xl font-bold">
                  {summaryData?.reg_rate}%
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* ALERT */}

        {pendingCount > 0 && (
          <View className="px-4 pb-3">
            <View className="bg-red-50 border border-red-200 rounded-2xl p-3 flex-row items-center">
              <View className="w-9 h-9 bg-red-500 rounded-full items-center justify-center">
                <Ionicons name="warning-outline" size={16} color="white" />
              </View>

              <View className="ml-3">
                <Text className="text-sm font-bold text-red-700">
                  Cảnh báo lead tồn đọng
                </Text>

                <Text className="text-xs text-red-600 mt-0.5">
                  {pendingCount} lead tồn {">"} 3 ngày chưa xử lý
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* TABS */}

        <View className="px-4 pb-3">
          <View className="flex-row bg-gray-100 rounded-full p-1">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;

              return (
                <Pressable
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  className={`flex-1 flex-row items-center justify-center py-2 rounded-full ${
                    active ? "bg-white" : ""
                  }`}
                >
                  <Ionicons
                    name={
                      tab.id === "overview"
                        ? "bar-chart-outline"
                        : "person-add-outline"
                    }
                    size={16}
                    color={active ? "#059669" : "#6b7280"}
                  />

                  <Text
                    className={`text-xs font-semibold ml-1 ${
                      active ? "text-emerald-600" : "text-gray-500"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* CONTENT */}

        <View className="px-4 gap-y-4 pb-20">
          {activeTab === "overview" && (
            <>
              <FacilityStatsBar facility={facility} />

              <View className="bg-white rounded-2xl p-4">
                <Text className="text-sm font-bold text-gray-800 mb-3">
                  Biểu đồ hiệu suất (12 tháng)
                </Text>

                <FacilityMiniChart data={lineChartData} />
              </View>
              <View className="bg-white rounded-2xl shadow-sm p-4">
                <Text className="text-sm font-bold text-gray-800 mb-3">
                  Phân tích theo nguồn lead
                </Text>

                <View className="gap-y-3">
                  {leadBySourceData.map((item, idx) => (
                    <View key={item?.nguon_khach_hang}>
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-xs text-gray-600">
                          {item?.nguon_khach_hang}
                        </Text>

                        <Text className="text-xs font-semibold text-gray-800">
                          {item?.count} lead ({item?.percent}%)
                        </Text>
                      </View>

                      <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <View
                          className={`h-full  rounded-full`}
                          style={{
                            width: `${item?.percent}%`,
                            backgroundColor: ChartColors[idx],
                          }}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {activeTab === "leads" && (
            <View>
              <LeadTable leads={leads as any} />
              <View className="flex-row gap-2 justify-end items-center mt-2">
                <TouchableOpacity
                  onPress={() => {
                    currentPage > 1 && getLeads(currentPage - 1);
                  }}
                >
                  <Ionicons
                    name="caret-back-circle-outline"
                    size={38}
                    color={currentPage > 1 ? "#059669" : "#e5e7eb"}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={() => {
                    currentPage < totalPage && getLeads(currentPage + 1);
                  }}
                >
                  <Ionicons
                    className="rotate-180"
                    name="caret-back-circle-outline"
                    size={38}
                    color={currentPage < totalPage ? "#059669" : "#e5e7eb"}
                  />
                </TouchableOpacity>
              </View>
            </View>
          )}
        </View>
      </ScrollView>
    </View>
  );
}
