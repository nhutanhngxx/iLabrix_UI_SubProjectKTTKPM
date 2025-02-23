import { useState } from "react";
import UserItem from "../UserItem";

const TabUsers = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const users = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
  ];
  const usersPerPage = 4;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const [isShowModal, setIsShowModal] = useState(false);

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

  const startIndex = (currentPage - 1) * usersPerPage;
  const selectdUsers = users.slice(startIndex, startIndex + usersPerPage);

  const handleAddNewUser = () => {
    setIsShowModal(true);
  };

  return (
    <div className="text-lg font-medium">
      {/* Header */}
      <div className="flex items-center justify-end">
        <button
          className="bg-[#0CE346] text-white px-5 py-2 mx-1 rounded-[40px] text-sm"
          onClick={() => handleAddNewUser()}
        >
          Add New User
        </button>
      </div>

      {/* List Users */}
      <div className="grid grid-cols-2 gap-7 mt-4 h-3/5">
        {selectdUsers.map((user, index) => (
          <UserItem key={index} user={user} />
        ))}
      </div>

      {/* Paging Navigation */}
      <div className="text-base fixed bottom-1 left-6">
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

      {isShowModal && (
        // Model
        <div className="fixed inset-0 bg-black/20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center">
          {/* Form */}
          <div className="bg-white rounded-xl shadow-lg w-4/6 p-10 pb-14">
            <div className="text-center mb-6 text-3xl font-bold">
              Add New User
            </div>
            <div className="grid grid-cols-[1fr_2fr_1fr_2fr] gap-5 items-center text-lg">
              <label className="text-right font-semibold">User Name:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                type="text"
              />
              <label className="text-right font-semibold">Gender:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                type="text"
              />
              <label className="text-right font-semibold">Book ID:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                type="text"
              />
              <label className="text-right font-semibold">D.O.I:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                type="date"
              />
              <label className="text-right font-semibold">Adhaar ID:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                type="text"
              />
              <label className="text-right font-semibold">Email:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                type="email"
              />
              <label className="text-right font-semibold">D.O.B:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                type="date"
              />
              <label className="text-right font-semibold">Phone:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                type="tel"
              />
              <label className="text-right font-semibold">Address:</label>
              <input
                className="placeholder:italic w-full bg-transparent border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600 col-span-3"
                type="text"
              />
            </div>
          </div>

          {/* Button */}
          <div className="absolute bottom-24 flex gap-x-80 font-semibold text-lg">
            <button
              className="bg-[#FF0000] text-white px-10 py-1 mx-1 rounded-[40px]"
              onClick={() => alert("Delete user")}
            >
              Cancel
            </button>
            <button
              className="bg-[#0CE346] text-white px-10 py-1 mx-1 rounded-[40px]"
              onClick={() => alert("Submit user")}
            >
              Submit
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabUsers;
