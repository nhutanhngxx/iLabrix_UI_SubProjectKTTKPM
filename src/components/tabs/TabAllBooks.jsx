import { useState, useEffect, useRef, useCallback } from "react";

import bookService from "../../services/bookService";
import borrowService from "../../services/borrowService";
import categoryService from "../../services/categoryService";
import Loading from "../common/Loading";

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
  const [isLoading, setIsLoading] = useState(false);

  // Category filtering
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [categorySearchTerm, setCategorySearchTerm] = useState("");
  const [filteredCategories, setFilteredCategories] = useState([]);

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

  // Lấy danh sách thể loại
  const fetchCategories = async () => {
    try {
      const response = await categoryService.getCategories();
      if (!response) {
        throw new Error("Lỗi khi lấy danh sách thể loại");
      }
      setCategories(response);
      setFilteredCategories(response);
    } catch (error) {
      console.error("Lỗi API Categories:", error);
    }
  };

  // Hàm xử lý tìm kiếm thể loại
  const handleCategorySearch = useCallback(
    (searchTerm) => {
      setCategorySearchTerm(searchTerm);
      if (!searchTerm.trim()) {
        setFilteredCategories(categories);
      } else {
        const term = searchTerm.toLowerCase().trim();
        const filtered = categories.filter((category) =>
          category.name.toLowerCase().includes(term)
        );
        setFilteredCategories(filtered);
      }
    },
    [categories]
  );

  useEffect(() => {
    fetchBooks();
    fetchCategories();
  }, []);

  // Cập nhật danh sách thể loại đã lọc khi danh sách thể loại thay đổi
  useEffect(() => {
    setFilteredCategories(categories);
  }, [categories]);

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
    setIsLoading(true);
    try {
      const borrowRequest = {
        borrowingPeriod: borrowDays,
        borrowRequestDetails: getSelectedBooks().map((book) => ({
          bookId: book.id,
        })),
      };

      const response = await borrowService.createBorrowRequest(borrowRequest);
      if (response) {
        alert("Tạo phiếu mượn sách thành công");
        setShowSelectedModal(false);
      } else {
        alert("Mượn sách thất bại");
      }
    } catch (error) {
      console.log("Có lỗi xảy ra khi mượn sách: ", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Hàm xử lý chọn thể loại
  const handleCategoryToggle = (categoryId) => {
    setSelectedCategories((prev) => {
      if (prev.includes(categoryId)) {
        return prev.filter((id) => id !== categoryId);
      } else {
        return [...prev, categoryId];
      }
    });
  };

  // Hàm xử lý khi click bên ngoài dropdown
  const handleClickOutsideDropdown = useCallback(
    (event) => {
      if (
        showCategoryDropdown &&
        !event.target.closest(".category-dropdown-container")
      ) {
        setShowCategoryDropdown(false);
      }
    },
    [showCategoryDropdown]
  );

  // Thêm event listener để đóng dropdown khi click bên ngoài
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutsideDropdown);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideDropdown);
    };
  }, [handleClickOutsideDropdown]);

  // Hàm xử lý tìm kiếm
  const handleSearch = useCallback(() => {
    const keyword = searchKeyword.trim().toLowerCase();
    let filtered = [...allBooks];

    // Lọc theo từ khóa
    if (keyword !== "") {
      filtered = filtered.filter(
        (item) =>
          item.title?.toLowerCase().includes(keyword) ||
          item.authors?.some((author) =>
            author.name.toLowerCase().includes(keyword)
          ) ||
          item.category?.name.toLowerCase().includes(keyword) ||
          item.yearPublished?.toString().includes(keyword) ||
          item.publisher?.toLowerCase().includes(keyword)
      );
    }

    // Lọc theo thể loại
    if (selectedCategories.length > 0) {
      filtered = filtered.filter((book) =>
        selectedCategories.includes(book.category.id)
      );
    }

    setFilterBooks(filtered);
    setCurrentPage(1); // Reset về trang đầu tiên khi tìm kiếm
  }, [allBooks, searchKeyword, selectedCategories]);

  // Cập nhật kết quả tìm kiếm khi thay đổi danh sách thể loại đã chọn
  useEffect(() => {
    handleSearch();
  }, [selectedCategories, handleSearch]);

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-3xl items-center text-sky-900 font-bold">
          All Books
        </h2>

        {/* Category search */}
        <div className="relative category-dropdown-container">
          <label className="block text-xs mt-1 font-medium text-gray-600">
            Filter by categories
          </label>
          <div className="flex flex-col">
            <div className="flex items-center">
              <button
                onClick={() => setShowCategoryDropdown(!showCategoryDropdown)}
                className="flex items-center justify-between w-[200px] px-3 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none"
              >
                <span>
                  {selectedCategories.length === 0
                    ? "Select categories"
                    : `${selectedCategories.length} selected`}
                </span>
                <svg
                  className="w-5 h-5 ml-2 -mr-1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  aria-hidden="true"
                >
                  <path
                    fillRule="evenodd"
                    d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
              {selectedCategories.length > 0 && (
                <button
                  onClick={() => {
                    setSelectedCategories([]);
                  }}
                  className="ml-2 text-sm text-gray-500 hover:text-gray-700"
                >
                  Clear all
                </button>
              )}
            </div>

            {/* Selected categories tags */}
            {selectedCategories.length > 0 && (
              <div className="flex flex-wrap gap-2 mt-2 max-w-[400px]">
                {selectedCategories.map((categoryId) => {
                  const category = categories.find((c) => c.id === categoryId);
                  return category ? (
                    <div
                      key={category.id}
                      className="flex items-center bg-blue-100 text-blue-800 text-xs font-medium px-2 py-1 rounded-full"
                    >
                      <span>{category.name}</span>
                      <button
                        onClick={() => handleCategoryToggle(category.id)}
                        className="ml-1 text-blue-600 hover:text-blue-800"
                      >
                        <svg
                          className="w-3 h-3"
                          fill="currentColor"
                          viewBox="0 0 20 20"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            fillRule="evenodd"
                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                            clipRule="evenodd"
                          ></path>
                        </svg>
                      </button>
                    </div>
                  ) : null;
                })}
              </div>
            )}
          </div>

          {/* Dropdown menu */}
          {showCategoryDropdown && (
            <div className="absolute z-10 w-[250px] top-[70px] bg-white border border-gray-300 rounded-md shadow-lg max-h-60 overflow-auto">
              {/* Search input */}
              <div className="sticky top-0 bg-white p-2 border-b border-gray-200">
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                    <svg
                      className="w-4 h-4 text-gray-500"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                      ></path>
                    </svg>
                  </div>
                  <input
                    type="text"
                    className="w-full pl-10 pr-3 py-2 text-sm border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-blue-500"
                    placeholder="Search categories..."
                    value={categorySearchTerm}
                    onChange={(e) => handleCategorySearch(e.target.value)}
                  />
                  {categorySearchTerm && (
                    <button
                      className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-500 hover:text-gray-700"
                      onClick={() => handleCategorySearch("")}
                    >
                      <svg
                        className="w-4 h-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M6 18L18 6M6 6l12 12"
                        ></path>
                      </svg>
                    </button>
                  )}
                </div>
              </div>

              {/* Category list */}
              <div className="py-1">
                {filteredCategories.length > 0 ? (
                  filteredCategories.map((category) => (
                    <div
                      key={category.id}
                      className="flex items-center px-3 py-2 text-sm hover:bg-gray-100 cursor-pointer"
                      onClick={() => handleCategoryToggle(category.id)}
                    >
                      <input
                        type="checkbox"
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded"
                        checked={selectedCategories.includes(category.id)}
                        onChange={() => {}}
                      />
                      <span className="ml-2">{category.name}</span>
                    </div>
                  ))
                ) : (
                  <div className="px-3 py-2 text-sm text-gray-500 text-center">
                    No categories found
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Search key word*/}
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
                  placeholder="Search ..."
                  id=""
                  value={searchKeyword}
                  onChange={(e) => setSearchKeyword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleSearch();
                    }
                  }}
                ></input>
                {searchKeyword && (
                  <button
                    onClick={() => setSearchKeyword("")}
                    className="ml-2 mr-2 text-gray-500 hover:text-gray-700 "
                  >
                    X
                  </button>
                )}
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
            {isLoading ? (
              <div className="flex items-center justify-center h-full">
                <Loading />
              </div>
            ) : (
              <div>
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
                          <th className="py-2 px-4 text-left">
                            Published Year
                          </th>
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
                              alert(
                                "Please select both borrow and return dates"
                              );
                              return;
                            }

                            if (borrowDays <= 0) {
                              alert("Return date must be after borrow date");
                              return;
                            }

                            handleBorrow();
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
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default TabAllBooks;
