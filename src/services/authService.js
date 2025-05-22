import config from "../configs/config";
import http from "../utils/axiosClient";
const authService = {
  isTokenValid: () => {
    const token = localStorage.getItem("accessToken");

    if (!token) {
      return false;
    }
    try {
      const payload = token.split(".")[1];
      if (payload) {
        const decodedPayload = JSON.parse(atob(payload));
        // Kiểm tra thời hạn token
        return decodedPayload.exp > Date.now() / 1000;
      }
      return true;
    } catch (error) {
      console.error("Lỗi kiểm tra token:", error);
      return false;
    }
  },

  login: async ({ username, password }) => {
    try {
      // const response = await fetch(
      //   `${config.BASE_URL}/api/v1/user-service/users/login`,
      //   {
      //     method: "POST",
      //     headers: {
      //       "Content-Type": "application/json",
      //     },
      //     body: JSON.stringify({ username, passwordHash: password }),
      //   }
      // );

      const response = await http.post("/api/v1/user-service/users/login", {
        username,
        passwordHash: password,
      });

      // Kiểm tra response data
      if (response.data) {
        // Lưu token nếu có
        if (response.data.accessToken) {
          localStorage.setItem("accessToken", response.data.accessToken);
        }
        return response.data;
      }

      throw new Error("Đăng nhập thất bại");
    } catch (error) {
      console.log("Có lỗi xảy ra khi đăng nhập: ", error);
      // Trả về lỗi cụ thể hơn
      if (error.response) {
        // Lỗi từ server
        throw new Error(error.response.data?.message || "Đăng nhập thất bại");
      } else if (error.request) {
        // Không nhận được response
        throw new Error("Không thể kết nối đến server");
      } else {
        // Lỗi khác
        throw new Error("Đăng nhập thất bại");
      }
    }
  },

  logout: async () => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${config.BASE_URL}/api/v1/user-service/users/logout`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Đăng xuất thất bại");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi đăng xuất: ", error);
    }
  },

  register: async (registerData) => {
    try {
      const response = await fetch(
        `${config.BASE_URL}/api/v1/user-service/users/register`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...registerData,
            passwordHash: registerData.password,
          }),
        }
      );
      const data = await response.json();
      if (!response.ok) {
        return {
          success: false,
          errors: data.errors,
        };
      }

      return {
        success: true,
        data,
      };
    } catch (error) {
      console.log("Có lỗi xảy ra khi đăng ký: ", error);
    }
  },
  getUserInfo: async (userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${config.BASE_URL}/api/v1/user-service/users/profile/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Get user info failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy thông tin người dùng: ", error);
    }
  },

  // Lấy thông tin người dùng thông qua ID
  getUserInfoById: async (userId) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `${config.BASE_URL}/api/v1/user-service/users/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Get user info failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy thông tin người dùng: ", error);
    }
  },

  updateProfile: async (updatedData) => {
    const token = localStorage.getItem("accessToken");

    const requestBody = {
      userId: updatedData.userId,
      username: updatedData.username || "",
      email: updatedData.email || "",
      fullName: updatedData.fullName || "",
      role: updatedData.role || "",
      passwordHash: updatedData.passwordHash || "",
    };

    try {
      const response = await fetch(
        `${config.BASE_URL}/api/v1/user-service/users/${updatedData.userId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(requestBody),
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Update failed: ${errorData}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Không thể cập nhật: ", error);
    }
  },

  changePassword: async (currentPassword, newPassword) => {
    const token = localStorage.getItem("accessToken");

    try {
      const response = await fetch(
        `${config.BASE_URL}/api/v1/user-service/users/change-password`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            oldPassword: currentPassword,
            newPassword,
          }),
        }
      );
      if (!response.ok) {
        const errorData = await response.text();
        throw new Error(`Change password failed: ${errorData}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Không thể đổi mật khẩu: ", error);
    }
  },
};

export default authService;
