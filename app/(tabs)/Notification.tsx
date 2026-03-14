import mainServices from "@/api/main";
import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useEffect, useState } from "react";
import {
  ActivityIndicator,
  Modal,
  Pressable,
  RefreshControl,
  ScrollView,
  Text,
  View,
} from "react-native";

interface Alert {
  id: string;
  type: "critical" | "warning" | "info";
  title: string;
  description: string;
  location: string;
  time: string;
  isRead: boolean;
}

export default function NotificationModal() {
  const [open, setOpen] = useState(false);
  const [alerts, setAlerts] = useState<any[]>([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const [limit] = useState(20);
  const [offset, setOffset] = useState(0);
  const [loading, setLoading] = useState(false);
  const [refreshing, setRefreshing] = useState(false);

  const reloadScreen = async () => {
    if (refreshing) return;

    setRefreshing(true);

    try {
      await Promise.all([getNotifications({ offset: 0 })]);
    } catch (e) {
      console.log(e);
    } finally {
      setRefreshing(false);
    }
  };

  const getNotifications = async (filter?: object) => {
    try {
      setLoading(true);
      let params = {
        limit,
        offset,
        unread_only: false,
      };
      params = { ...params, ...(filter ?? {}) };
      
      const { data }: any = await mainServices.getNotifications(params);
      if (data?.items?.length > 0) {
        setOffset(params?.offset);
        setAlerts(
          params?.offset == 0 ? data?.items : [...alerts, ...data?.items],
        );
      }
      setUnreadCount(data?.unread_count ?? 0);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  useEffect(() => {
    getNotifications({ offset: 0 });
  }, []);

  const markRead = async (id: string) => {
    try {
      await mainServices.readNotification(id);
      setAlerts((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, read_at: dayjs().format("YYYY-MM-DDTHH:mm:ssZ") }
            : a,
        ),
      );
    } catch (error) {
      console.log(error);
    }
  };

  const markAllRead = async () => {
    const unreadIds = alerts.filter((a) => !a.isRead).map((a) => a.id);
    if (!unreadIds.length) return;

    try {
      setLoading(true);
      await Promise.all(
        unreadIds.map((id) => mainServices.readNotification(id)),
      );
      setAlerts((prev) =>
        prev.map((a) => ({
          ...a,
          isRead: dayjs().format("YYYY-MM-DDTHH:mm:ssZ"),
        })),
      );
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const openModal = async () => {
    setOpen(true);
    await getNotifications({ offset: 0 });
  };

  return (
    <View>
      {/* Bell Button */}
      <Pressable
        onPress={openModal}
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

                {unreadCount > 0 && (
                  <Pressable disabled={loading} onPress={markAllRead}>
                    <Text className="text-xs text-emerald-600 font-medium">
                      Đọc tất cả
                    </Text>
                  </Pressable>
                )}
              </View>

              {/* LIST */}
              <ScrollView
                refreshControl={
                  <RefreshControl
                    refreshing={refreshing}
                    onRefresh={reloadScreen}
                  />
                }
                className="max-h-[280px]"
                onScroll={({ nativeEvent }) => {
                  const { layoutMeasurement, contentOffset, contentSize } =
                    nativeEvent;

                  const isBottom =
                    layoutMeasurement.height + contentOffset.y >=
                    contentSize.height - 20;

                  if (isBottom && !loading) {
                    getNotifications({ offset: offset + limit });
                  }
                }}
                scrollEventThrottle={16}
              >
                {loading && alerts.length === 0 ? (
                  <View className="py-10 items-center">
                    <ActivityIndicator size="small" color="#10b981" />
                    <Text className="text-xs text-gray-400 mt-2">
                      Đang tải thông báo...
                    </Text>
                  </View>
                ) : alerts.length === 0 ? (
                  <View className="py-20 items-center">
                    <Text className="text-xs text-white mt-2">
                      Không có thông báo
                    </Text>
                    <Ionicons
                      name="notifications-off-outline"
                      size={24}
                      color="#d1d5db"
                    />
                    <Text className="text-xs text-gray-400 mt-2">
                      Không có thông báo
                    </Text>
                    <Text className="text-xs text-white mt-2">
                      Không có thông báo
                    </Text>
                  </View>
                ) : (
                  alerts.map((alert, index) => (
                    <Pressable
                      key={index}
                      onPress={() => markRead(alert?.id)}
                      className={`px-3 py-2 flex-row gap-2 border-b border-gray-50 ${
                        !alert?.read_at ? "bg-emerald-50/40" : ""
                      }`}
                    >
                      <View className="w-7 h-7 rounded-full items-center justify-center bg-amber-500">
                        <Ionicons
                          name={"information-circle-outline" as any}
                          size={14}
                          color="white"
                        />
                      </View>

                      <View className="flex-1">
                        <View className="flex-row justify-between">
                          <Text className="text-xs font-semibold text-gray-800">
                            {alert?.type == "lead_chua_lien_he"
                              ? "Lead chưa liên hệ"
                              : "Cảnh báo KPI"}
                          </Text>

                          {!alert?.read_at && (
                            <View className="w-2 h-2 rounded-full bg-amber-500" />
                          )}
                        </View>

                        <Text className="text-xs text-gray-500 mt-0.5">
                          {alert?.message}
                        </Text>

                        <View className="flex-row items-center gap-1 mt-1">
                          <Ionicons name="time" size={12} color="#d1d5db" />

                          <Text className="text-[10px] text-gray-400">
                            {dayjs(alert?.created_at).format(
                              "DD/MM/YYYY HH:mm",
                            )}
                          </Text>
                        </View>
                      </View>
                    </Pressable>
                  ))
                )}

                {loading && alerts.length > 0 && (
                  <View className="py-3 items-center">
                    <ActivityIndicator size="small" color="#10b981" />
                  </View>
                )}
              </ScrollView>
            </View>
          </Pressable>
        </Pressable>
      </Modal>
    </View>
  );
}
