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
          className={`px-3 py-1 mx-1 rounded ${currentPage === page ? "font-bold underline" : "text-gray-700"
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
    alert("Add New User");
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
    </div>
  );
};

export default TabUsers;
