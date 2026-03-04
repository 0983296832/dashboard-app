export const overviewStats = [
  {
    id: 1,
    title: "Tổng Lead",
    value: 2847,
    change: 12.5,
    trend: "up",
    icon: "people-outline",
    gradient: ["#2563EB", "#60A5FA"], // blue
  },
  {
    id: 2,
    title: "Đã Nghe Máy",
    value: 1923,
    change: 8.3,
    trend: "up",
    icon: "call-outline",
    gradient: ["#F97316", "#FDBA74"], // orange
  },
  {
    id: 3,
    title: "Tiềm Năng",
    value: 1456,
    change: -3.2,
    trend: "down",
    icon: "star-outline",
    gradient: ["#7C3AED", "#C084FC"], // purple
  },
  {
    id: 4,
    title: "REG",
    value: 892,
    change: 15.7,
    trend: "up",
    icon: "document-text-outline",
    gradient: ["#16A34A", "#4ADE80"], // green
  },
];

export const kpiData = {
  monthlyTarget: {
    current: 340,
    target: 500,
    percentage: 68,
  },
  conversionRate: {
    rate: 31.3,
    avgDays: 18,
  },
  weeklyTrend: [
    { day: "T2", value: 45 },
    { day: "T3", value: 52 },
    { day: "T4", value: 48 },
    { day: "T5", value: 61 },
    { day: "T6", value: 58 },
    { day: "T7", value: 43 },
    { day: "CN", value: 38 },
  ],
};

export const funnelData = [
  { stage: "Lead", value: 2847, percentage: 100, color: "#3B82F6" },
  { stage: "Đã Nghe Máy", value: 1923, percentage: 67.5, color: "#2563EB" },
  { stage: "Tiềm Năng", value: 1456, percentage: 51.1, color: "#8B5CF6" },
  { stage: "REG", value: 892, percentage: 31.3, color: "#F59E0B" },
  { stage: "NB", value: 534, percentage: 18.8, color: "#10B981" },
];

export const sourceData = [
  { name: "Facebook", value: 998, percentage: 35, color: "#3B82F6" },
  { name: "Website", value: 797, percentage: 28, color: "#1E40AF" },
  { name: "Zalo", value: 569, percentage: 20, color: "#10B981" },
  { name: "Tự Tìm Kiếm", value: 342, percentage: 12, color: "#F59E0B" },
  { name: "Khác", value: 141, percentage: 5, color: "#6B7280" },
];

export const campusData = [
  { name: "Hòa Lạc", leads: 1245, reg: 389, nb: 234, color: "#3B82F6" },
  { name: "Cầu Giấy", leads: 892, reg: 278, nb: 167, color: "#8B5CF6" },
  { name: "Đà Nẵng", leads: 710, reg: 225, nb: 133, color: "#10B981" },
];

export const contentData = [
  { name: "Tuyển Sinh", value: 1139, percentage: 40, color: "#3B82F6" },
  { name: "Học Phí", value: 854, percentage: 30, color: "#8B5CF6" },
  { name: "Chương Trình", value: 569, percentage: 20, color: "#10B981" },
  { name: "Nội Trú", value: 285, percentage: 10, color: "#F59E0B" },
];

export const yearlyKPI = {
  reg: { target: 5000, actual: 3456, percentage: 69.1 },
  nb: { target: 3000, actual: 1987, percentage: 66.2 },
  ne: { target: 2800, actual: 1823, percentage: 65.1 },
};

export const monthlyProgress = [
  { month: "T1", reg: 245, nb: 156, ne: 142, target: 417 },
  { month: "T2", reg: 289, nb: 178, ne: 165, target: 417 },
  { month: "T3", reg: 312, nb: 198, ne: 183, target: 417 },
  { month: "T4", reg: 298, nb: 189, ne: 174, target: 417 },
  { month: "T5", reg: 334, nb: 212, ne: 198, target: 417 },
  { month: "T6", reg: 356, nb: 225, ne: 209, target: 417 },
  { month: "T7", reg: 378, nb: 241, ne: 223, target: 417 },
  { month: "T8", reg: 389, nb: 248, ne: 231, target: 417 },
  { month: "T9", reg: 298, nb: 189, ne: 175, target: 417 },
  { month: "T10", reg: 267, nb: 167, ne: 154, target: 417 },
  { month: "T11", reg: 0, nb: 0, ne: 0, target: 417 },
  { month: "T12", reg: 0, nb: 0, ne: 0, target: 417 },
];

export const saleTeamData = [
  {
    name: "Nguyễn Văn A",
    leads: 156,
    contacted: 142,
    potential: 89,
    reg: 34,
    nb: 21,
    conversionRate: 13.5,
  },
  {
    name: "Trần Thị B",
    leads: 148,
    contacted: 138,
    potential: 95,
    reg: 38,
    nb: 24,
    conversionRate: 16.2,
  },
  {
    name: "Lê Văn C",
    leads: 134,
    contacted: 121,
    potential: 78,
    reg: 29,
    nb: 18,
    conversionRate: 13.4,
  },
  {
    name: "Phạm Thị D",
    leads: 142,
    contacted: 129,
    potential: 84,
    reg: 31,
    nb: 19,
    conversionRate: 13.4,
  },
  {
    name: "Hoàng Văn E",
    leads: 139,
    contacted: 126,
    potential: 81,
    reg: 28,
    nb: 17,
    conversionRate: 12.2,
  },
];

export const callStatusData = [
  { status: "Đã Liên Hệ", value: 1923, percentage: 67.5, color: "#10B981" },
  { status: "Chưa Liên Hệ", value: 624, percentage: 21.9, color: "#F59E0B" },
  { status: "Không Nghe Máy", value: 300, percentage: 10.6, color: "#EF4444" },
];
