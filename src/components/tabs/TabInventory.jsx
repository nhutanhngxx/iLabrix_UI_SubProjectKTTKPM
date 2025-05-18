import React, { useState, useEffect } from "react";
import editIcon from "/icons/edit.png";

const TabInventory = () => {
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [books, setBooks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [expandedRows, setExpandedRows] = useState([]);

  // State selected book copies
  const [selectedBookCopies, setSelectedBookCopies] = useState([]);

  // State modal edit book copies
  const [isEditBookCopiesModalOpen, setIsEditBookCopiesModalOpen] =
    useState(false);

  const api_inventory =
    "http://localhost:8080/api/v1/inventory-service/inventories";
  const api_books = "http://localhost:8080/api/v1/book-service/books";
  const api_book_copies =
    "http://localhost:8080/api/v1/inventory-service/copies";

  const itemsPerPage = 6;

  const fetchData = async () => {
    try {
      const accessToken = localStorage.getItem("accessToken");
      if (!accessToken) {
        throw new Error("No authentication token found");
      }

      // Fetch Inventory
      const inventoryResponse = await fetch(api_inventory, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!inventoryResponse.ok) {
        throw new Error("Lỗi khi lấy dữ liệu inventory");
      }
      const inventoryData = await inventoryResponse.json();

      // Fetch Books
      const booksResponse = await fetch(api_books, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      });
      if (!booksResponse.ok) {
        throw new Error("Lỗi khi lấy dữ liệu books");
      }
      const booksData = await booksResponse.json();
      setBooks(booksData);

      // Map book titles to inventory
      const enrichedInventory = inventoryData.map((item) => {
        const book = booksData.find((book) => book.id === item.bookId);
        return {
          ...item,
          title: book ? book.title : "Unknown",
        };
      });

      setInventory(enrichedInventory);
      setFilteredInventory(enrichedInventory);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };

  useEffect(() => {
    fetchData();
  }, [inventory]);

  const toggleRowExpansion = (id) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((rowId) => rowId !== id) : [...prev, id]
    );
  };

  const totalPages = Math.ceil(filteredInventory.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const selectedItems = filteredInventory.slice(
    startIndex,
    startIndex + itemsPerPage
  );

  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxPageButtons = 5;
    let startPage = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
    let endPage = Math.min(totalPages, startPage + maxPageButtons - 1);

    if (endPage - startPage + 1 < maxPageButtons) {
      startPage = Math.max(1, endPage - maxPageButtons + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pageNumbers.push(
        <button
          key={i}
          className={`px-3 py-1 mx-1 rounded ${
            currentPage === i ? "font-bold underline" : "text-gray-700"
          }`}
          onClick={() => goToPage(i)}
        >
          {i}
        </button>
      );
    }
    return pageNumbers;
  };

  const handleSearch = () => {
    if (searchTerm.trim() === "") {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter((item) => {
        const matchesBookId = item.bookId
          .toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesTitle = item.title
          ?.toLowerCase()
          .includes(searchTerm.toLowerCase());
        const matchesCopy = item.bookCopies.some(
          (copy) =>
            copy.copyCode.toLowerCase().includes(searchTerm.toLowerCase()) ||
            copy.location.toLowerCase().includes(searchTerm.toLowerCase())
        );
        return matchesBookId || matchesTitle || matchesCopy;
      });
      setFilteredInventory(filtered);
    }
    setCurrentPage(1);
  };

  const openModal = (item = null, bookId = "") => {
    console.log("item", item);
    setSelectedItem(
      item || {
        bookId: bookId || "",
        title: "",
        totalQuantity: 0,
        available: 0,
        borrowed: 0,
        lost: 0,
        damaged: 0,
        bookCopies: [],
        location: "", // Thêm location để tránh lỗi undefined
        quantity: "", // Thêm quantity để tránh lỗi undefined
      }
    );
    setIsModalOpen(true);
  };

  const openModalEditBookCopies = (item, copy) => {
    setSelectedItem(item);
    setSelectedBookCopies({
      id: copy.id,
      copyCode: copy.copyCode,
      location: copy.location,
      status: copy.status,
    });
    setIsEditBookCopiesModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  // Hàm thêm Book Copies qua API
  const addBookCopies = async () => {
    const { bookId, location, quantity } = selectedItem;

    // Kiểm tra dữ liệu hợp lệ
    if (!bookId || !location || !quantity || quantity < 1) {
      alert("Please fill in all fields with valid values.");
      return;
    }

    try {
      const response = await fetch(api_book_copies, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
          location,
          quantity: parseInt(quantity),
        }),
      });

      if (!response.ok) {
        throw new Error("Failed to add book copies");
      }

      const data = await response.json();
      console.log("Book copies added successfully:", data);
      fetchData(); // Cập nhật lại dữ liệu sau khi thêm

      // Đóng modal
      setIsModalOpen(false);
    } catch (error) {
      console.error("Error adding book copies:", error);
      alert("Failed to add book copies. Please try again.");
    }
  };

  // Hàm xử lý lưu item (gọi addBookCopies khi không có selectedItem.id)
  const handleSaveItem = () => {
    if (!selectedItem.id) {
      addBookCopies();
    } else {
      setIsModalOpen(false);
    }
  };

  const handleDeleteClick = (item) => {
    setSelectedItem(item);
    setIsConfirmDeleteModalOpen(true);
  };

  const handleConfirmDelete = () => {
    setInventory(inventory.filter((item) => item.id !== selectedItem.id));
    setFilteredInventory(
      filteredInventory.filter((item) => item.id !== selectedItem.id)
    );
    setIsConfirmDeleteModalOpen(false);
    setSelectedItem(null);
  };

  const handleEditBookCopies = async () => {
    if (!selectedBookCopies.copyCode || !selectedBookCopies.location) {
      alert("Vui lòng nhập Copy Code và Location!");
      return;
    }

    if (selectedBookCopies.id) {
      try {
        const accessToken = localStorage.getItem("accessToken");
        if (!accessToken) {
          alert("No access token found. Please log in again.");
          return;
        }
        const response = await fetch(
          `${api_book_copies}/${selectedBookCopies.id}`,
          {
            method: "PUT",
            headers: {
              Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
              "Content-Type": "application/json",
            },
            body: JSON.stringify(selectedBookCopies),
          }
        );

        if (!response.ok) {
          throw new Error("Failed to update book copy");
        }

        setSelectedItem((prev) => ({
          ...prev,
          bookCopies: prev.bookCopies.map((copy) =>
            copy.id === selectedBookCopies.id ? selectedBookCopies : copy
          ),
        }));
        setInventory((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  bookCopies: item.bookCopies.map((copy) =>
                    copy.id === selectedBookCopies.id
                      ? selectedBookCopies
                      : copy
                  ),
                }
              : item
          )
        );
        setFilteredInventory((prev) =>
          prev.map((item) =>
            item.id === selectedItem.id
              ? {
                  ...item,
                  bookCopies: item.bookCopies.map((copy) =>
                    copy.id === selectedBookCopies.id
                      ? selectedBookCopies
                      : copy
                  ),
                }
              : item
          )
        );
      } catch (error) {
        console.error("Error updating book copy:", error);
        alert("Có lỗi xảy ra khi cập nhật book copy!");
        return;
      }
    }

    closeModal();
    setIsEditBookCopiesModalOpen(false);
  };

  const copyToClipboard = (text) => {
    navigator.clipboard
      .writeText(text)
      .then(() => {
        alert(`Book ID ${text} copied to clipboard!`);
      })
      .catch((err) => {
        console.error("Failed to copy: ", err);
        alert("Failed to copy Book ID.");
      });
  };

  const getStatus = (item) => {
    if (item.available === 0) return "Out of Stock";
    if (item.available < 5) return "Low Stock";
    return "In Stock";
  };

  return (
    <div className="text-lg p-2">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <h2 className="text-3xl items-center text-sky-900 font-bold">
            Manage Inventory
          </h2>
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
        {/* Tăng số lượng book copy */}
        {/* <div className="flex items-center gap-3">
          <button
            onClick={() => openModal()}
            className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-1 font-bold hover:opacity-80 rounded-lg"
          >
            Add copies of book
          </button>
        </div> */}
      </div>

      {/* Inventory list */}
      {filteredInventory.length === 0 ? (
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
            No inventory items found
          </h3>
          <p className="text-gray-500 text-center">
            {searchTerm ? (
              <>No items match the search term "{searchTerm}".</>
            ) : (
              <>No inventory items available.</>
            )}
          </p>
          {searchTerm && (
            <button
              onClick={() => {
                setSearchTerm("");
                handleSearch();
              }}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors mt-4"
            >
              Clear search
            </button>
          )}
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Book ID</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Total Quantity</th>
                <th className="py-3 px-4 text-left">Available</th>
                <th className="py-3 px-4 text-left">Borrowed</th>
                <th className="py-3 px-4 text-left">Lost</th>
                <th className="py-3 px-4 text-left">Damaged</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems
                .sort((a, b) => a.title.localeCompare(b.title)) // Sắp xếp theo title
                .map((item) => (
                  <React.Fragment key={item.id}>
                    <tr className="border-b hover:bg-gray-50">
                      {/* Cột book ID tích hợp sao chép id để thêm Book copies */}
                      <td className="py-3 px-4">
                        <div className="flex items-center gap-2">
                          <span>{item.bookId}</span>
                          <button
                            className="rounded-md p-1 hover:bg-gray-200 transition"
                            onClick={() => copyToClipboard(item.bookId)}
                            title="Copy Book ID"
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect
                                x="9"
                                y="9"
                                width="13"
                                height="13"
                                rx="2"
                                ry="2"
                              ></rect>
                              <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                            </svg>
                          </button>
                        </div>
                      </td>
                      <td className="py-3 px-4">{item.title}</td>
                      <td className="py-3 px-4">{item.totalQuantity}</td>
                      <td className="py-3 px-4">{item.available}</td>
                      <td className="py-3 px-4">{item.borrowed}</td>
                      <td className="py-3 px-4">{item.lost}</td>
                      <td className="py-3 px-4">{item.damaged}</td>
                      <td className="py-3 px-4">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                            getStatus(item) === "In Stock"
                              ? "bg-green-100 text-green-800"
                              : getStatus(item) === "Low Stock"
                              ? "bg-yellow-100 text-yellow-800"
                              : "bg-red-100 text-red-800"
                          }`}
                        >
                          {getStatus(item)}
                        </span>
                      </td>
                      <td className="py-3 px-4">
                        <div className="flex gap-2">
                          {/* <button
                          className="rounded-md p-2 hover:bg-gray-200 transition"
                          onClick={() => toggleRowExpansion(item.id)}
                          title={
                            expandedRows.includes(item.id)
                              ? "Collapse"
                              : "Expand"
                          }
                        >
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="20"
                            height="20"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className={
                              expandedRows.includes(item.id) ? "rotate-180" : ""
                            }
                          >
                            <path d="M6 9l6 6 6-6" />
                          </svg>
                        </button> */}
                          <button
                            className="rounded-md p-2 hover:bg-blue-200 transition"
                            onClick={() => openModal(item)}
                          >
                            <img
                              src={editIcon}
                              style={{ width: 20, height: 20 }}
                              alt="Edit"
                            />
                          </button>
                          <button
                            className="rounded-md p-2 hover:bg-red-200 transition"
                            onClick={() => handleDeleteClick(item)}
                          >
                            <svg
                              width="20px"
                              height="20px"
                              viewBox="0 0 24 24"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 7V18C6 19.1046 6.89543 20 8 20H16C17.1046 20 18 19.1046 18 18V7M6 7H5M6 7H8M18 7H19M18 7H16M8 7V5C8 3.89543 8.89543 3 10 3H14C15.1046 3 16 3.89543 16 5V7M8 7H16M10 12V16M14 12V16"
                                stroke="#ff0000"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </button>
                        </div>
                      </td>
                    </tr>
                    {expandedRows.includes(item.id) &&
                      item.bookCopies.length > 0 && (
                        <tr className="bg-gray-50">
                          <td colSpan="10" className="p-0">
                            <div className="p-4">
                              <table className="w-full bg-white rounded-lg shadow-sm">
                                <thead className="bg-gray-200 text-gray-700">
                                  <tr>
                                    <th className="py-2 px-4 text-left">
                                      Copy Code
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                      Location
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                      Status
                                    </th>
                                    <th className="py-2 px-4 text-left">
                                      Edit
                                    </th>
                                  </tr>
                                </thead>
                                <tbody>
                                  {item.bookCopies.map((copy) => (
                                    <tr key={copy.id} className="border-b">
                                      <td className="py-2 px-4">
                                        {copy.copyCode}
                                      </td>
                                      <td className="py-2 px-4">
                                        {copy.location}
                                      </td>
                                      <td className="py-2 px-4">
                                        <span
                                          className={`px-2 py-1 rounded-full text-xs font-medium ${
                                            copy.status === "AVAILABLE"
                                              ? "bg-green-100 text-green-800"
                                              : "bg-red-100 text-red-800"
                                          }`}
                                        >
                                          {copy.status}
                                        </span>
                                      </td>
                                      <td className="py-2 px-4">
                                        <button
                                          className="rounded-md p-2 hover:bg-blue-200 transition"
                                          onClick={() =>
                                            openModalEditBookCopies(item, copy)
                                          }
                                        >
                                          <img
                                            src={editIcon}
                                            style={{ width: 20, height: 20 }}
                                            alt="Edit"
                                          />
                                        </button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </td>
                        </tr>
                      )}
                  </React.Fragment>
                ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Pagination */}
      <div className="absolute text-base bottom-3 left-7">
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

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-1/2 mx-auto relative overflow-hidden z-10 bg-white p-4 rounded-lg shadow-md before:w-20 before:h-20 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-24 after:h-24 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-16 after:-right-8"
          >
            <h2 className="text-2xl text-center font-bold mb-3 text-sky-900">
              {selectedItem.id ? "Edit Inventory Item" : "Add copies of Book"}
            </h2>

            <div className="mb-10">
              {selectedItem.id ? (
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        Title
                      </label>
                      <input
                        type="text"
                        placeholder="Book Title"
                        className="mt-1 p-1.5 w-full border rounded-md text-sm"
                        value={selectedItem.title || ""}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        Total Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="Total"
                        className="mt-1 p-1.5 w-full border rounded-md text-sm"
                        value={selectedItem.totalQuantity || 0}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        Available
                      </label>
                      <input
                        type="number"
                        placeholder="Available"
                        className="mt-1 p-1.5 w-full border rounded-md text-sm"
                        value={selectedItem.available || 0}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        Borrowed
                      </label>
                      <input
                        type="number"
                        placeholder="Borrowed"
                        className="mt-1 p-1.5 w-full border rounded-md text-sm"
                        value={selectedItem.borrowed || 0}
                        readOnly
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        Lost
                      </label>
                      <input
                        type="number"
                        placeholder="Lost"
                        className="mt-1 p-1.5 w-full border rounded-md text-sm"
                        value={selectedItem.lost || 0}
                        readOnly
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        Damaged
                      </label>
                      <input
                        type="number"
                        placeholder="Damaged"
                        className="mt-1 p-1.5 w-full border rounded-md text-sm"
                        value={selectedItem.damaged || 0}
                        readOnly
                      />
                    </div>
                  </div>
                </div>
              ) : (
                <div className="space-y-2">
                  <div>
                    <label className="block text-xs font-medium text-gray-600">
                      Book ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Book ID"
                      className="mt-1 p-1.5 w-full border rounded-md text-sm"
                      value={selectedItem.bookId}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          bookId: e.target.value,
                        })
                      }
                      readOnly={!!selectedItem.bookId} // Khóa trường nếu bookId được truyền vào
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        Location
                      </label>
                      <input
                        type="text"
                        placeholder="Enter Location"
                        className="mt-1 p-1.5 w-full border rounded-md text-sm"
                        value={selectedItem.location || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            location: e.target.value,
                          })
                        }
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-medium text-gray-600">
                        Quantity
                      </label>
                      <input
                        type="number"
                        placeholder="Enter Location"
                        className="mt-1 p-1.5 w-full border rounded-md text-sm"
                        value={selectedItem.quantity || ""}
                        onChange={(e) =>
                          setSelectedItem({
                            ...selectedItem,
                            quantity: e.target.value,
                          })
                        }
                      />
                    </div>
                  </div>
                </div>
              )}
              {selectedItem.bookCopies.length > 0 && (
                <div className="mt-4">
                  <div className="flex items-center justify-between mb-2">
                    <h3 className="text-base font-semibold text-gray-700 mb-1">
                      Book Copies ({selectedItem.bookCopies.length})
                    </h3>
                    <button
                      onClick={() => openModal(null, selectedItem.bookId)} // Truyền bookId của selectedItem
                      className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-1 font-bold hover:opacity-80 rounded-lg"
                    >
                      Add copies of book
                    </button>
                  </div>
                  <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-md">
                    <table className="w-full bg-gray-50 text-sm table-fixed">
                      <thead className="bg-gray-200 text-gray-700 sticky top-0 z-10">
                        <tr>
                          <th className="py-1.5 px-3 text-left w-1/4">
                            Copy Code
                          </th>
                          <th className="py-1.5 px-3 text-left w-1/4">
                            Location
                          </th>
                          <th className="py-1.5 px-3 text-left w-1/4">
                            Status
                          </th>
                          <th className="py-1.5 px-3 text-left w-1/4">Edit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {selectedItem.bookCopies
                          .sort((a, b) => a.copyCode.localeCompare(b.copyCode))
                          .map((copy) => (
                            <tr
                              key={copy.id}
                              className="border-b border-gray-200"
                            >
                              <td className="py-1.5 px-3">{copy.copyCode}</td>
                              <td className="py-1.5 px-3">{copy.location}</td>
                              <td className="py-1.5 px-3">
                                <span
                                  className={`px-2 py-0.5 rounded-full text-xs font-medium ${
                                    copy.status === "AVAILABLE"
                                      ? "bg-green-100 text-green-800"
                                      : "bg-red-100 text-red-800"
                                  }`}
                                >
                                  {copy.status}
                                </span>
                              </td>
                              <td className="py-1.5 px-3">
                                <button
                                  className="rounded-md p-2 hover:bg-blue-200 transition"
                                  onClick={() =>
                                    openModalEditBookCopies(selectedItem, copy)
                                  }
                                >
                                  <img
                                    src={editIcon}
                                    style={{ width: 16, height: 16 }}
                                    alt="Edit"
                                  />
                                </button>
                              </td>
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>

            {!selectedItem.id && (
              <div className="flex gap-3 absolute bottom-3 right-3">
                <button
                  onClick={closeModal}
                  className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-3 py-1.5 font-bold rounded-md hover:opacity-80 text-sm"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveItem}
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-3 py-1.5 font-bold rounded-md hover:opacity-80 text-sm"
                >
                  Add
                </button>
              </div>
            )}
          </div>
        </div>
      )}

      {isConfirmDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete the inventory item with Book ID "
              {selectedItem.bookId}" and Title "{selectedItem.title}"? This
              action cannot be undone.
            </p>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsConfirmDeleteModalOpen(false)}
                className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-600 text-white rounded-md hover:bg-red-700"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}

      {isEditBookCopiesModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
          <div className="mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12 max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Edit Book Copies</h3>
            <div>
              {/* Copy Code */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Copy Code
                </label>
                <input
                  type="text"
                  name="copyId"
                  value={selectedBookCopies.copyCode || ""}
                  readOnly
                  className="mt-1 block w-full rounded-md border-gray-300 bg-gray-100 p-2"
                />
              </div>

              {/* Status */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Status
                </label>
                <select
                  name="status"
                  value={selectedBookCopies.status || ""}
                  onChange={(e) =>
                    setSelectedBookCopies({
                      ...selectedBookCopies,
                      status: e.target.value,
                    })
                  }
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                >
                  <option value="AVAILABLE" disabled>
                    Available
                  </option>
                  <option value="BORROWED" disabled>
                    Borrowed
                  </option>
                  <option value="DAMAGED">Damaged</option>
                  <option value="LOST">Lost</option>
                </select>
              </div>

              {/* Location */}
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">
                  Location
                </label>
                <input
                  type="text"
                  name="location"
                  value={selectedBookCopies.location || ""}
                  onChange={(e) =>
                    setSelectedBookCopies({
                      ...selectedBookCopies,
                      location: e.target.value,
                    })
                  }
                  placeholder="e.g., Shelf A1"
                  className="mt-1 block w-full rounded-md border-gray-300 p-2 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              {/* Nút hành động */}
              <div className="flex justify-end gap-2">
                <button
                  type="button"
                  onClick={() => setIsEditBookCopiesModalOpen(false)}
                  className="px-4 py-2 bg-gray-300 text-gray-800 rounded-md hover:bg-gray-400"
                >
                  Close
                </button>
                <button
                  onClick={handleEditBookCopies}
                  className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
                >
                  Update
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabInventory;
