import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import MobileHeader from "./Header";

export default function TabLayout() {
  const TAB_CONFIG = [
    {
      name: "overview/index",
      label: "Tổng Quan",
      icon: {
        active: "grid",
        inactive: "grid-outline",
      },
    },
    {
      name: "yearly-plan/index",
      label: "KPI Năm",
      icon: {
        active: "bar-chart",
        inactive: "bar-chart-outline",
      },
    },
    {
      name: "marketing/index",
      label: "Marketing",
      icon: {
        active: "megaphone",
        inactive: "megaphone-outline",
      },
    },
    {
      name: "sales/index",
      label: "Sale",
      icon: {
        active: "people",
        inactive: "people-outline",
      },
    },
  ];
  return (
    <Tabs
      screenOptions={{
        header: ({ route }) => {
          const currentTab = TAB_CONFIG.find((tab) => tab.name === route.name);

          return <MobileHeader title={currentTab?.label ?? "Dashboard"} />;
        },
      }}
      tabBar={({ state, navigation }) => {
        const currentRoute = state.routes[state.index]?.name;
        return (
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <View className="flex-row items-center justify-around px-2 py-2">
              {TAB_CONFIG.map((tab) => {
                const isActive = currentRoute === tab.name;

                return (
                  <Pressable
                    key={tab.name}
                    onPress={() => navigation.navigate(tab.name)}
                    className={`flex items-center justify-center gap-1 px-4 py-2 rounded-xl ${
                      isActive ? "bg-blue-50" : ""
                    }`}
                  >
                    <Ionicons
                      name={
                        (isActive ? tab.icon.active : tab.icon.inactive) as any
                      }
                      size={22}
                      color={isActive ? "#2563EB" : "#6B7280"}
                    />
                    <Text
                      className={`text-xs font-medium ${
                        isActive ? "text-blue-600" : "text-gray-500"
                      }`}
                    >
                      {tab.label}
                    </Text>
                  </Pressable>
                );
              })}
            </View>
          </View>
        );
      }}
    >
      <Tabs.Screen name="overview" />
      <Tabs.Screen name="yearly-plan" />
      <Tabs.Screen name="marketing" />
      <Tabs.Screen name="sales" />
    </Tabs>
  );
}
