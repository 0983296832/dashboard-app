import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import React from "react";
import { Pressable, Text, View } from "react-native";
import MobileHeader from "./Header";

const TAB_CONFIG = [
  {
    name: "overview/index",
    label: "Tổng quan",
    icon: {
      active: "grid",
      inactive: "grid-outline",
    },
  },
  {
    name: "yearly-plan/index",
    label: "KPI",
    icon: {
      active: "bar-chart",
      inactive: "bar-chart-outline",
    },
  },
  {
    name: "marketing/index",
    label: "MKT",
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

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        header: ({ route }) => {
          const currentTab = TAB_CONFIG.find((t) => t.name === route.name);
          return <MobileHeader title={currentTab?.label ?? "Dashboard"} />;
        },
      }}
      tabBar={({ state, navigation }) => {
        const currentRoute = state.routes[state.index]?.name;

        return (
          <View className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-200">
            <View className="flex-row items-center justify-between h-16">
              {TAB_CONFIG.map((tab) => {
                const isActive = currentRoute === tab.name;

                return (
                  <Pressable
                    key={tab.name}
                    onPress={() => navigation.navigate(tab.name)}
                    className="flex-1 items-center justify-center"
                  >
                    <Ionicons
                      name={
                        (isActive ? tab.icon.active : tab.icon.inactive) as any
                      }
                      size={24}
                      color={isActive ? "#059669" : "#6B7280"}
                    />

                    <Text
                      className={`text-xs mt-1 font-medium ${
                        isActive ? "text-emerald-600" : "text-gray-500"
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
