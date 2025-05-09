import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import iLabrixLogo from "../assets/iLibrary.png";
import backgroundImg from "../assets/Background.png";
import ModalBorrowBook from "../components/invoice/ModalBorrowBook";
import borrowService from "../services/borrowService";
import bookService from "../services/bookService";

const UserPage = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  // const [advancedFilter, setAdvancedFilter] = useState(false);
  const [displayBooks, setDisplayBooks] = useState([]);
  const [books, setBooks] = useState();
  const [searchText, setSearchText] = useState("");
  const [filter, setFilter] = useState({
    author: "",
    title: "",
    releaseYearFrom: 0,
    releaseYearTo: new Date().getFullYear(),
    language: "",
    availability: "",
  });
  const [sortOrder, setSortOrder] = useState("asc");
  const [sortBy, setSortBy] = useState("title");
  const [showModal, setShowModal] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);

  // Lấy danh sách sách
  const fetchBooks = async () => {
    try {
      const books = await bookService.getBooks();
      setBooks(books);
      setDisplayBooks(books);
    } catch (error) {
      console.log("Có lỗi xảy ra khi lấy danh sách sách: ", error);
    }
  };

  useEffect(() => {
    fetchBooks();
  }, []);

  // Mở modal mượn sách
  const handleOpenModalBorrowBook = (book) => {
    if (book.availableCopies <= 0) {
      alert("Sách này hiện đã hết, không thể mượn");
      return;
    }

    setSelectedBook(book);
    setShowModal(true);
  };

  const handleBorrow = async (borrowData) => {
    try {
      const borrowRequest = {
        borrowingPeriod: borrowData.days,
        borrowRequestDetails: [
          {
            bookId: selectedBook.id,
          },
        ],
      };

      const response = await borrowService.createBorrowRequest(borrowRequest);
      if (response) {
        alert("Mượn sách thành công");
        setDisplayBooks((prevBooks) =>
          prevBooks.map((book) =>
            book.bookId === selectedBook.bookId
              ? { ...book, availableCopies: book.availableCopies - 1 }
              : book
          )
        );
      } else {
        alert("Mượn sách thất bại");
      }
    } catch (error) {
      console.log("Có lỗi xảy ra khi mượn sách: ", error);
    }

    setSelectedBook(null);
    setShowModal(false);
  };

  // Hàm giúp xử lý sự kiện thay đổi input trong filter
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setFilter({ ...filter, [name]: value });
  };

  // Đặt lại các giá trị của filter về mặc định
  const handleResetFilter = () => {
    setFilter({
      title: "",
      author: "",
      releaseYearFrom: "",
      releaseYearTo: "",
      language: "",
      availability: "",
    });
    setSearchText("");

    [
      "title",
      "author",
      "release-year-from",
      "release-year-to",
      "language",
      "availability",
      "search",
    ].forEach((id) => {
      const element = document.getElementById(id);
      if (element) element.value = "";
    });
    setDisplayBooks(books);
  };

  // Hàm sắp xếp sách theo tiêu chí
  const handleSort = (sortBy, sortOrder) => {
    const sortedBooks = [...displayBooks].sort((a, b) => {
      let compareA, compareB;

      switch (sortBy) {
        case "title":
          compareA = a.title.toLowerCase();
          compareB = b.title.toLowerCase();
          break;
        case "author":
          compareA = a.author.toLowerCase();
          compareB = b.author.toLowerCase();
          break;
        case "availability":
          compareA = parseFloat(a.availableCopies);
          compareB = parseFloat(b.availableCopies);
          break;
        case "release-year":
          compareA = new Date(a.publishedDate).getFullYear();
          compareB = new Date(b.publishedDate).getFullYear();
          break;
        default:
          return 0;
      }

      if (sortOrder === "asc") {
        return compareA > compareB ? 1 : -1;
      } else {
        return compareA < compareB ? 1 : -1;
      }
    });

    setDisplayBooks(sortedBooks);
  };

  // Hàm tìm kiếm sách theo nhiều tiêu chí
  const handleSearch = () => {
    const searchResults = books.filter((book) => {
      // Tìm kiếm theo từ khóa chung (title hoặc author)
      if (searchText) {
        const searchLower = searchText.trim().toLowerCase();
        const matchesKeyword =
          book.title.toLowerCase().includes(searchLower) ||
          book.author.toLowerCase().includes(searchLower);

        if (!matchesKeyword) return false;
      }

      // Lọc theo category
      const category = document.getElementById("category").value;
      if (category && category !== "all" && book.category !== category) {
        return false;
      }

      // Lọc theo title cụ thể
      if (
        filter.title &&
        !book.title.toLowerCase().includes(filter.title.trim().toLowerCase())
      ) {
        return false;
      }

      // Lọc theo author cụ thể
      if (
        filter.author &&
        !book.author.toLowerCase().includes(filter.author.trim().toLowerCase())
      ) {
        return false;
      }

      // Lọc theo năm xuất bản
      const bookYear = new Date(book.publishedDate).getFullYear();
      if (filter.releaseYearFrom) {
        const yearFrom = parseInt(filter.releaseYearFrom);
        if (!isNaN(yearFrom) && bookYear < yearFrom) return false;
      }
      if (filter.releaseYearTo) {
        const yearTo = parseInt(filter.releaseYearTo);
        if (!isNaN(yearTo) && bookYear > yearTo) return false;
      }

      // Lọc theo ngôn ngữ
      if (filter.language && book.language !== filter.language) {
        return false;
      }

      // Lọc theo số lượng có sẵn
      if (filter.availability) {
        const availableCount = parseInt(filter.availability);
        if (!isNaN(availableCount) && book.availableCopies !== availableCount) {
          return false;
        }
      }

      return true;
    });

    setDisplayBooks(searchResults);
  };

  // Lọc sách theo các điều kiện trong filter
  const handleFilter = () => {
    const newListBooks = books.filter((book) => {
      if (
        filter.title &&
        !book.title.toLowerCase().includes(filter.title.trim().toLowerCase())
      ) {
        return false;
      }

      if (
        filter.author &&
        !book.author.toLowerCase().includes(filter.author.trim().toLowerCase())
      ) {
        return false;
      }

      // Convert book's published date to a year integer
      const bookYear = new Date(book.publishedDate).getFullYear();
      if (filter.releaseYearFrom) {
        const releaseYearFrom = parseInt(filter.releaseYearFrom, 10);
        if (isNaN(releaseYearFrom) || bookYear < releaseYearFrom) {
          return false;
        }
      }

      if (filter.releaseYearTo) {
        const releaseYearTo = parseInt(filter.releaseYearTo, 10);
        if (isNaN(releaseYearTo) || bookYear > releaseYearTo) {
          return false;
        }
      }

      if (filter.language && book.language !== filter.language) {
        return false;
      }

      if (filter.availability && book.availableCopies !== filter.availability) {
        return false;
      }

      return true;
    });
    setDisplayBooks(newListBooks);
  };

  // Cuộn màn hình lên
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Sắp xếp sách ban đầu khi trang được tải
  useEffect(() => {
    // Chỉ sắp xếp khi component được mount lần đầu tiên
    const initialSort = () => {
      handleSort(sortBy, sortOrder);
    };
    initialSort();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="flex items-center flex-col w-full min-h-screen bg-no-repeat bg-fixed bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Header */}
      <div className="h-20 w-screen backdrop-blur-md flex items-center fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between w-full px-5">
          <div className="flex items-center text-white space-x-10">
            <img src={iLabrixLogo} alt="iLabrix Logo" style={{ height: 50 }} />
            <a href="">Introduce</a>
            <a href="">All books</a>
            <a href="">News - Events</a>
            <a href="">Feature</a>
            <a href="">Support</a>
          </div>
          <div className="flex items-center space-x-4 mr-5 ml-auto flex-shrink-0 text-white">
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="flex justify-around mt-20 w-full px-5 gap-5">
        {/* Left Side - Filter*/}
        <div className="p-5 backdrop-blur-3xl rounded-lg shadow-md h-fit w-1/5">
          <h1 className="text-2xl font-semibold text-blue-600">FILTER BY</h1>
          <hr className="my-2 mb-2" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="font-bold">
                Category:
              </label>
              <select
                id="category"
                className="p-2.5 text-sm bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full appearance-none bg-no-repeat bg-right pr-8 cursor-pointer hover:border-blue-400 transition-colors"
                style={{
                  backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')`,
                  backgroundPosition: "right 0.5rem center",
                  backgroundSize: "1rem",
                }}
              >
                <option value="all">All</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="title" className="font-bold">
                Title:
              </label>
              <input
                type="text"
                id="title"
                name="title"
                className="p-2 border rounded-md"
                onChange={handleChangeInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="author" className="font-bold">
                Author:
              </label>
              <input
                type="text"
                id="author"
                name="author"
                className="p-2 border rounded-md"
                onChange={handleChangeInput}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="release-year" className="font-bold">
                Release Year:
              </label>
              <div className="flex gap-2 text-sm items-center justify-between">
                <label className="">From:</label>
                <input
                  type="number"
                  id="release-year-from"
                  name="releaseYearFrom"
                  className="p-2 border rounded-md w-4/5"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex gap-2 text-sm items-center justify-between">
                <label className="">To:</label>
                <input
                  type="number"
                  id="release-year-to"
                  name="releaseYearTo"
                  className="p-2 border rounded-md w-4/5"
                  onChange={handleChangeInput}
                />
              </div>
            </div>

            {/* <div className="flex flex-col gap-1">
              <label htmlFor="advanced-filter" className="font-bold">
                Advanced Filter:
              </label>
              {advancedFilter && (
                <div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="language" className="font-bold">
                      Language:
                    </label>
                    <input
                      type="text"
                      id="language"
                      name="language"
                      className="p-2 border rounded-md"
                      onChange={handleChangeInput}
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="availability" className="font-bold">
                      Availability (copies):
                    </label>
                    <input
                      type="text"
                      id="availability"
                      name="availability"
                      className="p-2 border rounded-md"
                      onChange={handleChangeInput}
                    />
                  </div>
                </div>
              )}
              <button
                onClick={() => setAdvancedFilter(!advancedFilter)}
                className="text-blue-600 font-semibold"
              >
                {advancedFilter ? "Hide" : "Show"}
              </button>
            </div> */}

            <div className="w-full justify-between flex gap-2">
              <button
                className="bg-[#CC9933] text-white rounded-[35px] font-medium py-2 w-1/2"
                onClick={handleFilter}
              >
                Filter
              </button>
              <button
                className="bg-gray-500 text-white rounded-[35px] font-medium py-2 w-1/2"
                onClick={handleResetFilter}
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {/* Right Side - All books*/}
        <div className="backdrop-blur-3xl rounded-lg h-fit shadow-md p-5 w-4/5">
          <h1 className="text-2xl font-semibold text-white">ALL BOOKS</h1>
          <hr className="my-3" />
          {/* Sort and Search */}
          <div className="flex items-center gap-3 mb-4">
            <label className="text-white text-lg font-medium ">Sort by:</label>
            <select
              value={sortBy}
              onChange={(e) => {
                const newSortBy = e.target.value;
                setSortBy(newSortBy);
                handleSort(newSortBy, sortOrder);
              }}
              className="p-2.5 text-sm bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-40 appearance-none bg-no-repeat bg-right pr-8 cursor-pointer hover:border-blue-400 transition-colors"
              style={{
                backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')`,
                backgroundPosition: "right 0.5rem center",
                backgroundSize: "1rem",
              }}
            >
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="availability">Availability Copies</option>
              <option value="release-year">Release Year</option>
            </select>
            <select
              value={sortOrder}
              onChange={(e) => {
                const newSortOrder = e.target.value;
                setSortOrder(newSortOrder);
                handleSort(sortBy, newSortOrder);
              }}
              className="p-2.5 text-sm bg-white border border-gray-300 text-gray-900 rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-24 appearance-none bg-no-repeat bg-right pr-8 cursor-pointer hover:border-blue-400 transition-colors"
              style={{
                backgroundImage: `url('data:image/svg+xml;charset=US-ASCII,<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="%23666" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M6 9l6 6 6-6"/></svg>')`,
                backgroundPosition: "right 0.5rem center",
                backgroundSize: "1rem",
              }}
            >
              <option value="asc">A-Z</option>
              <option value="desc">Z-A</option>
            </select>
            <div className="flex items-center justify-center ">
              <div className="flex">
                <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white p-5">
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
                  className="w-full max-w-[160px] bg-white pl-2 text-base outline-0"
                  placeholder="Search text..."
                  id="search"
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <input
                  type="button"
                  value="Search"
                  onClick={handleSearch}
                  className="bg-blue-500 px-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* All Books */}
          {displayBooks.length === 0 ? (
            <div className="flex flex-col items-center justify-center p-10 mt-5 bg-white rounded-lg shadow-md">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-16 w-16 text-gray-400 mb-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No books found
              </h3>
              <p className="text-gray-500 text-center">
                We do not have any books that match your search criteria. Please
                try adjusting your filters or search terms.
              </p>
              <button
                onClick={handleResetFilter}
                className="mt-4 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Reset Filters
              </button>
            </div>
          ) : (
            <div className="grid grid-cols-3 gap-5 mt-5">
              {displayBooks.map((book) => (
                <div
                  key={book.id}
                  className="flex items-center p-4 border rounded-lg shadow-md bg-white relative"
                >
                  {/* Ảnh sách */}
                  <img
                    // src={book.image}
                    alt={book.title}
                    className="w-[100px] h-[125px] object-cover rounded-md mr-4 border"
                  />

                  {/* Thông tin sách */}
                  <div className="flex-1 text-sm">
                    <h2 className="text-lg font-semibold text-blue-600">
                      {book.title}
                    </h2>
                    {/* <p className="text-gray-600">Author: {book.author}</p> */}
                    {/* <p className="text-gray-600">Language: {book.language}</p> */}
                    <p className="text-gray-600">
                      Published Year: {book.yearPublished}
                    </p>
                    <p className="text-gray-600">
                      Available Copies: {book.availableCopies}
                    </p>
                  </div>

                  {/* Buttons */}
                  <div className="flex gap-2 absolute -bottom-3 right-3">
                    <button
                      className="bg-[#CC9933] text-white px-3 py-1 rounded-[35px] font-medium text-sm"
                      onClick={() => handleOpenModalBorrowBook(book)}
                    >
                      Borrow
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {showModal && (
        <ModalBorrowBook
          book={selectedBook}
          isOpen={showModal}
          onClose={() => {
            setShowModal(false);
            setSelectedBook(null);
          }}
          onBorrow={handleBorrow}
        />
      )}

      {/* Scroll to Top Button */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="w-10 text-2xl fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          ↑
        </button>
      )}
    </div>
  );
};

export default UserPage;
