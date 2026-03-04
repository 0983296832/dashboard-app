import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { ScrollView, Text, View } from "react-native";

import { callStatusData, saleTeamData } from "../../../dashboardData";

const SalesPage: FC = () => {
  return (
    <View className="flex-1 bg-green-50 mt-4">
      <ScrollView
        className="flex-1"
        contentContainerStyle={{
          paddingTop: 70,
          paddingHorizontal: 16,
          paddingBottom: 100,
        }}
        showsVerticalScrollIndicator={false}
      >
        {/* Call Status */}
        <View className="mt-6 mb-6">
          <Text className="text-base font-semibold text-gray-800 mb-4">
            Tình Trạng Gọi Điện
          </Text>

          <View
            className="bg-white rounded-2xl p-5"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <View className="gap-y-4">
              {callStatusData.map((status, index) => (
                <View key={index}>
                  <View className="flex-row items-center justify-between mb-2">
                    <View className="flex-row items-center gap-x-2">
                      <View
                        className="w-3 h-3 rounded-full"
                        style={{ backgroundColor: status.color }}
                      />
                      <Text className="text-sm font-medium text-gray-700">
                        {status.status}
                      </Text>
                    </View>

                    <View className="flex-row items-center gap-x-3">
                      <Text className="text-sm font-bold text-gray-800">
                        {status.value.toLocaleString()}
                      </Text>
                      <Text className="text-xs text-gray-500 w-12 text-right">
                        {status.percentage}%
                      </Text>
                    </View>
                  </View>

                  <View className="w-full h-2.5 bg-gray-100 rounded-full overflow-hidden">
                    <View
                      className="h-full rounded-full"
                      style={{
                        width: `${status.percentage}%`,
                        backgroundColor: status.color,
                      }}
                    />
                  </View>
                </View>
              ))}
            </View>
          </View>
        </View>

        {/* Team Performance */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-800 mb-4">
            Hiệu Suất Đội Ngũ TVTS
          </Text>

          <View className="gap-y-3">
            {saleTeamData.map((member, index) => (
              <View
                key={index}
                className="bg-white rounded-2xl p-4"
                style={{
                  shadowColor: "#000",
                  shadowOpacity: 0.05,
                  shadowRadius: 6,
                  elevation: 2,
                }}
              >
                <View className="flex-row items-center justify-between mb-4">
                  <View className="flex-row items-center gap-x-3">
                    <LinearGradient
                      colors={["#2563EB", "#7C3AED"]}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                      style={{
                        width: 48,
                        height: 48,
                        borderRadius: 999,
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <Text className="text-sm font-bold text-white">
                        {member.name
                          .split(" ")
                          .slice(-2)
                          .map((n: string) => n[0])
                          .join("")}
                      </Text>
                    </LinearGradient>

                    <View>
                      <Text className="text-sm font-semibold text-gray-800">
                        {member.name}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {member.leads} leads được giao
                      </Text>
                    </View>
                  </View>

                  <View className="items-end">
                    <Text className="text-lg font-bold text-green-600">
                      {member.conversionRate}%
                    </Text>
                    <Text className="text-xs text-gray-500">Tỷ lệ CV</Text>
                  </View>
                </View>

                {/* Stats Grid */}
                <View className="flex-row justify-between">
                  <View className="flex-1 items-center p-2 bg-blue-50 rounded-lg mx-1">
                    <Text className="text-xs text-gray-600 mb-1">Đã gọi</Text>
                    <Text className="text-sm font-bold text-gray-800">
                      {member.contacted}
                    </Text>
                  </View>

                  <View className="flex-1 items-center p-2 bg-purple-50 rounded-lg mx-1">
                    <Text className="text-xs text-gray-600 mb-1">
                      Tiềm năng
                    </Text>
                    <Text className="text-sm font-bold text-gray-800">
                      {member.potential}
                    </Text>
                  </View>

                  <View className="flex-1 items-center p-2 bg-orange-50 rounded-lg mx-1">
                    <Text className="text-xs text-gray-600 mb-1">REG</Text>
                    <Text className="text-sm font-bold text-gray-800">
                      {member.reg}
                    </Text>
                  </View>

                  <View className="flex-1 items-center p-2 bg-green-50 rounded-lg mx-1">
                    <Text className="text-xs text-gray-600 mb-1">NB</Text>
                    <Text className="text-sm font-bold text-gray-800">
                      {member.nb}
                    </Text>
                  </View>
                </View>

                <View className="mt-3 w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                  <LinearGradient
                    colors={["#16A34A", "#4ADE80"]}
                    start={{ x: 0, y: 0 }}
                    end={{ x: 1, y: 0 }}
                    style={{
                      height: "100%",
                      width: `${member.conversionRate * 5}%`,
                      borderRadius: 999,
                    }}
                  />
                </View>
              </View>
            ))}
          </View>
        </View>

        {/* Top Performers */}
        <View className="mb-6">
          <Text className="text-base font-semibold text-gray-800 mb-4">
            Top Performers
          </Text>

          <View
            className="bg-white rounded-2xl p-5"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            <View className="gap-y-4">
              {saleTeamData
                .sort((a, b) => b.conversionRate - a.conversionRate)
                .slice(0, 3)
                .map((member, index) => (
                  <View key={index} className="flex-row items-center gap-x-4">
                    <View
                      className={`w-10 h-10 items-center justify-center rounded-full ${
                        index === 0
                          ? "bg-yellow-400"
                          : index === 1
                            ? "bg-gray-300"
                            : "bg-orange-400"
                      }`}
                    >
                      <Text className="text-base font-bold text-white">
                        {index + 1}
                      </Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-gray-800">
                        {member.name}
                      </Text>
                      <Text className="text-xs text-gray-500">
                        {member.nb} NB • {member.conversionRate}% tỷ lệ
                      </Text>
                    </View>

                    <View className="w-8 h-8 items-center justify-center bg-green-50 rounded-lg">
                      <Ionicons
                        name="trophy-outline"
                        size={18}
                        color="#16A34A"
                      />
                    </View>
                  </View>
                ))}
            </View>
          </View>
        </View>

        {/* Summary Cards */}
        <View className="flex-row gap-x-3 m4-6">
          <LinearGradient
            colors={["#16A34A", "#4ADE80"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View className="w-10 h-10 items-center justify-center bg-white/20 rounded-xl mb-3">
              <Ionicons name="person-circle-outline" size={20} color="white" />
            </View>
            <Text className="text-2xl font-bold text-white mb-1">5</Text>
            <Text className="text-sm text-white/80">Tư vấn viên</Text>
          </LinearGradient>

          <LinearGradient
            colors={["#2563EB", "#60A5FA"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
            style={{
              flex: 1,
              borderRadius: 16,
              padding: 20,
            }}
          >
            <View className="w-10 h-10 items-center justify-center bg-white/20 rounded-xl mb-3">
              <Ionicons name="call-outline" size={20} color="white" />
            </View>
            <Text className="text-2xl font-bold text-white mb-1">67.5%</Text>
            <Text className="text-sm text-white/80">Tỷ lệ nghe máy</Text>
          </LinearGradient>
        </View>
      </ScrollView>
    </View>
  );
};

export default SalesPage;
