import { LinearGradient } from "expo-linear-gradient";
import React from "react";
import { ScrollView, Text, View } from "react-native";

import CircularProgress from "@/components/circularProgress";
import { Ionicons } from "@expo/vector-icons";
import { monthlyProgress, yearlyKPI } from "../../../dashboardData";

const Legend = ({ color, label }: { color: string; label: string }) => (
  <View className="flex-row items-center gap-1.5">
    <View className={`w-2.5 h-2.5 rounded-full ${color}`} />
    <Text className="text-[11px] text-gray-500">{label}</Text>
  </View>
);

const ProgressBar = ({ label, value, percent, target, color }: any) => (
  <View className="flex-row items-center gap-2 mb-2">
    <Text className="text-[10px] text-gray-400 w-6">{label}</Text>

    <View className="flex-1 h-2 bg-gray-100 rounded-full overflow-hidden relative">
      {/* Target marker */}
      <View
        className="absolute top-0 bottom-0 w-[2px] bg-gray-300 z-10"
        style={{ left: `${target}%` }}
      />
      <View
        className={`h-full ${color} rounded-full`}
        style={{ width: `${percent}%` }}
      />
    </View>

    <Text className="text-[10px] font-semibold text-gray-600 w-8 text-right">
      {value}
    </Text>
  </View>
);

const HeaderCell = ({ label, align = "right" }: any) => (
  <View
    className={`w-[66.5px] ${align === "left" ? "items-start" : "items-end"}`}
  >
    <Text className="text-xs font-semibold text-gray-600">{label}</Text>
  </View>
);

const Cell = ({ text, bold, align = "right" }: any) => (
  <View
    className={`w-[66.5px] ${align === "left" ? "items-start" : "items-end"}`}
  >
    <Text
      className={`text-sm ${
        bold ? "font-medium text-gray-800" : "text-gray-700"
      }`}
    >
      {text}
    </Text>
  </View>
);

const MonthlyTable = ({ monthlyProgress }: any) => {
  return (
    <View className="mb-6">
      <Text className="text-base font-semibold text-gray-800 mb-4">
        Chi Tiết Theo Tháng
      </Text>

      <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View className="min-w-screen">
            {/* Header */}
            <View className="flex-row bg-gray-50 px-4 py-3">
              <HeaderCell label="Tháng" align="left" />
              <HeaderCell label="REG" />
              <HeaderCell label="NB" />
              <HeaderCell label="NE" />
              <HeaderCell label="Đạt" />
            </View>

            {/* Rows */}
            {monthlyProgress.slice(0, 10).map((month: any, index: any) => {
              const achievement =
                month.target > 0
                  ? ((month.reg / month.target) * 100).toFixed(1)
                  : null;

              return (
                <View
                  key={index}
                  className="flex-row px-4 py-3 border-t border-gray-100"
                >
                  <Cell text={month.month} bold align="left" />

                  <Cell text={month.reg > 0 ? month.reg : "-"} />
                  <Cell text={month.nb > 0 ? month.nb : "-"} />
                  <Cell text={month.ne > 0 ? month.ne : "-"} />

                  <View className="w-20 items-end">
                    {month.reg > 0 && achievement ? (
                      <Text
                        className={`text-sm font-semibold ${
                          Number(achievement) >= 100
                            ? "text-green-600"
                            : "text-orange-600"
                        }`}
                      >
                        {achievement}%
                      </Text>
                    ) : (
                      <Text className="text-gray-400">-</Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </ScrollView>
      </View>
    </View>
  );
};

export default function YearlyPlanScreen() {
  return (
    <View className="flex-1 bg-purple-50 mt-24">
      <ScrollView
        contentContainerStyle={{ paddingBottom: 70 }}
        className="bg-gradient-to-b from-purple-50 to-white px-4"
      >
        {/* ================= KPI Overview ================= */}
        <View className="mt-6 mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">
            Tổng Quan KPI Năm
          </Text>

          <View className="flex flex-col gap-3">
            {/* ================= REG ================= */}
            <View
              className="bg-white rounded-2xl p-4 flex-row items-center gap-4"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <CircularProgress
                percentage={yearlyKPI.reg.percentage}
                size={88}
                strokeWidth={7}
                color="#3B82F6"
              />

              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  REG
                </Text>

                <Text className="text-xl font-bold text-gray-800">
                  {yearlyKPI.reg.actual.toLocaleString()}
                </Text>

                <Text className="text-xs text-gray-400">
                  Mục tiêu: {yearlyKPI.reg.target.toLocaleString()}
                </Text>

                {/* Progress Bar */}
                <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-blue-500 rounded-full"
                    style={{ width: `${yearlyKPI.reg.percentage}%` }}
                  />
                </View>
              </View>
            </View>

            {/* ================= NB ================= */}
            <View
              className="bg-white rounded-2xl p-4 flex-row items-center gap-4"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <CircularProgress
                percentage={yearlyKPI.nb.percentage}
                size={88}
                strokeWidth={7}
                color="#10B981"
              />

              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  NB
                </Text>

                <Text className="text-xl font-bold text-gray-800">
                  {yearlyKPI.nb.actual.toLocaleString()}
                </Text>

                <Text className="text-xs text-gray-400">
                  Mục tiêu: {yearlyKPI.nb.target.toLocaleString()}
                </Text>

                <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-emerald-500 rounded-full"
                    style={{ width: `${yearlyKPI.nb.percentage}%` }}
                  />
                </View>
              </View>
            </View>

            {/* ================= NE ================= */}
            <View
              className="bg-white rounded-2xl p-4 flex-row items-center gap-4"
              style={{
                shadowColor: "#000",
                shadowOpacity: 0.08,
                shadowRadius: 8,
                elevation: 3,
              }}
            >
              <CircularProgress
                percentage={yearlyKPI.ne.percentage}
                size={88}
                strokeWidth={7}
                color="#8B5CF6"
              />

              <View className="flex-1">
                <Text className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-1">
                  NE
                </Text>

                <Text className="text-xl font-bold text-gray-800">
                  {yearlyKPI.ne.actual.toLocaleString()}
                </Text>

                <Text className="text-xs text-gray-400">
                  Mục tiêu: {yearlyKPI.ne.target.toLocaleString()}
                </Text>

                <View className="mt-2 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full bg-violet-500 rounded-full"
                    style={{ width: `${yearlyKPI.ne.percentage}%` }}
                  />
                </View>
              </View>
            </View>
          </View>
        </View>

        {/* ================= Monthly Progress ================= */}
        <View className="mb-6">
          <Text className="text-sm font-semibold text-gray-700 mb-3">
            Tiến Độ Theo Tháng
          </Text>

          <View className="bg-white rounded-2xl shadow-sm overflow-hidden">
            {/* Legend */}
            <View className="flex-row items-center gap-4 px-4 pt-4 pb-2">
              <Legend color="bg-blue-500" label="REG" />
              <Legend color="bg-emerald-500" label="NB" />
              <Legend color="bg-violet-500" label="NE" />
            </View>

            {monthlyProgress.map((month, index) => {
              const maxValue = 450;
              const regPct = Math.min((month.reg / maxValue) * 100, 100);
              const nbPct = Math.min((month.nb / maxValue) * 100, 100);
              const nePct = Math.min((month.ne / maxValue) * 100, 100);
              const targetPct = Math.min((month.target / maxValue) * 100, 100);

              const achievement =
                month.target > 0 && month.reg > 0
                  ? Math.round((month.reg / month.target) * 100)
                  : null;

              return (
                <View key={index} className="px-4 py-3 border-t border-gray-50">
                  {/* Month Header */}
                  <View className="flex-row justify-between mb-2">
                    <Text className="text-xs font-semibold text-gray-700">
                      {month.month}
                    </Text>

                    {achievement !== null ? (
                      <View
                        className={`px-2 py-1 rounded-full ${
                          achievement >= 100
                            ? "bg-emerald-100"
                            : "bg-orange-100"
                        }`}
                      >
                        <Text
                          className={`text-[10px] font-bold ${
                            achievement >= 100
                              ? "text-emerald-700"
                              : "text-orange-600"
                          }`}
                        >
                          {achievement}%
                        </Text>
                      </View>
                    ) : (
                      <Text className="text-[10px] text-gray-300">—</Text>
                    )}
                  </View>

                  {/* REG */}
                  <ProgressBar
                    label="REG"
                    value={month.reg}
                    percent={regPct}
                    target={targetPct}
                    color="bg-blue-500"
                  />

                  {/* NB */}
                  <ProgressBar
                    label="NB"
                    value={month.nb}
                    percent={nbPct}
                    target={targetPct}
                    color="bg-emerald-500"
                  />

                  {/* NE */}
                  <ProgressBar
                    label="NE"
                    value={month.ne}
                    percent={nePct}
                    target={targetPct}
                    color="bg-violet-500"
                  />
                </View>
              );
            })}

            {/* Target note */}
            <View className="flex-row items-center gap-2 px-4 py-3 border-t border-gray-50">
              <View className="w-3 h-[2px] bg-gray-300" />
              <Text className="text-[10px] text-gray-400">
                Vạch dọc = mục tiêu tháng
              </Text>
            </View>
          </View>
        </View>
        <MonthlyTable monthlyProgress={monthlyProgress} />
        {/* ================= Summary Cards ================= */}
        <View className="flex-row gap-3 mb-6">
          {/* Completion Card */}
          <LinearGradient
            colors={["#2563EB", "#60A5FA"]} // from-blue-600 to-blue-400
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} // to-br
            className="flex-1 p-5"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 6,
              borderRadius: 16,
            }}
          >
            <View className="w-10 h-10 items-center justify-center bg-white/20 rounded-xl mb-3">
              <Ionicons name="trophy-outline" size={20} color="white" />
            </View>

            <Text className="text-2xl font-bold text-white mb-1">69.1%</Text>

            <Text className="text-sm text-white/80">Tỷ lệ hoàn thành</Text>
          </LinearGradient>

          {/* Month Passed Card */}
          <LinearGradient
            colors={["#16A34A", "#4ADE80"]} // from-green-600 to-green-400
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }} // to-br
            className="flex-1 p-5"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.25,
              shadowRadius: 12,
              elevation: 6,
              borderRadius: 16,
            }}
          >
            <View className="w-10 h-10 items-center justify-center bg-white/20 rounded-xl mb-3">
              <Ionicons name="calendar-outline" size={20} color="white" />
            </View>

            <Text className="text-2xl font-bold text-white mb-1">10/12</Text>

            <Text className="text-sm text-white/80">Tháng đã qua</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
}
