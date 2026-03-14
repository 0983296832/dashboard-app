import axiosInstance from "@/lib/axiosInstance";
import { getBaseUrl } from "@/lib/httpHelper";
import axios from "axios";

const mainServices = {
  getCurrentUser: (filter?: object) => {
    const url = "/me";
    return axiosInstance.get(url, { params: filter });
  },
  getOptions: (type: string, filter?: object) => {
    const url = getBaseUrl() + "/leads/options/" + type;
    return axios.get(url, { params: filter });
  },
  getUsers: (filter?: object) => {
    const url = "/users";
    return axiosInstance.get(url, { params: filter });
  },
  getNotifications: (filter?: object) => {
    const url = "/notifications";
    return axiosInstance.get(url, { params: filter });
  },
  readNotification: (id: number | string) => {
    const url = `/notifications/${id}/read`;
    return axiosInstance.put(url);
  },
};

export default mainServices;
