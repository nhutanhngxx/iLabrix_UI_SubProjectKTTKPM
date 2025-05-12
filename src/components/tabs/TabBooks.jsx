// import { useRef, useState, useEffect } from "react";
// import editIcon from "/icons/edit.png";
// import { mockCategories } from "../../mock/mockData";

// const TabBooks = () => {
//   const api_fake = "http://localhost:8080/api/v1/book-service/books";
//   // const api_fake = "https://67cedd26823da0212a807409.mockapi.io/iLabrix/books";
//   const [categorys, setCategories] = useState(mockCategories);
//   const [allBooks, setAllBooks] = useState([]);
//   const [filteredBooks, setFilteredBooks] = useState([]);
//   const [selectedCategoryId, setSelectedCategoryId] = useState("");
//   const [searchTerm, setSearchTerm] = useState("");

//   useEffect(() => {
//     const fetchBooks = async () => {
//       try {
//         // Lấy accessToken từ localStorage
//         const accessToken = localStorage.getItem("accessToken");

//         // Thêm accessToken vào headers của fetch
//         const response = await fetch(api_fake, {
//           headers: {
//             Authorization: `Bearer ${accessToken}`, // Gửi token trong header Authorization
//             "Content-Type": "application/json", // Đảm bảo Content-Type nếu cần
//           },
//         });

//         if (!response.ok) {
//           throw new Error("Lỗi khi lấy dữ liệu");
//         }

//         const data = await response.json();
//         console.log(data);
//         setAllBooks(data);
//         setFilteredBooks(data);
//       } catch (error) {
//         console.error("Lỗi API:", error);
//       }
//     };

//     fetchBooks();
//   }, []);

//   // Hàm tìm kiếm sách
//   const handleSearch = () => {
//     applyFilters();
//   };

//   // Hàm áp dụng các bộ lọc (category và search)
//   const applyFilters = () => {
//     let filtered = [...allBooks];

//     // Lọc theo category nếu có
//     if (selectedCategoryId) {
//       const categoryIdNum = Number(selectedCategoryId);
//       filtered = filtered.filter((book) => {
//         // Kiểm tra trường categories (mảng các categoryId)
//         if (book.categories && Array.isArray(book.categories)) {
//           return book.categories.includes(categoryIdNum);
//         }

//         // Kiểm tra trường category (mảng các categoryId)
//         if (book.category && Array.isArray(book.category)) {
//           return book.category.includes(categoryIdNum);
//         }

//         // Kiểm tra trường category (chuỗi hoặc số)
//         if (book.category) {
//           return (
//             book.category === selectedCategoryId ||
//             book.category === categoryIdNum
//           );
//         }

//         // Kiểm tra trường categoryId
//         if (book.categoryId) {
//           return (
//             book.categoryId === selectedCategoryId ||
//             book.categoryId === categoryIdNum
//           );
//         }

//         return false;
//       });
//     }

//     // Lọc theo từ khóa tìm kiếm nếu có
//     if (searchTerm.trim()) {
//       const searchTermLower = searchTerm.toLowerCase();
//       filtered = filtered.filter((book) => {
//         // Tìm kiếm theo tên sách
//         if (book.title && book.title.toLowerCase().includes(searchTermLower)) {
//           return true;
//         }

//         // Tìm kiếm theo tên tác giả
//         if (
//           book.author &&
//           book.author.toLowerCase().includes(searchTermLower)
//         ) {
//           return true;
//         }

//         // Tìm kiếm theo mô tả
//         if (
//           book.description &&
//           book.description.toLowerCase().includes(searchTermLower)
//         ) {
//           return true;
//         }

//         // Tìm kiếm theo thể loại
//         if (book.categories && Array.isArray(book.categories)) {
//           const hasMatchingCategory = book.categories.some((catId) => {
//             const category = categorys.find((c) => c.categoryId === catId);
//             return (
//               category &&
//               category.categoryName.toLowerCase().includes(searchTermLower)
//             );
//           });
//           if (hasMatchingCategory) return true;
//         }

//         if (book.category && Array.isArray(book.category)) {
//           const hasMatchingCategory = book.category.some((catId) => {
//             const category = categorys.find((c) => c.categoryId === catId);
//             return (
//               category &&
//               category.categoryName.toLowerCase().includes(searchTermLower)
//             );
//           });
//           if (hasMatchingCategory) return true;
//         }

//         // Tìm kiếm theo category là số
//         if (book.category && typeof book.category === "number") {
//           const category = categorys.find(
//             (c) => c.categoryId === book.category
//           );
//           if (
//             category &&
//             category.categoryName.toLowerCase().includes(searchTermLower)
//           ) {
//             return true;
//           }
//         }

//         // Tìm kiếm theo category là chuỗi
//         if (book.category && typeof book.category === "string") {
//           if (book.category.toLowerCase().includes(searchTermLower)) {
//             return true;
//           }
//           // Kiểm tra xem chuỗi có phải là tên category không
//           const matchingCategory = categorys.find(
//             (c) => c.categoryName.toLowerCase() === book.category.toLowerCase()
//           );
//           if (
//             matchingCategory &&
//             matchingCategory.categoryName
//               .toLowerCase()
//               .includes(searchTermLower)
//           ) {
//             return true;
//           }
//         }

//         return false;
//       });
//     }

//     setFilteredBooks(filtered);
//     setCurrentPage(1); // Reset về trang đầu tiên khi áp dụng bộ lọc
//   };

//   // Cập nhật filteredBooks khi các bộ lọc thay đổi
//   useEffect(() => {
//     applyFilters();
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [selectedCategoryId, searchTerm, allBooks]);

//   const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
//     useState(false);
//   const [selectedCategories, setSelectedCategories] = useState([]);
//   const [inputValue, setInputValue] = useState("");
//   // const categorys = ["Fantasy", "Sci-Fi", "Horror", "Mystery", "Romance"];

//   // Thông tin chi tiết của sách
//   const fileInputRef = useRef(null);
//   const [preview, setPreview] = useState(
//     "https://www.worldbookday.com/wp-content/uploads/2023/11/BookStacks_large_1-1-e1700482243590.png"
//   ); // Ảnh mặc định
//   const handleButtonClick = () => {
//     if (fileInputRef.current) {
//       fileInputRef.current.click();
//     } else {
//       console.error("fileInputRef.current is null");
//     }
//   };

//   const handleFileChange = (event) => {
//     const file = event.target.files[0];
//     if (file) {
//       const objectUrl = URL.createObjectURL(file);
//       setPreview(objectUrl); // Cập nhật ảnh xem trước
//     }
//   };
//   //

//   const handleGenreClick = (category) => {
//     if (!selectedCategories.includes(category)) {
//       setSelectedCategories([...selectedCategories, category]);
//     }
//   };
//   const handleRemoveCategories = (category) => {
//     setSelectedCategories(selectedCategories.filter((g) => g !== category));
//   };

//   // Phân trang
//   const [currentPage, setCurrentPage] = useState(1);
//   const booksPerPage = 4;
//   const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
//   const startIndex = (currentPage - 1) * booksPerPage;
//   const selectdBooks = filteredBooks.slice(
//     startIndex,
//     startIndex + booksPerPage
//   );
//   const goToPage = (page) => {
//     if (page >= 1 && page <= totalPages) setCurrentPage(page);
//   };
//   const renderPageNumbers = () => {
//     const pages = [];
//     if (totalPages <= 5) {
//       for (let i = 1; i <= totalPages; i++) pages.push(i);
//     } else {
//       pages.push(1);
//       if (currentPage > 3) pages.push("...");
//       const start = Math.max(2, currentPage - 1);
//       const end = Math.min(currentPage + 1, totalPages - 1);
//       for (let i = start; i <= end; i++) pages.push(i);
//       if (currentPage < totalPages - 2) pages.push("...");
//       pages.push(totalPages);
//     }

//     return pages.map((page, index) =>
//       typeof page === "number" ? (
//         <button
//           key={index}
//           className={`px-3 py-1 mx-1 rounded ${
//             currentPage === page ? "font-bold underline" : "text-gray-700"
//           }`}
//           onClick={() => goToPage(page)}
//         >
//           {page}
//         </button>
//       ) : (
//         <span key={index} className="px-2 text-gray-500">
//           {page}
//         </span>
//       )
//     );
//   };

//   const [isModalOpen, setIsModalOpen] = useState(false);
//   const [newBook, setNewBook] = useState({
//     name: "",
//     author: "",
//     pages: "",
//     publisher: "",
//     price: "",
//     image: "",
//     category: [],
//   });
//   // Xử lý modal
//   const openModal = () => setIsModalOpen(true);
//   const closeModal = () => {
//     setIsModalOpen(false);
//     setNewBook({
//       name: "",
//       author: "",
//       pages: "",
//       publisher: "",
//       price: "",
//       image: "",
//       category: [],
//     });
//   };
//   // Thêm sách
//   const handleAddBook = () => {
//     if (!newBook.name || !newBook.author) {
//       alert("Vui lòng nhập đầy đủ thông tin sách!");
//       return;
//     }
//     // setBooks([...books, { ...newBook, bookId: `B00${books.length + 1}` }]);
//     closeModal();
//   };

//   // Hàm xử lý khi chọn category
//   const handleCategoryChange = (e) => {
//     setSelectedCategoryId(e.target.value);
//     setCurrentPage(1); // Reset về trang đầu tiên khi thay đổi category
//   };

//   // Mở modal xem Information's book
//   const [selectedBook, setSelectedBook] = useState(null);
//   const [isInforBookModalOpen, setIsInforBookModalOpen] = useState(false);
//   const handleViewInforBook = (book) => {
//     setSelectedBook(book);
//     setIsInforBookModalOpen(true);
//   };

//   // Mở modal Xác nhận xóa
//   const handleConfirmDelete = () => {
//     setIsConfirmDeleteModalOpen(true);
//   };
//   return (
//     <div className="text-lg p-2">
//       {/* Thanh công cụ */}
//       <div className="flex items-center justify-between mb-5 ">
//         {/* Bộ lọc */}
//         <div className="flex items-center gap-5 font-light">
//           {/* Category */}
//           <div className="flex items-center gap-3 h-[40px]">
//             <label className="block text-sm font-medium text-gray-600">
//               Category
//             </label>
//             <select
//               className="w-44 px-2 py-2 rounded-md text-sm font-medium"
//               value={selectedCategoryId}
//               onChange={handleCategoryChange}
//             >
//               <option value="">All Categories</option>
//               {categorys.map((category) => (
//                 <option key={category.categoryId} value={category.categoryId}>
//                   {category.categoryName}
//                 </option>
//               ))}
//             </select>
//           </div>
//           {/* Language */}
//           <div className="flex items-center gap-3 h-[40px]">
//             <label className="block text-sm font-medium text-gray-600">
//               Language
//             </label>
//             <select className="w-44 px-2 py-2 rounded-md text-sm font-medium">
//               <option value="" disabled selected>
//                 Select a Language
//               </option>
//               <option value="language1">Language 1</option>
//               <option value="language2">Language 2</option>
//               <option value="language3">Language 3</option>
//             </select>
//           </div>
//           {/* Search */}
//           <div className="flex items-center gap-3 h-[40px]">
//             <div className="flex items-center justify-center">
//               <div className="rounded-lg bg-gray-200">
//                 <div className="flex">
//                   <div className="flex w-10 items-center justify-center rounded-tl-lg rounded-bl-lg border-r border-gray-200 bg-white">
//                     <svg
//                       viewBox="0 0 20 20"
//                       aria-hidden="true"
//                       className="pointer-events-none absolute w-5 fill-gray-500 transition"
//                     >
//                       <path d="M16.72 17.78a.75.75 0 1 0 1.06-1.06l-1.06 1.06ZM9 14.5A5.5 5.5 0 0 1 3.5 9H2a7 7 0 0 0 7 7v-1.5ZM3.5 9A5.5 5.5 0 0 1 9 3.5V2a7 7 0 0 0-7 7h1.5ZM9 3.5A5.5 5.5 0 0 1 14.5 9H16a7 7 0 0 0-7-7v1.5Zm3.89 10.45 3.83 3.83 1.06-1.06-3.83-3.83-1.06 1.06ZM14.5 9a5.48 5.48 0 0 1-1.61 3.89l1.06 1.06A6.98 6.98 0 0 0 16 9h-1.5Zm-1.61 3.89A5.48 5.48 0 0 1 9 14.5V16a6.98 6.98 0 0 0 4.95-2.05l-1.06-1.06Z"></path>
//                     </svg>
//                   </div>
//                   <input
//                     type="text"
//                     className="w-full max-w-[160px] bg-white pl-3 text-base font-semibold outline-0"
//                     placeholder="Tìm kiếm sách..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyDown={(e) => e.key === "Enter" && handleSearch()}
//                   />
//                   <input
//                     type="button"
//                     value="Search"
//                     onClick={handleSearch}
//                     className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-1 font-bold hover:opacity-80 rounded-tr-lg rounded-br-lg cursor-pointer"
//                   />
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//         {/* Nút thêm sách */}
//         <button
//           onClick={openModal}
//           className="group cursor-pointer outline-none hover:rotate-90 duration-300"
//         >
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             width="50px"
//             height="50px"
//             viewBox="0 0 24 24"
//             className="stroke-indigo-400 fill-none group-hover:fill-indigo-100 group-active:stroke-indigo-200 group-active:fill-indigo-600 group-active:duration-0 duration-300"
//           >
//             <path
//               d="M12 22C17.5 22 22 17.5 22 12C22 6.5 17.5 2 12 2C6.5 2 2 6.5 2 12C2 17.5 6.5 22 12 22Z"
//               strokeWidth="1.5"
//             ></path>
//             <path d="M8 12H16" strokeWidth="1.5"></path>
//             <path d="M12 16V8" strokeWidth="1.5"></path>
//           </svg>
//         </button>
//       </div>

//       {/* Hiển thị danh sách sách */}
//       {filteredBooks.length === 0 ? (
//         <div className="flex flex-col items-center justify-center p-10 mt-5 bg-white rounded-lg shadow-md">
//           <svg
//             xmlns="http://www.w3.org/2000/svg"
//             className="h-16 w-16 text-gray-400 mb-4"
//             fill="none"
//             viewBox="0 0 24 24"
//             stroke="currentColor"
//           >
//             <path
//               strokeLinecap="round"
//               strokeLinejoin="round"
//               strokeWidth={2}
//               d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
//             />
//           </svg>
//           <h3 className="text-xl font-semibold text-gray-700 mb-2">
//             Không tìm thấy sách nào
//           </h3>
//           <p className="text-gray-500 text-center">
//             {searchTerm ? (
//               <>
//                 Không có sách nào phù hợp với từ khóa &quot;{searchTerm}
//                 &quot;.
//               </>
//             ) : selectedCategoryId ? (
//               <>
//                 Không có sách nào trong danh mục &quot;
//                 {categorys.find(
//                   (c) => c.categoryId === Number(selectedCategoryId)
//                 )?.categoryName || ""}
//                 &quot;.
//               </>
//             ) : (
//               <>Không có sách nào trong hệ thống.</>
//             )}
//           </p>
//           <div className="flex gap-3 mt-4">
//             {searchTerm && (
//               <button
//                 onClick={() => setSearchTerm("")}
//                 className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
//               >
//                 Xóa từ khóa tìm kiếm
//               </button>
//             )}
//             {selectedCategoryId && (
//               <button
//                 onClick={() => setSelectedCategoryId("")}
//                 className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
//               >
//                 Xóa bộ lọc danh mục
//               </button>
//             )}
//           </div>
//         </div>
//       ) : (
//         <div className="grid grid-cols-2 gap-7 h-full">
//           {selectdBooks.map((book) => (
//             <div
//               key={book.bookId}
//               className="flex h-full items-center p-3 border rounded-lg shadow-md bg-white relative"
//             >
//               {/* Ảnh sách */}
//               <img
//                 // src={book.image_url}
//                 // alt={book.name}
//                 className="w-24 h-32 object-cover rounded-md mr-4"
//               />

//               {/* Thông tin sách */}
//               <div className="flex flex-col justify-between h-full space-y-2 w-3/5">
//                 <h2 className="text-xl font-semibold text-blue-600">
//                   {book.title}
//                 </h2>
//                 <p className="text-gray-600 text-sm flex-grow">{book.author}</p>
//                 <p className="text-gray-600 text-sm flex-grow">
//                   {/* Hiển thị tên category dựa trên categoryId */}
//                   {book.categories && Array.isArray(book.categories)
//                     ? book.categories
//                         .map((catId) => {
//                           const category = categorys.find(
//                             (c) => c.categoryId === catId
//                           );
//                           return category ? category.categoryName : catId;
//                         })
//                         .join(", ")
//                     : book.category && Array.isArray(book.category)
//                     ? book.category
//                         .map((catId) => {
//                           const category = categorys.find(
//                             (c) => c.categoryId === catId
//                           );
//                           return category ? category.categoryName : catId;
//                         })
//                         .join(", ")
//                     : book.category && typeof book.category === "number"
//                     ? categorys.find((c) => c.categoryId === book.category)
//                         ?.categoryName || book.category
//                     : book.category || ""}
//                 </p>
//                 <p className="text-gray-600 text-sm flex-grow">
//                   {book.language}
//                 </p>
//                 <p className="text-gray-600 text-sm truncate w-11/12 flex-grow">
//                   {book.description}
//                 </p>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-2 absolute bottom-3 right-3">
//                 {/* Button Edit */}
//                 <button
//                   className="rounded-md p-2 hover:bg-blue-200 transition"
//                   onClick={() => handleViewInforBook(book)}
//                 >
//                   <img src={editIcon} style={{ width: 25, height: 25 }}></img>
//                 </button>

//                 {/* Button Delete */}
//                 <button
//                   onClick={handleConfirmDelete}
//                   className="group relative flex h-12 w-12 flex-col items-center justify-center overflow-hidden rounded-xl border-2 bg-red-400 hover:bg-red-600"
//                 >
//                   <svg
//                     viewBox="0 0 1.625 1.625"
//                     className="absolute -top-7 fill-white delay-100 group-hover:top-6 group-hover:animate-[spin_1.4s] group-hover:duration-1000"
//                     height="15"
//                     width="15"
//                   >
//                     <path d="M.471 1.024v-.52a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099h-.39c-.107 0-.195 0-.195-.195"></path>
//                     <path d="M1.219.601h-.163A.1.1 0 0 1 .959.504V.341A.033.033 0 0 0 .926.309h-.26a.1.1 0 0 0-.098.098v.618c0 .054.044.098.098.098h.487a.1.1 0 0 0 .098-.099v-.39a.033.033 0 0 0-.032-.033"></path>
//                     <path d="m1.245.465-.15-.15a.02.02 0 0 0-.016-.006.023.023 0 0 0-.023.022v.108c0 .036.029.065.065.065h.107a.023.023 0 0 0 .023-.023.02.02 0 0 0-.007-.016"></path>
//                   </svg>
//                   <svg
//                     width="14"
//                     fill="none"
//                     viewBox="0 0 39 7"
//                     className="origin-right duration-500 group-hover:rotate-90"
//                   >
//                     <line
//                       strokeWidth="4"
//                       stroke="white"
//                       y2="5"
//                       x2="39"
//                       y1="5"
//                     ></line>
//                     <line
//                       strokeWidth="3"
//                       stroke="white"
//                       y2="1.5"
//                       x2="26.0357"
//                       y1="1.5"
//                       x1="12"
//                     ></line>
//                   </svg>
//                   <svg width="16" fill="none" viewBox="0 0 33 39" className="">
//                     <mask fill="white" id="path-1-inside-1_8_19">
//                       <path d="M0 0H33V35C33 37.2091 31.2091 39 29 39H4C1.79086 39 0 37.2091 0 35V0Z"></path>
//                     </mask>
//                     <path
//                       mask="url(#path-1-inside-1_8_19)"
//                       fill="white"
//                       d="M0 0H33H0ZM37 35C37 39.4183 33.4183 43 29 43H4C-0.418278 43 -4 39.4183 -4 35H4H29H37ZM4 43C-0.418278 43 -4 39.4183 -4 35V0H4V35V43ZM37 0V35C37 39.4183 33.4183 43 29 43V35V0H37Z"
//                     ></path>
//                     <path strokeWidth="4" stroke="white" d="M12 6L12 29"></path>
//                     <path strokeWidth="4" stroke="white" d="M21 6V29"></path>
//                   </svg>
//                 </button>
//               </div>
//             </div>
//           ))}
//         </div>
//       )}

//       {/* Nút chuyển trang */}
//       <div className="absolute text-base bottom-3 right-7">
//         <button
//           className="px-3 py-1 "
//           onClick={() => goToPage(currentPage - 1)}
//           disabled={currentPage === 1}
//         >
//           Previous
//         </button>
//         {renderPageNumbers()}
//         <button
//           className="px-3 py-1 "
//           onClick={() => goToPage(currentPage + 1)}
//           disabled={currentPage === totalPages}
//         >
//           Next
//         </button>
//       </div>

//       {/* Modal Add new Book */}
//       {isModalOpen && (
//         // bg-white/30 backdrop-blur-md shadow-lg rounded-2xl
//         <div
//           onClick={() => setIsModalOpen(false)}
//           className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg" // blur đen
//           // className="fixed inset-0 bg-black/20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center"  // blur xám
//         >
//           <div
//             onClick={(e) => e.stopPropagation()}
//             // className="p-5 bg-white rounded-xl shadow-lg w-4/6"
//             className="w-11/12 mx-auto relative overflow-hidden z-10 bg-white p-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
//           >
//             <div>
//               <h2 className="text-3xl text-center font-bold mb-4 text-sky-900">
//                 Add new Book
//               </h2>
//             </div>
//             <form method="post" action="#" className="mb-10">
//               <div className="grid grid-cols-2 gap-20">
//                 <div className="space-y-2">
//                   <input
//                     type="text"
//                     placeholder="Enter Book title"
//                     className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
//                     value={newBook.name}
//                     onChange={(e) =>
//                       setNewBook({ ...newBook, name: e.target.value })
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter Author name"
//                     className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
//                     value={newBook.author}
//                     onChange={(e) =>
//                       setNewBook({ ...newBook, author: e.target.value })
//                     }
//                   />
//                   <input
//                     type="text"
//                     placeholder="Enter ISBN"
//                     className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
//                   />

//                   {/* Số lượng có sẵn */}
//                   <div className="flex items-center gap-3">
//                     <input
//                       type="number"
//                       placeholder="Total books"
//                       className="placeholder:text-sm w-1/2 px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
//                     />
//                     <input
//                       type="number"
//                       placeholder="Books available"
//                       className="placeholder:text-sm w-1/2 px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
//                     />
//                   </div>

//                   {/* Published date */}
//                   <div className="flex items-center">
//                     <label className="w-full opacity-50 font-semibold">
//                       Published date
//                     </label>
//                     <input
//                       type="date"
//                       placeholder="Enter Publication date"
//                       className="placeholder:text-sm w-1/2 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
//                     />
//                   </div>

//                   {/* Ngôn ngữ */}
//                   <div className="flex justify-between">
//                     <label className="font-semibold opacity-50">
//                       Select language
//                     </label>
//                     <select
//                       id="language"
//                       name="language"
//                       className="ml-2 bg-transparent"
//                     >
//                       <option value="af">Afrikaans</option>
//                       <option value="sq">Albanian</option>
//                       <option value="am">Amharic</option>
//                       <option value="ar">Arabic</option>
//                       <option value="hy">Armenian</option>
//                       <option value="az">Azerbaijani</option>
//                       <option value="eu">Basque</option>
//                       <option value="be">Belarusian</option>
//                       <option value="bn">Bengali</option>
//                       <option value="bs">Bosnian</option>
//                       <option value="bg">Bulgarian</option>
//                       <option value="ca">Catalan</option>
//                       <option value="zh">Chinese</option>
//                       <option value="hr">Croatian</option>
//                       <option value="cs">Czech</option>
//                       <option value="da">Danish</option>
//                       <option value="nl">Dutch</option>
//                       <option value="en">English</option>
//                       <option value="et">Estonian</option>
//                       <option value="fi">Finnish</option>
//                       <option value="fr">French</option>
//                       <option value="ka">Georgian</option>
//                       <option value="de">German</option>
//                       <option value="el">Greek</option>
//                       <option value="he">Hebrew</option>
//                       <option value="hi">Hindi</option>
//                       <option value="hu">Hungarian</option>
//                       <option value="is">Icelandic</option>
//                       <option value="id">Indonesian</option>
//                       <option value="it">Italian</option>
//                       <option value="ja">Japanese</option>
//                       <option value="ko">Korean</option>
//                       <option value="lv">Latvian</option>
//                       <option value="lt">Lithuanian</option>
//                       <option value="ms">Malay</option>
//                       <option value="mn">Mongolian</option>
//                       <option value="no">Norwegian</option>
//                       <option value="fa">Persian</option>
//                       <option value="pl">Polish</option>
//                       <option value="pt">Portuguese</option>
//                       <option value="ro">Romanian</option>
//                       <option value="ru">Russian</option>
//                       <option value="sr">Serbian</option>
//                       <option value="sk">Slovak</option>
//                       <option value="sl">Slovenian</option>
//                       <option value="es">Spanish</option>
//                       <option value="sv">Swedish</option>
//                       <option value="th">Thai</option>
//                       <option value="tr">Turkish</option>
//                       <option value="uk">Ukrainian</option>
//                       <option value="ur">Urdu</option>
//                       <option value="vi">Vietnamese</option>
//                     </select>
//                   </div>
//                 </div>

//                 {/* Chọn Category có sẵn */}
//                 <div className="space-y-2">
//                   <div className="flex flex-wrap gap-2 min-h-[40px]">
//                     {selectedCategories.map((category) => (
//                       <span
//                         key={category}
//                         className="bg-blue-500 text-white text-sm rounded-md flex items-center space-x-1 px-2"
//                       >
//                         {category}
//                         <button
//                           onClick={() => handleRemoveCategories(category)}
//                           className="ml-2 text-sm font-bold hover:text-red-600"
//                         >
//                           ×
//                         </button>
//                       </span>
//                     ))}
//                     {selectedCategories.length === 0 && (
//                       <input
//                         type="text"
//                         value={inputValue}
//                         placeholder="Select category..."
//                         className="border-none outline-none flex-1 bg-transparent placeholder:text-sm"
//                         readOnly
//                       />
//                     )}
//                   </div>

//                   {/* Danh sách các Genre có sẵn */}
//                   <div className="mt-1 flex flex-wrap gap-2">
//                     {categorys.map((category) => (
//                       <button
//                         key={category.categoryId}
//                         onClick={() => handleGenreClick(category.categoryName)}
//                         className={`px-2 py-1 rounded-md ${
//                           selectedCategories.includes(category.categoryName)
//                             ? "bg-transparent cursor-not-allowed"
//                             : "bg-blue-100 hover:bg-blue-300"
//                         }`}
//                         disabled={selectedCategories.includes(
//                           category.categoryName
//                         )}
//                       >
//                         {category.categoryName}
//                       </button>
//                     ))}
//                   </div>
//                   <textarea
//                     className="mt-1 p-2 w-full border rounded-md text-sm bg-transparent"
//                     rows="2"
//                     placeholder="Description"
//                   ></textarea>
//                   <input
//                     type="file"
//                     accept="image/*"
//                     className="w-full px-3 py-2 border-b border-blue-400 bg-transparent focus:outline-none "
//                     onChange={(e) =>
//                       setNewBook({ ...newBook, image: e.target.files[0] })
//                     }
//                   />
//                   {/* Preview ảnh đã được chọn */}
//                   {newBook.image && (
//                     <img
//                       src={URL.createObjectURL(newBook.image)}
//                       alt="Preview"
//                       className="mt-2 w-20 h-20 object-cover"
//                     />
//                   )}
//                 </div>
//               </div>
//             </form>

//             <div className="flex gap-5 absolute bottom-5 right-5">
//               <button
//                 onClick={() => setIsModalOpen(false)}
//                 className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
//               >
//                 Close
//               </button>
//               <button
//                 onClick={handleAddBook}
//                 className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
//                 type="submit"
//               >
//                 Add new book
//               </button>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Modal View Information's Book */}
//       {isInforBookModalOpen && (
//         <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg">
//           <div className="w-full h-full mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
//             <h2 className="text-2xl items-center text-sky-900 font-bold mb-6">
//               Information of Book
//             </h2>
//             <form method="post" action="#">
//               <div className="flex gap-5">
//                 <div className="w-1/5 flex flex-col items-center">
//                   {/* Hiển thị ảnh */}
//                   <div className="bg-slate-200 w-4/5 h-4/5 rounded-lg overflow-hidden flex justify-center items-center">
//                     <img
//                       src={selectedBook.image_url}
//                       alt="Profile"
//                       className="w-full h-full object-cover"
//                     />
//                   </div>

//                   {/* Input file ẩn */}
//                   <input
//                     type="file"
//                     ref={fileInputRef}
//                     className="hidden"
//                     accept="image/*"
//                     onChange={handleFileChange}
//                   />

//                   {/* Nút chọn ảnh */}
//                   <button
//                     type="button"
//                     onClick={handleButtonClick}
//                     className="mt-5 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
//                   >
//                     Change Picture
//                   </button>
//                 </div>

//                 <div className="w-4/5">
//                   <div className="flex gap-5">
//                     <div className="mb-4 w-2/3">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Title book
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="text"
//                         value={selectedBook.title}
//                       />
//                     </div>
//                     <div className="mb-4 w-1/3">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Author
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="text"
//                         value={selectedBook.author}
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-5">
//                     <div className="mb-4 w-2/3">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Description
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="text"
//                         value={selectedBook.description}
//                       />
//                     </div>
//                     <div className="mb-4 w-1/3">
//                       <label className="block text-sm font-medium text-gray-600">
//                         ISBN
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="text"
//                         value={selectedBook.isbn}
//                       />
//                     </div>
//                   </div>

//                   <div className="flex gap-5">
//                     <div className="mb-4 w-1/3">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Category
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="text"
//                         value={selectedBook.category}
//                       />
//                     </div>
//                     <div className="mb-4 w-1/3">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Year published
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="number"
//                         value={selectedBook.year_published}
//                       />
//                     </div>
//                     <div className="mb-4 w-1/3">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Language
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="text"
//                         value={selectedBook.language}
//                       />
//                     </div>
//                   </div>
//                   <div className="flex gap-5">
//                     <div className="mb-4 w-1/6">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Total books
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="number"
//                         value={106}
//                         disabled
//                       />
//                     </div>
//                     {/* Available books <= Total books */}
//                     <div className="mb-4 w-1/6">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Available books
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="number"
//                         value={106}
//                       />
//                     </div>
//                     <div className="mb-4 w-1/6">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Pages
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="number"
//                         value={230}
//                       />
//                     </div>
//                     <div className="mb-4 w-1/2">
//                       <label className="block text-sm font-medium text-gray-600">
//                         Notes
//                       </label>
//                       <input
//                         className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
//                         type="text"
//                         value={"Note's book"}
//                       />
//                     </div>
//                   </div>
//                 </div>
//               </div>

//               {/* Buttons */}
//               <div className="flex gap-5 absolute bottom-5 right-5">
//                 <button
//                   onClick={() => setIsInforBookModalOpen(false)}
//                   className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
//                 >
//                   Close
//                 </button>

//                 <button
//                   className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
//                   type="submit"
//                 >
//                   Update Book
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}

//       {/* Modal Xác nhận xóa */}
//       {isConfirmDeleteModalOpen && (
//         <div
//           onClick={() => setIsConfirmDeleteModalOpen(false)}
//           className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg"
//         >
//           <div className="w-[300px] mx-auto relative overflow-hidden z-10 bg-white p-4 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
//             {/* <div
//             onClick={(e) => e.stopPropagation()}
//             className="group select-none w-[300px] flex flex-col p-4 relative items-center justify-center bg-gray-800 border border-gray-800 shadow-lg rounded-2xl"
//           > */}
//             <div className="">
//               <div className="text-center p-3 flex-auto justify-center">
//                 <svg
//                   fill="currentColor"
//                   viewBox="0 0 20 20"
//                   className="group-hover:animate-bounce w-12 h-12 flex items-center text-gray-600 fill-red-500 mx-auto"
//                   xmlns="http://www.w3.org/2000/svg"
//                 >
//                   <path
//                     clipRule="evenodd"
//                     d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
//                     fillRule="evenodd"
//                   ></path>
//                 </svg>
//                 <h2 className="text-3xl font-bold py-4 text-sky-900">
//                   Are you sure?
//                 </h2>
//                 <p className="font-bold text-sm text-gray-500 px-2">
//                   Do you really want to continue ? This process cannot be undone
//                 </p>
//               </div>
//               <div className="p-2 mt-2 text-center flex justify-around md:block">
//                 <button
//                   onClick={() => setIsConfirmDeleteModalOpen(false)}
//                   className="mb-2 md:mb-0 bg-gray-700 px-5 py-2 text-sm shadow-sm font-medium tracking-wider border-2 border-gray-600 hover:border-gray-700 text-gray-300 rounded-full hover:shadow-lg hover:bg-gray-800 transition ease-in duration-300"
//                 >
//                   Cancel
//                 </button>
//                 <button className="bg-red-500 hover:bg-transparent px-5 ml-4 py-2 text-sm shadow-sm hover:shadow-lg font-medium tracking-wider border-2 border-red-500 hover:border-red-500 text-white hover:text-red-500 rounded-full transition ease-in duration-300">
//                   Confirm
//                 </button>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default TabBooks;

import { useRef, useState, useEffect } from "react";
import editIcon from "/icons/edit.png";

const TabBooks = () => {
  const api_fake = "http://localhost:8080/api/v1/book-service/books";
  const [categorys, setCategories] = useState([
    {
      categoryId: "8f7c9a2b-4d3e-4b1a-9c2f-6e7d8a3b9c0e",
      categoryName: "Hornor",
    },
    {
      categoryId: "9a8b7c6d-5e4f-4c2b-8d3e-7f6a0b1c2d3e",
      categoryName: "Fantasy",
    },
    {
      categoryId: "1b2c3d4e-6f7a-4d3b-9c2f-8e7d9a0b1c2d",
      categoryName: "Sci-Fi",
    },
  ]);
  const [allBooks, setAllBooks] = useState([]);
  const [filteredBooks, setFilteredBooks] = useState([]);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const accessToken = localStorage.getItem("accessToken");
        const response = await fetch(api_fake, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        });

        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu");
        }

        const data = await response.json();
        console.log(data);
        setAllBooks(data);
        setFilteredBooks(data);
      } catch (error) {
        console.error("Lỗi API:", error);
      }
    };

    fetchBooks();
  }, []);

  const handleSearch = () => {
    applyFilters();
  };

  const applyFilters = () => {
    let filtered = [...allBooks];

    if (selectedCategoryId) {
      filtered = filtered.filter(
        (book) => book.category && book.category.id === selectedCategoryId
      );
    }

    if (searchTerm.trim()) {
      const searchTermLower = searchTerm.toLowerCase();
      filtered = filtered.filter((book) => {
        if (book.title && book.title.toLowerCase().includes(searchTermLower)) {
          return true;
        }
        if (
          book.description &&
          book.description.toLowerCase().includes(searchTermLower)
        ) {
          return true;
        }
        if (
          book.category &&
          book.category.name.toLowerCase().includes(searchTermLower)
        ) {
          return true;
        }
        return false;
      });
    }

    setFilteredBooks(filtered);
    setCurrentPage(1);
  };

  useEffect(() => {
    applyFilters();
  }, [selectedCategoryId, searchTerm, allBooks]);

  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const fileInputRef = useRef(null);
  const [preview, setPreview] = useState(
    "https://www.worldbookday.com/wp-content/uploads/2023/11/BookStacks_large_1-1-e1700482243590.png"
  );

  const handleButtonClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    } else {
      console.error("fileInputRef.current is null");
    }
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
    }
  };

  const handleGenreClick = (category) => {
    if (!selectedCategories.includes(category)) {
      setSelectedCategories([...selectedCategories, category]);
    }
  };

  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleCreateCategory = (e) => {
    e.preventDefault();
    if (newCategoryName.trim()) {
      const newCategory = {
        categoryId: Math.random().toString(), // Thay bằng ID từ backend
        categoryName: newCategoryName,
      };
      setCategories([...categorys, newCategory]);
      setSelectedCategories([...selectedCategories, newCategoryName]);
      setNewCategoryName("");
      setIsCategoryModalOpen(false);
    }
  };

  const handleRemoveCategories = (category) => {
    setSelectedCategories(selectedCategories.filter((g) => g !== category));
  };

  const [currentPage, setCurrentPage] = useState(1);
  const booksPerPage = 4;
  const totalPages = Math.ceil(filteredBooks.length / booksPerPage);
  const startIndex = (currentPage - 1) * booksPerPage;
  const selectdBooks = filteredBooks.slice(
    startIndex,
    startIndex + booksPerPage
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

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newBook, setNewBook] = useState({
    title: "",
    publisher: "",
    bookCode: "",
    description: "",
    note: "",
    yearPublished: "",
    category: null,
  });

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setNewBook({
      title: "",
      publisher: "",
      bookCode: "",
      description: "",
      note: "",
      yearPublished: "",
      category: null,
    });
    setSelectedCategories([]);
  };

  const handleAddBook = () => {
    if (!newBook.title || !newBook.publisher) {
      alert("Vui lòng nhập đầy đủ thông tin sách!");
      return;
    }
    closeModal();
  };

  const handleCategoryChange = (e) => {
    setSelectedCategoryId(e.target.value);
    setCurrentPage(1);
  };

  const [selectedBook, setSelectedBook] = useState(null);
  const [isInforBookModalOpen, setIsInforBookModalOpen] = useState(false);
  const handleViewInforBook = (book) => {
    setSelectedBook(book);
    setIsInforBookModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setIsConfirmDeleteModalOpen(true);
  };

  return (
    <div className="text-lg p-2">
      <div className="flex items-center justify-between mb-5">
        <div className="flex items-center gap-5 font-light">
          <div className="flex items-center gap-3 h-[40px]">
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              className="w-44 px-2 py-2 rounded-md text-sm font-medium"
              value={selectedCategoryId}
              onChange={handleCategoryChange}
            >
              <option value="">All Categories</option>
              {categorys.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>
          <div className="flex items-center gap-3 h-[40px]">
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
                  placeholder="Tìm kiếm sách..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                />
                <input
                  type="button"
                  value="Search"
                  onClick={handleSearch}
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-1 font-bold hover:opacity-80 rounded-tr-lg rounded-br-lg cursor-pointer"
                />
              </div>
            </div>
          </div>
        </div>
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

      {filteredBooks.length === 0 ? (
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
            {searchTerm ? (
              <>
                There are no books matching the keyword &quot;{searchTerm}
                &quot;.
              </>
            ) : selectedCategoryId ? (
              <>
                There are no books in the category &quot;
                {categorys.find((c) => c.categoryId === selectedCategoryId)
                  ?.categoryName || ""}
                &quot;.
              </>
            ) : (
              <>There are no books in the system.</>
            )}
          </p>
          <div className="flex gap-3 mt-4">
            {searchTerm && (
              <button
                onClick={() => setSearchTerm("")}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Clear search keywords
              </button>
            )}
            {selectedCategoryId && (
              <button
                onClick={() => setSelectedCategoryId("")}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Clear category filter
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-7 h-full">
          {selectdBooks.map((book) => (
            <div
              key={book.id}
              className="flex h-full items-center p-3 border rounded-lg shadow-md bg-white relative"
            >
              <img
                src={preview}
                alt={book.title}
                className="w-24 h-32 object-cover rounded-md mr-4"
              />
              <div className="flex flex-col justify-between h-full space-y-2 w-3/5">
                <h2 className="text-xl font-semibold text-blue-600">
                  {book.title}
                </h2>
                <p className="text-gray-600 text-sm flex-grow">
                  {book.publisher}
                </p>
                <p className="text-gray-600 text-sm flex-grow">
                  {book.category ? book.category.name : "Unknown"}
                </p>
                <p className="text-gray-600 text-sm truncate w-11/12 flex-grow">
                  {book.description}
                </p>
              </div>
              <div className="flex gap-2 absolute bottom-3 right-3">
                <button
                  className="rounded-md p-2 hover:bg-blue-200 transition"
                  onClick={() => handleViewInforBook(book)}
                >
                  <img src={editIcon} style={{ width: 25, height: 25 }} />
                </button>
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
      )}

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

      {/* {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-11/12 mx-auto relative overflow-hidden z-10 bg-white p-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
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
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook({ ...newBook, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter Publisher"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={newBook.publisher}
                    onChange={(e) =>
                      setNewBook({ ...newBook, publisher: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter ISBN"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={newBook.bookCode}
                    onChange={(e) =>
                      setNewBook({ ...newBook, bookCode: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Enter Year Published"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={newBook.yearPublished}
                    onChange={(e) =>
                      setNewBook({ ...newBook, yearPublished: e.target.value })
                    }
                  />
                </div>
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
                        placeholder="Select category..."
                        className="border-none outline-none flex-1 bg-transparent placeholder:text-sm"
                        readOnly
                      />
                    )}
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {categorys.map((category) => (
                      <button
                        key={category.categoryId}
                        onClick={() => handleGenreClick(category.categoryName)}
                        className={`px-2 py-1 rounded-md ${
                          selectedCategories.includes(category.categoryName)
                            ? "bg-transparent cursor-not-allowed"
                            : "bg-blue-100 hover:bg-blue-300"
                        }`}
                        disabled={selectedCategories.includes(
                          category.categoryName
                        )}
                      >
                        {category.categoryName}
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="mt-1 p-2 w-full border rounded-md text-sm bg-transparent"
                    rows="2"
                    placeholder="Description"
                    value={newBook.description}
                    onChange={(e) =>
                      setNewBook({ ...newBook, description: e.target.value })
                    }
                  ></textarea>
                  <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border-b border-blue-400 bg-transparent focus:outline-none"
                    onChange={(e) =>
                      setNewBook({ ...newBook, image: e.target.files[0] })
                    }
                  />
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
      )} */}

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-11/12 mx-auto relative overflow-hidden z-10 bg-white p-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
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
                    value={newBook.title}
                    onChange={(e) =>
                      setNewBook({ ...newBook, title: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter Publisher"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={newBook.publisher}
                    onChange={(e) =>
                      setNewBook({ ...newBook, publisher: e.target.value })
                    }
                  />
                  <input
                    type="text"
                    placeholder="Enter ISBN"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={newBook.bookCode}
                    onChange={(e) =>
                      setNewBook({ ...newBook, bookCode: e.target.value })
                    }
                  />
                  <input
                    type="number"
                    placeholder="Enter Year Published"
                    className="placeholder:text-sm w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                    value={newBook.yearPublished}
                    onChange={(e) =>
                      setNewBook({ ...newBook, yearPublished: e.target.value })
                    }
                  />
                </div>
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
                    <div className="flex items-center w-full">
                      <input
                        type="text"
                        placeholder="Select or create new category..."
                        className="border-none outline-none flex-1 bg-transparent placeholder:text-sm"
                        readOnly
                      />
                      <button
                        onClick={() => setIsCategoryModalOpen(true)}
                        className="ml-2 bg-blue-500 text-white px-2 py-1 rounded-md hover:bg-blue-600"
                      >
                        Create new Category
                      </button>
                    </div>
                  </div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {categorys.map((category) => (
                      <button
                        key={category.categoryId}
                        onClick={() => handleGenreClick(category.categoryName)}
                        className={`px-2 py-1 rounded-md ${
                          selectedCategories.includes(category.categoryName)
                            ? "bg-transparent cursor-not-allowed"
                            : "bg-blue-100 hover:bg-blue-300"
                        }`}
                        disabled={selectedCategories.includes(
                          category.categoryName
                        )}
                      >
                        {category.categoryName}
                      </button>
                    ))}
                  </div>
                  <textarea
                    className="mt-1 p-2 w-full border rounded-md text-sm bg-transparent"
                    rows="2"
                    placeholder="Description"
                    value={newBook.description}
                    onChange={(e) =>
                      setNewBook({ ...newBook, description: e.target.value })
                    }
                  ></textarea>
                  {/* <input
                    type="file"
                    accept="image/*"
                    className="w-full px-3 py-2 border-b border-blue-400 bg-transparent focus:outline-none"
                    onChange={(e) =>
                      setNewBook({ ...newBook, image: e.target.files[0] })
                    }
                  />
                  {newBook.image && (
                    <img
                      src={URL.createObjectURL(newBook.image)}
                      alt="Preview"
                      className="mt-2 w-20 h-20 object-cover"
                    />
                  )} */}
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

      {isCategoryModalOpen && (
        <div
          // onClick={() => setIsCategoryModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg"
        >
          <div
            // onClick={(e) => e.stopPropagation()}
            className="w-1/3 mx-auto relative bg-white p-5 rounded-lg shadow-md"
          >
            <div>
              <h2 className="text-2xl text-center font-bold mb-4 text-sky-900">
                Create New Category
              </h2>
            </div>
            <form>
              <div className="space-y-2">
                <input
                  type="text"
                  placeholder="Enter Category Name"
                  className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring-0 focus:border-blue-600"
                  // value={newCategoryName}
                  // onChange={(e) => setNewCategoryName(e.target.value)}
                />
              </div>
              <div className="flex gap-5 justify-end mt-5">
                <button
                  // onClick={() => setIsCategoryModalOpen(false)}
                  className="bg-red-500 text-white px-4 py-2 font-bold rounded-md hover:bg-red-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="bg-blue-500 text-white px-4 py-2 font-bold rounded-md hover:bg-blue-600"
                >
                  Create
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {isInforBookModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg">
          <div className="w-11/12 h-5/6 mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 className="text-2xl items-center text-sky-900 font-bold mb-6">
              Information of Book
            </h2>
            <form method="post" action="#">
              <div className="flex gap-5">
                <div className="w-1/5 flex flex-col items-center">
                  <div className="bg-slate-200 w-4/5 h-4/5 rounded-lg overflow-hidden flex justify-center items-center">
                    <img
                      src={preview}
                      alt="Profile"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                  <button
                    type="button"
                    onClick={handleButtonClick}
                    className="mt-5 px-4 py-2 text-sm font-medium text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition"
                  >
                    Change Picture
                  </button>
                </div>
                <div className="w-4/5">
                  <div className="flex gap-5">
                    <div className="mb-4 w-2/3">
                      <label className="block text-sm font-medium text-gray-600">
                        Title book
                      </label>
                      <input
                        className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
                        type="text"
                        value={selectedBook.title}
                        onChange={(e) =>
                          setSelectedBook({
                            ...selectedBook,
                            title: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4 w-1/3">
                      <label className="block text-sm font-medium text-gray-600">
                        Publisher
                      </label>
                      <input
                        className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
                        type="text"
                        value={selectedBook.publisher}
                        onChange={(e) =>
                          setSelectedBook({
                            ...selectedBook,
                            publisher: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="mb-4 w-2/3">
                      <label className="block text-sm font-medium text-gray-600">
                        Description
                      </label>
                      <input
                        className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
                        type="text"
                        value={selectedBook.description}
                        onChange={(e) =>
                          setSelectedBook({
                            ...selectedBook,
                            description: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div className="mb-4 w-1/3">
                      <label className="block text-sm font-medium text-gray-600">
                        ISBN
                      </label>
                      <input
                        className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
                        type="text"
                        value={selectedBook.bookCode}
                        onChange={(e) =>
                          setSelectedBook({
                            ...selectedBook,
                            bookCode: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                  <div className="flex gap-5">
                    {/* <div className="mb-4 w-1/3">
                      <label className="block text-sm font-medium text-gray-600">
                        Category
                      </label>
                      <input
                        className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
                        type="text"
                        value={
                          selectedBook.category
                            ? selectedBook.category.name
                            : ""
                        }
                      />
                    </div> */}
                    <div className="mb-4 w-1/3">
                      <label className="block text-sm font-medium text-gray-600">
                        Category
                      </label>
                      <select
                        className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
                        value={
                          selectedBook.category
                            ? selectedBook.category.name
                            : ""
                        }
                        onChange={(e) => {
                          const selectedCategoryId = e.target.value;
                          const selectedCategory = categorys.find(
                            (cat) => cat.categoryId === selectedCategoryId
                          );
                          setSelectedBook({
                            ...selectedBook,
                            category: selectedCategory || null,
                          });
                        }}
                      >
                        <option value="" disabled>
                          Chọn thể loại
                        </option>
                        {categorys.map((category) => (
                          <option
                            key={category.categoryId}
                            value={category.categoryId}
                          >
                            {category.categoryName}
                          </option>
                        ))}
                      </select>
                    </div>
                    <div className="mb-4 w-1/3">
                      <label className="block text-sm font-medium text-gray-600">
                        Year published
                      </label>
                      <input
                        className="mt-1 p-2 w-full border rounded-md font mockCategories={categorys} -medium text-gray-800"
                        type="number"
                        value={selectedBook.yearPublished}
                      />
                    </div>
                  </div>
                  <div className="flex gap-5">
                    <div className="mb-4 w-full">
                      <label className="block text-sm font-medium text-gray-600">
                        Notes
                      </label>
                      <input
                        className="mt-1 p-2 w-full border rounded-md font-medium text-gray-800"
                        type="text"
                        value={selectedBook.note}
                      />
                    </div>
                  </div>
                </div>
              </div>
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

      {isConfirmDeleteModalOpen && (
        <div
          onClick={() => setIsConfirmDeleteModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg"
        >
          <div className="w-[300px] mx-auto relative overflow-hidden z-10 bg-white p-4 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
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
                  Do you really want to continue? This process cannot be undone
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
