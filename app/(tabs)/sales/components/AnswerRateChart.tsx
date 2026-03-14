import React from "react";
import { ScrollView, Text, View } from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";

const BAR_COLOR = "#8fad3c";
const LINE_COLOR = "#e91e8c";

const CHART_HEIGHT = 160;
const COLUMN_WIDTH = 60;

const TOP_PADDING = 16;
const BOTTOM_PADDING = 12;

export default function AnswerRateChart({
  data,
}: {
  data: {
    source: string;
    leads: number;
    answered: number;
    answerRate: number;
  }[];
}) {
  const maxLeads = Math.max(...data.map((d) => d.leads));

  const niceMax = Math.ceil(maxLeads / 5000) * 5000;

  const yAxis = Array.from({ length: 5 }, (_, i) => (niceMax / 4) * (4 - i));

  const chartWidth = data.length * COLUMN_WIDTH;

  const getY = (rate: number) => {
    return (
      TOP_PADDING +
      (1 - rate / 100) * (CHART_HEIGHT - TOP_PADDING - BOTTOM_PADDING)
    );
  };

  return (
    <View className="bg-white rounded-2xl shadow-sm mb-3 overflow-hidden">
      {/* Header */}
      <View className="px-4 py-3 border-b border-gray-100 flex-row items-center justify-between">
        <Text className="text-sm font-bold text-gray-800">
          Nguồn Lead theo tình trạng gọi điện
        </Text>
      </View>

      <View className="p-4">
        {/* Legend */}
        <View className="flex-row flex-wrap gap-3 mb-4">
          <View className="flex-row items-center gap-1.5">
            <View
              className="w-3 h-3 rounded-sm"
              style={{ backgroundColor: BAR_COLOR }}
            />
            <Text className="text-xs text-gray-600">Số Lead</Text>
          </View>

          <View className="flex-row items-center gap-1.5">
            <View
              className="w-6 h-[2px]"
              style={{ backgroundColor: LINE_COLOR }}
            />
            <Text className="text-xs text-gray-600">Tỉ lệ nghe máy</Text>
          </View>
        </View>

        {/* Chart */}
        <View className="flex-row">
          {/* Y axis left */}
          <View className="justify-between pr-2 h-40 w-10">
            {yAxis.map((v, i) => {
              const value = Math.floor(v); // bỏ phần thập phân

              return (
                <Text key={i} className="text-xs text-gray-400 text-right">
                  {value >= 1000 ? `${Math.floor(value / 1000)} N` : value}
                </Text>
              );
            })}
          </View>

          {/* Scroll chart */}
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            <View>
              {/* Chart area */}
              <View
                style={{ width: chartWidth, height: CHART_HEIGHT }}
                className="relative"
              >
                {/* Grid */}
                {[0, 25, 50, 75, 100].map((pct) => (
                  <View
                    key={pct}
                    className="absolute w-full border-t border-gray-100"
                    style={{ bottom: `${pct}%` }}
                  />
                ))}

                {/* Bars */}
                <View className="absolute inset-0 flex-row items-end">
                  {data.map((d) => {
                    const barH = (d.leads / niceMax) * 100;

                    return (
                      <View
                        key={d.source}
                        style={{ width: COLUMN_WIDTH }}
                        className="items-center justify-end"
                      >
                        <View
                          className="w-8 rounded-t-sm"
                          style={{
                            height: `${barH}%`,
                            backgroundColor: BAR_COLOR,
                          }}
                        />
                      </View>
                    );
                  })}
                </View>

                {/* Line chart */}
                <Svg
                  width={chartWidth}
                  height={CHART_HEIGHT}
                  style={{ position: "absolute" }}
                >
                  {/* Lines */}
                  {data.map((d, i) => {
                    const x = i * COLUMN_WIDTH + COLUMN_WIDTH / 2;
                    const y = getY(d.answerRate);

                    const next = data[i + 1];
                    if (!next) return null;

                    const nx = (i + 1) * COLUMN_WIDTH + COLUMN_WIDTH / 2;
                    const ny = getY(next.answerRate);

                    return (
                      <Line
                        key={i}
                        x1={x}
                        y1={y}
                        x2={nx}
                        y2={ny}
                        stroke={LINE_COLOR}
                        strokeWidth="2"
                      />
                    );
                  })}

                  {/* Points */}
                  {data.map((d, i) => {
                    const x = i * COLUMN_WIDTH + COLUMN_WIDTH / 2;
                    const y = getY(d.answerRate);

                    return (
                      <React.Fragment key={i}>
                        <Circle
                          cx={x}
                          cy={y}
                          r="4"
                          fill="white"
                          stroke={LINE_COLOR}
                          strokeWidth="2"
                        />

                        <SvgText
                          x={x}
                          y={y - 8}
                          fontSize="9"
                          fill={LINE_COLOR}
                          fontWeight="600"
                          textAnchor="middle"
                        >
                          {d.answerRate}%
                        </SvgText>
                      </React.Fragment>
                    );
                  })}
                </Svg>
              </View>

              {/* X axis */}
              <View className="flex-row mt-1">
                {data.map((d) => (
                  <View
                    key={d.source}
                    style={{ width: COLUMN_WIDTH }}
                    className="items-center"
                  >
                    <Text className="text-xs text-gray-500 text-center">
                      {d.source}
                    </Text>
                  </View>
                ))}
              </View>
            </View>
          </ScrollView>

          {/* Y axis right */}
          <View className="justify-between pl-2 h-40 w-10">
            <Text className="text-xs text-gray-400">100%</Text>
            <Text className="text-xs text-gray-400">75%</Text>
            <Text className="text-xs text-gray-400">50%</Text>
            <Text className="text-xs text-gray-400">25%</Text>
            <Text className="text-xs text-gray-400">0%</Text>
          </View>
        </View>
      </View>
    </View>
  );
}
