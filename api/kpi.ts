import axiosInstance from "@/lib/axiosInstance";

const kpiServices = {
  getKpiTargets: (filter?: object) => {
    const url = "/admin/kpi_targets";
    return axiosInstance.get(url, { params: filter });
  },
  postKpiTarget: (body?: object) => {
    const url = "/admin/kpi_targets";
    return axiosInstance.post(url, body);
  },
  putKpiTarget: (id: string, body?: object) => {
    const url = "/admin/kpi_targets/" + id;
    return axiosInstance.put(url, body);
  },
  deleteKpiTarget: (id: string | null) => {
    const url = "/admin/kpi_targets/" + id;
    return axiosInstance.delete(url);
  },
  getLeadKpi: (filter: object) => {
    console.log("filter");
    const url = "/leads/kpi";
    return axiosInstance.get(url, { params: filter });
  },
};

export default kpiServices;
