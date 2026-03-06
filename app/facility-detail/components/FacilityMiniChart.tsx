import { View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";

interface FacilityMiniChartProps {
  facilityName: string;
}

const dataMap: Record<string, number[]> = {
  "Cơ sở Hà Nội": [60, 72, 68, 80, 75, 88, 85, 90, 95, 92, 98, 100],
  "Cơ sở TP.HCM": [50, 58, 55, 65, 60, 70, 68, 72, 75, 71, 73, 75],
  "Cơ sở Đà Nẵng": [65, 75, 72, 82, 78, 88, 85, 90, 92, 89, 94, 92],
  "Cơ sở Hải Phòng": [45, 55, 52, 62, 58, 68, 65, 70, 73, 70, 75, 78],
  "Cơ sở Cần Thơ": [30, 38, 35, 45, 40, 50, 48, 52, 55, 52, 58, 66],
  "Cơ sở Nha Trang": [55, 65, 62, 72, 68, 78, 75, 80, 82, 79, 83, 80],
};

export default function FacilityMiniChart({
  facilityName,
}: FacilityMiniChartProps) {
  const width = 320;
  const height = 200;

  const padding = { top: 16, right: 16, bottom: 28, left: 36 };

  const chartW = width - padding.left - padding.right;
  const chartH = height - padding.top - padding.bottom;

  const dataPoints = dataMap[facilityName] ?? [
    40, 50, 45, 60, 55, 65, 62, 70, 75, 72, 78, 80,
  ];

  const maxVal = Math.max(...dataPoints);
  const stepX = chartW / (dataPoints.length - 1);

  const points = dataPoints.map((v, i) => {
    const x = padding.left + stepX * i;
    const y = padding.top + chartH - (v / maxVal) * chartH;
    return { x, y, v };
  });

  const linePath = points
    .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
    .join(" ");

  const areaPath =
    `M ${padding.left} ${height - padding.bottom} ` +
    points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
    ` L ${points[points.length - 1].x} ${height - padding.bottom} Z`;

  const xLabels = [
    "T1",
    "T2",
    "T3",
    "T4",
    "T5",
    "T6",
    "T7",
    "T8",
    "T9",
    "T10",
    "T11",
    "T12",
  ];

  return (
    <View className="w-full">
      <Svg width="100%" height={height} viewBox={`0 0 ${width} ${height}`}>
        <Defs>
          <LinearGradient id="grad" x1="0" y1="0" x2="0" y2="1">
            <Stop offset="0%" stopColor="#10b981" stopOpacity="0.25" />
            <Stop offset="100%" stopColor="#10b981" stopOpacity="0" />
          </LinearGradient>
        </Defs>

        {/* Grid */}
        {[0, 1, 2, 3, 4].map((i) => {
          const y = padding.top + (chartH / 4) * i;
          return (
            <Line
              key={i}
              x1={padding.left}
              x2={width - padding.right}
              y1={y}
              y2={y}
              stroke="#f0fdf4"
              strokeWidth={1}
            />
          );
        })}

        {/* Gradient Area */}
        <Path d={areaPath} fill="url(#grad)" />

        {/* Line */}
        <Path
          d={linePath}
          fill="none"
          stroke="#10b981"
          strokeWidth={2.5}
          strokeLinejoin="round"
          strokeLinecap="round"
        />

        {/* Dots */}
        {points.map((p, i) => (
          <Circle key={i} cx={p.x} cy={p.y} r={4} fill="#10b981" />
        ))}

        {points.map((p, i) => (
          <Circle key={`inner-${i}`} cx={p.x} cy={p.y} r={2.5} fill="#fff" />
        ))}

        {/* Y labels */}
        {[0, 1, 2, 3, 4].map((i) => {
          const val = Math.round((maxVal / 4) * (4 - i));
          const y = padding.top + (chartH / 4) * i;

          return (
            <SvgText
              key={`y-${i}`}
              x={padding.left - 6}
              y={y + 4}
              fontSize="10"
              fill="#9ca3af"
              textAnchor="end"
            >
              {val}
            </SvgText>
          );
        })}

        {/* X labels */}
        {points.map((p, i) =>
          i % 2 === 0 ? (
            <SvgText
              key={`x-${i}`}
              x={p.x}
              y={height - padding.bottom + 16}
              fontSize="10"
              fill="#9ca3af"
              textAnchor="middle"
            >
              {xLabels[i]}
            </SvgText>
          ) : null,
        )}
      </Svg>
    </View>
  );
}
