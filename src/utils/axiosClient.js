import axios from "axios";
import rateLimit from "axios-rate-limit";
import config from "../configs/config";

// Tạo instance axios
const axiosClient = axios.create({
  baseURL: config.BASE_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Thêm interceptor để tự động thêm token vào header
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Thêm rate limiter
const http = rateLimit(axiosClient, {
  maxRequests: 10,
  perMilliseconds: 1000,
});

// Thêm interceptor để xử lý response
http.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 429) {
      console.error("Rate limit exceeded. Please try again later.");
      // Thêm thông báo cho người dùng
      alert("Quá nhiều yêu cầu. Vui lòng thử lại sau 1 giây.");
    } else if (error.response?.status === 401) {
      // Xử lý khi token hết hạn hoặc không hợp lệ
      localStorage.removeItem("accessToken");
      // Có thể thêm logic redirect về trang login ở đây
    }
    return Promise.reject(error);
  }
);

export default http;
