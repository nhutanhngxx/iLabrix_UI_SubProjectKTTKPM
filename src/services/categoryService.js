import config from "../configs/config";
const categoryService = {
  getCategories: async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${config.BASE_URL}/api/v1/book-service/categories`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Get categories failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách thể loại: ", error);
      return [];
    }
  },
};

export default categoryService;
