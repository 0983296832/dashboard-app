import { Dimensions, ScrollView, Text, View } from "react-native";
import Svg, {
  Circle,
  Defs,
  Line,
  LinearGradient,
  Path,
  Stop,
  Text as SvgText,
} from "react-native-svg";

const screenWidth = Dimensions.get("window").width - 40;
const height = 240;

interface Dataset {
  label: string;
  data: number[];
  color: string;
  dashed?: boolean;
}

interface ChartData {
  labels: string[];
  datasets: Dataset[];
}

interface Props {
  data: ChartData;
}

export default function PerformanceChart({ data }: Props) {
  const padding = 20;
  const yAxisWidth = 40;

  const { labels, datasets } = data;

  const allValues = datasets.flatMap((d) => d.data);
  const maxValue = Math.max(...allValues);

  const niceMax = Math.ceil(maxValue / 5) * 5;

  const chartHeight = height - padding * 2;

  // mỗi label rộng 60px
  const columnWidth = 60;
  const chartWidth = labels.length * columnWidth;

  const stepX = columnWidth;

  const getY = (value: number) =>
    height - padding - (value / niceMax) * chartHeight;

  const createLinePath = (data: number[]) =>
    data
      .map((value, index) => {
        const x = index * stepX + stepX / 2;
        const y = getY(value);
        return `${index === 0 ? "M" : "L"} ${x} ${y}`;
      })
      .join(" ");

  const createAreaPath = (data: number[]) => {
    let path = `M ${stepX / 2} ${height - padding}`;

    data.forEach((value, index) => {
      const x = index * stepX + stepX / 2;
      const y = getY(value);
      path += ` L ${x} ${y}`;
    });

    path += ` L ${chartWidth} ${height - padding} Z`;

    return path;
  };

  const yAxis = Array.from({ length: 6 }, (_, i) =>
    Math.round((niceMax / 5) * (5 - i)),
  );

  return (
    <View>
      <View className="flex-row">
        {/* Y AXIS */}
        <View style={{ width: yAxisWidth, height }}>
          {yAxis.map((value, i) => {
            const y = padding + (chartHeight / 5) * i;

            return (
              <Text
                key={i}
                style={{
                  position: "absolute",
                  top: y - 8,
                  right: 5,
                  fontSize: 11,
                  color: "#9ca3af",
                }}
              >
                {value}
              </Text>
            );
          })}
        </View>

        {/* CHART SCROLL */}
        <ScrollView horizontal showsHorizontalScrollIndicator={false}>
          <View>
            <Svg width={chartWidth} height={height}>
              <Defs>
                {datasets.map((ds, i) => (
                  <LinearGradient
                    key={i}
                    id={`gradient-${i}`}
                    x1="0"
                    y1="0"
                    x2="0"
                    y2="1"
                  >
                    <Stop offset="0%" stopColor={ds.color} stopOpacity="0.3" />
                    <Stop offset="100%" stopColor={ds.color} stopOpacity="0" />
                  </LinearGradient>
                ))}
              </Defs>

              {/* GRID */}
              {yAxis.map((_, i) => {
                const y = padding + (chartHeight / 5) * i;

                return (
                  <Line
                    key={i}
                    x1={0}
                    x2={chartWidth}
                    y1={y}
                    y2={y}
                    stroke="#f0f0f0"
                    strokeWidth={1}
                  />
                );
              })}

              {/* AREA */}
              {datasets.map((ds, i) => (
                <Path
                  key={`area-${i}`}
                  d={createAreaPath(ds.data)}
                  fill={`url(#gradient-${i})`}
                />
              ))}

              {/* LINE */}
              {datasets.map((ds, i) => (
                <Path
                  key={`line-${i}`}
                  d={createLinePath(ds.data)}
                  stroke={ds.color}
                  strokeWidth={3}
                  fill="none"
                  strokeDasharray={ds.dashed ? "5,5" : undefined}
                />
              ))}

              {/* POINTS */}
              {datasets.map((ds, di) =>
                ds.data.map((v, i) => {
                  const x = i * stepX + stepX / 2;
                  const y = getY(v);

                  return (
                    <Circle
                      key={`${di}-${i}`}
                      cx={x}
                      cy={y}
                      r={4}
                      fill={ds.color}
                    />
                  );
                }),
              )}

              {/* X AXIS */}
              {labels.map((label, index) => {
                const x = index * stepX + stepX / 2;

                return (
                  <SvgText
                    key={index}
                    x={x}
                    y={height - 5}
                    fontSize="11"
                    fill="#9ca3af"
                    textAnchor="middle"
                  >
                    {label}
                  </SvgText>
                );
              })}
            </Svg>
          </View>
        </ScrollView>
      </View>

      {/* LEGEND */}
      <View className="flex-row justify-center mt-4 gap-x-6 flex-wrap">
        {datasets.map((ds, i) => (
          <View key={i} className="flex-row items-center">
            <View
              className="w-3 h-3 rounded-full mr-2"
              style={{ backgroundColor: ds.color }}
            />
            <Text className="text-xs text-gray-600">{ds.label}</Text>
          </View>
        ))}
      </View>
    </View>
  );
}
