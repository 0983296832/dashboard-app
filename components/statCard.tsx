import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import React, { FC } from "react";
import { Text, View } from "react-native";

interface GradientStatCardProps {
  title: string;
  value: number;
  change: number;
  trend: "up" | "down";
  icon: string;
  gradient: string[]; // ["#3B82F6", "#2563EB"]
}

const GradientStatCard: FC<GradientStatCardProps> = ({
  title,
  value,
  change,
  trend,
  icon,
  gradient,
}) => {
  const isUp = trend === "up";

  return (
    <LinearGradient
      colors={gradient}
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 1 }} // to-br
      className="rounded-2xl p-4"
      style={{
        shadowColor: "#000",
        shadowOpacity: 0.2,
        shadowRadius: 10,
        elevation: 5,
        borderRadius: 16,
      }}
    >
      {/* Top Row */}
      <View className="flex-row items-start justify-between mb-3">
        {/* Icon */}
        <View className="w-9 h-9 items-center justify-center bg-white/20 rounded-xl">
          <Ionicons name={icon as any} size={18} color="white" />
        </View>

        {/* Trend badge */}
        <View
          className={`flex-row items-center px-2 py-0.5 rounded-full ${
            isUp ? "bg-green-400/30" : "bg-red-400/30"
          }`}
        >
          <Ionicons
            name={isUp ? "arrow-up-outline" : "arrow-down-outline"}
            size={12}
            color="white"
          />
          <Text className="text-xs font-medium text-white ml-1">
            {Math.abs(change)}%
          </Text>
        </View>
      </View>

      {/* Bottom */}
      <View className="mt-2">
        <Text className="text-2xl font-bold text-white mb-0.5">
          {value.toLocaleString()}
        </Text>
        <Text className="text-xs text-white/80">{title}</Text>
      </View>
    </LinearGradient>
  );
};

export default GradientStatCard;
