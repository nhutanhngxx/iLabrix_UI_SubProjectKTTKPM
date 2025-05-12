const authService = {
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
};

export default authService;
