import { useState, useEffect } from "react";
import borrowService from "../../services/borrowService";

const TabBookLoan = () => {
  const [borrowers, setBorrowers] = useState([]);
  const [allBorrowers, setAllBorrowers] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");

  // Thêm state và logic phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const borrowersPerPage = 10;
  const totalPages = Math.ceil(borrowers.length / borrowersPerPage);
  const startIndex = (currentPage - 1) * borrowersPerPage;
  const selectedBorrowers = borrowers.slice(
    startIndex,
    startIndex + borrowersPerPage
  );

  // Hàm format ngày
  const formatDate = (dateString) => {
    if (dateString) {
      const date = new Date(dateString);
      const day = String(date.getDate()).padStart(2, "0");
      const month = String(date.getMonth() + 1).padStart(2, "0");
      const year = date.getFullYear();
      return `${day}/${month}/${year}`;
    }
    return "";
  };

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };

  const renderPageNumbers = () => {
    const pages = [];
    if (totalPages <= 5) {
      for (let i = 1; i <= totalPages; i++) pages.push(i);
    } else {
      pages.push(1);
      if (currentPage > 3) pages.push("...");
      const start = Math.max(2, currentPage - 1);
      const end = Math.min(currentPage + 1, totalPages - 1);
      for (let i = start; i <= end; i++) pages.push(i);
      if (currentPage < totalPages - 2) pages.push("...");
      pages.push(totalPages);
    }

    return pages.map((page, index) =>
      typeof page === "number" ? (
        <button
          key={index}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === page ? "font-bold underline" : "text-gray-700"
          }`}
          onClick={() => goToPage(page)}
        >
          {page}
        </button>
      ) : (
        <span key={index} className="px-2 text-gray-500">
          {page}
        </span>
      )
    );
  };

  // Lấy danh sách phiếu mượn của người dùng
  const fetchBorrowers = async () => {
    try {
      const response = await borrowService.getBorrowRequests();
      if (!response) {
        throw new Error("Lỗi khi lấy dữ liệu");
      }
      setBorrowers(response);
      setAllBorrowers(response);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };
  useEffect(() => {
    fetchBorrowers();
  }, []);

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (keyword === "") {
      setBorrowers(allBorrowers);
    } else {
      setBorrowers(
        allBorrowers.filter(
          (item) =>
            item.name.toLowerCase().includes(keyword) ||
            item.book.toLowerCase().includes(keyword)
        )
      );
    }
  };

  // Khi chọn trạng thái, cập nhật danh sách borrowers
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    if (selectedStatus === "") {
      setBorrowers(allBorrowers);
    } else {
      setBorrowers(
        allBorrowers.filter((item) => item.status === selectedStatus)
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-3xl items-center text-sky-900 font-bold">
          Manage your book loan
        </h2>
        {/* Bộ lọc trạng thái */}
        <div className="w-[200px]">
          <label className="block text-xs mb-1 font-medium text-gray-600">
            Filter by Status
          </label>
          <select
            className="w-full border p-1 rounded-lg"
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="PENDING">Pending</option>
            <option value="APPROVED">Approved</option>
            <option value="BORROWED">Borrowing</option>
            <option value="RETURNED">Returned</option>
            <option value="OVERDUE">Overdue</option>
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-xs mt-1 font-medium text-gray-600">
            Search by keyword
          </label>
          <div className="flex items-center justify-center h-[40px]">
            <div className="rounded-lg bg-gray-200">
              <div className="flex">
                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white">
                  <svg
                    viewBox="0 0 20 20"
                    aria-hidden="true"
                    className="pointer-events-none absolute w-5 fill-gray-500 transition"
                  >
                    <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
                  </svg>
                </div>
                <input
                  type="text"
                  className="w-full max-w-[160px] bg-white pl-3 text-base font-semibold outline-0"
                  placeholder=""
                  id=""
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                ></input>
                <input
                  type="button"
                  value="Search"
                  onClick={handleSearch}
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-1 font-bold hover:opacity-80 rounded-tr-lg rounded-br-lg cursor-pointer"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng hiển thị danh sách phiếu mượn */}
      <div className="overflow-auto max-h-[calc(100vh-300px)]">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">No.</th>
              <th className="py-2 px-4 text-left">Title Book</th>
              <th className="py-2 px-4 text-left">Borrowed date</th>
              <th className="py-2 px-4 text-left">Due date</th>
              <th className="py-2 px-4 text-left">Returned date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {selectedBorrowers.length > 0 ? (
              selectedBorrowers.map((item, index) => (
                <tr key={item.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{item.book}</td>
                  <td className="py-2 px-4">{formatDate(item.dateBorrowed)}</td>
                  <td className="py-2 px-4">{formatDate(item.returnDate)}</td>
                  <td className="py-2 px-4">{formatDate(item.dateReturned)}</td>
                  <td className="py-2 px-4 text-left">
                    <span
                      className={`font-bold
                        ${item.status === "PENDING" ? "text-orange-500" : ""}
                          ${item.status === "APPROVED" ? "text-blue-500" : ""}
                          ${item.status === "BORROWED" ? "text-green-500" : ""}
                          ${item.status === "RETURNED" ? "text-gray-500" : ""}
                          ${item.status === "OVERDUE" ? "text-red-500" : ""}`}
                    >
                      {item.status}
                    </span>
                  </td>

                  <td className="py-2 px-4 text-left text-blue-600 cursor-pointer">
                    More
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Thêm phân trang ở cuối bảng */}
      <div className="absolute text-base bottom-3 right-7">
        <button
          className="px-3 py-1"
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className="px-3 py-1"
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default TabBookLoan;
