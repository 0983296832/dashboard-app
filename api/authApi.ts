import axiosInstance from "@/lib/axiosInstance";
import { getBaseUrl } from "@/lib/httpHelper";
import axios from "axios";

const authServices = {
  login: async (body: any) => {
    try {
      const url = getBaseUrl() + "/login";
      const response = await axios.post(url, body, {
        withCredentials: true,
      });
      return response;
    } catch (error) {
      console.error("Login Error:", error);
      throw error;
    }
  },
  register: (body: any) => {
    const url = getBaseUrl() + "/register";

    return axios.post(url, body);
  },
  logout: () => {
    const url = "/logout";
    return axiosInstance.post(url);
  },
  getUsers: (filter: any) => {
    const url = "/admin/users";
    return axiosInstance.get(url, { params: filter });
  },
  approveUser: (id: string) => {
    const url = `admin/users/${id}/approve`;
    return axiosInstance.put(url);
  },
  rejectUser: (id: string) => {
    const url = `admin/users/${id}/reject`;
    return axiosInstance.put(url);
  },
  // forgotPassword: async (body: any) => {
  //   try {
  //     const url = getBaseUrl() + "/request-create-otp";
  //     const response = await axios.post(url, body);
  //     return response;
  //   } catch (error) {
  //     console.error("Forgot Password Error:", error);
  //     throw error;
  //   }
  // },
  // verifyOtp: async (username: string, otp: string) => {
  //   try {
  //     const url = getBaseUrl() + "/validate-create-otp";
  //     const response = await axios.post(url, { username, otp });
  //     return response;
  //   } catch (error) {
  //     console.error("Verify OTP Error:", error);
  //     throw error;
  //   }
  // },
  // resetPassword: async (body: object) => {
  //   try {
  //     const url = getBaseUrl() + "/change-password-via-otp";
  //     const response = await axios.post(url, body);
  //     return response;
  //   } catch (error) {
  //     console.error("Reset Password Error:", error);
  //     throw error;
  //   }
  // },
};

export default authServices;
