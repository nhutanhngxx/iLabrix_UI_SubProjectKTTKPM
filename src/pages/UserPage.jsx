import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
import iLabrixLogo from "../assets/iLibrary.png";
import backgroundImg from "../assets/Background.png";
import { mockBooks } from "../mock/mockData";

const UserPage = () => {
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [advancedFilter, setAdvancedFilter] = useState(false);
  const [displayBooks, setDisplayBooks] = useState(mockBooks);
  const [filter, setFilter] = useState({
    category: "all",
    author: "",
    publisher: "",
    price: "",
    releaseYearFrom: "",
    releaseYearTo: "",
    language: "",
    availability: "",
  });

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

  return (
    <div
      className="flex items-center flex-col w-full bg-repeat-y bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Header */}
      <div className="h-20 w-screen backdrop-blur-md flex items-center fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between w-full px-5">
          <div className="flex items-center text-white space-x-10">
            <img src={iLabrixLogo} alt="iLabrix Logo" style={{ height: 50 }} />
            <a href="#introduce">Introduce</a>
            <a href="#">All books</a>
            <a href="#news-events">News - Events</a>
            <a href="#feature">Feature</a>
            <a href="#support">Support</a>
          </div>
          <div className="flex items-center space-x-4 mr-5 ml-auto flex-shrink-0 text-white">
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="flex justify-around mt-20 w-4/5">
        {/* Left Side - Filter*/}
        <div className="p-5 backdrop-blur-3xl rounded-lg shadow-md h-fit">
          <h1 className="text-3xl font-semibold text-blue-600">FILTER BY</h1>
          <hr className="my-2 mb-2" />
          <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
              <label htmlFor="category" className="font-bold text-white">
                Category:
              </label>
              <select id="category" className="p-2 border rounded-md">
                <option value="all">All</option>
                <option value="fiction">Fiction</option>
                <option value="non-fiction">Non-Fiction</option>
              </select>
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="author" className="font-bold text-white">
                Author:
              </label>
              <input
                type="text"
                id="author"
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="publisher" className="font-bold text-white">
                Publisher:
              </label>
              <input
                type="text"
                id="publisher"
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="font-bold text-white">
                Price:
              </label>
              <input
                type="number"
                id="price"
                className="p-2 border rounded-md"
              />
            </div>
            <div className="flex flex-col gap-1">
              <label htmlFor="price" className="font-bold text-white">
                Release Year:
              </label>
              <div className="flex gap-2 text-sm items-center justify-between">
                <label className="text-white">From:</label>
                <input
                  type="number"
                  id="release-year-from"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex gap-2 text-sm items-center justify-between">
                <label className="text-white">To:</label>
                <input
                  type="number"
                  id="release-year-to"
                  className="p-2 border rounded-md"
                />
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <label htmlFor="advanced-filter" className="font-bold text-white">
                Advanced Filter:
              </label>
              {advancedFilter && (
                <div>
                  <div className="flex flex-col gap-1">
                    <label htmlFor="language" className="font-bold text-white">
                      Language:
                    </label>
                    <input
                      type="text"
                      id="language"
                      className="p-2 border rounded-md"
                    />
                  </div>
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="availability"
                      className="font-bold text-white"
                    >
                      Availability:
                    </label>
                    <input
                      type="text"
                      id="availability"
                      className="p-2 border rounded-md"
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
            </div>

            <button className="bg-[#CC9933] text-white rounded-[35px] font-medium py-2">
              Filter
            </button>
          </div>
        </div>

        {/* Right Side - All books*/}
        <div className="backdrop-blur-3xl rounded-lg shadow-md p-5 w-3/4">
          <h1 className="text-3xl font-semibold text-white">ALL BOOKS</h1>
          <hr className="my-3" />
          {/* Sort and Search */}
          <div className="flex items-center gap-3 mb-4">
            <label className="text-white text-xl font-medium ">Sort by:</label>
            <select className="py-1 px-3 border rounded-xl">
              <option value="title">Title</option>
              <option value="author">Author</option>
              <option value="price">Price</option>
              <option value="release-year">Release Year</option>
            </select>
            <select className="py-1 px-3 border rounded-xl">
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
                  id=""
                />
                <input
                  type="button"
                  value="Search"
                  className="bg-blue-500 px-2 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors cursor-pointer"
                />
              </div>
            </div>
          </div>
          {/* All Books */}
          <div className="grid grid-cols-2 gap-5 mt-5">
            {displayBooks.map((book) => (
              <div
                key={book.bookId}
                className="flex items-center p-4 border rounded-lg shadow-md bg-white relative"
              >
                {/* Ảnh sách */}
                <img
                  src={book.image}
                  alt={book.name}
                  className="w-[125px] h-[185px] object-cover rounded-md mr-4"
                />

                {/* Thông tin sách */}
                <div className="flex-1">
                  <h2 className="text-xl font-semibold text-blue-600">
                    {book.title}
                  </h2>
                  <p className="text-gray-600">Author: {book.author}</p>
                  <p className="text-gray-600">Pages: {book.pages}</p>
                  <p className="text-gray-600">Publisher: {book.publisher}</p>
                  <p className="text-green-600 font-bold">${book.price}</p>
                </div>

                {/* Buttons */}
                <div className="flex gap-2 absolute bottom-3 right-3">
                  <button className="bg-[#CC9933] text-white px-3 py-1 rounded-[35px] font-medium">
                    Borrow
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

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
