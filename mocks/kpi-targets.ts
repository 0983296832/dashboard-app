export interface KPITarget {
  id: string;
  name: string;
  field: string;
  filter_value: string;
  target: number;
  period_type: "month" | "quarter" | "year";
  year: number;
  month?: number;
  quarter?: number;
  date_column: string;
}

export const kpiTargets: KPITarget[] = [
  {
    id: "1",
    name: "REG tháng 1/2026",
    field: "tinh_trang_nhap_hoc",
    filter_value: "REG",
    target: 1200,
    period_type: "month",
    year: 2026,
    month: 1,
    date_column: "ngay_tao",
  },
  {
    id: "2",
    name: "REG tháng 2/2026",
    field: "tinh_trang_nhap_hoc",
    filter_value: "REG",
    target: 1350,
    period_type: "month",
    year: 2026,
    month: 2,
    date_column: "ngay_tao",
  },
  {
    id: "3",
    name: "REG tháng 3/2026",
    field: "tinh_trang_nhap_hoc",
    filter_value: "REG",
    target: 1500,
    period_type: "month",
    year: 2026,
    month: 3,
    date_column: "ngay_tao",
  },
  {
    id: "4",
    name: "NB tháng 1/2026",
    field: "tinh_trang_nhap_hoc",
    filter_value: "NB",
    target: 800,
    period_type: "month",
    year: 2026,
    month: 1,
    date_column: "ngay_tao",
  },
  {
    id: "5",
    name: "NB tháng 2/2026",
    field: "tinh_trang_nhap_hoc",
    filter_value: "NB",
    target: 850,
    period_type: "month",
    year: 2026,
    month: 2,
    date_column: "ngay_tao",
  },
  {
    id: "6",
    name: "NE tháng 1/2026",
    field: "tinh_trang_nhap_hoc",
    filter_value: "NE",
    target: 600,
    period_type: "month",
    year: 2026,
    month: 1,
    date_column: "ngay_tao",
  },
  {
    id: "7",
    name: "KPI REG Quý 1/2026",
    field: "tinh_trang_nhap_hoc",
    filter_value: "REG",
    target: 4050,
    period_type: "quarter",
    year: 2026,
    quarter: 1,
    date_column: "ngay_tao",
  },
  {
    id: "8",
    name: "KPI NB Năm 2026",
    field: "tinh_trang_nhap_hoc",
    filter_value: "NB",
    target: 10000,
    period_type: "year",
    year: 2026,
    date_column: "ngay_tao",
  },
];
