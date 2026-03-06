import { Ionicons } from "@expo/vector-icons";
import { useState } from "react";
import { Pressable, Text, View } from "react-native";
import { saleSourceCallData } from "../../../../mocks/sale";

const cols = [
  { key: "answered", label: "Đã nghe máy", color: "#10b981" },
  { key: "notAnswered1", label: "Chưa nghe lần 1", color: "#f59e0b" },
  { key: "notAnswered2", label: "Chưa nghe lần 2", color: "#f97316" },
  { key: "notAnswered3", label: "Chưa nghe lần 3", color: "#ef4444" },
  { key: "notContacted", label: "Chưa liên hệ", color: "#8b5cf6" },
  { key: "wrongNumber", label: "Sai đối tượng", color: "#6b7280" },
  { key: "callback", label: "Gọi lại sau", color: "#3b82f6" },
  { key: "hired", label: "Thuê bao", color: "#ec4899" },
  { key: "duplicate", label: "Trùng lead", color: "#64748b" },
  { key: "wrongReg", label: "Sai số", color: "#dc2626" },
  { key: "reReg", label: "Đăng ký lại", color: "#0891b2" },
  { key: "machineAns", label: "Máy bàn", color: "#7c3aed" },
  { key: "transfer", label: "Chuyển cơ sở", color: "#059669" },
];

export default function SourceCallTable() {
  const [expandedSource, setExpandedSource] = useState<string | null>(null);

  const totals = saleSourceCallData.reduce((acc: any, r: any) => {
    cols.forEach((c) => {
      acc[c.key] = (acc[c.key] || 0) + r[c.key];
    });
    acc.leads = (acc.leads || 0) + r.leads;
    return acc;
  }, {});

  return (
    <View className="bg-white rounded-2xl overflow-hidden mb-3">
      {/* HEADER */}
      <View className="px-4 py-3 border-b border-gray-100">
        <Text className="text-sm font-bold text-gray-800">
          Nguồn Lead theo tình trạng gọi điện
        </Text>

        <Text className="text-xs text-gray-400 mt-1">
          Bấm vào từng nguồn để xem chi tiết
        </Text>
      </View>

      {/* HEADER LABEL */}
      <View className="px-4 py-2 flex-row bg-gray-50 border-b border-gray-100">
        <Text className="text-xs text-gray-400 flex-1">Nguồn khách hàng</Text>

        <Text className="text-xs text-gray-400 w-20 text-center">Đã nghe</Text>

        <Text className="text-xs text-gray-400 w-20 text-right">Tổng Lead</Text>
      </View>

      {/* LIST */}
      {saleSourceCallData.map((row) => {
        const isExpanded = expandedSource === row.source;

        const answerRate =
          row.leads > 0 ? Math.round((row.answered / row.leads) * 100) : 0;

        const rateColor =
          answerRate >= 80
            ? "text-emerald-600"
            : answerRate >= 60
              ? "text-amber-600"
              : "text-red-500";

        const rateBg =
          answerRate >= 80
            ? "bg-emerald-50"
            : answerRate >= 60
              ? "bg-amber-50"
              : "bg-red-50";

        const barColor =
          answerRate >= 80
            ? "#10b981"
            : answerRate >= 60
              ? "#f59e0b"
              : "#ef4444";

        return (
          <View key={row.source} className="border-b border-gray-100">
            {/* ROW */}
            <Pressable
              onPress={() => setExpandedSource(isExpanded ? null : row.source)}
              className="px-4 py-3 flex-row items-center gap-3"
            >
              {/* ICON */}
              <View className="w-8 h-8 rounded-lg bg-emerald-50 items-center justify-center">
                <Ionicons name="call-outline" size={16} color="#10b981" />
              </View>

              {/* NAME */}
              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-800">
                  {row.source}
                </Text>

                {/* progress */}
                <View className="mt-1.5 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                  <View
                    className="h-full rounded-full"
                    style={{
                      width: `${answerRate}%`,
                      backgroundColor: barColor,
                    }}
                  />
                </View>
              </View>

              {/* RATE BADGE */}
              <View className={`px-2 py-1 rounded-lg ${rateBg}`}>
                <Text className={`text-sm font-bold ${rateColor}`}>
                  {answerRate}%
                </Text>
              </View>

              {/* TOTAL */}
              <Text className="text-sm font-bold text-gray-900 w-16 text-right">
                {row.leads.toLocaleString("vi-VN")}
              </Text>

              {/* CHEVRON */}
              <Ionicons
                name={isExpanded ? "chevron-up" : "chevron-down"}
                size={18}
                color="#9ca3af"
              />
            </Pressable>

            {/* EXPANDED */}
            {isExpanded && (
              <View className="px-4 pb-4 bg-gray-50 border-t border-gray-100">
                <View className="flex-row flex-wrap gap-2 mt-3">
                  {cols.map((c) => {
                    const val = row[c.key];
                    const pct =
                      row.leads > 0
                        ? ((val / row.leads) * 100).toFixed(1)
                        : "0";

                    return (
                      <View
                        key={c.key}
                        className="bg-white rounded-xl p-3 flex-row items-center gap-2 w-[48%]"
                      >
                        <View
                          className="w-2 h-8 rounded-full"
                          style={{ backgroundColor: c.color }}
                        />

                        <View className="flex-1">
                          <Text className="text-[10px] text-gray-400">
                            {c.label}
                          </Text>

                          <View className="flex-row items-end gap-1">
                            <Text className="text-sm font-bold text-gray-900">
                              {val > 0 ? val.toLocaleString("vi-VN") : "—"}
                            </Text>

                            {val > 0 && (
                              <Text className="text-[10px] text-gray-400">
                                {pct}%
                              </Text>
                            )}
                          </View>
                        </View>
                      </View>
                    );
                  })}
                </View>
              </View>
            )}
          </View>
        );
      })}

      {/* TOTAL ROW */}
      <View className="px-4 py-3 bg-gray-50 flex-row items-center gap-3">
        <View className="w-8 h-8 rounded-lg bg-orange-50 items-center justify-center">
          <Ionicons name="bar-chart-outline" size={16} color="#f97316" />
        </View>

        <View className="flex-1">
          <Text className="text-sm font-bold text-gray-800">Tổng cộng</Text>

          <Text className="text-xs text-gray-400">
            Đã nghe: {(totals.answered || 0).toLocaleString("vi-VN")} lead
          </Text>
        </View>

        <Text className="text-sm font-bold text-orange-600">
          {(totals.leads || 0).toLocaleString("vi-VN")}
        </Text>
      </View>
    </View>
  );
}
