import overviewServices from "@/api/overview";
import { ChartColors } from "@/constants";
import { formatNumber } from "@/lib/numberHelper";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { LinearGradient } from "expo-linear-gradient";
import { useEffect, useState } from "react";
import {
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Path, Svg } from "react-native-svg";
import PerformanceChart from "./components/PerformanceChart";
import StatsCard from "./components/StatsCard";

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

const channelData = [
  { name: "Facebook", value: 432, color: "#10b981", percent: 35 },
  { name: "Google", value: 284, color: "#f59e0b", percent: 23 },
  { name: "Website Organic", value: 198, color: "#6366f1", percent: 16 },
  { name: "Giới thiệu", value: 173, color: "#ec4899", percent: 14 },
  { name: "Event", value: 99, color: "#14b8a6", percent: 8 },
  { name: "Khác", value: 48, color: "#94a3b8", percent: 4 },
];

function DonutChart({ data }: { data: typeof channelData }) {
  const [hovered, setHovered] = useState<number | null>(null);

  const size = 200;
  const cx = size / 2;
  const cy = size / 2;
  const outerR = 80;
  const innerR = 50;

  const total = data.reduce((s, d) => s + d.value, 0);

  let cumAngle = -Math.PI / 2;

  const slices = data.map((d, i) => {
    const angle = (d.value / total) * 2 * Math.PI;

    const startAngle = cumAngle;
    const endAngle = cumAngle + angle;
    cumAngle = endAngle;

    const sa = startAngle;
    const ea = endAngle;

    const x1 = cx + outerR * Math.cos(sa);
    const y1 = cy + outerR * Math.sin(sa);

    const x2 = cx + outerR * Math.cos(ea);
    const y2 = cy + outerR * Math.sin(ea);

    const ix1 = cx + innerR * Math.cos(sa);
    const iy1 = cy + innerR * Math.sin(sa);

    const ix2 = cx + innerR * Math.cos(ea);
    const iy2 = cy + innerR * Math.sin(ea);

    const largeArc = angle > Math.PI ? 1 : 0;

    const path = `
      M ${x1} ${y1}
      A ${outerR} ${outerR} 0 ${largeArc} 1 ${x2} ${y2}
      L ${ix2} ${iy2}
      A ${innerR} ${innerR} 0 ${largeArc} 0 ${ix1} ${iy1}
      Z
    `;

    return { path, color: d.color, index: i };
  });

  const hoveredItem = hovered !== null ? data[hovered] : null;

  return (
    <View className="items-center">
      <View style={{ width: size, height: size }} className="relative">
        <Svg width={size} height={size}>
          {slices.map((s) => (
            <Path
              key={s.index}
              d={s.path}
              fill={s.color}
              onPressIn={() => setHovered(s.index)}
              onPressOut={() => setHovered(null)}
            />
          ))}
        </Svg>

        <View className="absolute inset-0 items-center justify-center">
          {hoveredItem ? (
            <>
              <Text className="text-lg font-bold text-gray-800">
                {formatNumber(hoveredItem.value)}
              </Text>
              <Text className="text-xs text-gray-500">
                {hoveredItem.percent}%
              </Text>
            </>
          ) : (
            <>
              <Text className="text-xl font-bold text-gray-800">
                {formatNumber(total)}
              </Text>
              <Text className="text-xs text-gray-500">Tổng Lead</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("month");
  const [selectedOverviewPeriod, setSelectedOverviewPeriod] = useState("month");
  const [selectedPiePeriod, setSelectedPiePeriod] = useState("month");
  const [compareType, setCompareType] = useState("month");
  const [dataStat, setDataStat] = useState<
    {
      title: string;
      value: any;
      change: string;
      isPositive: boolean;
      icon: string;
      color: "emerald" | "blue" | "purple" | "orange";
    }[]
  >([]);
  const [dataCompare, setDataCompare] = useState<
    {
      title: string;
      currentValue: string;
      previousValue: string;
      change: string;
      isPositive: boolean;
      icon: string;
    }[]
  >([
    {
      title: "Tổng Lead",
      currentValue: "0",
      previousValue: "0",
      change: "+0%",
      isPositive: true,
      icon: "person-add-outline",
    },
    {
      title: "Tổng REG",
      currentValue: "0",
      previousValue: "0",
      change: "+0%",
      isPositive: true,
      icon: "document-text-outline",
    },
    {
      title: "Tổng NE",
      currentValue: "0",
      previousValue: "0",
      change: "+0%",
      isPositive: true,
      icon: "checkmark-circle-outline",
    },
    {
      title: "REG Rate",
      currentValue: "0%",
      previousValue: "0%",
      change: "-0%",
      isPositive: true,
      icon: "stats-chart-outline",
    },
  ]);
  const [pieChartData, setPieChartData] = useState<
    {
      name: string;
      value: number;
      color: string;
      percent: number;
    }[]
  >([]);
  const [lineChartData, setLineChartData] = useState<ChartData>({
    labels: [],
    datasets: [],
  });
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);
  const MAX_ITEM = 5;

  const [showAll, setShowAll] = useState(false);
  const year = dayjs().year();
  const month = dayjs().month() + 1;
  const [refreshing, setRefreshing] = useState(false);

  const reloadScreen = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await Promise.all([
        getLeadStat(),
        getLeadCompare(compareType),
        getPieChartData(),
        getPerformanceChartData(),
      ]);
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const getLeadStat = async () => {
    try {
      showLoading();
      const data: any = await overviewServices.getOverviewStats({
        period_type: selectedOverviewPeriod,
        year: year,
        month: month,
        compare: "both",
        group_by: "tinh_trang_nhap_hoc",
        date_column: "ngay_tao",
      });
      const stat = data?.data?.periods?.current?.by_group;
      const stat_prev = data?.data?.periods?.previous?.by_group;

      const Total = stat?.find((v: any) => v?.tinh_trang_nhap_hoc == "");
      const Total_prev = stat_prev?.find(
        (v: any) => v?.tinh_trang_nhap_hoc == "",
      );
      const REG = stat?.find((v: any) => v?.tinh_trang_nhap_hoc == "REG");
      const REG_prev = stat_prev?.find(
        (v: any) => v?.tinh_trang_nhap_hoc == "REG",
      );
      const NE = stat?.find((v: any) => v?.tinh_trang_nhap_hoc == "NE");
      const pre_reg_rate = parseFloat(
        ((REG_prev?.count / Total_prev?.count) * 100).toFixed(2),
      );
      const curr_reg_rate = parseFloat(
        ((REG?.count / Total?.count) * 100).toFixed(2),
      );

      setDataStat([
        {
          title: "Tổng Lead",
          value: formatNumber(Total?.count) ?? 0,
          change: (Total?.change?.vs_previous?.percent ?? 0) + "%",
          isPositive: (Total?.change?.vs_previous?.percent ?? 0) > 0,
          icon: "person-add-outline",
          color: "emerald",
        },
        {
          title: "REG",
          value: formatNumber(REG?.count) ?? 0,
          change: (REG?.change?.vs_previous?.percent ?? 0) + "%",
          isPositive: (REG?.change?.vs_previous?.percent ?? 0) > 0,
          icon: "document-text-outline",
          color: "blue",
        },
        {
          title: "NE",
          value: formatNumber(NE?.count) ?? 0,
          change: (NE?.change?.vs_previous?.percent ?? 0) + "%",
          isPositive: (NE?.change?.vs_previous?.percent ?? 0) > 0,
          icon: "checkmark-circle-outline",
          color: "purple",
        },
        {
          title: "REG RATE",
          value: curr_reg_rate.toFixed(2) + "%",
          change:
            curr_reg_rate < pre_reg_rate
              ? ((1 - curr_reg_rate / pre_reg_rate) * 100).toFixed(2) + "%"
              : ((1 - pre_reg_rate / curr_reg_rate) * 100).toFixed(2) + "%",
          isPositive: curr_reg_rate > pre_reg_rate,
          icon: "stats-chart-outline",
          color: "orange",
        },
      ]);
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };

  const getLeadCompare = async (type: string) => {
    try {
      showLoading();
      const data: any = await overviewServices.getOverviewStats({
        period_type: type,
        compare: "previous",
        group_by: "tinh_trang_nhap_hoc",
        date_column: "ngay_tao",
      });
      const stat = data?.data?.periods?.current?.by_group;
      const stat_prev = data?.data?.periods?.previous?.by_group;

      const Total = stat?.find((v: any) => v?.tinh_trang_nhap_hoc == "");
      const Total_prev = stat_prev?.find(
        (v: any) => v?.tinh_trang_nhap_hoc == "",
      );
      const REG = stat?.find((v: any) => v?.tinh_trang_nhap_hoc == "REG");
      const REG_prev = stat_prev?.find(
        (v: any) => v?.tinh_trang_nhap_hoc == "REG",
      );
      const NE = stat?.find((v: any) => v?.tinh_trang_nhap_hoc == "NE");
      const NE_prev = stat_prev?.find(
        (v: any) => v?.tinh_trang_nhap_hoc == "NE",
      );
      const pre_reg_rate = parseFloat(
        ((REG_prev?.count / Total_prev?.count) * 100).toFixed(2),
      );
      const curr_reg_rate = parseFloat(
        ((REG?.count / Total?.count) * 100).toFixed(2),
      );

      setDataCompare([
        {
          title: "Tổng Lead",
          currentValue: Total?.count ?? 0,
          previousValue: Total_prev?.count ?? 0,
          change: (Total?.change?.vs_previous?.percent ?? 0) + "%",
          isPositive: (Total?.change?.vs_previous?.percent ?? 0) > 0,
          icon: "person-add-outline",
        },
        {
          title: "Tổng REG",
          currentValue: REG?.count ?? 0,
          previousValue: REG_prev?.count ?? 0,
          change: (REG?.change?.vs_previous?.percent ?? 0) + "%",
          isPositive: (REG?.change?.vs_previous?.percent ?? 0) > 0,
          icon: "document-text-outline",
        },
        {
          title: "Tổng NE",
          currentValue: NE?.count ?? 0,
          previousValue: NE_prev?.count ?? 0,
          change: (NE?.change?.vs_previous?.percent ?? 0) + "%",
          isPositive: (NE?.change?.vs_previous?.percent ?? 0) > 0,
          icon: "checkmark-circle-outline",
        },
        {
          title: "REG Rate",
          currentValue: curr_reg_rate.toFixed(2) + "%",
          previousValue: pre_reg_rate.toFixed(2) + "%",
          change:
            curr_reg_rate < pre_reg_rate
              ? ((1 - curr_reg_rate / pre_reg_rate) * 100).toFixed(2) + "%"
              : ((1 - pre_reg_rate / curr_reg_rate) * 100).toFixed(2) + "%",
          isPositive: curr_reg_rate > pre_reg_rate,
          icon: "stats-chart-outline",
        },
      ]);
      hideLoading();
    } catch (error) {
      console.log(error);
      hideLoading();
    }
  };

  const getPieChartData = async () => {
    showLoading();
    try {
      const data: any = await overviewServices.getLeadPie({
        period_type: selectedPiePeriod,
        limit: 1000,
        group_by: "nguon_khach_hang",
        date_column: "ngay_tao",
      });

      setPieChartData(
        data?.data?.data?.map((v: any, idx: number) => ({
          name: v?.nguon_khach_hang,
          value: v?.count,
          color: ChartColors[idx + 1],
          percent: v?.percent,
        })) || [],
      );
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };
  const getPerformanceChartData = async () => {
    showLoading();
    try {
      const { data }: any = await overviewServices.getLeadPerformance({
        period_type: selectedPeriod,
        limit: 1000,
        group_by: "nguon_khach_hang",
        date_column: "ngay_tao",
      });

      setLineChartData({
        labels: data?.chart_data?.line?.labels as string[],
        datasets: [
          {
            label: data?.chart_data?.line?.datasets?.[0]?.label,
            data: data?.chart_data?.line?.datasets?.[0]?.data,
            color: "#10b981",
          },
          {
            label: `Cùng kỳ ${compareTypes?.find((v) => v?.id == selectedPeriod)?.label} trước`,
            data: data?.previous?.daily?.map(
              (v: { count: number }) => v?.count,
            ),
            color: "#3b82f6",
            dashed: true,
          },
        ],
      });
      hideLoading();
    } catch (error) {
      hideLoading();
      console.log(error);
    }
  };

  useEffect(() => {
    getLeadStat();
  }, [selectedOverviewPeriod]);

  useEffect(() => {
    getLeadCompare("month");
  }, []);
  useEffect(() => {
    getPieChartData();
  }, [selectedPiePeriod]);
  useEffect(() => {
    getPerformanceChartData();
  }, [selectedPeriod]);

  const compareTypes = [
    { id: "day", label: "Ngày" },
    { id: "week", label: "Tuần" },
    { id: "month", label: "Tháng" },
    { id: "quarter", label: "Quý" },
    { id: "year", label: "Năm" },
  ];

  const compareLabels: Record<string, { current: string; previous: string }> = {
    day: { current: "Hôm nay", previous: "Hôm qua" },
    week: { current: "Tuần này", previous: "Tuần trước" },
    month: { current: "Tháng này", previous: "Tháng trước" },
    quarter: { current: "Quý này", previous: "Quý trước" },
    half: { current: "6 tháng này", previous: "6 tháng trước" },
    year: { current: "Năm nay", previous: "Năm trước" },
  };

  const currentLabel = compareLabels[compareType];

  return (
    <LinearGradient
      colors={["#ecfdf5", "#ffffff", "#f0fdfa"]}
      className="flex-1"
    >
      <ScrollView
        className="px-4 pt-4 pb-24"
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={reloadScreen} />
        }
      >
        <View className="bg-white rounded-2xl p-5">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-gray-800">Chỉ số tổng quan</Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {compareTypes.map((p) => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setSelectedOverviewPeriod(p.id)}
                className={`px-4 py-2 rounded-full mr-2 ${
                  selectedOverviewPeriod === p.id
                    ? "bg-emerald-500"
                    : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    selectedOverviewPeriod === p.id
                      ? "text-white"
                      : "text-gray-600"
                  }`}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
          {/* Stats */}
          <View className="flex-row flex-wrap justify-between gap-4 mt-3">
            {dataStat.map((s, i) => (
              <StatsCard key={i} {...s} />
            ))}
          </View>
        </View>

        {/* Chart Section */}
        <View className="bg-white rounded-2xl p-5 mt-6 shadow mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-gray-800">
              Hiệu suất theo thời gian
            </Text>
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {compareTypes.map((p) => (
              <TouchableOpacity
                key={p.id}
                onPress={() => setSelectedPeriod(p.id)}
                className={`px-4 py-2 rounded-full mr-2 ${
                  selectedPeriod === p.id ? "bg-emerald-500" : "bg-gray-100"
                }`}
              >
                <Text
                  className={`text-xs font-medium ${
                    selectedPeriod === p.id ? "text-white" : "text-gray-600"
                  }`}
                >
                  {p.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <PerformanceChart data={lineChartData} />
        </View>

        <View className="bg-white rounded-2xl shadow-md p-5">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base font-bold text-gray-800">
              So sánh cùng kỳ
            </Text>
          </View>

          {/* Compare Type Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-5"
          >
            <View className="flex-row gap-2">
              {compareTypes.map((type) => (
                <Pressable
                  key={type.id}
                  onPress={() => {
                    getLeadCompare(type.id);
                    setCompareType(type.id);
                  }}
                  className={`px-3 py-1.5 rounded-full border ${
                    compareType === type.id
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      compareType === type.id ? "text-white" : "text-gray-500"
                    }`}
                  >
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          {/* Comparison List */}
          <View className="gap-3">
            {dataCompare.map((item, index: number) => (
              <View key={index} className="bg-gray-50 rounded-xl p-4">
                {/* Top */}
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 items-center justify-center bg-white rounded-lg shadow-sm">
                      <Text className="text-lg text-emerald-600">
                        <Ionicons
                          name={item.icon as any}
                          size={20}
                          color="#059669"
                        />
                      </Text>
                    </View>

                    <View>
                      <Text className="text-sm font-bold text-gray-800">
                        {item.title}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {currentLabel.current} vs {currentLabel.previous}
                      </Text>
                    </View>
                  </View>

                  <View
                    className={`flex-row items-center gap-1 px-2 py-1 rounded-full ${
                      item.isPositive ? "bg-green-100" : "bg-red-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        item.isPositive ? "text-green-600" : "text-red-600"
                      }`}
                    >
                      {item.isPositive ? "↑" : "↓"} {item.change}
                    </Text>
                  </View>
                </View>

                {/* Bottom */}
                <View className="flex-row items-center justify-between">
                  <View className="flex-1">
                    <Text className="text-xs text-gray-500 mb-1">
                      {currentLabel.current}
                    </Text>
                    <Text className="text-lg font-bold text-gray-800">
                      {formatNumber(item.currentValue)}
                    </Text>
                  </View>

                  <View className="w-px h-10 bg-gray-300" />

                  <View className="flex-1 items-end">
                    <Text className="text-xs text-gray-500 mb-1">
                      {currentLabel.previous}
                    </Text>
                    <Text className="text-lg font-bold text-gray-600">
                      {formatNumber(item.previousValue)}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Donut Chart */}
        <View className="bg-white rounded-2xl p-5 mt-6 shadow mb-28">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-gray-800">
              MKT – Lead theo kênh
            </Text>

            <MaterialCommunityIcons
              name="chart-pie"
              size={22}
              color="#059669"
            />
          </View>
          {/* Compare Type Selector */}
          <ScrollView
            horizontal
            showsHorizontalScrollIndicator={false}
            className="mb-5"
          >
            <View className="flex-row gap-2">
              {compareTypes.map((type) => (
                <Pressable
                  key={type.id}
                  onPress={() => {
                    setSelectedPiePeriod(type.id);
                  }}
                  className={`px-3 py-1.5 rounded-full border ${
                    selectedPiePeriod === type.id
                      ? "bg-emerald-500 border-emerald-500"
                      : "bg-white border-gray-200"
                  }`}
                >
                  <Text
                    className={`text-xs font-semibold ${
                      selectedPiePeriod === type.id
                        ? "text-white"
                        : "text-gray-500"
                    }`}
                  >
                    {type.label}
                  </Text>
                </Pressable>
              ))}
            </View>
          </ScrollView>

          <DonutChart data={pieChartData} />

          <View className="mt-6">
            {(showAll ? pieChartData : pieChartData.slice(0, MAX_ITEM)).map(
              (ch, i) => (
                <View key={i} className="flex-row items-center mb-3">
                  <View
                    style={{ backgroundColor: ch.color, borderRadius: 9999999 }}
                    className="w-3 h-3 mr-2"
                  />

                  <Text className="flex-1 text-xs text-gray-700">
                    {ch.name}
                  </Text>

                  <Text className="text-xs font-bold text-gray-600">
                    ({formatNumber(ch?.value)} lead) {ch.percent}%
                  </Text>
                </View>
              ),
            )}

            {pieChartData.length > MAX_ITEM && (
              <Pressable onPress={() => setShowAll(!showAll)}>
                <Text className="text-xs text-blue-500 mt-2 mx-auto">
                  {showAll ? "Thu gọn" : "Xem thêm"}
                </Text>
              </Pressable>
            )}
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
