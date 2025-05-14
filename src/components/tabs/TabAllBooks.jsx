import { useState, useEffect, useRef } from "react";

import bookService from "../../services/bookService";
import borrowService from "../../services/borrowService";

const TabAllBooks = () => {
  const [filterBooks, setFilterBooks] = useState([]);
  const [allBooks, setAllBooks] = useState([]);
  const [searchKeyword, setSearchKeyword] = useState("");
  const [selectedBookIds, setSelectedBookIds] = useState([]);
  const [showSelectedModal, setShowSelectedModal] = useState(false);
  const [borrowDate, setBorrowDate] = useState("");
  const [returnDate, setReturnDate] = useState("");
  const [borrowDays, setBorrowDays] = useState(0);
  const modalRef = useRef();

  // Thêm state và logic phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;
  const totalPages = Math.ceil(filterBooks.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedBooks = filterBooks.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  // Tính số ngày mượn
  useEffect(() => {
    if (borrowDate && returnDate) {
      const start = new Date(borrowDate);
      const end = new Date(returnDate);
      const timeDiff = end - start;
      const daysDiff = Math.ceil(timeDiff / (1000 * 3600 * 24));

      if (daysDiff >= 0) {
        setBorrowDays(daysDiff);
      } else {
        setBorrowDays(0);
      }
    } else {
      setBorrowDays(0);
    }
  }, [borrowDate, returnDate]);

  // Đặt ngày mượn là ngày hiện tại
  useEffect(() => {
    if (showSelectedModal) {
      const today = new Date();
      const formattedDate = today.toISOString().split("T")[0];
      setBorrowDate(formattedDate);

      // Đặt ngày trả mặt định là 7 ngày sau ngày mượn
      const nextWeek = new Date();
      nextWeek.setDate(today.getDate() + 7);
      setReturnDate(nextWeek.toISOString().split("T")[0]);
    }
  }, [showSelectedModal]);

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

  //   Tắt modal khi click ra ngoài modal
  useEffect(() => {
    function handleClickOutside(event) {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        setShowSelectedModal(false);
      }
    }
    if (showSelectedModal) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showSelectedModal]);

  // Lấy danh sách phiếu mượn của người dùng
  const fetchBooks = async () => {
    try {
      const response = await bookService.getBooks();
      if (!response) {
        throw new Error("Lỗi khi lấy dữ liệu");
      }
      setAllBooks(response);
      setFilterBooks(response);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  // Lấy danh sách tác giả của cuốn sách
  const getAuthors = (book) => {
    return book.authors.map((author) => author.name).join(", ");
  };

  //   Hàm xử lý mở modal mượn sách - 1 cuốn
  const handleBorrowClick = (bookId) => {
    if (!selectedBookIds.includes(bookId)) {
      setSelectedBookIds((prev) => [...prev, bookId]);
    }
    setShowSelectedModal(true);
  };

  // Hàm xử lý chọn sách
  const handleSelectBook = (bookId) => {
    setSelectedBookIds((prev) =>
      prev.includes(bookId)
        ? prev.filter((id) => id !== bookId)
        : [...prev, bookId]
    );
  };

  //   Lấy danh sách sách đã chọn
  const getSelectedBooks = () => {
    return allBooks.filter((book) => selectedBookIds.includes(book.id));
  };

  //   Hàm xử lý mượn sách
  const handleBorrow = async () => {
    try {
      const borrowRequest = {
        borrowingPeriod: borrowDays,
        borrowRequestDetails: getSelectedBooks().map((book) => ({
          bookId: book.id,
        })),
      };

      const response = await borrowService.createBorrowRequest(borrowRequest);
      if (response) {
        alert("Mượn sách thành công");
      } else {
        alert("Mượn sách thất bại");
      }
    } catch (error) {
      console.log("Có lỗi xảy ra khi mượn sách: ", error);
    }
  };

  const handleSearch = () => {
    const keyword = searchKeyword.trim().toLowerCase();
    if (keyword === "") {
      setFilterBooks(allBooks);
    } else {
      setFilterBooks(
        allBooks.filter(
          (item) =>
            item.title.toLowerCase().includes(keyword) ||
            item.title.toLowerCase().includes(keyword)
        )
      );
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-3xl items-center text-sky-900 font-bold">
          All Books
        </h2>

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
              <th className="py-2 px-4 text-left"></th>
              <th className="py-2 px-4 text-left">No.</th>
              <th className="py-2 px-4 text-left">Title Book</th>
              <th className="py-2 px-4 text-left">Author</th>
              <th className="py-2 px-4 text-left">Category</th>
              <th className="py-2 px-4 text-left">Published Year</th>
              <th className="py-2 px-4 text-left">Publisher</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {selectedBooks.length > 0 ? (
              selectedBooks.map((book, index) => (
                <tr key={book.id} className="hover:bg-gray-50 c">
                  <td className="py-2 px-4">
                    <input
                      type="checkbox"
                      className="form-checkbox h-4 w-4 text-blue-600"
                      checked={selectedBookIds.includes(book.id)}
                      onChange={() => handleSelectBook(book.id)}
                    />
                  </td>
                  <td className="py-2 px-4">{startIndex + index + 1}</td>
                  <td className="py-2 px-4">{book.title}</td>
                  <td className="py-2 px-4 max-w-[250px]">
                    {getAuthors(book)}
                  </td>
                  <td className="py-2 px-4">{book.category.name}</td>
                  <td className="py-2 px-4">{book.yearPublished}</td>
                  <td className="py-2 px-4">{book.publisher}</td>

                  <td
                    className="py-2 px-4 text-left text-blue-600 cursor-pointer"
                    onClick={() => handleBorrowClick(book.id)}
                  >
                    Borrow
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="py-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Thêm phân trang ở cuối bảng */}
      <div className="flex justify-between items-center mt-4 px-4">
        <div className="flex items-start">
          <button
            onClick={() => setShowSelectedModal(true)}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5 mr-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zm0 4a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            Selected Books ({selectedBookIds.length})
          </button>
        </div>

        <div className="text-base">
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

      {/* Modal hiển thị sách đã chọn */}
      {showSelectedModal && (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div
            ref={modalRef}
            className="bg-white p-6 rounded-lg shadow-lg w-3/4 max-h-[80vh] overflow-auto"
          >
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold">Borrow Information</h2>
              <button
                onClick={() => setShowSelectedModal(false)}
                className="text-gray-500 hover:text-gray-700"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-6 w-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M6 18L18 6M6 6l12 12"
                  />
                </svg>
              </button>
            </div>

            {selectedBookIds.length > 0 ? (
              <div>
                <div className="bg-gray-50 p-4 mb-4 rounded-lg">
                  <div className="grid grid-cols-3 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Borrow Date
                      </label>
                      <input
                        type="date"
                        value={borrowDate}
                        onChange={(e) => setBorrowDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        min={new Date().toISOString().split("T")[0]}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Return Date
                      </label>
                      <input
                        type="date"
                        value={returnDate}
                        onChange={(e) => setReturnDate(e.target.value)}
                        className="w-full p-2 border border-gray-300 rounded-md"
                        min={borrowDate}
                      />
                    </div>
                    <div className="flex items-center">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Total Days
                        </label>
                        <div className="p-2 bg-blue-50 border border-blue-200 rounded-md text-blue-800 font-medium">
                          {borrowDays} day{borrowDays !== 1 ? "s" : ""}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <table className="w-full border-collapse">
                  <thead className="bg-gray-100">
                    <tr>
                      <th className="py-2 px-4 text-left">No.</th>
                      <th className="py-2 px-4 text-left">Title Book</th>
                      <th className="py-2 px-4 text-left">Author</th>
                      <th className="py-2 px-4 text-left">Published Year</th>
                      <th className="py-2 px-4 text-left">Publisher</th>
                      <th className="py-2 px-4 text-left"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {getSelectedBooks().map((book, index) => (
                      <tr key={book.id} className="hover:bg-gray-50">
                        <td className="py-2 px-4">{index + 1}</td>
                        <td className="py-2 px-4">{book.title}</td>
                        <td className="py-2 px-4 max-w-[250px]">
                          {getAuthors(book)}
                        </td>
                        <td className="py-2 px-4">{book.yearPublished}</td>
                        <td className="py-2 px-4">{book.publisher}</td>
                        <td className="py-2 px-4">
                          <button
                            onClick={() => handleSelectBook(book.id)}
                            className="text-red-500 hover:text-red-700"
                          >
                            Remove
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                <div className="flex justify-between items-center mt-4 gap-2">
                  <div className="text-gray-700 font-medium">
                    Selected Books ({selectedBookIds.length})
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => setSelectedBookIds([])}
                      className="px-4 py-2 border border-gray-300 rounded hover:bg-gray-100"
                    >
                      Clear All
                    </button>
                    <button
                      onClick={() => {
                        if (!borrowDate || !returnDate) {
                          alert("Please select both borrow and return dates");
                          return;
                        }

                        if (borrowDays <= 0) {
                          alert("Return date must be after borrow date");
                          return;
                        }

                        handleBorrow();
                        setShowSelectedModal(false);
                      }}
                      className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Borrow Selected
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <p className="text-center text-gray-500 py-4">
                No books selected.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabAllBooks;
