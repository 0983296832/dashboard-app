import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Image, Modal, Pressable, Text, View } from "react-native";
import NotificationPopover from "./Notification";

const userInfo = {
  name: "Nguyễn Minh Tuấn",
  position: "Quản trị viên",
  avatar:
    "https://readdy.ai/api/search-image?query=professional%20Vietnamese%20male%20manager%20portrait%2C%20clean%20white%20background%2C%20business%20casual%2C%20confident%20smile%2C%20high%20quality%20headshot%20photo&width=80&height=80&seq=avatar001&orientation=squarish",
};

function AvatarMenu() {
  const [open, setOpen] = useState(false);
  const router = useRouter();

  const handleLogout = () => {
    setOpen(false);
    router.replace("/login");
  };

  return (
    <>
      {/* Avatar */}
      <Pressable
        onPress={() => setOpen(true)}
        className="w-9 h-9 rounded-full overflow-hidden border-2 border-emerald-200"
      >
        <Image source={{ uri: userInfo.avatar }} className="w-full h-full" />
      </Pressable>

      {/* Modal menu */}
      <Modal visible={open} transparent animationType="fade">
        {/* overlay */}
        <Pressable
          className="flex-1 bg-black/10"
          onPress={() => setOpen(false)}
        />

        {/* menu */}
        <View className="absolute right-4 top-16 w-56 bg-white rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
          {/* User Info */}
          <View className="px-4 py-3 border-b border-gray-100 flex-row items-center gap-3">
            <Image
              source={{ uri: userInfo.avatar }}
              className="w-10 h-10 rounded-full"
            />

            <View className="flex-1">
              <Text className="text-sm font-bold text-gray-800">
                {userInfo.name}
              </Text>
              <Text className="text-xs text-emerald-600">
                {userInfo.position}
              </Text>
            </View>
          </View>

          {/* Menu items */}
          <Pressable
            onPress={() => {
              setOpen(false);
              router.push("/setting");
            }}
            className="flex-row items-center gap-3 px-4 py-3"
          >
            <Ionicons name="person-outline" size={18} color="#6B7280" />
            <Text className="text-sm text-gray-700">Thông tin cá nhân</Text>
          </Pressable>

          <Pressable
            onPress={() => {
              setOpen(false);
              router.push("/account-approval");
            }}
            className="flex-row items-center gap-3 px-4 py-3"
          >
            <Ionicons name="person-add-outline" size={18} color="#6B7280" />
            <Text className="text-sm text-gray-700">Duyệt tài khoản</Text>
          </Pressable>

          {/* Logout */}
          <Pressable
            onPress={handleLogout}
            className="flex-row items-center gap-3 px-4 py-3 border-t border-gray-100"
          >
            <Ionicons name="log-out-outline" size={18} color="#EF4444" />
            <Text className="text-sm text-red-500 font-medium">Đăng xuất</Text>
          </Pressable>
        </View>
      </Modal>
    </>
  );
}

interface AppHeaderProps {
  title: string;
  subtitle?: string;
  showBack?: boolean;
}

export default function AppHeader({
  title,
  subtitle,
  showBack = false,
}: AppHeaderProps) {
  const router = useRouter();

  return (
    <View className="bg-white border-b border-gray-100 shadow-sm">
      <View className="px-4 py-3 flex-row items-center justify-between">
        {/* Left */}
        <View className="flex-row items-center gap-2 flex-1">
          {showBack ? (
            <Pressable
              onPress={() => router.back()}
              className="w-8 h-8 items-center justify-center rounded-lg"
            >
              <Ionicons name="arrow-back" size={20} color="#4B5563" />
            </Pressable>
          ) : (
            <Image
              source={{
                uri: "https://public.readdy.ai/ai/img_res/f4f580fb-f2b6-4d43-a9d7-297924eb6915.png",
              }}
              className="h-8 w-8"
              resizeMode="contain"
            />
          )}

          <View className="flex-1">
            <Text
              numberOfLines={1}
              className="text-base font-bold text-gray-900"
            >
              {title}
            </Text>

            {subtitle && (
              <Text className="text-xs text-gray-400">{subtitle}</Text>
            )}
          </View>
        </View>

        {/* Right */}
        <View className="flex-row items-center gap-2">
          <NotificationPopover />
          <AvatarMenu />
        </View>
      </View>
    </View>
  );
}
