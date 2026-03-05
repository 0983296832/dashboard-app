
export const saleByFacilityData = [
  { id: 1, facility: 'FSC Hòa Lạc', person: 'Nguyễn Thị Như Quỳnh Hòa Lạc', leads: 2746, reg: 86, regRate: 3.13, nb: 0, nbRate: 0, ne: 0, neRate: 0.00 },
  { id: 2, facility: 'FSC Hòa Lạc', person: 'Phạm Diệu Linh FSC Hòa Lạc', leads: 2631, reg: 184, regRate: 6.99, nb: 2, nbRate: 0.08, ne: 2, neRate: 0.08 },
  { id: 3, facility: 'FSC Hòa Lạc', person: 'Lê Thị Giang FSC Hòa Lạc', leads: 2148, reg: 116, regRate: 5.4, nb: 0, nbRate: 0, ne: 0, neRate: 0.00 },
  { id: 4, facility: 'FSC Tây Hà Nội', person: 'Nguyễn Thị Bích FSC Tây Hà Nội', leads: 1489, reg: 143, regRate: 9.6, nb: 5, nbRate: 0.34, ne: 4, neRate: 0.27 },
  { id: 5, facility: 'FSC Tây Hà Nội', person: 'Hà Phương Thảo FSC Tây Hà Nội', leads: 1432, reg: 166, regRate: 11.59, nb: 3, nbRate: 0.21, ne: 2, neRate: 0.14 },
  { id: 6, facility: 'FSC Tây Hà Nội', person: 'Bùi Thị Bích Diệp FSC Tây Hà Nội', leads: 1315, reg: 109, regRate: 8.29, nb: 5, nbRate: 0.38, ne: 2, neRate: 0.15 },
  { id: 7, facility: 'FSC Cầu Giấy', person: 'Thiều Hoàng Hồng FSC Cầu Giấy 1-2', leads: 1025, reg: 215, regRate: 20.98, nb: 79, nbRate: 7.71, ne: 14, neRate: 1.37 },
  { id: 8, facility: 'FSC Cầu Giấy', person: 'Nguyễn Hải Anh FSC Cầu Giấy', leads: 882, reg: 132, regRate: 14.97, nb: 57, nbRate: 6.46, ne: 3, neRate: 0.34 },
  { id: 9, facility: 'FSC cấp 1, 2 Đà Nẵng', person: 'Đặng Thị Bình FSC Đà Nẵng 1-2', leads: 778, reg: 263, regRate: 33.8, nb: 6, nbRate: 0.77, ne: 6, neRate: 0.77 },
  { id: 10, facility: 'FSC cấp 1, 2 Đà Nẵng', person: 'Nguyễn Thời Huyền Ngân FSC Đà Nẵng 1-2', leads: 718, reg: 178, regRate: 24.79, nb: 8, nbRate: 1.11, ne: 8, neRate: 1.11 },
  { id: 11, facility: 'FSC Linh Đàm', person: 'Trần Thị Hoa FSC Linh Đàm', leads: 654, reg: 98, regRate: 14.98, nb: 12, nbRate: 1.83, ne: 5, neRate: 0.76 },
  { id: 12, facility: 'FSC Linh Đàm', person: 'Nguyễn Minh Tuấn FSC Linh Đàm', leads: 521, reg: 87, regRate: 16.70, nb: 9, nbRate: 1.73, ne: 3, neRate: 0.58 },
];

export const saleSourceCallData = [
  { source: 'Cơ sở_ONL', leads: 19180, answered: 11677, notAnswered2: 2140, notContacted: 1158, notAnswered1: 923, wrongNumber: 629, notAnswered3: 650, callback: 253, hired: 505, duplicate: 391, wrongReg: 445, reReg: 137, machineAns: 161, transfer: 111 },
  { source: 'HO', leads: 5186, answered: 3658, notAnswered2: 220, notContacted: 93, notAnswered1: 290, wrongNumber: 309, notAnswered3: 144, callback: 116, hired: 72, duplicate: 118, wrongReg: 62, reReg: 54, machineAns: 16, transfer: 32 },
  { source: 'Tự tìm kiếm', leads: 3282, answered: 2965, notAnswered2: 9, notContacted: 11, notAnswered1: 18, wrongNumber: 41, notAnswered3: 5, callback: 191, hired: 2, duplicate: 20, wrongReg: 10, reReg: 9, machineAns: 0, transfer: 1 },
  { source: 'Cơ sở_OFF', leads: 1432, answered: 1273, notAnswered2: 25, notContacted: 4, notAnswered1: 20, wrongNumber: 18, notAnswered3: 9, callback: 37, hired: 7, duplicate: 22, wrongReg: 6, reReg: 2, machineAns: 0, transfer: 0 },
  { source: 'Nội bộ', leads: 892, answered: 756, notAnswered2: 34, notContacted: 12, notAnswered1: 28, wrongNumber: 15, notAnswered3: 8, callback: 22, hired: 4, duplicate: 8, wrongReg: 3, reReg: 1, machineAns: 0, transfer: 1 },
  { source: 'Khác', leads: 421, answered: 348, notAnswered2: 18, notContacted: 7, notAnswered1: 14, wrongNumber: 9, notAnswered3: 4, callback: 11, hired: 2, duplicate: 4, wrongReg: 2, reReg: 1, machineAns: 0, transfer: 1 },
];

export const saleAnswerRateBySource = [
  { source: 'Cơ sở_ONL', leads: 19180, answered: 11677, answerRate: 60.88 },
  { source: 'HO', leads: 5186, answered: 3658, answerRate: 70.54 },
  { source: 'Tự tìm kiếm', leads: 3282, answered: 2965, answerRate: 90.34 },
  { source: 'Cơ sở_OFF', leads: 1432, answered: 1273, answerRate: 88.90 },
  { source: 'Nội bộ', leads: 892, answered: 756, answerRate: 90.50 },
  { source: 'Khác', leads: 421, answered: 348, answerRate: 79.82 },
];
