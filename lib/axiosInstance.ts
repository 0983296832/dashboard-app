import { useAuthStore } from "@/stores/useAuthStore";
import axios from "axios";
import { getBaseUrl } from "./httpHelper";

const API_BASE_URL = getBaseUrl();

const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: { "Content-Type": "application/json" },
});

// Biến để quản lý trạng thái refresh token
let isRefreshing = false;
let failedQueue: any[] = [];

// Hàm để xử lý hàng đợi (thực thi lại các request bị kẹt)
const processQueue = (error: any, token: string | null = null) => {
  failedQueue.forEach((prom) => {
    if (error) {
      prom.reject(error);
    } else {
      prom.resolve(token);
    }
  });
  failedQueue = [];
};

// 1. Request Interceptor: Thêm Token vào Header
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

// 2. Response Interceptor: Xử lý lỗi 401 và Refresh Token Queue
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const { refreshToken, setTokens, logout } = useAuthStore.getState();

    // Nếu lỗi 401 và không phải là request retry
    if (error.response?.status === 401 && !originalRequest._retry) {
      // Nếu đang trong quá trình refresh token, đưa request này vào hàng đợi
      if (isRefreshing) {
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        })
          .then((token) => {
            originalRequest.headers.Authorization = `Bearer ${token}`;
            return axiosInstance(originalRequest);
          })
          .catch((err) => Promise.reject(err));
      }

      // Đánh dấu bắt đầu quá trình refresh
      originalRequest._retry = true;
      isRefreshing = true;

      if (!refreshToken) {
        logout();
        isRefreshing = false;
        return Promise.reject(error);
      }

      return new Promise(async (resolve, reject) => {
        try {
          // Gọi API Refresh Token
          const response = await axios.post(
            `${API_BASE_URL}/auth/refresh`,
            {
              refreshToken,
              expiresInMins: 30,
            },
            {
              withCredentials: true,
            },
          );

          const { accessToken: newAccessToken, refreshToken: newRefreshToken } =
            response.data;

          // Lưu token mới vào Zustand
          setTokens(newAccessToken, newRefreshToken);

          // Giải phóng hàng đợi với token mới
          processQueue(null, newAccessToken);

          // Thực thi lại request gốc
          originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
          resolve(axiosInstance(originalRequest));
        } catch (refreshError) {
          // Nếu refresh thất bại, hủy hàng đợi và logout
          processQueue(refreshError, null);
          logout();
          reject(refreshError);
        } finally {
          isRefreshing = false;
        }
      });
    }

    return Promise.reject(error);
  },
);

export default axiosInstance;
