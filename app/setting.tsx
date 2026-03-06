import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import {
  Image,
  Modal,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";

import ToggleSwitch from "@/components/toggle-switch";
import { settingsMockData, userMockData } from "../mocks/setting";

export default function SettingsPage() {
  const router = useRouter();

  const [user] = useState(userMockData);
  const [settings, setSettings] = useState(settingsMockData);

  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [showEditProfile, setShowEditProfile] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: "success" | "error";
  } | null>(null);

  const showToast = (
    message: string,
    type: "success" | "error" = "success",
  ) => {
    setToast({ message, type });
    setTimeout(() => setToast(null), 2500);
  };

  const handleLogout = () => {
    setShowLogoutConfirm(false);
    router.push("/login");
  };

  return (
    <ScrollView className="flex-1">
      <View className="flex-1 bg-gray-50 ">
        {/* Toast */}
        {toast && (
          <View
            className={`absolute top-10 left-1/2 -translate-x-1/2 z-50 px-5 py-3 rounded-xl shadow-lg flex-row items-center gap-2 ${
              toast.type === "success" ? "bg-emerald-500" : "bg-red-500"
            }`}
          >
            <Ionicons
              name={toast.type === "success" ? "checkmark" : "close"}
              size={18}
              color="white"
            />
            <Text className="text-white text-sm font-medium">
              {toast.message}
            </Text>
          </View>
        )}

        <View className="px-4 py-5 gap-y-4">
          {/* ===================== */}
          {/* Thông tin cá nhân */}
          {/* ===================== */}

          <View className="bg-white rounded-xl shadow-sm overflow-hidden">
            <View className="px-5 py-4 border-b border-gray-100">
              <Text className="text-sm font-bold text-gray-700 uppercase">
                Thông tin cá nhân
              </Text>
            </View>

            <View className="p-5">
              <View className="flex-row items-center gap-4 mb-5">
                <Image
                  source={{ uri: user.avatar }}
                  className="w-16 h-16 rounded-full border-4 border-emerald-100"
                />

                <View className="flex-1">
                  <Text className="text-base font-bold text-gray-800">
                    {user.name}
                  </Text>

                  <Text className="text-sm text-emerald-600 font-medium">
                    {user.position}
                  </Text>

                  {user.role === "admin" && (
                    <View className="mt-1 px-2 py-0.5 bg-emerald-100 rounded-full self-start">
                      <Text className="text-xs text-emerald-700 font-medium">
                        Quản trị viên
                      </Text>
                    </View>
                  )}
                </View>
              </View>

              {/* Info */}
              <View className="gap-y-3">
                {/* Email */}
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
                    <Ionicons name="mail-outline" size={16} color="#6B7280" />
                  </View>

                  <Text className="text-gray-600 text-sm">{user.email}</Text>
                </View>

                {/* Phone */}
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
                    <Ionicons name="call-outline" size={16} color="#6B7280" />
                  </View>

                  <Text className="text-gray-600 text-sm">{user.phone}</Text>
                </View>

                {/* Date */}
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
                    <Ionicons
                      name="calendar-outline"
                      size={16}
                      color="#6B7280"
                    />
                  </View>

                  <Text className="text-gray-600 text-sm">
                    Tham gia: {user.joinDate}
                  </Text>
                </View>
              </View>

              <TouchableOpacity
                onPress={() => setShowEditProfile(true)}
                className="mt-4 px-4 py-2.5 bg-emerald-50 rounded-xl flex-row items-center justify-center gap-2"
              >
                <Ionicons name="create-outline" size={16} color="#059669" />
                <Text className="text-emerald-600 text-sm font-medium">
                  Chỉnh sửa thông tin
                </Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* ===================== */}
          {/* Thông báo */}
          {/* ===================== */}

          <View className="bg-white rounded-xl overflow-hidden">
            <View className="px-5 py-4 border-b border-gray-100">
              <Text className="text-sm font-bold text-gray-700 uppercase">
                Thông báo
              </Text>
            </View>

            {[
              {
                key: "push",
                icon: "notifications-outline",
                label: "Thông báo đẩy",
              },
              { key: "email", icon: "mail-outline", label: "Thông báo email" },
              {
                key: "sms",
                icon: "chatbubble-outline",
                label: "Thông báo SMS",
              },
            ].map((item) => (
              <View
                key={item.key}
                className="px-5 py-4 flex-row items-center justify-between border-b border-gray-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
                    <Ionicons
                      name={item.icon as any}
                      size={16}
                      color="#6B7280"
                    />
                  </View>

                  <Text className="text-sm text-gray-700">{item.label}</Text>
                </View>

                <ToggleSwitch
                  value={
                    settings.notifications[
                      item.key as keyof typeof settings.notifications
                    ]
                  }
                  onChange={(val) =>
                    setSettings({
                      ...settings,
                      notifications: {
                        ...settings.notifications,
                        [item.key]: val,
                      },
                    })
                  }
                />
              </View>
            ))}
          </View>

          {/* ===================== */}
          {/* Chung */}
          {/* ===================== */}

          <View className="bg-white rounded-xl overflow-hidden">
            <View className="px-5 py-4 border-b border-gray-100">
              <Text className="text-sm font-bold text-gray-700 uppercase">
                Chung
              </Text>
            </View>

            {[
              { icon: "globe-outline", label: "Ngôn ngữ", value: "Tiếng Việt" },
              {
                icon: "contrast-outline",
                label: "Chủ đề giao diện",
                value: "Sáng",
              },
            ].map((item) => (
              <TouchableOpacity
                key={item.label}
                className="px-5 py-4 flex-row items-center justify-between border-b border-gray-100"
              >
                <View className="flex-row items-center gap-3">
                  <View className="w-8 h-8 bg-gray-100 rounded-lg items-center justify-center">
                    <Ionicons
                      name={item.icon as any}
                      size={16}
                      color="#6B7280"
                    />
                  </View>

                  <Text className="text-sm text-gray-700">{item.label}</Text>
                </View>

                <View className="flex-row items-center gap-2">
                  <Text className="text-sm text-gray-400">{item.value}</Text>
                  <Ionicons name="chevron-forward" size={16} color="#9CA3AF" />
                </View>
              </TouchableOpacity>
            ))}
          </View>

          {/* Logout */}

          <TouchableOpacity
            onPress={() => setShowLogoutConfirm(true)}
            className="px-4 py-3 bg-red-50 rounded-xl flex-row items-center justify-center gap-2"
          >
            <Ionicons name="log-out-outline" size={18} color="#DC2626" />
            <Text className="text-red-600 text-sm font-medium">Đăng xuất</Text>
          </TouchableOpacity>
        </View>

        {/* ===================== */}
        {/* Modal Logout */}
        {/* ===================== */}

        <Modal visible={showLogoutConfirm} transparent animationType="fade">
          <View className="flex-1 bg-black/50 items-center justify-center p-4">
            <View className="bg-white rounded-2xl w-full max-w-sm p-6">
              <View className="w-14 h-14 bg-red-100 rounded-full items-center justify-center mx-auto mb-4">
                <Ionicons name="log-out-outline" size={24} color="#DC2626" />
              </View>

              <Text className="text-lg font-bold text-center mb-2">
                Xác nhận đăng xuất
              </Text>

              <Text className="text-sm text-gray-600 text-center mb-6">
                Bạn có chắc chắn muốn đăng xuất?
              </Text>

              <View className="flex-row gap-3">
                <TouchableOpacity
                  onPress={() => setShowLogoutConfirm(false)}
                  className="flex-1 bg-gray-100 py-2.5 rounded-xl"
                >
                  <Text className="text-center text-gray-700 font-medium">
                    Hủy
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={handleLogout}
                  className="flex-1 bg-red-500 py-2.5 rounded-xl"
                >
                  <Text className="text-center text-white font-medium">
                    Đăng xuất
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
        <Modal visible={showEditProfile} transparent animationType="fade">
          <View className="flex-1 bg-black/50 items-center justify-center p-4">
            <View className="bg-white rounded-2xl w-full max-w-md p-6 shadow-xl max-h-[90%]">
              {/* Header */}
              <View className="flex-row items-center justify-between mb-5">
                <Text className="text-base font-bold text-gray-800">
                  Chỉnh sửa thông tin
                </Text>

                <TouchableOpacity
                  onPress={() => setShowEditProfile(false)}
                  className="w-8 h-8 items-center justify-center"
                >
                  <Ionicons name="close" size={22} color="#9CA3AF" />
                </TouchableOpacity>
              </View>

              <ScrollView showsVerticalScrollIndicator={false}>
                <View className="gap-y-4">
                  {[
                    { label: "Họ và tên", value: user.name },
                    { label: "Email", value: user.email },
                    { label: "Số điện thoại", value: user.phone },
                    { label: "Chức vụ", value: user.position },
                  ].map((field) => (
                    <View key={field.label}>
                      <Text className="text-sm font-medium text-gray-700 mb-1.5">
                        {field.label}
                      </Text>

                      <TextInput
                        defaultValue={field.value}
                        className="w-full px-4 py-2.5 border border-gray-200 rounded-xl text-sm"
                      />
                    </View>
                  ))}
                </View>
              </ScrollView>

              {/* Footer Buttons */}
              <View className="flex-row gap-3 mt-6">
                <TouchableOpacity
                  onPress={() => setShowEditProfile(false)}
                  className="flex-1 bg-gray-100 py-2.5 rounded-xl"
                >
                  <Text className="text-center text-gray-700 font-medium text-sm">
                    Hủy
                  </Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => {
                    setShowEditProfile(false);
                    showToast("Cập nhật thông tin thành công!");
                  }}
                  className="flex-1 bg-emerald-500 py-2.5 rounded-xl"
                >
                  <Text className="text-center text-white font-medium text-sm">
                    Lưu thay đổi
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ScrollView>
  );
}
