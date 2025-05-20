import config from "../configs/config";
import bookService from "./bookService";
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

  countBooksByCategory: async () => {
    try {
      const books = await bookService.getBooks();

      if (!books || !Array.isArray(books) || books.length === 0) {
        return [];
      }

      const categoryCounts = {};
      books.forEach((book) => {
        if (book.category && book.category.name) {
          const categoryName = book.category.name;

          if (categoryCounts[categoryName]) {
            categoryCounts[categoryName]++;
          } else {
            categoryCounts[categoryName] = 1;
          }
        } else {
          // Handle books without a category
          if (categoryCounts["Uncategorized"]) {
            categoryCounts["Uncategorized"]++;
          } else {
            categoryCounts["Uncategorized"] = 1;
          }
        }
      });
      const sortedCategories = Object.entries(categoryCounts)
        .sort(([, countA], [, countB]) => countB - countA)
        .slice(0, 7);

      return sortedCategories.map(([name, count]) => ({
        categoryName: name,
        bookCount: count,
      }));
    } catch (error) {
      console.log("Có lỗi xảy ra khi đếm số lượng sách: ", error);
      return 0;
    }
  },
};

export default categoryService;
