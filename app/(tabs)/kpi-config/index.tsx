import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import {
  Modal,
  Pressable,
  ScrollView,
  Text,
  TextInput,
  View,
} from "react-native";

import kpiServices from "@/api/kpi";
import { formatNumber } from "@/lib/numberHelper";
import { useToastStore } from "@/stores/useToastStore";
import dayjs from "dayjs";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  kpiTargets as initialTargets,
  KPITarget,
} from "../../../mocks/kpi-targets";
import KPITargetForm from "./components/KPITargetForm";

type FilterType = "all" | "month" | "quarter" | "year";

const FILTER_VALUE_COLORS: Record<string, string> = {
  REG: "bg-orange-100 text-orange-600",
  NB: "bg-emerald-100 text-emerald-600",
  NE: "bg-amber-100 text-amber-700",
  LEAD: "bg-gray-100 text-gray-600",
  CANCEL: "bg-red-100 text-red-500",
};

const PERIOD_LABEL: Record<string, string> = {
  month: "Tháng",
  quarter: "Quý",
  year: "Năm",
};

function periodLabel(t: KPITarget) {
  if (t?.period_type === "month") return `T${t?.month}/${t?.year}`;
  if (t?.period_type === "quarter") return `Q${t?.quarter}/${t?.year}`;
  return `${t?.year}`;
}

export default function KPIConfigPage() {
  const [targets, setTargets] = useState<KPITarget[]>(initialTargets);
  const [filter, setFilter] = useState<FilterType>("all");
  const [search, setSearch] = useState("");
  const [showForm, setShowForm] = useState(false);
  const [editing, setEditing] = useState<KPITarget | null>(null);
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const showToast = useToastStore((s) => s.showToast);
  const filtered = targets?.filter((t) => {
    const matchFilter = filter === "all" || t?.period_type === filter;

    const matchSearch =
      t?.name?.toLowerCase().includes(search?.toLowerCase()) ||
      t?.filter_value?.toLowerCase().includes(search?.toLowerCase());

    return matchFilter && matchSearch;
  });

  const getListTarget = async () => {
    try {
      const res = await kpiServices.getKpiTargets({
        year: dayjs().year(),
      });

      setTargets(res?.data);
    } catch (error) {}
  };

  const handleSave = async (data: Omit<KPITarget, "id"> & { id?: string }) => {
    try {
      if (data.id) {
        await kpiServices.putKpiTarget(data.id, data);
        getListTarget();
        showToast("Cập nhật chỉ tiêu thành công", "success");
      } else {
        await kpiServices.postKpiTarget(data);
        getListTarget();
        showToast("Tạo chỉ tiêu thành công", "success");
      }

      setShowForm(false);
      setEditing(null);
    } catch (error) {
      showToast("Thao tác thất bại", "error");
    }
  };

  const handleDelete = async (id: string) => {
    try {
      await kpiServices.deleteKpiTarget(deleteId as string | null);
      setTargets((prev) => prev?.filter((t) => t?.id != id));
      setDeleteId(null);
      showToast("Đã xoá KPI target", "success");
    } catch (error) {}
  };

  const handleEdit = (t: KPITarget) => {
    setEditing(t);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditing(null);
    setShowForm(true);
  };

  const jsonExport = JSON.stringify(
    targets?.map(
      ({
        id: _id,
        name,
        field,
        filter_value,
        target,
        period_type,
        year,
        month,
        quarter,
        date_column,
      }) => ({
        name,
        field,
        filter_value,
        target,
        period_type,
        year,
        ...(period_type === "month" ? { month } : {}),
        ...(period_type === "quarter" ? { quarter } : {}),
        date_column,
      }),
    ),
    null,
    2,
  );

  useEffect(() => {
    getListTarget();
  }, []);

  return (
    <SafeAreaView className="flex-1 bg-gray-50 pb-20">
      <ScrollView className="px-3 py-4">
        {/* Search */}
        <View className="flex-row gap-2 mb-4">
          <View className="flex-1 relative">
            <TextInput
              value={search}
              onChangeText={setSearch}
              placeholder="Tìm theo tên, loại..."
              className="w-full pl-3 pr-3 py-2 text-sm rounded-xl border border-gray-200 bg-white"
            />
          </View>

          <Pressable
            onPress={handleAdd}
            className="px-4 py-2 bg-orange-500 rounded-xl items-center justify-center"
          >
            <Ionicons name="add" size={18} color="white" />
          </Pressable>
        </View>

        {/* Filter */}
        <View className="flex-row gap-1.5 bg-gray-100 p-1 rounded-xl">
          {(["all", "month", "quarter", "year"] as FilterType[])?.map((f) => (
            <Pressable
              key={f}
              onPress={() => setFilter(f)}
              className={`flex-1 py-1.5 rounded-lg items-center ${
                filter === f ? "bg-white " : ""
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  filter === f ? "text-orange-500" : "text-gray-500"
                }`}
              >
                {f === "all" ? "Tất cả" : PERIOD_LABEL[f]}
              </Text>
            </Pressable>
          ))}
        </View>

        {/* List */}
        <View className="bg-white rounded-xl  overflow-hidden">
          <View className="px-4 py-2.5 bg-gray-50 border-b border-gray-100 flex-row justify-between">
            <Text className="text-xs font-bold text-gray-500">
              Danh sách KPI Target
            </Text>
            <Text className="text-xs text-gray-400">
              {filtered?.length} mục
            </Text>
          </View>

          {filtered?.map((t) => (
            <View
              key={t?.id}
              className="px-4 py-3 flex-row items-center gap-3 border-b border-gray-100"
            >
              <View
                className={`w-14 h-14 items-center justify-center line-clamp-2   bg-orange-100 text-orange-600`}
                style={{ borderRadius: 12 }}
              >
                <Text className="font-bold text-xs">{t?.filter_value}</Text>
              </View>

              <View className="flex-1">
                <Text className="text-sm font-semibold text-gray-800">
                  {t?.name}
                </Text>
                <View className="flex flex-row">
                  <Ionicons
                    name="calendar-outline"
                    size={14}
                    color="#9CA3AF"
                    style={{ marginRight: 4 }}
                  />
                  <Text className="text-xs text-gray-400 mt-0.5">
                    {periodLabel(t)} · {t?.field} · {t?.date_column}
                  </Text>
                </View>
              </View>

              <View className="items-end">
                <Text className="text-base font-bold text-orange-500">
                  {formatNumber(t?.target)}
                </Text>

                <Text className="text-[10px] text-gray-400">target</Text>
              </View>

              <View className="flex-row">
                <Pressable
                  onPress={() => handleEdit(t)}
                  className="w-8 h-8 items-center justify-center"
                >
                  <Ionicons name="create-outline" size={18} color="#fb923c" />
                </Pressable>

                <Pressable
                  onPress={() => setDeleteId(t?.id)}
                  className="w-8 h-8 items-center justify-center"
                >
                  <Ionicons name="trash-outline" size={18} color="#ef4444" />
                </Pressable>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>

      {/* FORM MODAL */}
      <Modal visible={showForm} animationType="slide" transparent>
        <View className="flex-1 bg-black/40 justify-end">
          <View className="bg-white rounded-t-3xl max-h-[90%]">
            <View className="px-5 pt-5 pb-3 border-b border-gray-100 flex-row justify-between">
              <Text className="text-base font-bold">
                {editing ? "Chỉnh sửa KPI Target" : "Thêm KPI Target mới"}
              </Text>

              <Pressable
                onPress={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
              >
                <Ionicons name="close" size={22} />
              </Pressable>
            </View>

            <View className="px-5 py-4">
              <KPITargetForm
                initial={editing}
                onSave={handleSave}
                onCancel={() => {
                  setShowForm(false);
                  setEditing(null);
                }}
              />
            </View>
          </View>
        </View>
      </Modal>

      {/* DELETE MODAL */}
      <Modal visible={!!deleteId} transparent animationType="fade">
        <View className="flex-1 bg-black/40 justify-center items-center px-6">
          <View className="bg-white rounded-2xl p-6 w-full max-w-sm">
            <Text className="text-base font-bold text-center mb-2">
              Xoá KPI Target?
            </Text>

            <Text className="text-sm text-gray-500 text-center mb-5">
              Hành động này không thể hoàn tác?.
            </Text>

            <View className="flex-row gap-3">
              <Pressable
                onPress={() => setDeleteId(null)}
                className="flex-1 py-2.5 rounded-xl border border-gray-200 items-center"
              >
                <Text className="text-sm font-semibold text-gray-600">Huỷ</Text>
              </Pressable>

              <Pressable
                onPress={() => handleDelete(deleteId!)}
                className="flex-1 py-2.5 rounded-xl bg-red-500 items-center"
              >
                <Text className="text-white font-semibold">Xoá</Text>
              </Pressable>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
}
