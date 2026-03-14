import { ScrollView, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";

interface Dataset {
  label: string;
  data: number[];
  color: string;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface FacilityMiniChartProps {
  data: ChartData;
}

export default function FacilityMiniChart({ data }: FacilityMiniChartProps) {
  const height = 200;

  const padding = {
    top: 16,
    right: 16,
    bottom: 28,
    left: 20,
  };

  const { labels, datasets } = data;

  const stepX = 60;

  const chartW = stepX * (labels.length - 1);

  const width = chartW + padding.left + padding.right;

  const chartH = height - padding.top - padding.bottom;

  const allValues = datasets.flatMap((d) => d.data);

  const maxVal = Math.max(...allValues, 1);

  const yAxis = Array.from({ length: 5 }, (_, i) =>
    Math.round((maxVal / 4) * (4 - i)),
  );

  const formatYAxis = (v: number) => {
    if (v >= 1000) return `${Math.round(v / 1000)}N`;
    return `${v}`;
  };

  // auto hide label nếu quá nhiều
  const labelStep = labels.length > 10 ? 2 : 1;

  return (
    <View className="flex-row w-full">
      {/* Y AXIS */}
      <Svg width={40} height={height}>
        {yAxis.map((val, i) => {
          const y = padding.top + (chartH / 4) * i;

          return (
            <SvgText
              key={`y-${i}`}
              x={36}
              y={y + 4}
              fontSize="10"
              fill="#9ca3af"
              textAnchor="end"
            >
              {formatYAxis(val)}
            </SvgText>
          );
        })}
      </Svg>

      {/* CHART */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        decelerationRate="fast"
      >
        <Svg width={width} height={height}>
          <Defs>
            {datasets.map((ds, i) => (
              <LinearGradient
                key={i}
                id={`grad-${i}`}
                x1="0"
                y1="0"
                x2="0"
                y2="1"
              >
                <Stop offset="0%" stopColor={ds.color} stopOpacity="0.25" />
                <Stop offset="100%" stopColor={ds.color} stopOpacity="0" />
              </LinearGradient>
            ))}
          </Defs>

          {/* GRID */}
          {yAxis.map((_, i) => {
            const y = padding.top + (chartH / 4) * i;

            return (
              <Line
                key={`grid-${i}`}
                x1={padding.left}
                x2={width}
                y1={y}
                y2={y}
                stroke="#f0fdf4"
                strokeWidth={1}
              />
            );
          })}

          {datasets.map((ds, di) => {
            const points = ds.data.map((v, i) => {
              const x = padding.left + stepX * i;

              const y = padding.top + chartH - (v / maxVal) * chartH;

              return { x, y, v };
            });

            const linePath = points
              .map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`)
              .join(" ");

            const areaPath =
              `M ${points[0].x} ${height - padding.bottom} ` +
              points.map((p) => `L ${p.x} ${p.y}`).join(" ") +
              ` L ${points[points.length - 1].x} ${height - padding.bottom} Z`;

            return (
              <View key={di}>
                {/* AREA */}
                <Path d={areaPath} fill={`url(#grad-${di})`} />

                {/* LINE */}
                <Path
                  d={linePath}
                  fill="none"
                  stroke={ds.color}
                  strokeWidth={2.5}
                  strokeLinejoin="round"
                  strokeLinecap="round"
                />

                {/* DOTS */}
                {points.map((p, i) => (
                  <Circle
                    key={`dot-${di}-${i}`}
                    cx={p.x}
                    cy={p.y}
                    r={4}
                    fill={ds.color}
                    stroke="#fff"
                    strokeWidth={1.5}
                  />
                ))}
              </View>
            );
          })}

          {/* X AXIS */}
          {labels.map((label, i) => (
            <SvgText
              key={`x-${i}`}
              x={padding.left + stepX * i}
              y={height - padding.bottom + 16}
              fontSize="10"
              fill="#9ca3af"
              textAnchor="middle"
            >
              {label}
            </SvgText>
          ))}
        </Svg>
      </ScrollView>
    </View>
  );
}
