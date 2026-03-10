const formatNumber = (value: string | number) => {
  const num = Number(value);
  if (isNaN(num)) return value;
  return num.toLocaleString("vi-VN");
};

export { formatNumber };
