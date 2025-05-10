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
      const response = await fetch(
        "http://localhost:8080/api/v1/user-service/users/login",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, passwordHash: password }),
        }
      );
      if (!response.ok) {
        throw new Error("Đăng nhập thất bại");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi đăng nhập: ", error);
    }
  },
  register: async (registerData) => {
    try {
      console.log("Register: ", registerData);
      const response = await fetch(
        "http://localhost:8080/api/v1/user-service/users/register",
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
  getUserInfo: async () => {},
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
        `http://localhost:8080/api/v1/user-service/users/${updatedData.userId}`,
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
};

export default authService;
