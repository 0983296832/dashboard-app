import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import {
  mktChannels,
  mktContentTypes,
  mktFacilities,
  mktSummary,
} from "../../../mocks/mkt";

const FACILITIES = ["Tất cả", "Hòa Lạc", "Cầu Giấy", "Đà Nẵng", "Hải Phòng"];

export default function MKTPage() {
  const [selectedFacility, setSelectedFacility] = useState("Tất cả");

  const totalLeads = mktChannels.reduce((s, c) => s + c.leads, 0);

  return (
    <View className="flex-1 bg-gray-50 pb-24">
      {/* Facility filter */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        className="bg-white border-b border-gray-100 px-4 py-2.5"
      >
        <View className="flex-row gap-2">
          {FACILITIES.map((f) => (
            <Pressable
              key={f}
              onPress={() => setSelectedFacility(f)}
              className={`px-3 py-1.5 rounded-full ${
                selectedFacility === f ? "bg-orange-500" : "bg-gray-100"
              }`}
            >
              <Text
                className={`text-xs font-medium ${
                  selectedFacility === f ? "text-white" : "text-gray-600"
                }`}
              >
                {f}
              </Text>
            </Pressable>
          ))}
        </View>
      </ScrollView>

      <ScrollView className="px-4 py-4">
        {/* KPI */}
        <View className="flex-row gap-3 mb-4">
          {/* Lead */}
          <View className="flex-1 bg-white rounded-2xl p-3 shadow-sm items-center">
            <Text className="text-xs text-gray-400 mb-1">Tổng Lead</Text>

            <Text className="text-2xl font-bold text-gray-900">
              {mktSummary.totalLeads.toLocaleString()}
            </Text>

            <View className="flex-row items-center gap-1 mt-1">
              <Ionicons name="arrow-up" size={12} color="#10b981" />
              <Text className="text-xs text-emerald-500 font-medium">
                {mktSummary.changePercent}%
              </Text>
            </View>
          </View>

          {/* REG */}
          <View className="flex-1 bg-white rounded-2xl p-3 shadow-sm items-center">
            <Text className="text-xs text-gray-400 mb-1">REG</Text>

            <Text className="text-2xl font-bold text-orange-500">
              {mktSummary.totalReg.toLocaleString()}
            </Text>

            <Text className="text-xs text-gray-400 mt-1">Đăng ký</Text>
          </View>

          {/* NB */}
          <View className="flex-1 bg-white rounded-2xl p-3 shadow-sm items-center">
            <Text className="text-xs text-gray-400 mb-1">NB Mới</Text>

            <Text className="text-2xl font-bold text-teal-500">
              {mktSummary.totalNb.toLocaleString()}
            </Text>

            <Text className="text-xs text-gray-400 mt-1">Nhập học</Text>
          </View>
        </View>

        {/* Hiệu quả theo nguồn */}
        <View className="bg-white rounded-2xl shadow-sm mb-4">
          <View className="flex-row items-center justify-between px-4 pt-4 pb-2">
            <Text className="text-sm font-bold text-gray-900">
              Hiệu Quả Theo Nguồn
            </Text>

            <Text className="text-xs text-gray-400">
              {totalLeads.toLocaleString()} leads
            </Text>
          </View>

          <View className="px-4 pb-4">
            {mktChannels.map((ch) => (
              <View key={ch.id} className="mb-3">
                <View className="flex-row items-center justify-between mb-1">
                  <View className="flex-row items-center gap-2">
                    <View
                      className="w-6 h-6 items-center justify-center rounded-md"
                      style={{ backgroundColor: `${ch.color}18` }}
                    >
                      <Ionicons
                        name={ch.icon as any}
                        size={14}
                        color={ch.color}
                      />
                    </View>

                    <Text className="text-sm text-gray-700 font-medium">
                      {ch.name}
                    </Text>
                  </View>

                  <View className="flex-row items-center gap-3">
                    <Text className="text-sm font-bold text-gray-900">
                      {ch.leads.toLocaleString()}
                    </Text>

                    <View className="flex-row items-center">
                      <Ionicons
                        name={ch.change >= 0 ? "arrow-up" : "arrow-down"}
                        size={12}
                        color={ch.change >= 0 ? "#10b981" : "#ef4444"}
                      />

                      <Text
                        className={`text-xs font-medium ${
                          ch.change >= 0 ? "text-emerald-500" : "text-red-500"
                        }`}
                      >
                        {Math.abs(ch.change)}%
                      </Text>
                    </View>

                    <Text className="text-xs text-gray-400 w-8 text-right">
                      {ch.percentage}%
                    </Text>
                  </View>
                </View>

                {/* Progress */}
                <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${ch.percentage}%`,
                      backgroundColor: ch.color,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Hiệu quả tuyến nội dung */}
        <View className="bg-white rounded-2xl shadow-sm mb-4">
          <View className="px-4 pt-4 pb-2">
            <Text className="text-sm font-bold text-gray-900">
              Hiệu Quả Tuyến Nội Dung
            </Text>
          </View>

          <View className="px-4 pb-4">
            {mktContentTypes.map((ct) => (
              <View key={ct.id} className="mb-3">
                <View className="flex-row justify-between mb-1">
                  <Text className="text-sm text-gray-700">{ct.name}</Text>

                  <View className="flex-row items-center gap-3">
                    <Text className="text-sm font-bold text-gray-900">
                      {ct.leads.toLocaleString()}
                    </Text>

                    <Text className="text-xs text-gray-400 w-8 text-right">
                      {ct.percentage}%
                    </Text>
                  </View>
                </View>

                <View className="h-2 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${ct.percentage}%`,
                      backgroundColor: ct.color,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        <View className="bg-white rounded-2xl shadow-sm overflow-hidden mb-6">
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

            {mktFacilities.map((f, idx) => {
              const colors = ["#f97316", "#6366f1", "#10b981", "#f59e0b"];
              const color = colors[idx % colors.length];

              return (
                <View
                  key={f.id}
                  className="px-4 py-3 flex-row items-center border-t border-gray-50"
                >
                  {/* facility */}
                  <View className="flex-[2] flex-row items-center gap-2">
                    <View
                      className="w-7 h-7 rounded-lg items-center justify-center"
                      style={{ backgroundColor: `${color}18` }}
                    >
                      <Ionicons
                        name="business-outline"
                        size={14}
                        color={color}
                      />
                    </View>

                    <Text className="text-sm font-medium text-gray-800">
                      {f.name}
                    </Text>
                  </View>

                  {/* lead */}
                  <View className="flex-1 items-center">
                    <Text className="text-sm font-bold text-gray-900">
                      {f.totalLeads.toLocaleString()}
                    </Text>
                  </View>

                  {/* reg */}
                  <View className="flex-1 items-center">
                    <Text className="text-sm font-bold" style={{ color }}>
                      {f.reg.toLocaleString()}
                    </Text>

                    {f.regChange > 0 && (
                      <Text className="text-xs text-emerald-500">
                        {f.regChange}%
                      </Text>
                    )}
                  </View>

                  {/* nb */}
                  <View className="flex-1 items-center">
                    <Text className="text-sm font-bold text-teal-500">
                      {f.nb.toLocaleString()}
                    </Text>

                    {f.nbChange > 0 && (
                      <Text className="text-xs text-emerald-500">
                        {f.nbChange}%
                      </Text>
                    )}
                  </View>
                </View>
              );
            })}
          </View>
        </View>

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
              {mktSummary.avgConversion}%
            </Text>

            <Text className="text-xs text-gray-400 mt-1">
              Lead → REG trung bình
            </Text>
          </View>

          <View className="flex-1 bg-white rounded-2xl p-4 shadow-sm">
            <View className="flex-row items-center gap-2 mb-3">
              <View className="w-8 h-8 bg-teal-50 rounded-lg items-center justify-center">
                <Ionicons name="time-outline" size={18} color="#14b8a6" />
              </View>

              <Text className="text-xs font-semibold text-gray-700">
                Thời gian TB
              </Text>
            </View>

            <Text className="text-3xl font-bold text-teal-500">
              {mktSummary.avgDays}
            </Text>

            <Text className="text-xs text-gray-400 mt-1">
              Ngày từ lead → NB
            </Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}
