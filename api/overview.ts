import axiosInstance from "@/lib/axiosInstance";

const overviewServices = {
  getOverviewStats: (filter?: object) => {
    const url = "/leads/compare";
    return axiosInstance.get(url, { params: filter });
  },
  getLeadPie: (filter?: object) => {
    const url = "/leads/pie";
    return axiosInstance.get(url, { params: filter });
  },
};

export default overviewServices;
