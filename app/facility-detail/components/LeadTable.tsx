import { Ionicons } from "@expo/vector-icons";
import dayjs from "dayjs";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";

interface Lead {
  id: number;
  name: string;
  phone: string;
  source: string;
  status: "new" | "contacted" | "pending" | "need";
  daysPending: number;
  assignedTo: string;
  createdAt: string;
  tinh_trang_goi_dien: string;
  ten_hoc_sinh: string;
  dien_thoai_phu_huynh: string;
  ngay_tao: string;
  nguoi_phu_trach: string;
  nguon_khach_hang: string;
}

interface LeadTableProps {
  leads: Lead[];
}

const statusConfig = {
  moi: { label: "Mới", bg: "bg-blue-100", text: "text-blue-700" },
  contacted: {
    label: "Đã liên hệ",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
  },
  pending: { label: "Tồn đọng", bg: "bg-red-100", text: "text-red-700" },
  need: {
    label: "Đã đăng ký",
    bg: "bg-purple-100",
    text: "text-purple-700",
  },
};

export default function LeadTable({ leads }: LeadTableProps) {
  const [expandedId, setExpandedId] = useState<number | null>(null);
  console.log(leads);

  return (
    <View className="gap-y-2">
      {leads.map((lead) => {
        const isExpanded = expandedId === lead?.id;

        const trang_thai =
          lead.tinh_trang_goi_dien == "Chưa liên hệ" &&
          dayjs().diff(dayjs(lead?.ngay_tao), "day", true) > 3
            ? "Tồn đọng"
            : lead.tinh_trang_goi_dien;

        return (
          <View
            key={lead?.id}
            className="bg-white rounded-xl overflow-hidden"
            style={{
              shadowColor: "#000",
              shadowOpacity: 0.05,
              shadowRadius: 6,
              elevation: 2,
            }}
          >
            {/* Header */}
            <Pressable
              className="px-4 py-3 flex-row items-center justify-between"
              onPress={() => setExpandedId(isExpanded ? null : lead?.id)}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 items-center justify-center bg-emerald-100 rounded-full">
                  <Ionicons name="person-outline" size={18} color="#059669" />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-gray-800">
                    {lead?.ten_hoc_sinh}
                  </Text>
                  <Text className="text-xs text-gray-500">
                    {lead?.dien_thoai_phu_huynh}
                  </Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2">
                <View
                  className={`px-2 py-0.5  bg-emerald-100`}
                  style={{ borderRadius: 9999 }}
                >
                  <Text className={`text-xs font-medium bg-emerald-100`}>
                    {trang_thai}
                  </Text>
                </View>

                <Ionicons
                  name={isExpanded ? "chevron-up" : "chevron-down"}
                  size={18}
                  color="#9ca3af"
                />
              </View>
            </Pressable>

            {/* Expanded */}
            {isExpanded && (
              <View className="px-4 pb-3 pt-3 border-t border-gray-100 gap-y-2">
                <View className="flex-row flex-wrap">
                  <View className="w-1/2 mb-1">
                    <Text className="text-xs text-gray-500">
                      Nguồn:
                      <Text className="font-medium text-gray-700">
                        {" "}
                        {lead?.nguon_khach_hang}
                      </Text>
                    </Text>
                  </View>

                  <View className="w-1/2 mb-1">
                    <Text className="text-xs text-gray-500">
                      Phụ trách:
                      <Text className="font-medium text-gray-700">
                        {" "}
                        {lead?.nguoi_phu_trach}
                      </Text>
                    </Text>
                  </View>

                  <View className="w-1/2 mb-1">
                    <Text className="text-xs text-gray-500">
                      Ngày tạo:
                      <Text className="font-medium text-gray-700">
                        {" "}
                        {lead?.ngay_tao}
                      </Text>
                    </Text>
                  </View>

                  {lead?.daysPending > 0 && (
                    <View className="w-1/2 mb-1">
                      <Text className="text-xs text-gray-500">
                        Tồn:
                        <Text
                          className={`font-bold ${
                            lead?.daysPending > 3
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {" "}
                          {dayjs().diff(
                            dayjs(lead?.ngay_tao),
                            "day",
                            true,
                          )}{" "}
                          ngày
                        </Text>
                      </Text>
                    </View>
                  )}
                </View>
              </View>
            )}
          </View>
        );
      })}
    </View>
  );
}
