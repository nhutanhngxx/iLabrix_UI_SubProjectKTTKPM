const borrowService = {
  // Tạo phiếu mượn
  createBorrowRequest: async (borrowRequest) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/borrowing-service/borrow-requests",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(borrowRequest),
        }
      );
      if (!response.ok) {
        throw new Error("Create borrow request failed");
      }

      const data = await response.json();
      console.log("data: ", data);
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi tạo yêu cầu mượn sách: ", error);
    }
  },

  // Lấy danh sách phiếu mượn của người dùng
  getBorrowRequestsByUser: async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/borrowing-service/borrow-requests/users/borrow-history",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Get borrow requests failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách yêu cầu mượn sách: ", error);
      return [];
    }
  },

  // Lấy danh sách phiếu mượn của tất cả người dùng
  getAllBorrowRequests: async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        "http://localhost:8080/api/v1/borrowing-service/borrow-requests",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!response.ok) {
        throw new Error("Get borrow requests failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách yêu cầu mượn sách: ", error);
      return [];
    }
  },

  // Chấp nhận phiếu mượn
  approveBorrowRequest: async (borrowRequest) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:8080/api/v1/borrowing-service/borrow-requests/${borrowRequest.borrowRequestId}/borrow`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(borrowRequest),
        }
      );
      if (!response.ok) {
        throw new Error("Approve borrow request failed");
      }

      const data = await response.json();
      console.log("data: ", data);

      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi duyệt yêu cầu mượn sách: ", error);
    }
  },

  // Trả sách
  returnBook: async (borrowRequest) => {
    try {
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:8080/api/v1/borrowing-service/borrow-requests/${borrowRequest.borrowRequestId}/return`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Return book failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi trả sách: ", error);
    }
  },

  // Hủy phiếu mượn
  cancelBorrowRequest: async (borrowRequest) => {
    try {
      console.log("borrowRequest: ", borrowRequest);
      const token = localStorage.getItem("accessToken");
      const response = await fetch(
        `http://localhost:8080/api/v1/borrowing-service/borrow-requests/${borrowRequest.borrowRequestId}/canceled`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Cancel borrow request failed");
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi hủy yêu cầu mượn sách: ", error);
    }
  },

  // Thống kê phiếu mượn theo status
  getBorrowRequestsStatistics: async () => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/borrowing-service/borrow-requests/statistics`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Get borrow requests failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách yêu cầu mượn sách: ", error);
      return [];
    }
  },

  // Lấy số lượng phiếu mượn theo ngày
  getBorrowRequestsByDate: async (date) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/borrowing-service/borrow-requests/statistics/${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Get borrow requests failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách yêu cầu mượn sách: ", error);
      return [];
    }
  },

  // Lấy số lượng sách (copy) được mượn theo ngày
  getBorrowedBooksByDate: async (date) => {
    const token = localStorage.getItem("accessToken");
    try {
      const response = await fetch(
        `http://localhost:8080/api/v1/borrowing-service/borrow-requests/statistics/book-borrowed/${date}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!response.ok) {
        throw new Error("Get borrow requests failed");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách yêu cầu mượn sách: ", error);
      return [];
    }
  },
};

export default borrowService;
