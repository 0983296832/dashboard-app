import { Ionicons } from "@expo/vector-icons";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import React, { FC, useState } from "react";
import { Modal, Pressable, Text, TouchableOpacity, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

interface Props {
  title: string;
}

function MenuItem({ icon, color, bg, title, subtitle }: any) {
  return (
    <Pressable className="flex-row items-center gap-3 px-4 py-3 active:bg-gray-50">
      <View className={`w-8 h-8 items-center justify-center rounded-lg ${bg}`}>
        <Ionicons name={icon} size={18} color={color} />
      </View>

      <View>
        <Text className="text-sm font-medium text-gray-800">{title}</Text>
        <Text className="text-xs text-gray-500">{subtitle}</Text>
      </View>
    </Pressable>
  );
}

function NotificationItem({
  bg,
  activeBg,
  icon,
  iconBg,
  title,
  desc,
  time,
}: any) {
  return (
    <Pressable className={`p-3  rounded-xl ${bg} ${activeBg}`}>
      <View className="flex-row items-start gap-3">
        <View
          className={`w-8 h-8 items-center justify-center rounded-lg ${iconBg}`}
        >
          <Ionicons name={icon} size={16} color="white" />
        </View>

        <View className="flex-1">
          <Text className="text-sm font-medium text-gray-800">{title}</Text>

          <Text className="text-xs text-gray-600 mt-1">{desc}</Text>

          <Text className="text-xs text-gray-400 mt-1">{time}</Text>
        </View>
      </View>
    </Pressable>
  );
}

const MobileHeader: FC<Props> = ({ title }) => {
  const router = useRouter();
  const [showNotifications, setShowNotifications] = useState(false);
  const [showUserMenu, setShowUserMenu] = useState(false);

  const handleLogout = () => {
    setShowUserMenu(false);
    router.replace("/login");
  };

  return (
    <>
      {/* FIXED HEADER */}
      <SafeAreaView
        className="bg-white/80 backdrop-blur-md"
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 100,
          borderBottomWidth: 1,
          borderBottomColor: "#E5E7EB",
        }}
      >
        <View
          style={{
            height: 60,
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            paddingHorizontal: 16,
          }}
        >
          {/* Left */}
          <View style={{ flexDirection: "row", alignItems: "center" }}>
            <View
              style={{
                width: 32,
                height: 32,
                borderRadius: 8,
                backgroundColor: "#2563EB",
                alignItems: "center",
                justifyContent: "center",
                marginRight: 8,
              }}
            >
              <Ionicons name="school-outline" size={18} color="#fff" />
            </View>
            <Text style={{ fontSize: 16, fontWeight: "600" }}>{title}</Text>
          </View>

          {/* Right */}
          <View style={{ flexDirection: "row", alignItems: "center", gap: 12 }}>
            {/* Notifications */}
            <TouchableOpacity
              onPress={() => {
                setShowNotifications(true);
                setShowUserMenu(false);
              }}
            >
              <Ionicons
                name="notifications-outline"
                size={24}
                color="#374151"
              />
            </TouchableOpacity>

            {/* Avatar */}
            <TouchableOpacity
              onPress={() => {
                setShowUserMenu(true);
                setShowNotifications(false);
              }}
              style={{
                width: 36,
                height: 36,
                borderRadius: 18,
                backgroundColor: "#2563EB",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Text style={{ color: "#fff", fontWeight: "600" }}>AD</Text>
            </TouchableOpacity>
          </View>
        </View>
      </SafeAreaView>

      {/* USER MENU MODAL */}
      <Modal visible={showUserMenu} transparent animationType="fade">
        <Pressable style={{ flex: 1 }} onPress={() => setShowUserMenu(false)}>
          <View className="absolute top-16 right-4 w-64 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden z-50">
            {/* User Info */}
            <LinearGradient
              colors={["#eff6ff", "#ffffff"]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
              className="px-4 py-4 border-b border-gray-100"
            >
              <View className="flex-row items-center gap-3">
                <View className="w-12 h-12 rounded-full bg-blue-600 items-center justify-center">
                  <Text className="text-white font-bold text-sm">AD</Text>
                </View>

                <View className="flex-1">
                  <Text className="text-sm font-semibold text-gray-800">
                    Admin Dashboard
                  </Text>
                  <Text className="text-xs text-gray-500">
                    admin@tuyensinh.edu.vn
                  </Text>

                  <View className="self-start mt-1 px-2 py-0.5 bg-blue-100 rounded-full">
                    <Text className="text-xs text-blue-600 font-medium">
                      Quản trị viên
                    </Text>
                  </View>
                </View>
              </View>
            </LinearGradient>

            {/* Menu Items */}
            <View className="py-2">
              <MenuItem
                icon="person-outline"
                color="#2563eb"
                bg="bg-blue-50"
                title="Thông tin cá nhân"
                subtitle="Xem & chỉnh sửa hồ sơ"
              />

              <MenuItem
                icon="settings-outline"
                color="#d97706"
                bg="bg-amber-50"
                title="Cài đặt"
                subtitle="Tuỳ chỉnh ứng dụng"
              />

              <MenuItem
                icon="shield-checkmark-outline"
                color="#6b7280"
                bg="bg-gray-100"
                title="Bảo mật"
                subtitle="Đổi mật khẩu"
              />
            </View>

            {/* Logout */}
            <View className="border-t border-gray-100 py-2">
              <Pressable
                onPress={handleLogout}
                className="flex-row items-center gap-3 px-4 py-3 active:bg-red-50"
              >
                <View className="w-8 h-8 items-center justify-center bg-red-50 rounded-lg">
                  <Ionicons name="log-out-outline" size={18} color="#ef4444" />
                </View>
                <Text className="text-sm font-medium text-red-500">
                  Đăng xuất
                </Text>
              </Pressable>
            </View>
          </View>
        </Pressable>
      </Modal>

      {/* NOTIFICATIONS MODAL */}
      <Modal visible={showNotifications} transparent animationType="fade">
        <Pressable
          style={{ flex: 1 }}
          onPress={() => setShowNotifications(false)}
        >
          <Pressable
            className="absolute inset-0 z-40 bg-black/20"
            onPress={() => setShowNotifications(false)}
          >
            {/* Panel */}
            <Pressable
              onPress={(e) => e.stopPropagation()}
              className="absolute top-16 right-4 w-80 max-w-[90%] bg-white rounded-2xl shadow-lg p-4"
            >
              {/* Header */}
              <View className="flex-row items-center justify-between mb-4">
                <Text className="text-base font-semibold text-gray-800">
                  Thông báo
                </Text>

                <Pressable>
                  <Text className="text-xs font-medium text-blue-600">
                    Đánh dấu đã đọc
                  </Text>
                </Pressable>
              </View>

              {/* List */}
              <View className="gap-3">
                <NotificationItem
                  bg="bg-blue-50"
                  activeBg="active:bg-blue-100"
                  icon="person-add-outline"
                  iconBg="bg-blue-600"
                  title="Lead mới từ Facebook"
                  desc="15 lead mới cần xử lý"
                  time="5 phút trước"
                />

                <NotificationItem
                  bg="bg-gray-50"
                  activeBg="active:bg-gray-100"
                  icon="checkmark-outline"
                  iconBg="bg-green-600"
                  title="Đạt mục tiêu tuần"
                  desc="Chúc mừng! Đã đạt 105% KPI"
                  time="2 giờ trước"
                />
              </View>
            </Pressable>
          </Pressable>
        </Pressable>
      </Modal>
    </>
  );
};

export default MobileHeader;
