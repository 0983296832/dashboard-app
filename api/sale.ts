import axiosInstance from "@/lib/axiosInstance";

const saleServices = {
  getLeadCallStatus: (filter?: object) => {
    const url = "/leads/call-status";
    return axiosInstance.get(url, { params: filter });
  },
  getLeadDashboard: (filter?: object) => {
    const url = "/leads/dashboard";
    return axiosInstance.get(url, { params: filter });
  },
};

export default saleServices;
