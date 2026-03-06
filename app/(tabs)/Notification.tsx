import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Modal, Pressable, ScrollView, Text, View } from "react-native";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  location: string;
  time: string;
  isRead: boolean;
}

const initialAlerts: Alert[] = [
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
];

const typeStyle = {
  critical: { color: "bg-red-500", icon: "alert-outline", dot: "bg-red-500" },
  warning: {
    color: "bg-amber-500",
    icon: "warning-outline",
    dot: "bg-amber-500",
  },
  info: {
    color: "bg-teal-500",
    icon: "information-circle-outline",
    dot: "bg-teal-500",
  },
};

export default function NotificationModal() {
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState(initialAlerts);
  const [filter, setFilter] = useState<"all" | "unread">("all");

  const unreadCount = alerts.filter((a) => !a.isRead).length;

  const displayed =
    filter === "unread" ? alerts.filter((a) => !a.isRead) : alerts;

  const markRead = (id: string) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, isRead: true } : a)),
    );
  };

  const markAllRead = () => {
    setAlerts((prev) => prev.map((a) => ({ ...a, isRead: true })));
  };

  return (
    <View>
      {/* Bell Button */}
      <Pressable
        onPress={() => setOpen(true)}
        className="w-9 h-9 bg-gray-100 rounded-xl items-center justify-center"
      >
        <Ionicons name="notifications-outline" size={18} color="#4b5563" />

        {unreadCount > 0 && (
          <View className="absolute -top-1 -right-1 min-w-[18px] h-[18px] bg-red-500 rounded-full items-center justify-center px-1">
            <Text className="text-white text-[10px] font-bold">
              {unreadCount > 9 ? "9+" : unreadCount}
            </Text>
          </View>
        )}
      </Pressable>

      {/* Modal */}
      <Modal
        visible={open}
        transparent
        animationType="fade"
        onRequestClose={() => setOpen(false)}
      >
        {/* Overlay */}
        <Pressable
          className="flex-1 bg-black/40 justify-start items-end pt-16 pr-4"
          onPress={() => setOpen(false)}
        >
          <Pressable onPress={(e) => e.stopPropagation()}>
            <View className="w-72 bg-white rounded-2xl shadow-xl overflow-hidden">
              {/* Header */}
              <View className="px-3 py-2 border-b border-gray-100 flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <Text className="text-sm font-bold text-gray-800">
                    Thông báo
                  </Text>

                  {unreadCount > 0 && (
                    <View className="px-2 py-[2px] bg-red-100 rounded-full">
                      <Text className="text-red-600 text-xs font-bold">
                        {unreadCount} mới
                      </Text>
                    </View>
                  )}
                </View>

                <View className="flex-row items-center gap-3">
                  {unreadCount > 0 && (
                    <Pressable onPress={markAllRead}>
                      <Text className="text-xs text-emerald-600 font-medium">
                        Đọc tất cả
                      </Text>
                    </Pressable>
                  )}
                </View>
              </View>

              {/* Filter */}
              <View className="flex-row gap-2 px-3 pt-2 pb-1">
                {(["all", "unread"] as const).map((f) => (
                  <Pressable
                    key={f}
                    onPress={() => setFilter(f)}
                    className={`px-3 py-1 rounded-full ${
                      filter === f ? "bg-emerald-500" : "bg-gray-100"
                    }`}
                  >
                    <Text
                      className={`text-xs font-semibold ${
                        filter === f ? "text-white" : "text-gray-500"
                      }`}
                    >
                      {f === "all" ? "Tất cả" : "Chưa đọc"}
                    </Text>
                  </Pressable>
                ))}
              </View>

              {/* List */}
              <ScrollView className="max-h-[280px]">
                {displayed.map((alert) => {
                  const s = typeStyle[alert.type];

                  return (
                    <Pressable
                      key={alert.id}
                      onPress={() => markRead(alert.id)}
                      className={`px-3 py-2 flex-row gap-2 border-b border-gray-50 ${
                        !alert.isRead ? "bg-emerald-50/40" : ""
                      }`}
                    >
                      <View
                        className={`w-7 h-7 rounded-full items-center justify-center ${s.color}`}
                      >
                        <Ionicons
                          name={s.icon as any}
                          size={14}
                          color="white"
                        />
                      </View>

                      <View className="flex-1">
                        <View className="flex-row justify-between">
                          <Text className="text-xs font-semibold text-gray-800">
                            {alert.title}
                          </Text>

                          {!alert.isRead && (
                            <View className={`w-2 h-2 rounded-full ${s.dot}`} />
                          )}
                        </View>

                        <Text className="text-xs text-gray-500 mt-0.5">
                          {alert.description}
                        </Text>

                        <View className="flex-row items-center gap-1 mt-1">
                          <Ionicons
                            name="location-outline"
                            size={12}
                            color="#d1d5db"
                          />

                          <Text className="text-[10px] text-gray-400">
                            {alert.location}
                          </Text>

                          <Text className="text-gray-300 text-[10px]">•</Text>

                          <Text className="text-[10px] text-gray-400">
                            {alert.time}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  );
                })}
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
        {/* Stop propagation */}
      </Modal>
    </View>
  );
}
