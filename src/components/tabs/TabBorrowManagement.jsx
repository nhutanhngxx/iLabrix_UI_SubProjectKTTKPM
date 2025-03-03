import { useState } from "react";

const TabBorrowManagement = () => {
  const [borrowers, setBorrowers] = useState([
    {
      id: 1,
      name: "Nguyễn Văn A",
      book: "Clean Code",
      status: "Đang mượn",
      borrowDate: "2025-02-25",
      dueDate: "2025-03-10",
    },
    {
      id: 2,
      name: "Trần Thị B",
      book: "The Pragmatic Programmer",
      status: "Đã trả",
      borrowDate: "2025-02-10",
      dueDate: "2025-02-20",
    },
    {
      id: 3,
      name: "Lê Văn C",
      book: "JavaScript: The Good Parts",
      status: "Đang mượn",
      borrowDate: "2025-03-01",
      dueDate: "2025-03-15",
    },
  ]);

  const [statusUpdates, setStatusUpdates] = useState({});
  const [selectedBorrower, setSelectedBorrower] = useState(null);

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
    <div className="p-4">
      <h2 className="text-3xl items-center text-sky-900 font-bold mb-6">
        Manage book borrowing/returning
      </h2>
      <div className="overflow-x-auto">
        <table className="min-w-full border-gray-300">
          <thead>
            <tr className="bg-transparent">
              <th className="py-2 text-left">#</th>
              <th className="py-2 text-left">Borrower name</th>
              <th className="py-2 text-left">Borrowed books</th>
              <th className="py-2 text-left">Borrowed date</th>
              <th className="py-2 text-left">Refund date</th>
              <th className="py-2 text-left">Status</th>
              <th className="py-2 text-left"></th>
            </tr>
          </thead>
          <tbody className="space-y-2">
            {borrowers.map((user, index) => (
              <tr key={user.id} className="hover:bg-gray-50">
                <td className="py-2 text-left">{index + 1}</td>
                <td className="py-2 text-left">{user.name}</td>
                <td className="py-2 text-left">{user.book}</td>
                <td className="py-2 text-left">{user.borrowDate}</td>
                <td className="py-2 text-left">{user.dueDate}</td>
                <td className="py-2 text-left">
                  <span
                    className={
                      user.status === "Đang mượn"
                        ? "text-blue-500 font-bold"
                        : "text-red-500 font-bold"
                    }
                  >
                    {user.status}
                  </span>

                  {/* <select
                    value={statusUpdates[user.id] || user.status}
                    onChange={(e) =>
                      handleStatusChange(user.id, e.target.value)
                    }
                    className="border p-2 rounded bg-transparent"
                  >
                    <option value="Đang mượn">Đang mượn</option>
                    <option value="Đã trả">Đã trả</option>
                  </select> */}
                  {/* <span
                    className={
                      selectedBorrower.status === "Đang mượn"
                        ? "text-red-500"
                        : "text-green-500"
                    }
                  >
                    {selectedBorrower.status}
                  </span> */}
                </td>
                <td
                  className="py-2 text-left text-blue-600 cursor-pointer"
                  onClick={() => setSelectedBorrower(user)}
                >
                  View more
                </td>
                {/* <td
                  className="py-2 text-left text-green-600 cursor-pointer"
                  // onClick={() => handleUpdate(user.id)}
                  onClick={() => alert("Status update successful!")}
                >
                  Update
                </td> */}
              </tr>
            ))}
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
                  <option value="Đang mượn">Đang mượn</option>
                  <option value="Đã trả">Đã trả</option>
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
