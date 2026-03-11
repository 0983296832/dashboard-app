import mainServices from "@/api/main";
import React, { useEffect, useState } from "react";
import SelectInput from "./select-input";

export default function SelectCustom({
  value,
  onChange,
  className,
  type = "tinh_trang_nhap_hoc",
  placeholder = "Vui lòng chọn",
}: {
  value: string;
  onChange: (v: any) => void;
  className?: string;
  type: "tinh_trang_nhap_hoc" | "co_so";
  placeholder?: string;
}) {
  const [options, setOptions] = useState<
    { value: string | number; label: string }[]
  >([]);

  const getData = async () => {
    try {
      const res: any = await mainServices.getOptions(type, { limit: 99999999 });
      setOptions(res?.data?.data?.map((v: string) => ({ value: v, label: v })));
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  return (
    <SelectInput
      value={value}
      onChange={(v) => onChange(v)}
      options={options}
      className={className}
      placeholder={placeholder}
    />
  );
}
