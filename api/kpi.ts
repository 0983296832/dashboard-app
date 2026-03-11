import axiosInstance from "@/lib/axiosInstance";

const kpiServices = {
  getOverviewStats: (filter?: object) => {
    const url = "/leads/compare";
    return axiosInstance.get(url, { params: filter });
  },
  postKpiTarget: (body?: object) => {
    const url = "/admin/kpi_targets";
    return axiosInstance.post(url, body);
  },
};

export default kpiServices;
