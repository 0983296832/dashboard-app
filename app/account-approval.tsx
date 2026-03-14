import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, View } from "react-native";

import authServices from "@/api/authApi";
import { useLoadingStore } from "@/stores/useLoadingStore";
import { useToastStore } from "@/stores/useToastStore";
import dayjs from "dayjs";

export default function AccountApprovalPage() {
  const [pendingAccounts, setPendingAccounts] = useState<
    {
      co_so: string;
      created_at: string;
      email: string;
      id: number | string;
      name: string;
      role: string;
    }[]
  >([]);
  const showLoading = useLoadingStore((s) => s.showLoading);
  const hideLoading = useLoadingStore((s) => s.hideLoading);
  const showToast = useToastStore((s) => s.showToast);

  const getUsers = async () => {
    showLoading();
    try {
      const res: any = await authServices.getUsers({
        status: "pending",
        per_page: 9999999,
      });
  
      setPendingAccounts(res?.data);
      hideLoading();
    } catch (error) {
      hideLoading();
    }
  };

  const handleApproveAccount = async (id: string) => {
    showLoading();
    try {
      await authServices.approveUser(id);
      getUsers();
      hideLoading();
      showToast("Đã duyệt tài khoản thành công!", "success");
    } catch (error) {
      hideLoading();
      showToast("Đã duyệt tài khoản thất bại!", "error");
    }
  };

  const handleRejectAccount = async (id: string) => {
    showLoading();
    try {
      await authServices.rejectUser(id);
      getUsers();
      hideLoading();
      showToast("Đã từ chối tài khoản thành công!", "success");
    } catch (error) {
      hideLoading();
      showToast("Đã từ chối tài khoản thất bại!", "error");
    }
  };

  useEffect(() => {
    getUsers();
  }, []);

  return (
    <View className="flex-1 bg-gray-50 pb-24">
      <ScrollView className="px-4 py-5">
        {/* Summary */}
        <View className="bg-white rounded-xl shadow-sm px-5 py-4 flex-row items-center justify-between mb-4">
          <View className="flex-row items-center gap-3">
            <View className="w-10 h-10 items-center justify-center bg-amber-100 rounded-xl">
              <Ionicons name="person-add-outline" size={20} color="#D97706" />
            </View>

            <View>
              <Text className="text-xs text-gray-500">Đang chờ duyệt</Text>
              <Text className="text-xl font-bold text-gray-800">
                {pendingAccounts?.length}
              </Text>
            </View>
          </View>

          {pendingAccounts?.length > 0 && (
            <View className="px-3 py-1 bg-red-100 rounded-full">
              <Text className="text-red-600 text-xs font-semibold">
                Cần xử lý
              </Text>
            </View>
          )}
        </View>

        {/* Empty */}
        {pendingAccounts?.length === 0 ? (
          <View className="bg-white rounded-xl shadow-sm p-10 items-center justify-center">
            <View className="w-16 h-16 bg-emerald-50 rounded-full items-center justify-center mb-4">
              <Ionicons
                name="checkmark-circle-outline"
                size={32}
                color="#10B981"
              />
            </View>

            <Text className="text-base font-semibold text-gray-700 mb-1">
              Tất cả đã được xử lý!
            </Text>

            <Text className="text-sm text-gray-400 text-center">
              Không còn tài khoản nào chờ duyệt.
            </Text>
          </View>
        ) : (
          <View className="gap-3">
            {pendingAccounts?.map((account) => (
              <View
                key={account?.id}
                className="bg-white rounded-xl shadow-sm overflow-hidden"
              >
                <View className="p-4">
                  {/* Header */}
                  <View className="flex-row items-start gap-3 mb-3">
                    <View className="w-12 h-12 rounded-full items-center justify-center bg-emerald-500">
                      <Text className="text-white font-bold text-base">
                        {account?.name.charAt(0)}
                      </Text>
                    </View>

                    <View className="flex-1">
                      <Text className="text-sm font-semibold text-gray-800">
                        {account?.name}
                      </Text>

                      <Text className="text-xs text-emerald-600 font-medium mt-0.5">
                        {account?.role == "user" ? "Nhân viên" : "Quản lý"}
                      </Text>

                      <View className="mt-2 gap-1">
                        <View className="flex-row items-center gap-2">
                          <Ionicons
                            name="mail-outline"
                            size={14}
                            color="#9CA3AF"
                          />
                          <Text className="text-xs text-gray-500">
                            {account?.email}
                          </Text>
                        </View>

                        <View className="flex-row items-center gap-2">
                          <Ionicons
                            name="business-outline"
                            size={14}
                            color="#9CA3AF"
                          />
                          <Text className="text-xs text-gray-500">
                            {account?.co_so}
                          </Text>
                        </View>

                        <View className="flex-row items-center gap-2">
                          <Ionicons
                            name="calendar-outline"
                            size={14}
                            color="#9CA3AF"
                          />
                          <Text className="text-xs text-gray-500">
                            Đăng ký:{" "}
                            {dayjs(account?.created_at).format(
                              "DD/MM/YYYY HH:mm",
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  </View>

                  {/* Buttons */}
                  <View className="flex-row gap-2 pt-3 border-t border-gray-100">
                    <Pressable
                      onPress={() =>
                        handleApproveAccount(account?.id as string)
                      }
                      className="flex-1 bg-emerald-500 py-2.5 rounded-xl items-center justify-center flex-row gap-1.5"
                    >
                      <Ionicons name="checkmark" size={16} color="white" />
                      <Text className="text-white text-sm font-medium">
                        Duyệt
                      </Text>
                    </Pressable>

                    <Pressable
                      onPress={() => handleRejectAccount(account?.id as string)}
                      className="flex-1 bg-red-50 py-2.5 rounded-xl items-center justify-center flex-row gap-1.5"
                    >
                      <Ionicons name="close" size={16} color="#DC2626" />
                      <Text className="text-red-600 text-sm font-medium">
                        Từ chối
                      </Text>
                    </Pressable>
                  </View>
                </View>
              </View>
            ))}
          </View>
        )}
      </ScrollView>
    </View>
  );
}
