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
      className="flex items-center flex-col w-screen bg-repeat-y bg-cover bg-center"
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
      <div className="flex justify-around mt-24 w-3/4">
        {/* Left Side - Filter*/}
        <div>
          <div className="p-5 bg-white rounded-lg shadow-md">
            <h1 className="text-3xl font-semibold text-blue-600">FILTER BY</h1>
            <hr className="my-2 mb-6" />
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-1">
                <label htmlFor="category" className="font-bold">
                  Category:
                </label>
                <select id="category" className="p-2 border rounded-md">
                  <option value="all">All</option>
                  <option value="fiction">Fiction</option>
                  <option value="non-fiction">Non-Fiction</option>
                </select>
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="author" className="font-bold">
                  Author:
                </label>
                <input
                  type="text"
                  id="author"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="publisher" className="font-bold">
                  Publisher:
                </label>
                <input
                  type="text"
                  id="publisher"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="price" className="font-bold">
                  Price:
                </label>
                <input
                  type="number"
                  id="price"
                  className="p-2 border rounded-md"
                />
              </div>
              <div className="flex flex-col gap-1">
                <label htmlFor="price" className="font-bold">
                  Release Year:
                </label>
                <div className="flex gap-2 text-sm items-center justify-between">
                  <label>From:</label>
                  <input
                    type="number"
                    id="release-year-from"
                    className="p-2 border rounded-md"
                  />
                </div>
                <div className="flex gap-2 text-sm items-center justify-between">
                  <label>To:</label>
                  <input
                    type="number"
                    id="release-year-to"
                    className="p-2 border rounded-md"
                  />
                </div>
              </div>

              <div className="flex flex-col gap-1">
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
                        className="p-2 border rounded-md"
                      />
                    </div>
                    <div className="flex flex-col gap-1">
                      <label htmlFor="availability" className="font-bold">
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
        </div>

        {/* Right Side - All books*/}
        <div>
          <div className="grid grid-cols-2 gap-5">
            {mockBooks.map((book) => (
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
