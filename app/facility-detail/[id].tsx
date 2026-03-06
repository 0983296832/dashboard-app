import { Ionicons } from "@expo/vector-icons";
import { router, useLocalSearchParams } from "expo-router";
import { useState } from "react";
import { Linking, Pressable, ScrollView, Text, View } from "react-native";

import { LinearGradient } from "expo-linear-gradient";
import FacilityMiniChart from "./components/FacilityMiniChart";
import FacilityStatsBar from "./components/FacilityStatsBar";
import LeadTable from "./components/LeadTable";

const facilitiesData = [
  {
    id: 1,
    name: "Cơ sở Hà Nội",
    location: "Quận Cầu Giấy, Hà Nội",
    reg: 245,
    ne: 198,
    regRate: 80.8,
    kpi: 85,
    status: "excellent" as const,
    pendingLeads: 3,
    trend: "up" as const,
    manager: "Nguyễn Văn An",
    phone: "024 3826 1234",
    email: "hanoi@edu.vn",
    totalStaff: 12,
    totalLeads: 303,
  },
  {
    id: 2,
    name: "Cơ sở TP.HCM",
    location: "Quận 1, TP.HCM",
    reg: 189,
    ne: 142,
    regRate: 75.1,
    kpi: 68,
    status: "warning" as const,
    pendingLeads: 8,
    trend: "down" as const,
    manager: "Trần Thị Bích",
    phone: "028 3822 5678",
    email: "hcm@edu.vn",
    totalStaff: 10,
    totalLeads: 252,
  },
  {
    id: 3,
    name: "Cơ sở Đà Nẵng",
    location: "Quận Hải Châu, Đà Nẵng",
    reg: 156,
    ne: 128,
    regRate: 82.1,
    kpi: 92,
    status: "excellent" as const,
    pendingLeads: 2,
    trend: "up" as const,
    manager: "Lê Minh Tuấn",
    phone: "0236 382 9012",
    email: "danang@edu.vn",
    totalStaff: 8,
    totalLeads: 190,
  },
  {
    id: 4,
    name: "Cơ sở Hải Phòng",
    location: "Quận Lê Chân, Hải Phòng",
    reg: 134,
    ne: 98,
    regRate: 73.1,
    kpi: 78,
    status: "good" as const,
    pendingLeads: 5,
    trend: "stable" as const,
    manager: "Phạm Thị Lan",
    phone: "0225 382 3456",
    email: "haiphong@edu.vn",
    totalStaff: 7,
    totalLeads: 183,
  },
  {
    id: 5,
    name: "Cơ sở Cần Thơ",
    location: "Quận Ninh Kiều, Cần Thơ",
    reg: 98,
    ne: 65,
    regRate: 66.3,
    kpi: 65,
    status: "danger" as const,
    pendingLeads: 15,
    trend: "down" as const,
    manager: "Hoàng Văn Đức",
    phone: "0292 382 7890",
    email: "cantho@edu.vn",
    totalStaff: 6,
    totalLeads: 148,
  },
  {
    id: 6,
    name: "Cơ sở Nha Trang",
    location: "TP. Nha Trang, Khánh Hòa",
    reg: 112,
    ne: 89,
    regRate: 79.5,
    kpi: 88,
    status: "excellent" as const,
    pendingLeads: 1,
    trend: "up" as const,
    manager: "Vũ Thị Hoa",
    phone: "0258 382 1234",
    email: "nhatrang@edu.vn",
    totalStaff: 7,
    totalLeads: 141,
  },
];

const leadsData: Record<
  number,
  {
    id: number;
    name: string;
    phone: string;
    source: string;
    status: "new" | "contacted" | "pending" | "need";
    daysPending: number;
    assignedTo: string;
    createdAt: string;
  }[]
> = {
  1: [
    {
      id: 1,
      name: "Nguyễn Thị Mai",
      phone: "0912 345 678",
      source: "Facebook",
      status: "new",
      daysPending: 1,
      assignedTo: "Trần Văn B",
      createdAt: "10/06/2025",
    },
    {
      id: 2,
      name: "Lê Văn Hùng",
      phone: "0987 654 321",
      source: "Google",
      status: "contacted",
      daysPending: 2,
      assignedTo: "Nguyễn Thị C",
      createdAt: "09/06/2025",
    },
    {
      id: 3,
      name: "Phạm Thị Lan",
      phone: "0934 111 222",
      source: "Giới thiệu",
      status: "pending",
      daysPending: 4,
      assignedTo: "Lê Văn D",
      createdAt: "07/06/2025",
    },
    {
      id: 4,
      name: "Hoàng Minh Tuấn",
      phone: "0901 333 444",
      source: "Event",
      status: "need",
      daysPending: 0,
      assignedTo: "Trần Văn B",
      createdAt: "05/06/2025",
    },
    {
      id: 5,
      name: "Vũ Thị Hương",
      phone: "0978 555 666",
      source: "Website",
      status: "contacted",
      daysPending: 1,
      assignedTo: "Nguyễn Thị C",
      createdAt: "08/06/2025",
    },
  ],
  2: [
    {
      id: 1,
      name: "Trần Văn Khoa",
      phone: "0912 111 999",
      source: "Facebook",
      status: "pending",
      daysPending: 5,
      assignedTo: "Lê Thị E",
      createdAt: "06/06/2025",
    },
    {
      id: 2,
      name: "Nguyễn Thị Ngọc",
      phone: "0987 222 888",
      source: "Google",
      status: "new",
      daysPending: 1,
      assignedTo: "Phạm Văn F",
      createdAt: "10/06/2025",
    },
    {
      id: 3,
      name: "Lê Minh Phúc",
      phone: "0934 333 777",
      source: "Giới thiệu",
      status: "pending",
      daysPending: 6,
      assignedTo: "Lê Thị E",
      createdAt: "05/06/2025",
    },
    {
      id: 4,
      name: "Đặng Thị Thu",
      phone: "0901 444 666",
      source: "Event",
      status: "contacted",
      daysPending: 2,
      assignedTo: "Phạm Văn F",
      createdAt: "09/06/2025",
    },
    {
      id: 5,
      name: "Bùi Văn Tài",
      phone: "0978 555 555",
      source: "Website",
      status: "pending",
      daysPending: 4,
      assignedTo: "Lê Thị E",
      createdAt: "07/06/2025",
    },
  ],
  3: [
    {
      id: 1,
      name: "Phan Thị Linh",
      phone: "0912 666 111",
      source: "Facebook",
      status: "need",
      daysPending: 0,
      assignedTo: "Nguyễn Văn G",
      createdAt: "04/06/2025",
    },
    {
      id: 2,
      name: "Võ Minh Khải",
      phone: "0987 777 222",
      source: "Google",
      status: "contacted",
      daysPending: 1,
      assignedTo: "Trần Thị H",
      createdAt: "10/06/2025",
    },
    {
      id: 3,
      name: "Đinh Thị Yến",
      phone: "0934 888 333",
      source: "Giới thiệu",
      status: "new",
      daysPending: 0,
      assignedTo: "Nguyễn Văn G",
      createdAt: "11/06/2025",
    },
  ],
  4: [
    {
      id: 1,
      name: "Lý Văn Bình",
      phone: "0912 999 444",
      source: "Facebook",
      status: "pending",
      daysPending: 4,
      assignedTo: "Vũ Thị I",
      createdAt: "07/06/2025",
    },
    {
      id: 2,
      name: "Hồ Thị Cẩm",
      phone: "0987 000 555",
      source: "Google",
      status: "contacted",
      daysPending: 2,
      assignedTo: "Đỗ Văn K",
      createdAt: "09/06/2025",
    },
    {
      id: 3,
      name: "Trương Văn Dũng",
      phone: "0934 111 666",
      source: "Event",
      status: "new",
      daysPending: 1,
      assignedTo: "Vũ Thị I",
      createdAt: "10/06/2025",
    },
    {
      id: 4,
      name: "Mai Thị Hà",
      phone: "0901 222 777",
      source: "Website",
      status: "pending",
      daysPending: 5,
      assignedTo: "Đỗ Văn K",
      createdAt: "06/06/2025",
    },
  ],
  5: [
    {
      id: 1,
      name: "Cao Văn Lộc",
      phone: "0912 333 888",
      source: "Facebook",
      status: "pending",
      daysPending: 7,
      assignedTo: "Bùi Thị L",
      createdAt: "04/06/2025",
    },
    {
      id: 2,
      name: "Dương Thị Mỹ",
      phone: "0987 444 999",
      source: "Google",
      status: "pending",
      daysPending: 5,
      assignedTo: "Ngô Văn M",
      createdAt: "06/06/2025",
    },
    {
      id: 3,
      name: "Tô Văn Nam",
      phone: "0934 555 000",
      source: "Giới thiệu",
      status: "pending",
      daysPending: 8,
      assignedTo: "Bùi Thị L",
      createdAt: "03/06/2025",
    },
    {
      id: 4,
      name: "Lưu Thị Oanh",
      phone: "0901 666 111",
      source: "Event",
      status: "new",
      daysPending: 1,
      assignedTo: "Ngô Văn M",
      createdAt: "10/06/2025",
    },
    {
      id: 5,
      name: "Kiều Văn Phong",
      phone: "0978 777 222",
      source: "Website",
      status: "pending",
      daysPending: 6,
      assignedTo: "Bùi Thị L",
      createdAt: "05/06/2025",
    },
  ],
  6: [
    {
      id: 1,
      name: "Thái Thị Quỳnh",
      phone: "0912 888 333",
      source: "Facebook",
      status: "need",
      daysPending: 0,
      assignedTo: "Lê Văn N",
      createdAt: "03/06/2025",
    },
    {
      id: 2,
      name: "Đoàn Văn Rạng",
      phone: "0987 999 444",
      source: "Google",
      status: "contacted",
      daysPending: 1,
      assignedTo: "Phạm Thị O",
      createdAt: "10/06/2025",
    },
    {
      id: 3,
      name: "Huỳnh Thị Sen",
      phone: "0934 000 555",
      source: "Giới thiệu",
      status: "new",
      daysPending: 0,
      assignedTo: "Lê Văn N",
      createdAt: "11/06/2025",
    },
  ],
};

const statusConfig = {
  excellent: {
    label: "Xuất sắc",
    bg: "bg-emerald-100",
    text: "text-emerald-700",
    badge: "bg-emerald-500",
  },
  good: {
    label: "Tốt",
    bg: "bg-blue-100",
    text: "text-blue-700",
    badge: "bg-blue-500",
  },
  warning: {
    label: "Cảnh báo",
    bg: "bg-yellow-100",
    text: "text-yellow-700",
    badge: "bg-yellow-500",
  },
  danger: {
    label: "Nguy hiểm",
    bg: "bg-red-100",
    text: "text-red-700",
    badge: "bg-red-500",
  },
};

const trendIcon = {
  up: { icon: "arrow-up", color: "text-emerald-500" },
  down: { icon: "arrow-down", color: "text-red-500" },
  stable: { icon: "remove", color: "text-gray-400" },
};

const tabs = [
  { id: "overview", label: "Tổng quan", icon: "bar-chart" },
  { id: "leads", label: "Danh sách Lead", icon: "person-add" },
];

export default function FacilityDetail() {
  const { id } = useLocalSearchParams();
  const [activeTab, setActiveTab] = useState("overview");

  const facility = facilitiesData.find((f) => f.id === Number(id));
  const leads = leadsData[Number(id)] ?? [];

  if (!facility) {
    return (
      <View className="flex-1 items-center justify-center bg-emerald-50">
        <Ionicons name="business-outline" size={50} color="#d1d5db" />
        <Text className="text-gray-500 text-base font-medium mt-4">
          Không tìm thấy cơ sở
        </Text>

        <Pressable
          onPress={() => router.push("/sales")}
          className="mt-4 px-5 py-2 bg-emerald-500 rounded-full"
        >
          <Text className="text-white text-sm font-semibold">Quay lại</Text>
        </Pressable>
      </View>
    );
  }

  const pendingCount = leads.filter((l) => l.daysPending > 3).length;

  return (
    <View className="flex-1 bg-emerald-50">
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* HEADER */}

        <View className="bg-white shadow-sm">
          <View className="px-4 py-4 flex-row items-center gap-3">
            <Pressable
              onPress={() => router.push("/sales")}
              className="w-9 h-9 items-center justify-center bg-gray-100 rounded-lg"
            >
              <Ionicons name="arrow-back" size={20} color="#374151" />
            </Pressable>

            <View className="flex-1">
              <Text className="text-base font-bold text-gray-800">
                {facility.name}
              </Text>

              <View className="flex-row items-center mt-1">
                <Ionicons name="location-outline" size={12} color="#9ca3af" />
                <Text className="text-xs text-gray-500 ml-1">
                  {facility.location}
                </Text>
              </View>
            </View>

            <View className="px-3 py-1 bg-emerald-100 rounded-full">
              <Text className="text-xs font-bold text-emerald-700">
                {statusConfig[facility.status].label}
              </Text>
            </View>
          </View>
        </View>

        {/* HERO */}

        <View className="px-4 pt-5 pb-2">
          <LinearGradient
            colors={["#10b981", "#14b8a6"]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 0 }}
            style={{ borderRadius: 16 }}
            className=" p-5"
          >
            <View className="flex-row justify-between mb-4">
              <View>
                <Text className="text-white/80 text-xs mb-1">
                  Quản lý cơ sở
                </Text>

                <Text className="text-white font-bold text-sm">
                  {facility.manager}
                </Text>
              </View>

              <View className="flex-row items-center bg-white/20 px-3 py-1.5 rounded-full">
                <Ionicons name="trending-up" size={14} color="white" />

                <Text className="text-white text-xs font-semibold ml-1">
                  KPI {facility.kpi}%
                </Text>
              </View>
            </View>

            <View className="flex-row gap-3">
              <View className="flex-1 bg-white/20 rounded-xl p-3 items-center">
                <Text className="text-white/70 text-xs mb-1">Tổng Lead</Text>
                <Text className="text-white text-xl font-bold">
                  {facility.totalLeads}
                </Text>
              </View>

              <View className="flex-1 bg-white/20 rounded-xl p-3 items-center">
                <Text className="text-white/70 text-xs mb-1">Nhân viên</Text>
                <Text className="text-white text-xl font-bold">
                  {facility.totalStaff}
                </Text>
              </View>

              <View className="flex-1 bg-white/20 rounded-xl p-3 items-center">
                <Text className="text-white/70 text-xs mb-1">REG Rate</Text>
                <Text className="text-white text-xl font-bold">
                  {facility.regRate}%
                </Text>
              </View>
            </View>
          </LinearGradient>
        </View>

        {/* CONTACT */}

        <View className="px-4 py-3">
          <View className="bg-white rounded-2xl p-4 flex-row items-center">
            <Pressable
              onPress={() => Linking.openURL(`tel:${facility.phone}`)}
              className="flex-1 flex-row items-center"
            >
              <View className="w-9 h-9 items-center justify-center bg-emerald-100 rounded-full">
                <Ionicons name="call-outline" size={16} color="#059669" />
              </View>

              <View className="ml-2">
                <Text className="text-xs text-gray-500">Điện thoại</Text>

                <Text className="text-sm font-semibold text-gray-800">
                  {facility.phone}
                </Text>
              </View>
            </Pressable>

            <View className="w-px h-10 bg-gray-100 mx-3" />

            <Pressable
              onPress={() => Linking.openURL(`mailto:${facility.email}`)}
              className="flex-1 flex-row items-center"
            >
              <View className="w-9 h-9 items-center justify-center bg-teal-100 rounded-full">
                <Ionicons name="mail-outline" size={16} color="#0d9488" />
              </View>

              <View className="ml-2">
                <Text className="text-xs text-gray-500">Email</Text>

                <Text className="text-sm font-semibold text-gray-800">
                  {facility.email}
                </Text>
              </View>
            </Pressable>
          </View>
        </View>

        {/* ALERT */}

        {pendingCount > 0 && (
          <View className="px-4 pb-3">
            <View className="bg-red-50 border border-red-200 rounded-2xl p-3 flex-row items-center">
              <View className="w-9 h-9 bg-red-500 rounded-full items-center justify-center">
                <Ionicons name="warning-outline" size={16} color="white" />
              </View>

              <View className="ml-3">
                <Text className="text-sm font-bold text-red-700">
                  Cảnh báo lead tồn đọng
                </Text>

                <Text className="text-xs text-red-600 mt-0.5">
                  {pendingCount} lead tồn {">"} 3 ngày chưa xử lý
                </Text>
              </View>
            </View>
          </View>
        )}

        {/* TABS */}

        <View className="px-4 pb-3">
          <View className="flex-row bg-gray-100 rounded-full p-1">
            {tabs.map((tab) => {
              const active = activeTab === tab.id;

              return (
                <Pressable
                  key={tab.id}
                  onPress={() => setActiveTab(tab.id)}
                  className={`flex-1 flex-row items-center justify-center py-2 rounded-full ${
                    active ? "bg-white" : ""
                  }`}
                >
                  <Ionicons
                    name={
                      tab.id === "overview"
                        ? "bar-chart-outline"
                        : "person-add-outline"
                    }
                    size={16}
                    color={active ? "#059669" : "#6b7280"}
                  />

                  <Text
                    className={`text-xs font-semibold ml-1 ${
                      active ? "text-emerald-600" : "text-gray-500"
                    }`}
                  >
                    {tab.label}
                  </Text>
                </Pressable>
              );
            })}
          </View>
        </View>

        {/* CONTENT */}

        <View className="px-4 gap-y-4 pb-20">
          {activeTab === "overview" && (
            <>
              <FacilityStatsBar {...facility} />

              <View className="bg-white rounded-2xl p-4">
                <Text className="text-sm font-bold text-gray-800 mb-3">
                  Biểu đồ hiệu suất (12 tháng)
                </Text>

                <FacilityMiniChart facilityName={facility.name} />
              </View>
              <View className="bg-white rounded-2xl shadow-sm p-4">
                <Text className="text-sm font-bold text-gray-800 mb-3">
                  Phân tích theo nguồn lead
                </Text>

                <View className="gap-y-3">
                  {[
                    {
                      source: "Facebook", 
                      count: Math.round(facility.totalLeads * 0.38),
                      color: "bg-blue-500",
                      pct: 38,
                    },
                    {
                      source: "Google",
                      count: Math.round(facility.totalLeads * 0.25),
                      color: "bg-emerald-500",
                      pct: 25,
                    },
                    {
                      source: "Giới thiệu",
                      count: Math.round(facility.totalLeads * 0.18),
                      color: "bg-teal-500",
                      pct: 18,
                    },
                    {
                      source: "Event",
                      count: Math.round(facility.totalLeads * 0.12),
                      color: "bg-yellow-500",
                      pct: 12,
                    },
                    {
                      source: "Khác",
                      count: Math.round(facility.totalLeads * 0.07),
                      color: "bg-gray-400",
                      pct: 7,
                    },
                  ].map((item) => (
                    <View key={item.source}>
                      <View className="flex-row items-center justify-between mb-1">
                        <Text className="text-xs text-gray-600">
                          {item.source}
                        </Text>

                        <Text className="text-xs font-semibold text-gray-800">
                          {item.count} lead ({item.pct}%)
                        </Text>
                      </View>

                      <View className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                        <View
                          className={`h-full ${item.color} rounded-full`}
                          style={{ width: `${item.pct}%` }}
                        />
                      </View>
                    </View>
                  ))}
                </View>
              </View>
            </>
          )}

          {activeTab === "leads" && <LeadTable leads={leads} />}
        </View>
      </ScrollView>
    </View>
  );
}
