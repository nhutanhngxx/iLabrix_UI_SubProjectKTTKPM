import config from "../configs/config";
import borrowService from "./borrowService";
const bookService = {
  getBooks: async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `${config.BASE_URL}/api/v1/book-service/books`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Get books failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách sách: ", error);
    }
  },

  getTopBooksBorrowed: async () => {
    try {
      const borrowRequest = await borrowService.getAllBorrowRequests();
      if (!borrowRequest) {
        throw new Error("Get borrow requests failed");
      }

      const books = {};
      borrowRequest.forEach((br) => {
        br.readerRequestDetails.forEach((rd) => {
          if (books[rd.bookCopy.book.id]) {
            books[rd.bookCopy.book.id].count += 1;
          } else {
            books[rd.bookCopy.book.id] = {
              book: rd.bookCopy.book,
              count: 1,
            };
          }
        });
      });

      const data = Object.values(books)
        .sort((a, b) => b.count - a.count)
        .slice(0, 10);
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách sách: ", error);
    }
  },
};

export default bookService;
