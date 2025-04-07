import { useState } from "react";

const allBorrowers = [
  {
    id: 1,
    name: "Nguyễn Văn A",
    book: "Clean Code",
    status: "Borrowing",
    borrowDate: "2025-02-25",
    dueDate: "2025-03-10",
  },
  {
    id: 2,
    name: "Trần Thị B",
    book: "The Pragmatic Programmer",
    status: "Returned",
    borrowDate: "2025-02-10",
    dueDate: "2025-02-20",
  },
  {
    id: 3,
    name: "Lê Văn C",
    book: "JavaScript: The Good Parts",
    status: "Borrowing",
    borrowDate: "2025-03-01",
    dueDate: "2025-03-15",
  },
  {
    id: 4,
    name: "Nguyễn Văn A",
    book: "Clean Code",
    status: "Borrowing",
    borrowDate: "2025-02-25",
    dueDate: "2025-03-10",
  },
  {
    id: 5,
    name: "Trần Thị B",
    book: "The Pragmatic Programmer",
    status: "Returned",
    borrowDate: "2025-02-10",
    dueDate: "2025-02-20",
  },
  {
    id: 6,
    name: "Lê Văn C",
    book: "JavaScript: The Good Parts",
    status: "Borrowing",
    borrowDate: "2025-03-01",
    dueDate: "2025-03-15",
  },
  {
    id: 7,
    name: "Nguyễn Văn A",
    book: "Clean Code",
    status: "Borrowing",
    borrowDate: "2025-02-25",
    dueDate: "2025-03-10",
  },
  {
    id: 8,
    name: "Trần Thị B",
    book: "The Pragmatic Programmer",
    status: "Returned",
    borrowDate: "2025-02-10",
    dueDate: "2025-02-20",
  },
  {
    id: 9,
    name: "Lê Văn C",
    book: "JavaScript: The Good Parts",
    status: "Borrowing",
    borrowDate: "2025-03-01",
    dueDate: "2025-03-15",
  },
  {
    id: 10,
    name: "Nguyễn Văn A",
    book: "Clean Code",
    status: "Borrowing",
    borrowDate: "2025-02-25",
    dueDate: "2025-03-10",
  },
  {
    id: 11,
    name: "Trần Thị B",
    book: "The Pragmatic Programmer",
    status: "Returned",
    borrowDate: "2025-02-10",
    dueDate: "2025-02-20",
  },
  {
    id: 12,
    name: "Lê Văn C",
    book: "JavaScript: The Good Parts",
    status: "Borrowing",
    borrowDate: "2025-03-01",
    dueDate: "2025-03-15",
  },
];

const TabBorrowManagement = () => {
  const [statusUpdates, setStatusUpdates] = useState({});
  const [selectedBorrower, setSelectedBorrower] = useState(null);

  const [borrowers, setBorrowers] = useState(allBorrowers);

  // Khi chọn trạng thái, cập nhật danh sách borrowers
  const handleFilterChange = (e) => {
    const selectedStatus = e.target.value;
    if (selectedStatus === "") {
      setBorrowers(allBorrowers);
    } else {
      setBorrowers(
        allBorrowers.filter((user) => user.status === selectedStatus)
      );
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setStatusUpdates((prev) => ({ ...prev, [id]: newStatus }));
  };

  const handleUpdate = (id) => {
    setBorrowers((prevBorrowers) =>
      prevBorrowers.map((user) =>
        user.id === id
          ? { ...user, status: statusUpdates[id] || user.status }
          : user
      )
    );
    setStatusUpdates((prev) => {
      const updated = { ...prev };
      delete updated[id];
      return updated;
    });
  };

  return (
    <div>
      <div className="flex justify-between items-center pb-4">
        <h2 className="text-3xl items-center text-sky-900 font-bold">
          Manage book borrowing/returning
        </h2>
        {/* Bộ lọc trạng thái */}
        <div className="w-[200px]">
          <label className="block text-xs mb-1 font-medium text-gray-600">
            Filter by Status
          </label>
          <select
            className="w-full border p-1 rounded-lg"
            onChange={handleFilterChange}
          >
            <option value="">All</option>
            <option value="Borrowing">Borrowing</option>
            <option value="Returned">Returned</option>
            <option value="Overdue">Overdue</option>
          </select>
        </div>

        {/* Search */}
        <div>
          <label className="block text-xs mt-1 font-medium text-gray-600">
            Search by keyword
          </label>
          <div className="flex items-center justify-center h-[40px]">
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
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-1 font-bold hover:opacity-80 rounded-tr-lg rounded-br-lg"
                ></input>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bảng hiển thị danh sách phiếu mượn */}
      <div className="overflow-auto max-h-[calc(100vh-300px)]">
        <table className="min-w-full border-collapse">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-2 px-4 text-left">STT</th>
              <th className="py-2 px-4 text-left">Borrower name</th>
              <th className="py-2 px-4 text-left">Borrowed books</th>
              <th className="py-2 px-4 text-left">Borrowed date</th>
              <th className="py-2 px-4 text-left">Refund date</th>
              <th className="py-2 px-4 text-left">Status</th>
              <th className="py-2 px-4 text-left"></th>
            </tr>
          </thead>
          <tbody>
            {borrowers.length > 0 ? (
              borrowers.map((user, index) => (
                <tr key={user.id} className="hover:bg-gray-50">
                  <td className="py-2 px-4">{index + 1}</td>
                  <td className="py-2 px-4">{user.name}</td>
                  <td className="py-2 px-4">{user.book}</td>
                  <td className="py-2 px-4">{user.borrowDate}</td>
                  <td className="py-2 px-4">{user.dueDate}</td>
                  <td className="py-2 px-4 text-left">
                    <span
                      className={`font-bold
                          ${user.status === "Borrowing" ? "text-blue-500" : ""}
                          ${user.status === "Returned" ? "text-green-500" : ""}
                          ${user.status === "Overdue" ? "text-red-500" : ""}`}
                    >
                      {user.status}
                    </span>
                  </td>

                  <td
                    className="py-2 px-4 text-left text-blue-600 cursor-pointer"
                    onClick={() => setSelectedBorrower(user)}
                  >
                    More
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="py-4 text-center text-gray-500">
                  No data available.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Modal hiển thị chi tiết */}
      {selectedBorrower && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50 rounded-lg">
          <div className="w-2/3 mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 className="text-3xl items-center text-sky-900 font-bold mb-6">
              Edit Borrower Details
            </h2>

            <div className="flex w-full gap-5">
              {/* Input Name */}
              <div className="mb-4 w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  Borrower name
                </label>
                <input
                  type="text"
                  value={selectedBorrower.name}
                  onChange={(e) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      name: e.target.value,
                    }))
                  }
                  className="border p-2 rounded mt-1 w-full"
                />
              </div>

              {/* Input Book */}
              <div className="mb-4 w-1/2">
                <label className="block text-sm font-medium text-gray-600">
                  Borrowed books
                </label>
                <input
                  type="text"
                  value={selectedBorrower.book}
                  onChange={(e) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      book: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded mt-1"
                />
              </div>
            </div>

            <div className="flex w-full gap-5">
              {/* Borrow Date */}
              <div className="mb-4 w-1/3">
                <label className="block text-sm font-medium text-gray-600">
                  Borrowed date
                </label>
                <input
                  type="date"
                  value={selectedBorrower.borrowDate}
                  onChange={(e) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      borrowDate: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded"
                />
              </div>

              {/* Due Date */}
              <div className="mb-4 w-1/3">
                <label className="block text-sm font-medium text-gray-600">
                  Refund date
                </label>
                <input
                  type="date"
                  value={selectedBorrower.dueDate}
                  onChange={(e) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      dueDate: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded"
                />
              </div>
              {/* Select Status */}
              <div className="mb-4 w-1/3">
                <label className="block text-sm font-medium text-gray-600">
                  Status
                </label>
                <select
                  value={selectedBorrower.status}
                  onChange={(e) =>
                    setSelectedBorrower((prev) => ({
                      ...prev,
                      status: e.target.value,
                    }))
                  }
                  className="w-full border p-2 rounded"
                >
                  <option value="Borrowing">Borrowing</option>
                  <option value="Returned">Returned</option>
                  <option value="Overdue">Overdue</option>
                </select>
              </div>
            </div>

            {/* Buttons */}
            <div className="flex justify-end space-x-4">
              <button
                className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                onClick={() => setSelectedBorrower(null)}
              >
                Close
              </button>
              <button
                className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                onClick={() => {
                  setBorrowers((prev) =>
                    prev.map((user) =>
                      user.id === selectedBorrower.id ? selectedBorrower : user
                    )
                  );
                  setSelectedBorrower(null);
                }}
              >
                Update
              </button>
              <button className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80">
                Print
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBorrowManagement;
