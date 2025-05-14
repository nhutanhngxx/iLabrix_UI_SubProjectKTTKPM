const borrowService = {
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
      return data;
    } catch (error) {
      console.log("Có lỗi xảy ra khi tạo yêu cầu mượn sách: ", error);
    }
  },
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
};

export default borrowService;
