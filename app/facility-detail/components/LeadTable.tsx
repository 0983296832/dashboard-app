import { Ionicons } from "@expo/vector-icons";
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
}

interface LeadTableProps {
  leads: Lead[];
}

const statusConfig = {
  new: { label: "Mới", bg: "bg-blue-100", text: "text-blue-700" },
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

  return (
    <View className="gap-y-2">
      {leads.map((lead) => {
        const isExpanded = expandedId === lead.id;

        return (
          <View
            key={lead.id}
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
              onPress={() => setExpandedId(isExpanded ? null : lead.id)}
            >
              <View className="flex-row items-center gap-3">
                <View className="w-9 h-9 items-center justify-center bg-emerald-100 rounded-full">
                  <Ionicons name="person-outline" size={18} color="#059669" />
                </View>

                <View>
                  <Text className="text-sm font-semibold text-gray-800">
                    {lead.name}
                  </Text>
                  <Text className="text-xs text-gray-500">{lead.phone}</Text>
                </View>
              </View>

              <View className="flex-row items-center gap-2">
                <View
                  className={`px-2 py-0.5 rounded-full ${statusConfig[lead.status].bg}`}
                >
                  <Text
                    className={`text-xs font-medium ${statusConfig[lead.status].text}`}
                  >
                    {statusConfig[lead.status].label}
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
                        {lead.source}
                      </Text>
                    </Text>
                  </View>

                  <View className="w-1/2 mb-1">
                    <Text className="text-xs text-gray-500">
                      Phụ trách:
                      <Text className="font-medium text-gray-700">
                        {" "}
                        {lead.assignedTo}
                      </Text>
                    </Text>
                  </View>

                  <View className="w-1/2 mb-1">
                    <Text className="text-xs text-gray-500">
                      Ngày tạo:
                      <Text className="font-medium text-gray-700">
                        {" "}
                        {lead.createdAt}
                      </Text>
                    </Text>
                  </View>

                  {lead.daysPending > 0 && (
                    <View className="w-1/2 mb-1">
                      <Text className="text-xs text-gray-500">
                        Tồn:
                        <Text
                          className={`font-bold ${
                            lead.daysPending > 3
                              ? "text-red-600"
                              : "text-yellow-600"
                          }`}
                        >
                          {" "}
                          {lead.daysPending} ngày
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
