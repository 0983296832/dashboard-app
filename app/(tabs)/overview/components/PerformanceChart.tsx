import { Dimensions, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";

interface Props {
  period: string;
}

const width = Dimensions.get("window").width - 40;
const height = 240;

export default function PerformanceChart({ period }: Props) {
  const padding = 40;

  const currentData =
    period === "today"
      ? [45, 52, 48, 65, 58, 72, 68, 75, 82, 78, 85, 90]
      : period === "yesterday"
        ? [40, 48, 45, 60, 55, 68, 65, 70, 78, 75, 80, 85]
        : period === "week"
          ? [35, 42, 38, 55, 50, 62, 58, 65, 72, 68, 75, 80]
          : period === "month"
            ? [30, 38, 35, 50, 45, 58, 55, 60, 68, 65, 70, 75]
            : [25, 32, 28, 45, 40, 52, 48, 55, 62, 58, 65, 70];

  const previousData = currentData.map((v) => Math.round(v * 0.88));

  const chartWidth = width - padding * 2;
  const chartHeight = height - padding * 2;

  const maxValue = Math.max(...currentData, ...previousData);

  const stepX = chartWidth / (currentData.length - 1);

  const getY = (value: number) =>
    height - padding - (value / maxValue) * chartHeight;

  const createLinePath = (data: number[]) =>
    data
      .map((value, index) => {
        const x = padding + stepX * index;
        const y = getY(value);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const createAreaPath = (data: number[]) => {
    let path = `M ${padding} ${height - padding}`;

    data.forEach((value, index) => {
      const x = padding + stepX * index;
      const y = getY(value);
      path += ` L ${x} ${y}`;
    });

    path += ` L ${width - padding} ${height - padding} Z`;

    return path;
  };

  const labels = [
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "CN",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
  ];

  return (
    <View>
      <Svg width={width} height={height}>
        <Defs>
          <LinearGradient id="gradientCurrent" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#10b981" stopOpacity="0.3" />
            <Stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </LinearGradient>

          <LinearGradient id="gradientPrev" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#3b82f6" stopOpacity="0.15" />
            <Stop offset="100%" stopColor="#3b82f6" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* GRID */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const y = padding + (chartHeight / 5) * i;

          return (
            <Line
              key={i}
              x1={padding}
              x2={width - padding}
              y1={y}
              y2={y}
              stroke="#f0f0f0"
              strokeWidth={1}
            />
          );
        })}

        {/* Y AXIS LABEL */}
        {[0, 1, 2, 3, 4, 5].map((i) => {
          const value = Math.round((maxValue / 5) * (5 - i));
          const y = padding + (chartHeight / 5) * i;

          return (
            <SvgText
              key={`y-${i}`}
              x={padding - 10}
              y={y + 4}
              fontSize="11"
              fill="#9ca3af"
              textAnchor="end"
            >
              {value}
            </SvgText>
          );
        })}

        {/* PREVIOUS AREA */}
        <Path d={createAreaPath(previousData)} fill="url(#gradientPrev)" />

        {/* CURRENT AREA */}
        <Path d={createAreaPath(currentData)} fill="url(#gradientCurrent)" />

        {/* PREVIOUS LINE */}
        <Path
          d={createLinePath(previousData)}
          stroke="#3b82f6"
          strokeWidth={2}
          strokeDasharray="5,5"
          fill="none"
        />

        {/* CURRENT LINE */}
        <Path
          d={createLinePath(currentData)}
          stroke="#10b981"
          strokeWidth={3}
          fill="none"
        />

        {/* POINTS CURRENT */}
        {currentData.map((v, i) => {
          const x = padding + stepX * i;
          const y = getY(v);

          return <Circle key={i} cx={x} cy={y} r={5} fill="#10b981" />;
        })}

        {/* POINTS PREVIOUS */}
        {previousData.map((v, i) => {
          const x = padding + stepX * i;
          const y = getY(v);

          return <Circle key={`p-${i}`} cx={x} cy={y} r={4} fill="#3b82f6" />;
        })}

        {/* X AXIS LABEL */}
        {currentData.map((_, index) => {
          if (index % 2 !== 0) return null;

          const x = padding + stepX * index;

          return (
            <SvgText
              key={`x-${index}`}
              x={x}
              y={height - padding + 20}
              fontSize="11"
              fill="#9ca3af"
              textAnchor="middle"
            >
              {labels[index]}
            </SvgText>
          );
        })}
      </Svg>

      {/* LEGEND */}
      <View className="flex-row justify-center mt-4 gap-x-6">
        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-emerald-500 mr-2" />
          <Text className="text-xs text-gray-600">Kỳ này</Text>
        </View>

        <View className="flex-row items-center">
          <View className="w-3 h-3 rounded-full bg-blue-500 mr-2" />
          <Text className="text-xs text-gray-600">Cùng kỳ năm trước</Text>
        </View>
      </View>
    </View>
  );
}
