import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { getBaseUrl } from "./httpHelper";

const API_BASE_URL = getBaseUrl();

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Request Interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const { accessToken } = useAuthStore.getState();

    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }

    return config;
  },
  (error) => Promise.reject(error),
);

// Response Interceptor
axiosInstance.interceptors.response.use(
  (response) => response?.data,
  (error) => {
    const { logout } = useAuthStore.getState();

    if (error.response?.status === 401) {
      logout();
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
