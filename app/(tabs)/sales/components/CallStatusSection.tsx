import { Text, View } from "react-native";
import { callStatusData } from "../../../../mocks/sale";

export default function CallStatusSection() {
  const items = [
    callStatusData.contacted,
    callStatusData.notContacted,
    callStatusData.noAnswer,
  ];

  return (
    <View className="bg-white rounded-2xl p-4 shadow-sm mb-3">
      <Text className="text-sm font-bold text-gray-800 mb-4">
        Tình Trạng Gọi Điện
      </Text>

      <View className="gap-y-4">
        {items.map((item) => (
          <View key={item.label}>
            <View className="flex-row items-center justify-between mb-1">
              <View className="flex-row items-center gap-2">
                <View
                  className="w-2.5 h-2.5 rounded-full"
                  style={{ backgroundColor: item.color }}
                />
                <Text className="text-sm text-gray-700">{item.label}</Text>
              </View>

              <View className="flex-row items-center gap-3">
                <Text className="text-sm font-bold text-gray-800">
                  {item.count.toLocaleString("vi-VN")}
                </Text>
                <Text className="text-xs text-gray-500 w-10 text-right">
                  {item.percentage}%
                </Text>
              </View>
            </View>

            <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
              <View
                className="h-full rounded-full"
                style={{
                  width: `${item.percentage}%`,
                  backgroundColor: item.color,
                }}
              />
            </View>
          </View>
        ))}
      </View>
    </View>
  );
}
