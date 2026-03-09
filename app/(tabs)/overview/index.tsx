import mainServices from "@/api/main";
import { Ionicons, MaterialCommunityIcons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useState } from "react";
import {
  Pressable,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Path, Svg } from "react-native-svg";
import PerformanceChart from "./components/PerformanceChart";
import StatsCard from "./components/StatsCard";

// import PerformanceChart from "./components/PerformanceChart";
// import StatsCard from "./components/StatsCard";

const comparisonDataMap: Record<string, typeof comparisonDataBase> = {
  day: [
    {
      title: "Tổng Lead",
      currentValue: "87",
      previousValue: "74",
      change: "+17.6%",
      isPositive: true,
      icon: "person-add-outline",
    },
    {
      title: "Tổng REG",
      currentValue: "61",
      previousValue: "55",
      change: "+10.9%",
      isPositive: true,
      icon: "document-text-outline",
    },
    {
      title: "Tổng NE",
      currentValue: "45",
      previousValue: "40",
      change: "+12.5%",
      isPositive: true,
      icon: "checkmark-circle-outline",
    },
    {
      title: "REG Rate",
      currentValue: "70.1%",
      previousValue: "74.3%",
      change: "-4.2%",
      isPositive: false,
      icon: "stats-chart-outline",
    },
  ],

  week: [
    {
      title: "Tổng Lead",
      currentValue: "542",
      previousValue: "498",
      change: "+8.8%",
      isPositive: true,
      icon: "person-add-outline",
    },
    {
      title: "Tổng REG",
      currentValue: "378",
      previousValue: "351",
      change: "+7.7%",
      isPositive: true,
      icon: "document-text-outline",
    },
    {
      title: "Tổng NE",
      currentValue: "290",
      previousValue: "265",
      change: "+9.4%",
      isPositive: true,
      icon: "checkmark-circle-outline",
    },
    {
      title: "REG Rate",
      currentValue: "69.7%",
      previousValue: "70.5%",
      change: "-0.8%",
      isPositive: false,
      icon: "stats-chart-outline",
    },
  ],

  month: [
    {
      title: "Tổng Lead",
      currentValue: "1,234",
      previousValue: "1,098",
      change: "+12.4%",
      isPositive: true,
      icon: "person-add-outline",
    },
    {
      title: "Tổng REG",
      currentValue: "856",
      previousValue: "789",
      change: "+8.5%",
      isPositive: true,
      icon: "document-text-outline",
    },
    {
      title: "Tổng NE",
      currentValue: "642",
      previousValue: "555",
      change: "+15.7%",
      isPositive: true,
      icon: "checkmark-circle-outline",
    },
    {
      title: "REG Rate",
      currentValue: "69.4%",
      previousValue: "71.9%",
      change: "-2.5%",
      isPositive: false,
      icon: "stats-chart-outline",
    },
  ],

  quarter: [
    {
      title: "Tổng Lead",
      currentValue: "3,812",
      previousValue: "3,420",
      change: "+11.5%",
      isPositive: true,
      icon: "person-add-outline",
    },
    {
      title: "Tổng REG",
      currentValue: "2,645",
      previousValue: "2,390",
      change: "+10.7%",
      isPositive: true,
      icon: "document-text-outline",
    },
    {
      title: "Tổng NE",
      currentValue: "1,980",
      previousValue: "1,750",
      change: "+13.1%",
      isPositive: true,
      icon: "checkmark-circle-outline",
    },
    {
      title: "REG Rate",
      currentValue: "69.4%",
      previousValue: "69.9%",
      change: "-0.5%",
      isPositive: false,
      icon: "stats-chart-outline",
    },
  ],

  half: [
    {
      title: "Tổng Lead",
      currentValue: "7,540",
      previousValue: "6,890",
      change: "+9.4%",
      isPositive: true,
      icon: "person-add-outline",
    },
    {
      title: "Tổng REG",
      currentValue: "5,210",
      previousValue: "4,780",
      change: "+9.0%",
      isPositive: true,
      icon: "document-text-outline",
    },
    {
      title: "Tổng NE",
      currentValue: "3,920",
      previousValue: "3,540",
      change: "+10.7%",
      isPositive: true,
      icon: "checkmark-circle-outline",
    },
    {
      title: "REG Rate",
      currentValue: "69.1%",
      previousValue: "69.4%",
      change: "-0.3%",
      isPositive: false,
      icon: "stats-chart-outline",
    },
  ],

  year: [
    {
      title: "Tổng Lead",
      currentValue: "14,820",
      previousValue: "13,150",
      change: "+12.7%",
      isPositive: true,
      icon: "person-add-outline",
    },
    {
      title: "Tổng REG",
      currentValue: "10,340",
      previousValue: "9,210",
      change: "+12.3%",
      isPositive: true,
      icon: "document-text-outline",
    },
    {
      title: "Tổng NE",
      currentValue: "7,860",
      previousValue: "6,980",
      change: "+12.6%",
      isPositive: true,
      icon: "checkmark-circle-outline",
    },
    {
      title: "REG Rate",
      currentValue: "69.8%",
      previousValue: "70.0%",
      change: "-0.2%",
      isPositive: false,
      icon: "stats-chart-outline",
    },
  ],
};

const comparisonDataBase: any = comparisonDataMap.month;

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
                {hoveredItem.value}
              </Text>
              <Text className="text-xs text-gray-500">
                {hoveredItem.percent}%
              </Text>
            </>
          ) : (
            <>
              <Text className="text-xl font-bold text-gray-800">{total}</Text>
              <Text className="text-xs text-gray-500">Tổng Lead</Text>
            </>
          )}
        </View>
      </View>
    </View>
  );
}

export default function Dashboard() {
  const [selectedPeriod, setSelectedPeriod] = useState("today");
  const [compareType, setCompareType] = useState("month");

  const getUsers = async () => {
    try {
      const data: any = await mainServices.getUsers();
      console.log(data);
    } catch (error) {
      console.log(error);
    }
  };

  const stats = [
    {
      title: "Tổng Lead",
      value: "1,234",
      change: "+12.5%",
      isPositive: true,
      icon: "person-add-outline",
      color: "emerald",
    },
    {
      title: "Tổng REG (200k)",
      value: "856",
      change: "+8.3%",
      isPositive: true,
      icon: "document-text-outline",
      color: "blue",
    },
    {
      title: "Tổng NE",
      value: "642",
      change: "+15.7%",
      isPositive: true,
      icon: "checkmark-circle-outline",
      color: "purple",
    },
    {
      title: "REG Rate (%)",
      value: "69.4%",
      change: "-2.1%",
      isPositive: false,
      icon: "stats-chart-outline",
      color: "orange",
    },
  ];

  const periods = [
    { id: "today", label: "Hôm nay" },
    { id: "yesterday", label: "Hôm qua" },
    { id: "week", label: "Tuần trước" },
    { id: "month", label: "Tháng trước" },
  ];

  const compareTypes = [
    { id: "day", label: "Ngày" },
    { id: "week", label: "Tuần" },
    { id: "month", label: "Tháng" },
    { id: "quarter", label: "Quý" },
    { id: "half", label: "6 tháng" },
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

  const comparisonData = comparisonDataMap[compareType];
  const currentLabel = compareLabels[compareType];

  return (
    <LinearGradient
      colors={["#ecfdf5", "#ffffff", "#f0fdfa"]}
      className="flex-1"
    >
      <ScrollView className="px-4 pt-4 pb-24">
        {/* Stats */}
        <View className="flex-row flex-wrap justify-between gap-4">
          {stats.map((s, i) => (
            <StatsCard key={i} {...s} />
          ))}
        </View>

        {/* Chart Section */}
        <View className="bg-white rounded-2xl p-5 mt-6 shadow mb-6">
          <View className="flex-row justify-between items-center mb-4">
            <Text className="font-bold text-gray-800" onPress={getUsers}>
              Hiệu suất theo thời gian
            </Text>

            <MaterialCommunityIcons
              name="dots-horizontal"
              size={22}
              color="#4b5563"
            />
          </View>

          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {periods.map((p) => (
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

          <PerformanceChart period={selectedPeriod} />
        </View>

        <View className="bg-white rounded-2xl shadow-md p-5">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base font-bold text-gray-800">
              So sánh cùng kỳ
            </Text>

            <View className="flex-row items-center gap-1 px-2 py-1 bg-emerald-50 rounded-lg">
              <Text className="text-xs text-emerald-600 font-medium">
                📅 Năm trước
              </Text>
            </View>
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
                  onPress={() => setCompareType(type.id)}
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
            {comparisonData.map((item, index) => (
              <View key={index} className="bg-gray-50 rounded-xl p-4">
                {/* Top */}
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-3">
                    <View className="w-10 h-10 items-center justify-center bg-white rounded-lg shadow-sm">
                      <Text className="text-lg text-emerald-600">
                        <Ionicons name={item.icon} size={20} color="#059669" />
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
                      {item.currentValue}
                    </Text>
                  </View>

                  <View className="w-px h-10 bg-gray-300" />

                  <View className="flex-1 items-end">
                    <Text className="text-xs text-gray-500 mb-1">
                      {currentLabel.previous}
                    </Text>
                    <Text className="text-lg font-bold text-gray-600">
                      {item.previousValue}
                    </Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Donut Chart */}
        <View className="bg-white rounded-2xl p-5 mt-6 shadow mb-6">
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

          <DonutChart data={channelData} />

          <View className="mt-6">
            {channelData.map((ch, i) => (
              <View key={i} className="flex-row items-center mb-3">
                <View
                  style={{ backgroundColor: ch.color }}
                  className="w-3 h-3 rounded-full mr-2"
                />

                <Text className="flex-1 text-xs text-gray-700">{ch.name}</Text>

                <Text className="text-xs font-bold text-gray-600">
                  {ch.percent}%
                </Text>
              </View>
            ))}
          </View>
        </View>
        <View className="bg-white rounded-2xl shadow-md p-5 mb-28">
          {/* Header */}
          <View className="flex-row items-center justify-between mb-4">
            <Text className="text-base font-bold text-gray-800">
              Cảnh báo gần đây
            </Text>

            <Pressable onPress={() => {}}>
              <Text className="text-xs text-emerald-600 font-medium">
                Xem tất cả
              </Text>
            </Pressable>
          </View>

          <View className="gap-y-3">
            {/* Alert 1 */}
            <View className="flex-row items-start gap-3 p-3 bg-red-50 rounded-lg">
              <View className="w-8 h-8 items-center justify-center bg-red-500 rounded-full">
                <Ionicons name="alert-circle-outline" size={16} color="white" />
              </View>

              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-800">
                  Cơ sở Hà Nội
                </Text>

                <Text className="text-xs text-gray-600 mt-1">
                  15 lead tồn &gt; 3 ngày chưa xử lý
                </Text>

                <Text className="text-xs text-gray-400 mt-1">2 giờ trước</Text>
              </View>
            </View>

            {/* Alert 2 */}
            <View className="flex-row items-start gap-3 p-3 bg-yellow-50 rounded-lg">
              <View className="w-8 h-8 items-center justify-center bg-yellow-500 rounded-full">
                <Ionicons name="warning-outline" size={16} color="white" />
              </View>

              <View className="flex-1">
                <Text className="text-sm font-medium text-gray-800">
                  Cơ sở TP.HCM
                </Text>

                <Text className="text-xs text-gray-600 mt-1">
                  KPI đạt 68%, dưới mức 70%
                </Text>

                <Text className="text-xs text-gray-400 mt-1">5 giờ trước</Text>
              </View>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}
