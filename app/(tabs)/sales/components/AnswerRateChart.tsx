import React from "react";
import { Text, View } from "react-native";
import Svg, { Circle, Line, Text as SvgText } from "react-native-svg";
import { saleAnswerRateBySource } from "../../../../mocks/sale";

const BAR_COLOR = "#8fad3c";
const LINE_COLOR = "#e91e8c";
const MAX_LEADS = 20000;
const CHART_HEIGHT = 160;

export default function AnswerRateChart() {
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
            <Text className="text-xs text-gray-400 text-right">20 N</Text>
            <Text className="text-xs text-gray-400 text-right">15 N</Text>
            <Text className="text-xs text-gray-400 text-right">10 N</Text>
            <Text className="text-xs text-gray-400 text-right">5 N</Text>
            <Text className="text-xs text-gray-400 text-right">0</Text>
          </View>

          {/* Chart area */}
          <View className="flex-1 relative h-40">
            {/* Grid lines */}
            {[0, 25, 50, 75, 100].map((pct) => (
              <View
                key={pct}
                className="absolute w-full border-t border-gray-100"
                style={{ bottom: `${pct}%` }}
              />
            ))}

            {/* Bars */}
            <View className="absolute inset-0 flex-row items-end justify-around px-2">
              {saleAnswerRateBySource.map((d) => {
                const barH = (d.leads / MAX_LEADS) * 100;

                return (
                  <View
                    key={d.source}
                    className="flex-1 items-center justify-end"
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

            {/* LINE CHART */}
            <Svg
              width="100%"
              height={CHART_HEIGHT}
              style={{ position: "absolute" }}
            >
              {saleAnswerRateBySource.map((d, i) => {
                const total = saleAnswerRateBySource.length;

                const x = ((i + 0.5) / total) * 100;
                const y = 100 - d.answerRate;

                const next = saleAnswerRateBySource[i + 1];
                if (!next) return null;

                const nx = ((i + 1.5) / total) * 100;
                const ny = 100 - next.answerRate;

                return (
                  <Line
                    key={i}
                    x1={`${x}%`}
                    y1={`${y}%`}
                    x2={`${nx}%`}
                    y2={`${ny}%`}
                    stroke={LINE_COLOR}
                    strokeWidth="2"
                  />
                );
              })}

              {saleAnswerRateBySource.map((d, i) => {
                const total = saleAnswerRateBySource.length;

                const x = ((i + 0.5) / total) * 100;
                const y = 100 - d.answerRate;

                return (
                  <React.Fragment key={i}>
                    <Circle
                      key={`c-${i}`}
                      cx={`${x}%`}
                      cy={`${y}%`}
                      r="4"
                      fill="white"
                      stroke={LINE_COLOR}
                      strokeWidth="2"
                    />

                    <SvgText
                      key={`t-${i}`}
                      x={`${x}%`}
                      y={`${y - 3}%`}
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

          {/* Y axis right */}
          <View className="justify-between pl-2 h-40 w-10">
            <Text className="text-xs text-gray-400">100%</Text>
            <Text className="text-xs text-gray-400">75%</Text>
            <Text className="text-xs text-gray-400">50%</Text>
            <Text className="text-xs text-gray-400">25%</Text>
            <Text className="text-xs text-gray-400">0%</Text>
          </View>
        </View>

        {/* X axis */}
        <View className="flex-row pl-10 pr-10 mt-1">
          {saleAnswerRateBySource.map((d) => (
            <View key={d.source} className="flex-1 items-center">
              <Text className="text-xs text-gray-500 text-center">
                {d.source}
              </Text>
            </View>
          ))}
        </View>
      </View>
    </View>
  );
}
