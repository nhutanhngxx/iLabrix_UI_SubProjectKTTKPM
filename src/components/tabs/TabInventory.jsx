import React, { useState, useEffect, useRef } from "react";
import editIcon from "/icons/edit.png";
import { mockCategories } from "../../mock/mockData";

const TabInventory = () => {
  // State for inventory data
  const [inventory, setInventory] = useState([]);
  const [filteredInventory, setFilteredInventory] = useState([]);
  const [categorys, setCategories] = useState(mockCategories);
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmDeleteModalOpen, setIsConfirmDeleteModalOpen] =
    useState(false);
  const [selectedItem, setSelectedItem] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);

  const api_fake = "https://67cedd26823da0212a807409.mockapi.io/iLabrix/books";

  const itemsPerPage = 6;

  useEffect(() => {
    const fetchInventory = async () => {
      try {
        const response = await fetch(api_fake);
        if (!response.ok) {
          throw new Error("Lỗi khi lấy dữ liệu");
        }
        const data = await response.json();
        setInventory(data);
        setFilteredInventory(data);
      } catch (error) {
        console.error("Lỗi API:", error);
      }
    };
    fetchInventory();
  }, []);

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
          className={`px-3 py-1 mx-1 rounded-md ${
            currentPage === i
              ? "bg-blue-500 text-white"
              : "bg-gray-200 hover:bg-gray-300"
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
    if (searchTerm.trim() === "" && selectedCategoryId === "") {
      setFilteredInventory(inventory);
    } else {
      const filtered = inventory.filter((item) => {
        const matchesSearch =
          searchTerm.trim() === "" ||
          item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          item.bookId.toLowerCase().includes(searchTerm.toLowerCase());

        const matchesCategory =
          selectedCategoryId === "" ||
          (item.categoryId &&
            item.categoryId.toString() === selectedCategoryId);

        return matchesSearch && matchesCategory;
      });
      setFilteredInventory(filtered);
    }
    setCurrentPage(1);
  };

  const openModal = (item = null) => {
    setSelectedItem(
      item || {
        bookId: "",
        title: "",
        stockQuantity: 0,
        location: "",
        status: "In Stock",
        lastUpdated: new Date().toISOString().split("T")[0],
      }
    );
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedItem(null);
  };

  const handleSaveItem = () => {
    if (!selectedItem.bookId || !selectedItem.title) {
      alert("Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    if (selectedItem.id) {
      // Update existing item
      setInventory(
        inventory.map((item) =>
          item.id === selectedItem.id ? selectedItem : item
        )
      );
      setFilteredInventory(
        filteredInventory.map((item) =>
          item.id === selectedItem.id ? selectedItem : item
        )
      );
    } else {
      const newItem = {
        ...selectedItem,
        id: inventory.length + 1,
        lastUpdated: new Date().toISOString().split("T")[0],
      };
      setInventory([...inventory, newItem]);
      setFilteredInventory([...filteredInventory, newItem]);
    }
    closeModal();
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

  return (
    <div className="text-lg p-2">
      {/* Toolbar */}
      <div className="flex items-center justify-between mb-5">
        {/* Filters */}
        <div className="flex items-center gap-5 font-light">
          {/* Category filter */}
          <div className="flex items-center gap-3 h-[40px]">
            <label className="block text-sm font-medium text-gray-600">
              Category
            </label>
            <select
              className="w-44 px-2 py-2 rounded-md text-sm font-medium"
              value={selectedCategoryId}
              onChange={(e) => {
                setSelectedCategoryId(e.target.value);
                handleSearch();
              }}
            >
              <option value="">All Categories</option>
              {categorys.map((category) => (
                <option key={category.categoryId} value={category.categoryId}>
                  {category.categoryName}
                </option>
              ))}
            </select>
          </div>

          {/* Status filter */}
          <div className="flex items-center gap-3 h-[40px]">
            <label className="block text-sm font-medium text-gray-600">
              Status
            </label>
            <select
              className="w-44 px-2 py-2 rounded-md text-sm font-medium"
              onChange={(e) => {
                const status = e.target.value;
                if (status === "") {
                  setFilteredInventory(inventory);
                } else {
                  setFilteredInventory(
                    inventory.filter((item) => item.status === status)
                  );
                }
                setCurrentPage(1);
              }}
            >
              <option value="">All Status</option>
              <option value="In Stock">In Stock</option>
              <option value="Low Stock">Low Stock</option>
              <option value="Out of Stock">Out of Stock</option>
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
        </div>

        {/* Nút thêm kho sách */}
        <button
          onClick={() => openModal()}
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

      {/* Danh sách kho sách */}
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
              <>No items match the search term &quot;{searchTerm}&quot;.</>
            ) : selectedCategoryId ? (
              <>No items in the selected category.</>
            ) : (
              <>No inventory items available.</>
            )}
          </p>
          <div className="flex gap-3 mt-4">
            {searchTerm && (
              <button
                onClick={() => {
                  setSearchTerm("");
                  handleSearch();
                }}
                className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Clear search
              </button>
            )}
            {selectedCategoryId && (
              <button
                onClick={() => {
                  setSelectedCategoryId("");
                  handleSearch();
                }}
                className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-md transition-colors"
              >
                Clear category filter
              </button>
            )}
          </div>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white rounded-lg overflow-hidden shadow-md">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="py-3 px-4 text-left">Book ID</th>
                <th className="py-3 px-4 text-left">Title</th>
                <th className="py-3 px-4 text-left">Stock Quantity</th>
                <th className="py-3 px-4 text-left">Location</th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">Last Updated</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {selectedItems.map((item) => (
                <tr key={item.id} className="border-b hover:bg-gray-50">
                  <td className="py-3 px-4">{item.id}</td>
                  <td className="py-3 px-4">{item.title}</td>
                  <td className="py-3 px-4">{item.stockQuantity}</td>
                  <td className="py-3 px-4">{item.location}</td>
                  <td className="py-3 px-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        item.status === "In Stock"
                          ? "bg-green-100 text-green-800"
                          : item.status === "Low Stock"
                          ? "bg-yellow-100 text-yellow-800"
                          : "bg-red-100 text-red-800"
                      }`}
                    >
                      {item.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">{item.lastUpdated}</td>
                  <td className="py-3 px-4">
                    <div className="flex gap-2">
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
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Nút chuyển trang */}
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

      {isModalOpen && (
        <div
          onClick={() => setIsModalOpen(false)}
          className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50 rounded-lg"
        >
          <div
            onClick={(e) => e.stopPropagation()}
            className="w-2/3 mx-auto relative overflow-hidden z-10 bg-white p-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
          >
            <h2 className="text-3xl text-center font-bold mb-4 text-sky-900">
              {selectedItem.id
                ? "Edit Inventory Item"
                : "Add New Inventory Item"}
            </h2>

            <form method="post" action="#" className="mb-10">
              <div className="grid grid-cols-2 gap-10">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Book ID
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Book ID"
                      className="mt-1 p-2 w-full border rounded-md"
                      value={selectedItem.bookId || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          bookId: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Title
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Book Title"
                      className="mt-1 p-2 w-full border rounded-md"
                      value={selectedItem.title || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          title: e.target.value,
                        })
                      }
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Stock Quantity
                    </label>
                    <input
                      type="number"
                      placeholder="Enter Quantity"
                      className="mt-1 p-2 w-full border rounded-md"
                      value={selectedItem.stockQuantity || 0}
                      onChange={(e) => {
                        const quantity = parseInt(e.target.value);
                        let status = "In Stock";
                        if (quantity <= 0) status = "Out of Stock";
                        else if (quantity < 5) status = "Low Stock";

                        setSelectedItem({
                          ...selectedItem,
                          stockQuantity: quantity,
                          status: status,
                        });
                      }}
                    />
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Location
                    </label>
                    <input
                      type="text"
                      placeholder="Enter Storage Location"
                      className="mt-1 p-2 w-full border rounded-md"
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
                    <label className="block text-sm font-medium text-gray-600">
                      Status
                    </label>
                    <select
                      className="mt-1 p-2 w-full border rounded-md"
                      value={selectedItem.status || "In Stock"}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          status: e.target.value,
                        })
                      }
                    >
                      <option value="In Stock">In Stock</option>
                      <option value="Low Stock">Low Stock</option>
                      <option value="Out of Stock">Out of Stock</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-600">
                      Category
                    </label>
                    <select
                      className="mt-1 p-2 w-full border rounded-md"
                      value={selectedItem.categoryId || ""}
                      onChange={(e) =>
                        setSelectedItem({
                          ...selectedItem,
                          categoryId: e.target.value,
                        })
                      }
                    >
                      <option value="">Select Category</option>
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
                </div>
              </div>
            </form>

            <div className="flex gap-5 absolute bottom-5 right-5">
              <button
                onClick={closeModal}
                className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              >
                Cancel
              </button>
              <button
                onClick={handleSaveItem}
                className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                type="submit"
              >
                {selectedItem.id ? "Update" : "Add"}
              </button>
            </div>
          </div>
        </div>
      )}

      {isConfirmDeleteModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full">
            <h3 className="text-xl font-bold mb-4">Confirm Delete</h3>
            <p className="mb-6">
              Are you sure you want to delete the inventory item for "
              {selectedItem.title}"? This action cannot be undone.
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
    </div>
  );
};

export default TabInventory;
