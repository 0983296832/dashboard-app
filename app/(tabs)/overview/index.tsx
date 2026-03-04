import CircularProgress from "@/components/circularProgress";
import GradientStatCard from "@/components/statCard";
import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC, useState } from "react";
import { Dimensions, Pressable, ScrollView, Text, View } from "react-native";
import Svg, { Path } from "react-native-svg";
import {
  funnelData,
  kpiData,
  overviewStats,
  sourceData,
} from "../../../dashboardData";

const screenWidth = Dimensions.get("window").width;

const OverviewPage: FC = () => {
  const [activeTab, setActiveTab] = useState<"source" | "campus" | "content">(
    "source",
  );

  return (
    <View className="flex-1 bg-blue-50 mt-8">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 100 }}
        className="px-4 pt-16"
      >
        {/* ===== Overview Stats ===== */}
        <View className="mt-6 mb-6 flex-row flex-wrap justify-between">
          {overviewStats.map((stat) => (
            <View key={stat.id} className="w-[48%] mb-3">
              <GradientStatCard {...stat} />
            </View>
          ))}
        </View>

        {/* ===== KPI Tracking ===== */}
        <Text className="text-base font-semibold text-gray-800 mb-4">
          Theo Dõi KPI
        </Text>

        <View className="flex-row justify-between mb-3">
          <View className="w-[48%] bg-white rounded-2xl p-5 shadow-sm">
            <Text className="text-xs text-gray-600 mb-4">
              Mục tiêu tháng này
            </Text>

            <View className="items-center mb-3">
              <CircularProgress percentage={kpiData.monthlyTarget.percentage} />
            </View>

            <Text className="text-xs text-center text-gray-500">
              {kpiData.monthlyTarget.current}/{kpiData.monthlyTarget.target} hồ
              sơ
            </Text>
          </View>

          <View className="w-[48%] bg-white rounded-2xl p-5 shadow-sm">
            <Text className="text-xs text-gray-600 mb-4">
              Tốc độ chuyển đổi
            </Text>

            <View className="items-center mb-3">
              <CircularProgress
                percentage={kpiData.conversionRate.rate}
                color="#F59E0B"
              />
            </View>

            <Text className="text-xs text-center text-gray-500">
              {kpiData.conversionRate.avgDays} ngày/hồ sơ
            </Text>
          </View>
        </View>

        {/* ===== Weekly Trend Bar ===== */}
        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <View className="flex-row justify-between mb-4">
            <Text className="text-sm font-medium text-gray-800">
              Xu hướng 7 ngày
            </Text>
            <Text className="text-xs text-green-600 font-medium">+12.5%</Text>
          </View>

          <View className="h-32 flex-row items-end justify-between ">
            {kpiData.weeklyTrend.map((item, index) => (
              <View key={index} className="flex-1 items-center mx-1">
                <View
                  className="w-full rounded-t-lg bg-blue-500 "
                  style={{
                    height: (item.value / 70) * 120,
                  }}
                />
                <Text className="text-xs text-gray-500 mt-2">{item.day}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* ===== Conversion Funnel ===== */}
        <Text className="text-base font-semibold text-gray-800 mb-4">
          Phễu Chuyển Đổi
        </Text>

        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          {funnelData.map((stage, index) => {
            const prevValue = index > 0 ? funnelData[index - 1].value : null;
            const convRate = prevValue
              ? ((stage.value / prevValue) * 100).toFixed(1)
              : null;

            return (
              <View key={index}>
                {index > 0 && (
                  <View className="mx-auto items-center my-2 px-2.5 py-0.5 w-[65px] bg-gray-50 border border-gray-100 rounded-full">
                    <Text className="text-xs text-gray-500 font-semibold w-max">
                      ↓ {convRate}%
                    </Text>
                  </View>
                )}

                <View
                  className="rounded-xl px-4 py-3 flex-row justify-between items-center"
                  style={{
                    backgroundColor: stage.color,
                    marginHorizontal: ((100 - stage.percentage) / 2) * 1,
                  }}
                >
                  <View className="flex-row items-center gap-2">
                    <View className="w-6 h-6 rounded-full bg-white/20 items-center justify-center">
                      <Text className="text-xs font-bold text-white">
                        {index + 1}
                      </Text>
                    </View>

                    <Text className="text-sm font-semibold text-white">
                      {stage.stage}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-2">
                    <Text className="text-base font-bold text-white">
                      {stage.value.toLocaleString()}
                    </Text>
                    <Text className="text-xs text-white/70">
                      {stage.percentage}%
                    </Text>
                  </View>
                </View>
              </View>
            );
          })}
          <View className="mt-4 pt-4 border-t border-gray-100">
            <View className="flex-row">
              {/* Nghe máy/Lead */}
              <View className="flex-1 items-center">
                <Text className="text-xs text-gray-500 mb-1">
                  Nghe máy/Lead
                </Text>
                <Text className="text-sm font-bold text-emerald-600">
                  67.5%
                </Text>
              </View>

              {/* REG/Lead */}
              <View className="flex-1 items-center border-x border-gray-100">
                <Text className="text-xs text-gray-500 mb-1">REG/Lead</Text>
                <Text className="text-sm font-bold text-amber-500">31.3%</Text>
              </View>

              {/* NB/Lead */}
              <View className="flex-1 items-center">
                <Text className="text-xs text-gray-500 mb-1">NB/Lead</Text>
                <Text className="text-sm font-bold text-rose-500">18.8%</Text>
              </View>
            </View>
          </View>
        </View>

        {/* ===== Donut Chart ===== */}
        <Text className="text-base font-semibold text-gray-800 mb-4">
          Phân Tích Nguồn
        </Text>

        <View className="bg-white rounded-2xl p-5 shadow-sm mb-6">
          <View className="flex-row gap-2 p-1 bg-gray-100 rounded-xl mb-6">
            {/* Nguồn */}
            <Pressable
              onPress={() => {
                setActiveTab("source");
              }}
              className={`flex-1 py-2.5 rounded-lg items-center ${
                activeTab === "source" ? "bg-white " : ""
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  activeTab === "source" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Nguồn
              </Text>
            </Pressable>

            {/* Cơ sở */}
            <Pressable
              onPress={() => {
                setActiveTab("campus");
              }}
              className={`flex-1 py-2.5 rounded-lg items-center ${
                activeTab === "campus" ? "bg-white " : ""
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  activeTab === "campus" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Cơ sở
              </Text>
            </Pressable>

            {/* Nội dung */}
            <Pressable
              onPress={() => {
                setActiveTab("content");
              }}
              className={`flex-1 py-2.5 rounded-lg items-center ${
                activeTab === "content" ? "bg-white " : ""
              }`}
            >
              <Text
                className={`text-sm font-medium ${
                  activeTab === "content" ? "text-blue-600" : "text-gray-600"
                }`}
              >
                Nội dung
              </Text>
            </Pressable>
          </View>

          <View className="items-center mb-6">
            <Svg width={200} height={200}>
              {sourceData.map((item, index) => {
                const total = sourceData.reduce((sum, d) => sum + d.value, 0);

                let startAngle = 0;
                for (let i = 0; i < index; i++) {
                  startAngle += (sourceData[i].value / total) * 360;
                }

                const angle = (item.value / total) * 360;
                const endAngle = startAngle + angle;

                const startRad = (startAngle * Math.PI) / 180;
                const endRad = (endAngle * Math.PI) / 180;

                const innerRadius = 60;
                const outerRadius = 90;

                const x1 = 100 + innerRadius * Math.cos(startRad);
                const y1 = 100 + innerRadius * Math.sin(startRad);
                const x2 = 100 + outerRadius * Math.cos(startRad);
                const y2 = 100 + outerRadius * Math.sin(startRad);
                const x3 = 100 + outerRadius * Math.cos(endRad);
                const y3 = 100 + outerRadius * Math.sin(endRad);
                const x4 = 100 + innerRadius * Math.cos(endRad);
                const y4 = 100 + innerRadius * Math.sin(endRad);

                const largeArc = angle > 180 ? 1 : 0;

                return (
                  <Path
                    key={index}
                    d={`M ${x1} ${y1} L ${x2} ${y2}
                      A ${outerRadius} ${outerRadius} 0 ${largeArc} 1 ${x3} ${y3}
                      L ${x4} ${y4}
                      A ${innerRadius} ${innerRadius} 0 ${largeArc} 0 ${x1} ${y1}`}
                    fill={item.color}
                  />
                );
              })}
            </Svg>

            <View className="absolute inset-0 flex flex-col items-center justify-center">
              <Text className="text-2xl font-bold text-gray-800">2,847</Text>
              <Text className="text-xs text-gray-500">tổng leads</Text>
            </View>
          </View>

          {sourceData.map((item, index) => (
            <View
              key={index}
              className="flex-row justify-between items-center py-2 border-b border-gray-100"
            >
              <View className="flex-row items-center gap-3">
                <View
                  className="w-3 h-3 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="text-sm text-gray-700">{item.name}</Text>
              </View>

              <View className="flex-row gap-3">
                <Text className="text-sm font-semibold text-gray-800">
                  {item.value.toLocaleString()}
                </Text>
                <Text className="text-xs text-gray-500 w-12 text-right">
                  {item.percentage}%
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View className="space-y-3 mb-12">
          {/* ===== Thêm hồ sơ mới ===== */}
          <Pressable
            onPress={() => console.log("Add profile")}
            className="active:scale-95 mb-6"
          >
            <LinearGradient
              colors={["#2563EB", "#3B82F6"]} // from-blue-600 to-blue-500
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }} // to-r
              className=" p-5 flex-row items-center justify-between"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.25,
                shadowRadius: 12,
                elevation: 6,
                borderRadius: 16,
              }}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 items-center justify-center bg-white/20 rounded-xl">
                  <Ionicons name="add-outline" size={24} color="white" />
                </View>

                <Text className="text-base font-semibold text-white">
                  Thêm hồ sơ mới
                </Text>
              </View>

              <View className="w-10 h-10 items-center justify-center bg-white rounded-full">
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color="#2563EB"
                />
              </View>
            </LinearGradient>
          </Pressable>

          {/* ===== Báo cáo chi tiết ===== */}
          <Pressable
            onPress={() => console.log("View report")}
            className="active:scale-95"
          >
            <View
              className="bg-white border-2 border-blue-600 rounded-2xl p-5 flex-row items-center justify-between"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <View className="flex-row items-center gap-4">
                <View className="w-12 h-12 items-center justify-center bg-blue-50 rounded-xl">
                  <Ionicons
                    name="document-text-outline"
                    size={24}
                    color="#2563EB"
                  />
                </View>

                <Text className="text-base font-semibold text-blue-600">
                  Báo cáo chi tiết
                </Text>
              </View>

              <View className="w-10 h-10 items-center justify-center bg-blue-50 rounded-full">
                <Ionicons
                  name="arrow-forward-outline"
                  size={18}
                  color="#2563EB"
                />
              </View>
            </View>
          </Pressable>
        </View>
      </ScrollView>
    </View>
  );
};

export default OverviewPage;
