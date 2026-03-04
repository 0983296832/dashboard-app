import { Ionicons } from "@expo/vector-icons";
import React, { FC } from "react";
import { ScrollView, Text, View } from "react-native";
import { campusData, contentData, sourceData } from "../../../dashboardData";

const getSourceIcon = (name: string) => {
  switch (name) {
    case "Facebook":
      return "logo-facebook";
    case "Website":
      return "globe-outline";
    case "Zalo":
      return "chatbubble-ellipses-outline";
    case "Tự Tìm Kiếm":
      return "search-outline";
    default:
      return "ellipsis-horizontal";
  }
};

const MarketingPage: FC = () => {
  return (
    <View className="flex-1 bg-orange-50 mt-6">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 70,
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Source Performance */}
        <View className="mt-6 mb-4">
          <Text className="text-base font-semibold text-gray-800 mb-4">
            Hiệu Quả Theo Nguồn
          </Text>

          <View className="space-y-3">
            {sourceData.map((source, index) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-4 shadow-sm mb-3"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center justify-between mb-3">
                  <View className="flex-row items-center gap-3">
                    <View
                      className="w-10 h-10 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${source.color}20` }}
                    >
                      <Ionicons
                        name={getSourceIcon(source.name)}
                        size={18}
                        color={source.color}
                      />
                    </View>

                    <View>
                      <Text className="text-sm font-semibold text-gray-800">
                        {source.name}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {source.percentage}% tổng leads
                      </Text>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text className="text-lg font-bold text-gray-800">
                      {source.value.toLocaleString()}
                    </Text>
                    <Text className="text-xs text-green-600 font-medium">
                      +12.5%
                    </Text>
                  </View>
                </View>

                <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${source.percentage}%`,
                      backgroundColor: source.color,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Content Performance */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-800 mb-4">
            Hiệu Quả Tuyến Nội Dung
          </Text>

          <View
            className="bg-white rounded-2xl p-5 shadow-sm"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <View className="space-y-4">
              {contentData.map((content, index) => (
                <View key={index} className="mb-3">
                  <View className="flex-row items-center justify-between mb-2">
                    <Text className="text-sm font-medium text-gray-700">
                      {content.name}
                    </Text>
                    <Text className="text-sm font-bold text-gray-800">
                      {content.value.toLocaleString()}
                    </Text>
                  </View>

                  <View className="relative w-full h-3 bg-gray-100 rounded-full overflow-hidden justify-center">
                    <View
                      className="absolute left-0 top-0 bottom-0 rounded-full"
                      style={{
                        width: `${content.percentage}%`,
                        backgroundColor: content.color,
                      }}
                    />
                    <Text className="text-xs font-medium text-white text-center">
                      {content.percentage}%
                    </Text>
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Campus Performance */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-800 mb-4">
            Hiệu Quả Theo Cơ Sở
          </Text>

          <View className="space-y-3">
            {campusData.map((campus, index) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-5 shadow-sm mb-3"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center gap-3">
                    <View
                      className="w-12 h-12 items-center justify-center rounded-xl"
                      style={{ backgroundColor: `${campus.color}20` }}
                    >
                      <Ionicons
                        name="business-outline"
                        size={20}
                        color={campus.color}
                      />
                    </View>

                    <View>
                      <Text className="text-sm font-semibold text-gray-800">
                        {campus.name}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {campus.leads.toLocaleString()} leads
                      </Text>
                    </View>
                  </View>

                  <View className="w-8 h-8 items-center justify-center bg-gray-50 rounded-lg">
                    <Ionicons
                      name="chevron-forward"
                      size={18}
                      color="#4B5563"
                    />
                  </View>
                </View>

                <View className="flex-row">
                  <View className="flex-1 items-center">
                    <Text className="text-xs text-gray-500 mb-1">REG</Text>
                    <Text className="text-lg font-bold text-gray-800">
                      {campus.reg}
                    </Text>
                    <Text className="text-xs text-green-600 font-medium">
                      {((campus.reg / campus.leads) * 100).toFixed(1)}%
                    </Text>
                  </View>

                  <View className="flex-1 items-center border-x border-gray-100">
                    <Text className="text-xs text-gray-500 mb-1">NB</Text>
                    <Text className="text-lg font-bold text-gray-800">
                      {campus.nb}
                    </Text>
                    <Text className="text-xs text-green-600 font-medium">
                      {((campus.nb / campus.leads) * 100).toFixed(1)}%
                    </Text>
                  </View>

                  <View className="flex-1 items-center">
                    <Text className="text-xs text-gray-500 mb-1">Tỷ lệ</Text>
                    <Text className="text-lg font-bold text-gray-800">
                      {((campus.nb / campus.reg) * 100).toFixed(0)}%
                    </Text>
                    <Text className="text-xs text-gray-500">REG→NB</Text>
                  </View>
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Quick Stats */}
        <View className="flex-row gap-6 mb-6">
          <View className="flex-1 rounded-2xl p-5 shadow-lg bg-orange-600">
            <View className="w-10 h-10 items-center justify-center bg-white/20 rounded-xl mb-3">
              <Ionicons name="stats-chart-outline" size={20} color="white" />
            </View>
            <Text className="text-2xl font-bold text-white mb-1">31.3%</Text>
            <Text className="text-sm text-white/80">Tỷ lệ chuyển đổi</Text>
          </View>

          <View className="flex-1 rounded-2xl p-5 shadow-lg bg-blue-600">
            <View className="w-10 h-10 items-center justify-center bg-white/20 rounded-xl mb-3">
              <Ionicons name="time-outline" size={20} color="white" />
            </View>
            <Text className="text-2xl font-bold text-white mb-1">18 ngày</Text>
            <Text className="text-sm text-white/80">Thời gian TB</Text>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default MarketingPage;
