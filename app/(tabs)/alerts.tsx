import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  location: string;
  time: string;
  isRead: boolean;
}

export default function Alerts() {
  const [selectedFilter, setSelectedFilter] = useState<
    "all" | "critical" | "warning" | "info"
  >("all");

  const [alerts, setAlerts] = useState<Alert[]>([
    {
      id: "1",
      type: "critical",
      title: "Lead tồn đọng nghiêm trọng",
      description: "15 lead tồn > 3 ngày chưa xử lý",
      location: "Cơ sở Hà Nội",
      time: "2 giờ trước",
      isRead: false,
    },
    {
      id: "2",
      type: "critical",
      title: "Lead tồn đọng nghiêm trọng",
      description: "12 lead tồn > 3 ngày chưa xử lý",
      location: "Cơ sở Đà Nẵng",
      time: "3 giờ trước",
      isRead: false,
    },
    {
      id: "3",
      type: "warning",
      title: "KPI dưới mức yêu cầu",
      description: "KPI đạt 68%, dưới mức 70%",
      location: "Cơ sở TP.HCM",
      time: "5 giờ trước",
      isRead: false,
    },
    {
      id: "4",
      type: "warning",
      title: "KPI dưới mức yêu cầu",
      description: "KPI đạt 65%, dưới mức 70%",
      location: "Cơ sở Cần Thơ",
      time: "6 giờ trước",
      isRead: true,
    },
    {
      id: "5",
      type: "critical",
      title: "Nhân viên không hoạt động",
      description: "Không có hoạt động trong 5 ngày",
      location: "Nguyễn Văn A - Cơ sở Hà Nội",
      time: "1 ngày trước",
      isRead: false,
    },
  ]);

  const filters = [
    { id: "all", label: "Tất cả", count: alerts.length },
    {
      id: "critical",
      label: "Nghiêm trọng",
      count: alerts.filter((a) => a.type === "critical").length,
    },
    {
      id: "warning",
      label: "Cảnh báo",
      count: alerts.filter((a) => a.type === "warning").length,
    },
    {
      id: "info",
      label: "Thông tin",
      count: alerts.filter((a) => a.type === "info").length,
    },
  ];

  const filteredAlerts =
    selectedFilter === "all"
      ? alerts
      : alerts.filter((alert) => alert.type === selectedFilter);

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const getAlertStyle = (type: Alert["type"]) => {
    switch (type) {
      case "critical":
        return {
          bg: "bg-red-50",
          iconBg: "bg-red-500",
          border: "border-red-200",
          icon: "alert",
        };
      case "warning":
        return {
          bg: "bg-yellow-50",
          iconBg: "bg-yellow-500",
          border: "border-yellow-200",
          icon: "warning",
        };
      case "info":
        return {
          bg: "bg-blue-50",
          iconBg: "bg-blue-500",
          border: "border-blue-200",
          icon: "information-circle",
        };
    }
  };

  const markAsRead = (id: string) => {
    setAlerts(alerts.map((a) => (a.id === id ? { ...a, isRead: true } : a)));
  };

  return (
    <View className="flex-1 bg-emerald-50">
      <ScrollView showsVerticalScrollIndicator={false} className="px-4 py-6">
        {/* FILTER */}
        <View className="bg-white rounded-2xl shadow-md p-4 mb-6">
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View className="flex-row gap-2">
              {filters.map((filter) => (
                <Pressable
                  key={filter.id}
                  onPress={() =>
                    setSelectedFilter(filter.id as typeof selectedFilter)
                  }
                  className={`px-4 py-2 rounded-full flex-row items-center gap-2 ${
                    selectedFilter === filter.id
                      ? "bg-emerald-500"
                      : "bg-gray-100"
                  }`}
                >
                  <Text
                    className={`text-xs font-medium ${
                      selectedFilter === filter.id
                        ? "text-white"
                        : "text-gray-600"
                    }`}
                  >
                    {filter.label}
                  </Text>

                  <View
                    className={`px-2 py-0.5 rounded-full ${
                      selectedFilter === filter.id
                        ? "bg-white/20"
                        : "bg-gray-200"
                    }`}
                  >
                    <Text
                      className={`text-xs font-bold ${
                        selectedFilter === filter.id
                          ? "text-white"
                          : "text-gray-700"
                      }`}
                    >
                      {filter.count}
                    </Text>
                  </View>
                </Pressable>
              ))}
            </View>
          </ScrollView>
        </View>

        {/* ALERT LIST */}
        <View className="gap-y-3">
          {filteredAlerts.map((alert) => {
            const style = getAlertStyle(alert.type);

            return (
              <View
                key={alert.id}
                className={`${style.bg} border ${style.border} rounded-2xl p-4 ${
                  !alert.isRead ? "shadow-md" : "opacity-75"
                }`}
              >
                <View className="flex-row gap-3">
                  <View
                    className={`w-10 h-10 items-center justify-center rounded-full ${style.iconBg}`}
                  >
                    <Ionicons
                      name={style.icon as any}
                      size={20}
                      color="white"
                    />
                  </View>

                  <View className="flex-1">
                    <View className="flex-row justify-between mb-1">
                      <Text className="text-sm font-bold text-gray-800">
                        {alert.title}
                      </Text>

                      {!alert.isRead && (
                        <View className="w-2 h-2 bg-emerald-500 rounded-full mt-1" />
                      )}
                    </View>

                    <Text className="text-xs text-gray-600 mb-2">
                      {alert.description}
                    </Text>

                    {/* location + time */}
                    <View className="flex-row items-center mb-3 gap-2">
                      <Ionicons
                        name="location-outline"
                        size={12}
                        color="#9ca3af"
                      />
                      <Text className="text-xs text-gray-500">
                        {alert.location}
                      </Text>

                      <Text className="text-gray-300">•</Text>

                      <Ionicons name="time-outline" size={12} color="#9ca3af" />
                      <Text className="text-xs text-gray-500">
                        {alert.time}
                      </Text>
                    </View>

                    {/* buttons */}
                    <View className="flex-row gap-2">
                      <Pressable
                        onPress={() => markAsRead(alert.id)}
                        className="px-3 py-1.5 bg-white border border-gray-200 rounded-lg"
                      >
                        <Text className="text-xs font-medium text-gray-700">
                          Xem chi tiết
                        </Text>
                      </Pressable>

                      {!alert.isRead && (
                        <Pressable
                          onPress={() => markAsRead(alert.id)}
                          className="px-3 py-1.5 bg-emerald-500 rounded-lg"
                        >
                          <Text className="text-xs font-medium text-white">
                            Đánh dấu đã đọc
                          </Text>
                        </Pressable>
                      )}
                    </View>
                  </View>
                </View>
              </View>
            );
          })}
        </View>

        {/* STATISTICS */}
        <View className="bg-white rounded-2xl shadow-md p-5 mt-6">
          <Text className="text-base font-bold text-gray-800 mb-4">
            Thống kê cảnh báo
          </Text>

          <View className="flex-row gap-3">
            {/* critical */}
            <View className="flex-1 bg-red-50 rounded-xl p-3 items-center">
              <View className="w-10 h-10 bg-red-500 rounded-full items-center justify-center mb-2">
                <Ionicons name="alert" size={20} color="white" />
              </View>

              <Text className="text-xl font-bold text-gray-800">
                {alerts.filter((a) => a.type === "critical").length}
              </Text>

              <Text className="text-xs text-gray-600 mt-1">Nghiêm trọng</Text>
            </View>

            {/* warning */}
            <View className="flex-1 bg-yellow-50 rounded-xl p-3 items-center">
              <View className="w-10 h-10 bg-yellow-500 rounded-full items-center justify-center mb-2">
                <Ionicons name="warning" size={20} color="white" />
              </View>

              <Text className="text-xl font-bold text-gray-800">
                {alerts.filter((a) => a.type === "warning").length}
              </Text>

              <Text className="text-xs text-gray-600 mt-1">Cảnh báo</Text>
            </View>

            {/* info */}
            <View className="flex-1 bg-blue-50 rounded-xl p-3 items-center">
              <View className="w-10 h-10 bg-blue-500 rounded-full items-center justify-center mb-2">
                <Ionicons name="information-circle" size={20} color="white" />
              </View>

              <Text className="text-xl font-bold text-gray-800">
                {alerts.filter((a) => a.type === "info").length}
              </Text>

              <Text className="text-xs text-gray-600 mt-1">Thông tin</Text>
            </View>
          </View>
        </View>

        <View className="h-20" />
      </ScrollView>
    </View>
  );
}
