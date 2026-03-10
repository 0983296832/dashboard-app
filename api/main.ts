import axiosInstance from "@/lib/axiosInstance";
import axios from "axios";

const mainServices = {
  getCurrentUser: (filter?: object) => {
    const url = "/me";
    return axiosInstance.get(url, { params: filter });
  },
  getUsers: (filter?: object) => {
    const url = "/users";
    return axiosInstance.get(url, { params: filter });
  },
  getUserPermission: (filter?: object) => {
    const url = "/me/permissions";
    return axiosInstance.get(url, { params: filter });
  },
  onUploadFile: (body: any) => {
    const url = "img_upload";
    return axiosInstance.post(url, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  onTempUploadFile: (body: any) => {
    const url = "https://s3.beliteachers.com/upload";
    return axios.post(url, body, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },
  getProvinces: () => {
    const url = "s/provinces";
    return axiosInstance.get(url);
  },
  getDistricts: (filter: object) => {
    const url = "s/districts";
    return axiosInstance.get(url, { params: filter });
  },
  getWards: (filter: object) => {
    const url = "s/wards";
    return axiosInstance.get(url, { params: filter });
  },
};

export default mainServices;
