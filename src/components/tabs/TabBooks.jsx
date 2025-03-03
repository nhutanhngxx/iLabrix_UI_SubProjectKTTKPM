import { useState } from "react";
import editIcon from "/icons/edit.png";

// Danh sách sách
const books = [
  {
    bookId: "B001",
    name: "The Great Gatsby",
    author: "F. Scott Fitzgerald",
    pages: 180,
    publisher: "Scribner",
    price: 10.99,
    image: "https://i.ibb.co/hRDwYJMT/tuoi-tre-hoang-dai.png",
  },
  {
    bookId: "B002",
    name: "To Kill a Mockingbird",
    author: "Harper Lee",
    pages: 281,
    publisher: "J.B. Lippincott & Co.",
    price: 12.5,
    image: "https://i.ibb.co/hRDwYJMT/tuoi-tre-hoang-dai.png",
  },
  {
    bookId: "B003",
    name: "1984",
    author: "George Orwell",
    pages: 328,
    publisher: "Secker & Warburg",
    price: 15.0,
    image: "https://i.ibb.co/hRDwYJMT/tuoi-tre-hoang-dai.png",
  },
  {
    bookId: "B004",
    name: "Pride and Prejudice",
    author: "Jane Austen",
    pages: 279,
    publisher: "T. Egerton",
    price: 9.75,
    image: "https://i.ibb.co/hRDwYJMT/tuoi-tre-hoang-dai.png",
  },
  {
    bookId: "B005",
    name: "The Catcher in the Rye",
    author: "J.D. Salinger",
    pages: 277,
    publisher: "Little, Brown and Company",
    price: 11.99,
    image: "https://i.ibb.co/hRDwYJMT/tuoi-tre-hoang-dai.png",
  },
];

const TabBooks = () => {
  const [isInforBookModalOpen, setIsInforBookModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const categorys = ["Fantasy", "Sci-Fi", "Horror", "Mystery", "Romance"];
  const handleGenreClick = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };
  const handleRemoveCategories = (category) => {
    setSelectedCategories(selectedCategories.filter((g) => g !== category));
  };

  // Phân trang
  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;
  const totalPages = Math.ceil(books.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const selectdBooks = books.slice(startIndex, startIndex + booksPerPage);
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    pages: "",
    publisher: "",
    price: "",
    image: "",
    category: [],
  });
  // Xử lý modal
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewBook({
      name: "",
      author: "",
      pages: "",
      publisher: "",
      price: "",
      image: "",
      category: [],
    });
  };
  // Thêm sách
  const handleAddBook = () => {
    if (!newBook.name || !newBook.author) {
      alert("Vui lòng nhập đầy đủ thông tin sách!");
      return;
    }
    // setBooks([...books, { ...newBook, bookId: `B00${books.length + 1}` }]);
    closeModal();
  };

  // Phân trang để hiển thị Sách
  const indexOfLastBook = currentPage * booksPerPage;
  const indexOfFirstBook = indexOfLastBook - booksPerPage;
  const currentBooks = books.slice(indexOfFirstBook, indexOfLastBook);

  // Chuyển trang
  const nextPage = () => {
    if (currentPage < Math.ceil(books.length / booksPerPage)) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  // Mở modal xem Information's book
  const handleViewInforBook = () => {
    setIsInforBookModalOpen(true);
  };

  // Mở modal Xác nhận xóa
  const handleConfirmDelete = () => {
    setIsConfirmDeleteModalOpen(true);
  };
  return (
    <div className="text-lg p-2">
      {/* Thanh công cụ */}
      <div className="flex items-center justify-between mb-5 ">
        {/* Bộ lọc */}
        <div className="flex items-center gap-5 font-light">
          {/* Category */}
          <div className="flex items-center gap-3 h-[40px]">
            <label className="font-medium">Category</label>
            <select className="w-44 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 italic">
              <option value="" disabled selected>
                Select a Category
              </option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>
          {/* Language */}
          <div className="flex items-center gap-3 h-[40px]">
            <label className="font-medium">Language</label>
            <select className="w-48 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 italic">
              <option value="" disabled selected>
                Select a Language
              </option>
              <option value="language1">Language 1</option>
              <option value="language2">Language 2</option>
              <option value="language3">Language 3</option>
            </select>
          </div>
          {/* Search */}
          <div className="flex items-center gap-3 h-[40px]">
            <div className="flex items-center justify-center">
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
                  ></input>
                  <input
                    type="button"
                    value="Search"
                    className="bg-blue-500 h-[35px] px-3 rounded-tr-lg rounded-br-lg text-white font-semibold hover:bg-blue-800 transition-colors"
                  ></input>
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Nút thêm sách */}
        <button
          onClick={openModal}
          className="group cursor-pointer outline-none hover:rotate-90 duration-300"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50px"
            height="50px"
            viewBox="0 0 24 24"
            className="stroke-indigo-400 fill-none group-hover:fill-indigo-100 group-active:stroke-indigo-200 group-active:fill-indigo-600 group-active:duration-0 duration-300"
          >
            <path
              d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
              strokeWidth="1.5"
            ></path>
            <path d="M8 12H16" strokeWidth="1.5"></path>
            <path d="M12 16V8" strokeWidth="1.5"></path>
          </svg>
        </button>
      </div>

      {/* Hiển thị danh sách sách */}
      <div className="grid grid-cols-2 gap-7">
        {currentBooks.map((book) => (
          <div
            key={book.bookId}
            className="flex items-center p-4 border rounded-lg shadow-md bg-white relative"
          >
            {/* Ảnh sách */}
            <img
              src={book.image}
              alt={book.name}
              className="w-24 h-32 object-cover rounded-md mr-4"
            />

            {/* Thông tin sách */}
            <div className="flex-1">
              <h2 className="text-xl font-semibold text-blue-600">
                {book.name}
              </h2>
              <p className="text-gray-600">Author: {book.author}</p>
              <p className="text-gray-600">Publisher: {book.publisher}</p>
              <p className="text-green-600 font-bold">${book.price}</p>
            </div>

            {/* Buttons */}
            <div className="flex gap-2 absolute bottom-3 right-3">
              {/* Button Edit */}
              <button
                className="rounded-md p-2 hover:bg-blue-200 transition"
                onClick={handleViewInforBook}
              >
                <img src={editIcon} style={{ width: 25, height: 25 }}></img>
              </button>

              {/* Button Delete */}
              <button
                onClick={handleConfirmDelete}
                className="group relative flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded-xl border-2 bg-red-400 hover:bg-red-600"
              >
                <svg
                  viewBox="0 0 1.625 1.625"
                  className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
                  height="15"
                  width="15"
                >
                  <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
                  <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
                  <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
                </svg>
                <svg
                  width="14"
                  fill="none"
                  viewBox="0 0 39 7"
                  className="origin-right duration-500 group-hover:rotate-90"
                >
                  <line
                    strokeWidth="4"
                    stroke="white"
                    y2="5"
                    x2="39"
                    y1="5"
                  ></line>
                  <line
                    strokeWidth="3"
                    stroke="white"
                    y2="1.5"
                    x2="26.0357"
                    y1="1.5"
                    x1="12"
                  ></line>
                </svg>
                <svg width="16" fill="none" viewBox="0 0 33 39" className="">
                  <mask fill="white" id="path-1-inside-1_8_19">
                    <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
                  </mask>
                  <path
                    mask="url(#path-1-inside-1_8_19)"
                    fill="white"
                    d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
                  ></path>
                  <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
                  <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
                </svg>
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nút chuyển trang */}
      {/* <div className="flex mt-3 gap-4 bottom-3 right-7 absolute">
        <button
          onClick={prevPage}
          disabled={currentPage === 1}
          className={`px-2 py-1 rounded-md ${
            currentPage === 1
              ? "bg-transparent opacity-50 cursor-not-allowed"
              : "bg-transparent hover:bg-slate-200"
          } transition`}
        >
          <img
            src="/icons/previous-button.png"
            alt="Previous"
            className="w-5 h-5"
          />
        </button>
        <button
          onClick={nextPage}
          disabled={currentPage === Math.ceil(books.length / booksPerPage)}
          className={`px-2 py-1 rounded-md ${
            currentPage === Math.ceil(books.length / booksPerPage)
              ? "bg-transparent opacity-50 cursor-not-allowed"
              : "bg-transparent hover:bg-slate-200"
          } transition`}
        >
          <img src="/icons/next-button.png" alt="Next" className="w-5 h-5" />
        </button>
      </div> */}
      <div className="absolute text-base bottom-3 right-7">
        <button
          className="px-3 py-1 "
          onClick={() => goToPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          Previous
        </button>
        {renderPageNumbers()}
        <button
          className="px-3 py-1 "
          onClick={() => goToPage(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          Next
        </button>
      </div>

      {/* Modal Add new Book */}
      {isModalOpen && (
        // bg-white/30 backdrop-blur-md shadow-lg rounded-2xl
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg" // blur đen
          // className="fixed inset-0 bg-black/20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center"  // blur xám
        >
          <div
            onClick={(e) => e.stopPropagation()}
            // className="p-5 bg-white rounded-xl shadow-lg w-4/6"
            className="w-4/6 mx-auto relative overflow-hidden z-10 bg-white p-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
          >
            <div>
              <h2 className="text-3xl text-center font-bold mb-4 text-sky-900">
                Add new Book
              </h2>
            </div>
            <form method="post" action="#" className="mb-10">
              <div className="grid grid-cols-2 gap-20">
                <div className="space-y-2">
                  <input
                    type="text"
                    placeholder="Enter Book title"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={newBook.name}
                    onChange={(e) =>
                      setNewBook({ ...newBook, name: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter Author name"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={newBook.author}
                    onChange={(e) =>
                      setNewBook({ ...newBook, author: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter ISBN"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  />

                  {/* Số lượng có sẵn */}
                  <div className="flex items-center gap-3">
                    <input
                      type="number"
                      placeholder="Total books"
                      className="placeholder:text-sm w-1/2 px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    />
                    <input
                      type="number"
                      placeholder="Books available"
                      className="placeholder:text-sm w-1/2 px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    />
                  </div>

                  {/* Published date */}
                  <div className="flex items-center">
                    <label className="w-full opacity-50 font-semibold">
                      Published date
                    </label>
                    <input
                      type="date"
                      placeholder="Enter Publication date"
                      className="placeholder:text-sm w-1/2 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    />
                  </div>

                  {/* Ngôn ngữ */}
                  <div className="flex justify-between">
                    <label className="font-semibold opacity-50">
                      Select language
                    </label>
                    <select
                      id="language"
                      name="language"
                      className="ml-2 bg-transparent"
                    >
                      <option value="af">Afrikaans</option>
                      <option value="sq">Albanian</option>
                      <option value="am">Amharic</option>
                      <option value="ar">Arabic</option>
                      <option value="hy">Armenian</option>
                      <option value="az">Azerbaijani</option>
                      <option value="eu">Basque</option>
                      <option value="be">Belarusian</option>
                      <option value="bn">Bengali</option>
                      <option value="bs">Bosnian</option>
                      <option value="bg">Bulgarian</option>
                      <option value="ca">Catalan</option>
                      <option value="zh">Chinese</option>
                      <option value="hr">Croatian</option>
                      <option value="cs">Czech</option>
                      <option value="da">Danish</option>
                      <option value="nl">Dutch</option>
                      <option value="en">English</option>
                      <option value="et">Estonian</option>
                      <option value="fi">Finnish</option>
                      <option value="fr">French</option>
                      <option value="ka">Georgian</option>
                      <option value="de">German</option>
                      <option value="el">Greek</option>
                      <option value="he">Hebrew</option>
                      <option value="hi">Hindi</option>
                      <option value="hu">Hungarian</option>
                      <option value="is">Icelandic</option>
                      <option value="id">Indonesian</option>
                      <option value="it">Italian</option>
                      <option value="ja">Japanese</option>
                      <option value="ko">Korean</option>
                      <option value="lv">Latvian</option>
                      <option value="lt">Lithuanian</option>
                      <option value="ms">Malay</option>
                      <option value="mn">Mongolian</option>
                      <option value="no">Norwegian</option>
                      <option value="fa">Persian</option>
                      <option value="pl">Polish</option>
                      <option value="pt">Portuguese</option>
                      <option value="ro">Romanian</option>
                      <option value="ru">Russian</option>
                      <option value="sr">Serbian</option>
                      <option value="sk">Slovak</option>
                      <option value="sl">Slovenian</option>
                      <option value="es">Spanish</option>
                      <option value="sv">Swedish</option>
                      <option value="th">Thai</option>
                      <option value="tr">Turkish</option>
                      <option value="uk">Ukrainian</option>
                      <option value="ur">Urdu</option>
                      <option value="vi">Vietnamese</option>
                    </select>
                  </div>
                </div>

                {/* Chọn Category có sẵn */}
                <div className="space-y-2">
                  <div className="flex flex-wrap gap-2 min-h-[40px]">
                    {selectedCategories.map((category) => (
                      <span
                        key={category}
                        className="bg-blue-500 text-white text-sm rounded-md flex items-center space-x-1 px-2"
                      >
                        {category}
                        <button
                          onClick={() => handleRemoveCategories(category)}
                          className="ml-2 text-sm font-bold hover:text-red-600"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                    {selectedCategories.length === 0 && (
                      <input
                        type="text"
                        value={inputValue}
                        placeholder="Select category..."
                        className="border-none outline-none flex-1 bg-transparent placeholder:text-sm"
                        readOnly
                      />
                    )}
                  </div>

                  {/* Danh sách các Genre có sẵn */}
                  <div className="mt-1 flex flex-wrap gap-2">
                    {categorys.map((category) => (
                      <button
                        key={category}
                        onClick={() => handleGenreClick(category)}
                        className={`px-2 py-1 rounded-md ${
                          selectedCategories.includes(category)
                            ? "bg-transparent cursor-not-allowed"
                            : "bg-blue-100 hover:bg-blue-300"
                        }`}
                        disabled={selectedCategories.includes(category)}
                      >
                        {category}
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="mt-1 p-2 w-full border rounded-md text-sm bg-transparent"
                    rows="2"
                    placeholder="Description"
                  ></textarea>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border-b border-blue-400 bg-transparent focus:outline-none "
                    onChange={(e) =>
                      setNewBook({ ...newBook, image: e.target.files[0] })
                    }
                  />
                  {/* Preview ảnh đã được chọn */}
                  {newBook.image && (
                    <img
                      src={URL.createObjectURL(newBook.image)}
                      alt="Preview"
                      className="mt-2 w-20 h-20 object-cover"
                    />
                  )}
                </div>
              </div>
            </form>

            <div className="flex gap-5 absolute bottom-5 right-5">
              <button
                onClick={() => setIsModalOpen(false)}
                className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              >
                Close
              </button>
              <button
                onClick={handleAddBook}
                className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                type="submit"
              >
                Add new book
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal View Information's Book */}
      {isInforBookModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg">
          <div className="w-full h-full mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 className="text-2xl items-center text-sky-900 font-bold mb-6">
              Information's Book
            </h2>
            <form method="post" action="#">
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Title book
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  type="text"
                  value={"Tuổi trẻ hoang dại"}
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Author
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  // name="email"
                  // id="email"
                  // type="email"
                  value={"F. Scott Fitzgerald"}
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-5 absolute bottom-5 right-5">
                <button
                  onClick={() => setIsInforBookModalOpen(false)}
                  className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                >
                  Close
                </button>

                <button
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                  type="submit"
                >
                  Update Book
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Xác nhận xóa */}
      {isConfirmDeleteModalOpen && (
        <div
          onClick={() => setIsConfirmDeleteModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg"
        >
          <div className="w-[300px] mx-auto relative overflow-hidden z-10 bg-white p-4 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            {/* <div
            onClick={(e) => e.stopPropagation()}
            className="group select-none w-[300px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl"
          > */}
            <div className="">
              <div className="text-center p-3 flex-auto justify-center">
                <svg
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    clipRule="evenodd"
                    d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                    fillRule="evenodd"
                  ></path>
                </svg>
                <h2 className="text-3xl font-bold py-4 text-sky-900">
                  Are you sure?
                </h2>
                <p className="font-bold text-sm text-gray-500 px-2">
                  Do you really want to continue ? This process cannot be undone
                </p>
              </div>
              <div className="p-2 mt-2 text-center flex justify-around md:block">
                <button
                  onClick={() => setIsConfirmDeleteModalOpen(false)}
                  className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
                >
                  Cancel
                </button>
                <button className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300">
                  Confirm
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBooks;
