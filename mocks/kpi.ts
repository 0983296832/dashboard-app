
export const systemKPI = {
  total: 85,
  target: 100,
  achieved: 85,
  facilities: 12,
  employees: 48
};

export const yearlyKPI = {
  soLead: 30926,
  reg: { achieved: 3805, target: 18326, percent: 20.76 },
  nb: { achieved: 646, target: 10405, percent: 6.21 },
  ne: { achieved: 145, target: 8336, percent: 1.74 },
  completionRate: 20.76,
  monthsPassed: 3
};

export const facilitiesKPITable = [
  { id: 1,  name: 'FSC cấp 1, 2 Đà Nẵng', soLead: 2617, reg: 632,  nb: 23,  ne: 23,  kpiReg: 1920, kpiNb: 1180, kpiNe: 1102, pctReg: 32.9, pctNb: 1.9,  pctNe: 2.1 },
  { id: 2,  name: 'FSC Hòa Lạc',           soLead: 8569, reg: 458,  nb: 6,   ne: 6,   kpiReg: 1800, kpiNb: 1100, kpiNe: 700,  pctReg: 25.4, pctNb: 0.5,  pctNe: 0.9 },
  { id: 3,  name: 'FSC Tây Hà Nội',        soLead: 4650, reg: 422,  nb: 13,  ne: 8,   kpiReg: 1600, kpiNb: 900,  kpiNe: 450,  pctReg: 26.4, pctNb: 1.4,  pctNe: 1.8 },
  { id: 4,  name: 'FSC Hà Nam',            soLead: 750,  reg: 118,  nb: 48,  ne: 11,  kpiReg: 1384, kpiNb: 762,  kpiNe: 635,  pctReg: 8.5,  pctNb: 6.3,  pctNe: 1.7 },
  { id: 5,  name: 'FSC Cầu Giấy',          soLead: 2921, reg: 593,  nb: 291, ne: 24,  kpiReg: 1315, kpiNb: 781,  kpiNe: 625,  pctReg: 45.1, pctNb: 37.3, pctNe: 3.8 },
  { id: 6,  name: 'FSC cấp 3 Đà Nẵng',    soLead: 1059, reg: 297,  nb: 6,   ne: 3,   kpiReg: 1300, kpiNb: 1300, kpiNe: 555,  pctReg: 22.8, pctNb: 0.5,  pctNe: 0.5 },
  { id: 7,  name: 'FSC Hải Phòng',         soLead: 1277, reg: 147,  nb: 30,  ne: 14,  kpiReg: 1248, kpiNb: 830,  kpiNe: 555,  pctReg: 11.8, pctNb: 3.6,  pctNe: 2.5 },
  { id: 8,  name: 'FSC Bắc Ninh',          soLead: 1325, reg: 166,  nb: 12,  ne: 12,  kpiReg: 1200, kpiNb: 0,    kpiNe: 600,  pctReg: 13.8, pctNb: null, pctNe: 2.0 },
  { id: 9,  name: 'FSC Bắc Giang',         soLead: 912,  reg: 296,  nb: 31,  ne: 19,  kpiReg: 1100, kpiNb: 510,  kpiNe: 489,  pctReg: 26.9, pctNb: 6.1,  pctNe: 3.9 },
  { id: 10, name: 'FSC Millennia (Nam Sài Gòn)', soLead: 796, reg: 1, nb: 0, ne: 0,  kpiReg: 1033, kpiNb: 517,  kpiNe: 310,  pctReg: 0.1,  pctNb: 0.0,  pctNe: 0.0 },
  { id: 11, name: 'FSC Vinh',              soLead: 1896, reg: 1,    nb: 0,   ne: 0,   kpiReg: 750,  kpiNb: 425,  kpiNe: 360,  pctReg: 0.1,  pctNb: 0.0,  pctNe: 0.0 },
  { id: 12, name: 'FSC Cần Thơ',           soLead: 845,  reg: 84,   nb: 4,   ne: 4,   kpiReg: 690,  kpiNb: 345,  kpiNe: 345,  pctReg: 12.2, pctNb: 1.2,  pctNe: 1.2 },
];

export const facilitiesKPI = [
  { id: 1, name: 'Cơ sở Quận 1', kpi: 92, target: 100, achieved: 92, employees: 8, status: 'excellent' },
  { id: 2, name: 'Cơ sở Quận 3', kpi: 88, target: 100, achieved: 88, employees: 6, status: 'good' },
  { id: 3, name: 'Cơ sở Quận 7', kpi: 85, target: 100, achieved: 85, employees: 7, status: 'good' },
  { id: 4, name: 'Cơ sở Thủ Đức', kpi: 78, target: 100, achieved: 78, employees: 5, status: 'warning' },
  { id: 5, name: 'Cơ sở Bình Thạnh', kpi: 72, target: 100, achieved: 72, employees: 6, status: 'warning' },
  { id: 6, name: 'Cơ sở Tân Bình', kpi: 65, target: 100, achieved: 65, employees: 4, status: 'danger' }
];

export const employeesKPI = [
  { id: 1, name: 'Nguyễn Văn An', facility: 'Cơ sở Quận 1', facilityId: 1, kpi: 95, target: 100, achieved: 95, reg: 28, ne: 22, avatar: 'https://readdy.ai/api/search-image?query=professional-vietnamese-male-sales-consultant-headshot-portrait-clean-white-background-friendly-smile-business-attire-confident-expression-studio-lighting-high-quality-corporate-photo&width=200&height=200&seq=kpi-emp-1&orientation=squarish', status: 'excellent' },
  { id: 2, name: 'Trần Thị Bình', facility: 'Cơ sở Quận 1', facilityId: 1, kpi: 92, target: 100, achieved: 92, reg: 26, ne: 21, avatar: 'https://readdy.ai/api/search-image?query=professional-vietnamese-female-sales-consultant-headshot-portrait-clean-white-background-warm-smile-business-attire-confident-expression-studio-lighting-high-quality-corporate-photo&width=200&height=200&seq=kpi-emp-2&orientation=squarish', status: 'excellent' },
  { id: 3, name: 'Lê Minh Cường', facility: 'Cơ sở Quận 3', facilityId: 2, kpi: 88, target: 100, achieved: 88, reg: 24, ne: 19, avatar: 'https://readdy.ai/api/search-image?query=professional-vietnamese-male-business-consultant-headshot-portrait-clean-white-background-friendly-smile-formal-attire-confident-expression-studio-lighting-high-quality-corporate-photo&width=200&height=200&seq=kpi-emp-3&orientation=squarish', status: 'good' },
  { id: 4, name: 'Phạm Thu Dung', facility: 'Cơ sở Quận 7', facilityId: 3, kpi: 85, target: 100, achieved: 85, reg: 23, ne: 18, avatar: 'https://readdy.ai/api/search-image?query=professional-vietnamese-female-business-consultant-headshot-portrait-clean-white-background-warm-smile-formal-attire-confident-expression-studio-lighting-high-quality-corporate-photo&width=200&height=200&seq=kpi-emp-4&orientation=squarish', status: 'good' },
  { id: 5, name: 'Hoàng Văn Em', facility: 'Cơ sở Thủ Đức', facilityId: 4, kpi: 78, target: 100, achieved: 78, reg: 20, ne: 15, avatar: 'https://readdy.ai/api/search-image?query=professional-vietnamese-male-sales-representative-headshot-portrait-clean-white-background-friendly-smile-business-attire-confident-expression-studio-lighting-high-quality-corporate-photo&width=200&height=200&seq=kpi-emp-5&orientation=squarish', status: 'warning' },
  { id: 6, name: 'Đỗ Thị Phương', facility: 'Cơ sở Bình Thạnh', facilityId: 5, kpi: 72, target: 100, achieved: 72, reg: 18, ne: 13, avatar: 'https://readdy.ai/api/search-image?query=professional-vietnamese-female-sales-representative-headshot-portrait-clean-white-background-warm-smile-business-attire-confident-expression-studio-lighting-high-quality-corporate-photo&width=200&height=200&seq=kpi-emp-6&orientation=squarish', status: 'warning' },
  { id: 7, name: 'Vũ Minh Giang', facility: 'Cơ sở Tân Bình', facilityId: 6, kpi: 65, target: 100, achieved: 65, reg: 15, ne: 11, avatar: 'https://readdy.ai/api/search-image?query=professional-vietnamese-male-business-representative-headshot-portrait-clean-white-background-friendly-smile-formal-attire-confident-expression-studio-lighting-high-quality-corporate-photo&width=200&height=200&seq=kpi-emp-7&orientation=squarish', status: 'danger' },
  { id: 8, name: 'Bùi Thị Hà', facility: 'Cơ sở Tân Bình', facilityId: 6, kpi: 58, target: 100, achieved: 58, reg: 13, ne: 9, avatar: 'https://readdy.ai/api/search-image?query=professional-vietnamese-female-business-representative-headshot-portrait-clean-white-background-warm-smile-formal-attire-confident-expression-studio-lighting-high-quality-corporate-photo&width=200&height=200&seq=kpi-emp-8&orientation=squarish', status: 'danger' }
];
