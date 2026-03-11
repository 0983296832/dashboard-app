import { Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import { Pressable, ScrollView, Text, TextInput, View } from "react-native";

import kpiServices from "@/api/kpi";
import SelectInput from "@/components/select-input";
import { KPITarget } from "../../../../mocks/kpi-targets";

interface KPITargetFormProps {
  initial?: KPITarget | null;
  onSave: (data: Omit<KPITarget, "id"> & { id?: string }) => void;
  onCancel: () => void;
}

const FIELD_OPTIONS = [
  { value: "tinh_trang_nhap_hoc", label: "tinh_trang_nhap_hoc" },
  { value: "trang_thai", label: "trang_thai" },
  { value: "loai_khach", label: "loai_khach" },
];

const FILTER_VALUE_OPTIONS = ["REG", "NB", "NE", "LEAD", "CANCEL"];

const DATE_COLUMN_OPTIONS = [
  "ngay_tao",
  "ngay_cap_nhat",
  "ngay_nhap_hoc",
  "ngay_dang_ky",
];

const MONTHS = Array.from({ length: 12 }, (_, i) => i + 1);
const QUARTERS = [1, 2, 3, 4];
const YEARS = Array.from({ length: 6 }, (_, i) => 2024 + i);

export default function KPITargetForm({
  initial,
  onSave,
  onCancel,
}: KPITargetFormProps) {
  const [form, setForm] = useState<Omit<KPITarget, "id">>({
    name: "",
    field: "tinh_trang_nhap_hoc",
    filter_value: "REG",
    target: 1000,
    period_type: "month",
    year: 2026,
    month: 1,
    quarter: undefined,
    date_column: "ngay_tao",
  });
  
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [showJson, setShowJson] = useState(false);
  

 

  useEffect(() => {
    if (initial) {
      setForm({
        name: initial.name,
        field: initial.field,
        filter_value: initial.filter_value,
        target: initial.target,
        period_type: initial.period_type,
        year: initial.year,
        month: initial.month,
        quarter: initial.quarter,
        date_column: initial.date_column,
      });
    }
  }, [initial]);

  const set = <K extends keyof typeof form>(
    key: K,
    value: (typeof form)[K],
  ) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: "" }));
  };

  const validate = () => {
    const e: Record<string, string> = {};

    if (!form.name.trim()) e.name = "Vui lòng nhập tên KPI";
    if (!form.field.trim()) e.field = "Vui lòng chọn field";
    if (!form.filter_value.trim()) e.filter_value = "Vui lòng nhập giá trị lọc";
    if (!form.target || form.target <= 0) e.target = "Target phải lớn hơn 0";

    if (form.period_type === "month" && !form.month)
      e.month = "Vui lòng chọn tháng";

    if (form.period_type === "quarter" && !form.quarter)
      e.quarter = "Vui lòng chọn quý";

    setErrors(e);

    return Object.keys(e).length === 0;
  };

  const handleSubmit = () => {
    if (!validate()) return;

    const payload = { ...form };

    if (payload.period_type !== "month") delete payload.month;
    if (payload.period_type !== "quarter") delete payload.quarter;

    onSave(initial ? { ...payload, id: initial.id } : payload);
  };

  const jsonPreview = JSON.stringify(
    {
      field: form.field,
      filter_value: form.filter_value,
      target: form.target,
      period_type: form.period_type,
      year: form.year,
      ...(form.period_type === "month" ? { month: form.month } : {}),
      ...(form.period_type === "quarter" ? { quarter: form.quarter } : {}),
      date_column: form.date_column,
      name: form.name,
    },
    null,
    2,
  );

  return (
    <ScrollView className="">
      {/* NAME */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 mb-1">
          Tên KPI *
        </Text>

        <TextInput
          value={form.name}
          onChangeText={(v) => set("name", v)}
          placeholder="VD: REG tháng 3/2026"
          className={`px-3 py-2 text-sm rounded-lg border h-10 ${
            errors.name
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-gray-50"
          }`}
        />

        {errors.name && (
          <Text className="text-xs text-red-500 mt-1">{errors.name}</Text>
        )}
      </View>

      {/* FIELD + FILTER */}
      <View className="flex-row gap-3 mb-4">
        {/* FIELD SELECT */}
        <View className="flex-1">
          <Text className="text-xs font-semibold text-gray-600 mb-1">
            Field *
          </Text>

          <View className="border border-gray-200 rounded-lg bg-gray-50">
            <SelectInput
              value={form.field}
              onChange={(v) => set("field", v)}
              options={FIELD_OPTIONS}
            />
          </View>
        </View>

        {/* FILTER INPUT */}
        <View className="flex-1">
          <Text className="text-xs font-semibold text-gray-600 mb-1">
            Filter value *
          </Text>

          <TextInput
            value={form.filter_value}
            onChangeText={(v) => set("filter_value", v.toUpperCase())}
            placeholder="REG / NB / NE"
            className={`px-3 py-2 text-sm rounded-lg border ${
              errors.filter_value
                ? "border-red-400 bg-red-50"
                : "border-gray-200 bg-gray-50"
            }`}
          />

          {errors.filter_value && (
            <Text className="text-xs text-red-500 mt-1">
              {errors.filter_value}
            </Text>
          )}
        </View>
      </View>

      {/* TARGET */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 mb-1">
          Target *
        </Text>

        <TextInput
          keyboardType="numeric"
          value={String(form.target)}
          onChangeText={(v) => set("target", Number(v))}
          className={`px-3 py-2 text-sm rounded-lg border ${
            errors.target
              ? "border-red-400 bg-red-50"
              : "border-gray-200 bg-gray-50"
          }`}
        />
      </View>

      {/* PERIOD TYPE */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 mb-1.5">
          Loại kỳ *
        </Text>

        <View className="flex-row gap-2">
          {(["month", "quarter", "year"] as const).map((pt) => (
            <Pressable
              key={pt}
              onPress={() => set("period_type", pt)}
              className={`flex-1 py-2 rounded-lg border items-center ${
                form.period_type === pt
                  ? "bg-orange-500 border-orange-500"
                  : "bg-gray-50 border-gray-200"
              }`}
            >
              <Text
                className={`text-xs font-semibold ${
                  form.period_type === pt ? "text-white" : "text-gray-600"
                }`}
              >
                {pt === "month" ? "Tháng" : pt === "quarter" ? "Quý" : "Năm"}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* YEAR + MONTH/QUARTER */}
      <View className="flex-row gap-3 mb-4">
        {/* YEAR */}
        <View className="flex-1">
          <Text className="text-xs font-semibold text-gray-600 mb-1">
            Năm *
          </Text>

          <View className="border border-gray-200 rounded-lg bg-gray-50">
            <SelectInput
              value={form.year}
              onChange={(v) => set("year", v)}
              options={YEARS.map((y) => ({
                label: String(y),
                value: y,
              }))}
            />
          </View>
        </View>

        {form.period_type === "month" && (
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-600 mb-1">
              Tháng *
            </Text>

            <View className="border border-gray-200 rounded-lg bg-gray-50">
              <SelectInput
                value={form.month}
                onChange={(v) => set("month", v)}
                options={MONTHS.map((m) => ({
                  label: `Tháng ${m}`,
                  value: m,
                }))}
              />
            </View>
          </View>
        )}

        {form.period_type === "quarter" && (
          <View className="flex-1">
            <Text className="text-xs font-semibold text-gray-600 mb-1">
              Quý *
            </Text>

            <View className="border border-gray-200 rounded-lg bg-gray-50">
              <SelectInput
                value={form.quarter}
                onChange={(v) => set("quarter", v)}
                options={QUARTERS.map((q) => ({
                  label: `Quý ${q}`,
                  value: q,
                }))}
              />
            </View>
          </View>
        )}
      </View>

      {/* DATE COLUMN */}
      <View className="mb-4">
        <Text className="text-xs font-semibold text-gray-600 mb-1">
          Date column
        </Text>

        <View className="border border-gray-200 rounded-lg bg-gray-50">
          <SelectInput
            value={form.date_column}
            onChange={(v) => set("date_column", v)}
            options={DATE_COLUMN_OPTIONS.map((d) => ({
              label: d,
              value: d,
            }))}
          />
        </View>
      </View>

      {/* JSON */}
      <Pressable
        onPress={() => setShowJson((v) => !v)}
        className="flex-row items-center gap-1.5"
      >
        <Ionicons name="code-slash-outline" size={14} color="#6b7280" />
        <Text className="text-xs text-gray-500">
          {showJson ? "Ẩn JSON" : "Xem JSON preview"}
        </Text>
      </Pressable>

      {showJson && (
        <ScrollView className="mt-2 p-3 bg-gray-900 rounded-xl max-h-40">
          <Text className="text-emerald-400 text-xs">{jsonPreview}</Text>
        </ScrollView>
      )}

      {/* ACTIONS */}
      <View className="flex-row gap-2 pt-2">
        <Pressable
          onPress={onCancel}
          className="flex-1 py-2.5 rounded-xl border border-gray-200 items-center"
        >
          <Text className="text-sm font-semibold text-gray-600">Huỷ</Text>
        </Pressable>

        <Pressable
          onPress={handleSubmit}
          className="flex-1 py-2.5 rounded-xl bg-orange-500 items-center"
        >
          <Text className="text-white text-sm font-semibold">
            {initial ? "Cập nhật" : "Thêm KPI"}
          </Text>
        </Pressable>
      </View>
    </ScrollView>
  );
}
