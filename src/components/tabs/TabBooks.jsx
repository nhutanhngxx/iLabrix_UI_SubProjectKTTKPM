import { useState } from "react";

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
  const [selectedGenres, setSelectedGenres] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const genres = ["Fantasy", "Sci-Fi", "Horror", "Mystery", "Romance"];
  const handleGenreClick = (genre) => {
    if (!selectedGenres.includes(genre)) {
      setSelectedGenres([...selectedGenres, genre]);
    }
  };
  const handleRemoveGenre = (genre) => {
    setSelectedGenres(selectedGenres.filter((g) => g !== genre));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    pages: "",
    publisher: "",
    price: "",
    image: "",
    genre: [],
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
      genre: [],
    });
  };

  // Thêm sách
  const handleAddBook = () => {
    if (!newBook.name || !newBook.author) {
      alert("Vui lòng nhập đầy đủ thông tin sách!");
      return;
    }

    setBooks([...books, { ...newBook, bookId: `B00${books.length + 1}` }]);
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

  return (
    <div className="text-lg p-2">
      {/* Thanh công cụ */}
      <div className="flex items-center justify-between mb-5">
        {/* Bộ lọc */}
        <div className="flex items-center gap-5 font-light">
          <div className="flex items-center gap-3">
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

          <div className="flex items-center gap-3">
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

          <div className="flex items-center gap-3">
            <input
              placeholder="Search"
              className="w-52 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:italic"
            ></input>
            <button>
              <img src="/icons/search.png" className="w-6 h-6"></img>
            </button>
          </div>
        </div>

        {/* Nút thêm sách */}
        <button
          onClick={openModal}
          className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition"
        >
          Add new book
        </button>
      </div>

      {/* Hiển thị danh sách sách */}
      <div className="grid grid-cols-2 gap-6">
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
              <p className="text-gray-600">Pages: {book.pages}</p>
              <p className="text-gray-600">Publisher: {book.publisher}</p>
              <p className="text-green-600 font-bold">${book.price}</p>
            </div>

            {/* Buttons */}
            <div className="flex flex-col gap-2">
              <button className="px-3 py-1 bg-red-500 text-white rounded-md hover:bg-red-600 transition">
                Delete
              </button>
              <button className="px-3 py-1 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                Edit
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Nút chuyển trang */}
      <div className="flex mt-3 gap-4 bottom-3 right-7 absolute">
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
      </div>

      {/* Modal Add new Book */}
      {isModalOpen && (
        // bg-white/30 backdrop-blur-md shadow-lg rounded-2xl
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center">
          <div className="p-5 bg-white rounded-xl shadow-lg w-4/6">
            <div>
              <h2 className="text-xl text-center font-semibold mb-4">
                Add New Book
              </h2>
            </div>
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter Book title"
                  className="placeholder:italic w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  value={newBook.name}
                  onChange={(e) =>
                    setNewBook({ ...newBook, name: e.target.value })
                  }
                />

                <input
                  type="text"
                  placeholder="Enter Author name"
                  className="placeholder:italic w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  value={newBook.author}
                  onChange={(e) =>
                    setNewBook({ ...newBook, author: e.target.value })
                  }
                />
                <input
                  type="text"
                  placeholder="Enter Publisher"
                  className="placeholder:italic w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  value={newBook.publisher}
                  onChange={(e) =>
                    setNewBook({ ...newBook, publisher: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Enter Pages"
                  className="placeholder:italic w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  value={newBook.pages}
                  onChange={(e) =>
                    setNewBook({ ...newBook, pages: e.target.value })
                  }
                />
                <input
                  type="number"
                  placeholder="Enter Price"
                  className="placeholder:italic w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  value={newBook.price}
                  onChange={(e) =>
                    setNewBook({ ...newBook, price: e.target.value })
                  }
                />
              </div>
              <div className="space-y-2">
                {/* Chọn Genre có sẵn */}
                <div className="flex flex-wrap gap-2 min-h-[40px]">
                  {selectedGenres.map((genre) => (
                    <span
                      key={genre}
                      className="px-3 py-1 bg-blue-500 text-white rounded-full flex items-center space-x-1"
                    >
                      {genre}
                      <button
                        onClick={() => handleRemoveGenre(genre)}
                        className="ml-2 text-sm font-bold hover:text-red-300"
                      >
                        ×
                      </button>
                    </span>
                  ))}
                  {selectedGenres.length === 0 && (
                    <input
                      type="text"
                      value={inputValue}
                      placeholder="Chọn thể loại..."
                      className="border-none outline-none flex-1 placeholder:italic"
                      readOnly
                    />
                  )}
                </div>

                {/* Danh sách các Genre có sẵn */}
                <div className="mt-1 flex flex-wrap gap-2">
                  {genres.map((genre) => (
                    <button
                      key={genre}
                      onClick={() => handleGenreClick(genre)}
                      className={`px-2 py-1 border rounded-md ${
                        selectedGenres.includes(genre)
                          ? "bg-gray-300 cursor-not-allowed"
                          : "bg-blue-100 hover:bg-blue-300"
                      }`}
                      disabled={selectedGenres.includes(genre)}
                    >
                      {genre}
                    </button>
                  ))}
                </div>

                {/* Ngôn ngữ */}
                <label>Chọn ngôn ngữ :</label>
                <select id="language" name="language" className="ml-2">
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

                <input
                  type="file"
                  accept="image/*"
                  className="w-full px-3 py-2 border-b border-blue-400 bg-transparent focus:outline-none focus:ring-0 focus:border-blue-600"
                  onChange={(e) =>
                    setNewBook({ ...newBook, image: e.target.files[0] })
                  }
                />
                {/* Preview ảnh đã được chọn */}
                {/* {newBook.image && (
                  <img
                    src={URL.createObjectURL(newBook.image)}
                    alt="Preview"
                    className="mt-2 w-20 h-20 object-cover"
                  />
                )} */}
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={closeModal}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-gray-500 transition"
              >
                Cancel
              </button>
              <button
                onClick={handleAddBook}
                className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition"
              >
                Add new book
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBooks;
