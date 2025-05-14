import { useState, useRef, useEffect } from "react";
// import { useReactToPrint } from "react-to-print";
// import html2pdf from "html2pdf.js";
import Invoice from "../invoice/Invoice";
import borrowService from "../../services/borrowService";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import authService from "../../services/authService";

const TabBorrowManagement = () => {
  const componentRef = useRef();
  const [allBorrowers, setAllBorrowers] = useState([]);

  // const [statusUpdates, setStatusUpdates] = useState({});
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const [borrowers, setBorrowers] = useState(allBorrowers);
  const [borrowerNames, setBorrowerNames] = useState({});
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

  // Format lại ngày dd/mm/yyyy
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

  // Lấy danh sách phiếu mượn
  const fetchBorrowers = async () => {
    try {
      const response = await borrowService.getAllBorrowRequests();
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

  // Hàm hiển thị danh sách sách được mượn
  const getListBookInBorrowRequest = (borrower) => {
    const borrowedBooks = borrower.readerRequestDetails.map(
      (detail) => detail.bookCopy.book.title
    );
    return borrowedBooks.join(", ");
  };

  // Hàm hiển thị tên của người mượn
  useEffect(() => {
    const fetchBorrowerNames = async () => {
      const namesMap = {};

      for (const borrower of borrowers) {
        try {
          // Kiểm tra xem đã có tên trong state chưa để tránh gọi API lại
          if (!borrowerNames[borrower.readerId]) {
            const user = await authService.getUserInfoById(borrower.readerId);
            namesMap[borrower.readerId] = user.fullName;
          }
        } catch (error) {
          console.error(`Error fetching user info:`, error);
          namesMap[borrower.readerId] = "Unknown";
        }
      }

      // Cập nhật state với tên mới và giữ lại tên cũ
      setBorrowerNames((prev) => ({ ...prev, ...namesMap }));
    };

    if (borrowers.length > 0) {
      fetchBorrowerNames();
    }
  }, [borrowers]);

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (keyword === "") {
      setBorrowers(allBorrowers);
    } else {
      setBorrowers(
        allBorrowers.filter(
          (user) =>
            user.name.toLowerCase().includes(keyword) ||
            user.book.toLowerCase().includes(keyword)
        )
      );
    }
  };

  // const handlePrint = () => {
  //   const element = componentRef.current;

  //   const opt = {
  //     margin: 0.5,
  //     filename: `invoice_${selectedBorrower.name || "borrower"}.pdf`,
  //     image: { type: "jpeg", quality: 0.98 },
  //     html2canvas: { scale: 2 },
  //     jsPDF: { unit: "in", format: "letter", orientation: "portrait" },
  //   };

  //   html2pdf().set(opt).from(element).save();
  // };

  // Khi chọn trạng thái, cập nhật danh sách borrowers
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    if (selectedStatus === "") {
      setBorrowers(allBorrowers);
    } else {
      setBorrowers(
        allBorrowers.filter((user) => user.status === selectedStatus)
      );
    }
  };

  // Hàm cập nhật phiếu mượn
  const handleApproveBorrower = async (borrower) => {
    const borrowRequest = {
      borrowRequestId: borrower.id,
    };
    const response = await borrowService.approveBorrowRequest(borrowRequest);
    if (response) {
      alert("Cập nhật phiếu mượn thành công");
      fetchBorrowers();
    } else {
      alert("Cập nhật phiếu mượn thất bại");
    }
    setSelectedBorrower(null);
  };

  // Hàm trả sách
  const handleReturnBook = async (borrower) => {
    const borrowRequest = {
      borrowRequestId: borrower.id,
    };
    const response = await borrowService.returnBook(borrowRequest);
    if (response) {
      alert("Trả sách thành công");
      fetchBorrowers();
    } else {
      alert("Trả sách thất bại");
    }
    setSelectedBorrower(null);
  };

  // Hàm hủy phiếu mượn
  const handleCancelBorrowRequest = async (borrower) => {
    const borrowRequest = {
      borrowRequestId: borrower.id,
    };
    const response = await borrowService.cancelBorrowRequest(borrowRequest);
    if (response) {
      alert("Hủy phiếu mượn thành công");
      fetchBorrowers();
    } else {
      alert("Hủy phiếu mượn thất bại");
    }
    setSelectedBorrower(null);
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-3xl items-center text-sky-900 font-bold">
          Manage book borrowing/returning
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
            {/* <option value="Borrowing">Approved</option> */}
            <option value="BORROWED">Borrowed</option>
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
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-1 font-bold hover:opacity-80 rounded-tr-lg rounded-br-lg"
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
              <th className="py-2 px-4 text-left">STT</th>
              <th className="py-2 px-4 text-left">Borrower name</th>
              <th className="py-2 px-4 text-left">Borrowed books</th>
              <th className="py-2 px-4 text-left">Borrowed date</th>
              <th className="py-2 px-4 text-left">Due date</th>
              <th className="py-2 px-4 text-left">Refund date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {selectedBorrowers.length > 0 ? (
              selectedBorrowers.map((item, index) => (
                <tr
                  key={item.id}
                  className="hover:bg-gray-50 border-b border-gray-400"
                >
                  <td className="py-2 px-4">{startIndex + index + 1}</td>
                  <td className="py-2 px-4">
                    {borrowerNames[item.readerId] || "Loading..."}
                  </td>
                  <td className="py-2 px-4 max-w-[250px]">
                    <div>
                      {item.readerRequestDetails.map((detail) => (
                        <div key={detail.id} className="font-medium">
                          {detail.bookCopy.book.title}
                        </div>
                      ))}
                      {item.readerRequestDetails.length > 1 && (
                        <div className="text-xs text-gray-500">
                          {item.readerRequestDetails.length} books in this
                          request
                        </div>
                      )}
                    </div>
                  </td>
                  <td className="py-2 px-4">
                    {formatDate(item.dateBorrowed || item.createdAt)}
                  </td>
                  <td className="py-2 px-4">{formatDate(item.returnDate)}</td>
                  <td className="py-2 px-4">{formatDate(item.dateReturned)}</td>
                  <td className="py-2 px-4 text-left">
                    <span
                      className={`font-bold
                        ${item.status === "PENDING" ? "text-orange-500" : ""} 
                        ${item.status === "BORROWED" ? "text-blue-500" : ""}
                        ${item.status === "RETURNED" ? "text-green-500" : ""}
                        ${item.status === "OVERDUE" ? "text-red-500" : ""}`}
                    >
                      {item.status}
                      {/* {item.status === "APPROVED" ? "text-orange-500" : ""} */}
                    </span>
                  </td>

                  <td
                    className="py-2 px-4 text-left text-blue-600 cursor-pointer"
                    onClick={() => setSelectedBorrower(item)}
                  >
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

      {/* Modal hiển thị chi tiết */}
      {selectedBorrower && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-lg">
          <div className="w-2/3 mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 className="text-3xl items-center text-sky-900 font-bold mb-6">
              Edit Borrower Details
            </h2>

            <div className="flex w-full gap-5">
              {/* Input Name */}
              <div className="mb-4 w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  Borrower name
                </label>
                <input
                  type="text"
                  value={borrowerNames[selectedBorrower.readerId] || ""}
                  onChange={(e) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="border p-2 rounded mt-1 w-full"
                  disabled
                />
              </div>

              {/* Input Book */}
              <div className="mb-4 w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  Borrowed books
                </label>
                <textarea
                  value={getListBookInBorrowRequest(selectedBorrower)
                    .split(", ")
                    .join("\n")}
                  onChange={(e) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      book: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded mt-1"
                  rows={selectedBorrower.readerRequestDetails.length}
                  disabled
                />
              </div>
            </div>

            <div className="flex w-full gap-5">
              {/* Borrow Date */}
              <div className="mb-4 w-1/3">
                <label className="block text-sm font-medium text-gray-600">
                  Borrowed date
                </label>
                <DatePicker
                  selected={
                    selectedBorrower.dateBorrowed || selectedBorrower.createdAt
                  }
                  minDate={new Date()}
                  onChange={(date) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      dateBorrowed: date,
                    }))
                  }
                  dateFormat={"dd/MM/yyyy"}
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Due Date */}
              <div className="mb-4 w-1/3">
                <label className="block text-sm font-medium text-gray-600">
                  Refund date
                </label>
                <DatePicker
                  selected={selectedBorrower.returnDate}
                  minDate={new Date()}
                  onChange={(date) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      returnDate: date,
                    }))
                  }
                  dateFormat={"dd/MM/yyyy"}
                  className="w-full border p-2 rounded"
                />
              </div>
              {/* Select Status */}
              <div className="mb-4 w-1/3">
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <div
                  className={`w-full border p-2 rounded font-bold
                  ${
                    selectedBorrower.status === "PENDING"
                      ? "text-orange-500 bg-orange-50 border-orange-200"
                      : ""
                  } 
                  ${
                    selectedBorrower.status === "BORROWED"
                      ? "text-blue-500 bg-blue-50 border-blue-200"
                      : ""
                  }
                  ${
                    selectedBorrower.status === "RETURNED"
                      ? "text-green-500 bg-green-50 border-green-200"
                      : ""
                  }
                  ${
                    selectedBorrower.status === "OVERDUE"
                      ? "text-red-500 bg-red-50 border-red-200"
                      : ""
                  }`}
                >
                  {selectedBorrower.status}
                </div>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                onClick={() => setSelectedBorrower(null)}
              >
                Close
              </button>
              <button
                // className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                className={`${
                  selectedBorrower.status === "BORROWED"
                    ? "bg-[#af40ff] hover:bg-[#5b42f3]"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white px-4 py-2 font-bold rounded-md hover:opacity-80`}
                onClick={() => handleReturnBook(selectedBorrower)}
                disabled={selectedBorrower.status === "BORROWED" ? false : true}
              >
                Return
              </button>
              <button
                className={`${
                  selectedBorrower.status === "PENDING"
                    ? "bg-[#af40ff] hover:bg-[#5b42f3]"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white px-4 py-2 font-bold rounded-md hover:opacity-80`}
                disabled={selectedBorrower.status !== "PENDING" ? true : false}
                onClick={() => {
                  handleApproveBorrower(selectedBorrower);
                }}
              >
                Borrowed
              </button>
              <button
                className={`${
                  selectedBorrower.status === "PENDING"
                    ? "bg-[#ff4040] hover:bg-[#f35a42]"
                    : "bg-gray-400 cursor-not-allowed"
                } text-white px-4 py-2 font-bold rounded-md hover:opacity-80`}
                disabled={selectedBorrower.status !== "PENDING" ? true : false}
                onClick={() => {
                  handleCancelBorrowRequest(selectedBorrower);
                }}
              >
                Cancel
              </button>
              {/* <button
                onClick={handlePrint}
                className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              >
                Print
              </button> */}
            </div>
          </div>
        </div>
      )}
      {/* Phiếu mượn để in */}
      {selectedBorrower && (
        <div style={{ position: "absolute", left: "-9999px", top: 0 }}>
          <div ref={componentRef}>
            <Invoice borrower={selectedBorrower} />
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBorrowManagement;
