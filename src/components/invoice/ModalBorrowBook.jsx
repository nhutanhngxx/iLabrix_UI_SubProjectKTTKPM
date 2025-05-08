import { useEffect, useState } from "react";
import PropTypes from "prop-types";

const ModalBorrowBook = ({ book, isOpen, onClose, onBorrow }) => {
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  // Tính số ngày mượn
  const getDays = () => {
    if (!fromDate || !toDate) return 0;
    const from = new Date(fromDate);
    const to = new Date(toDate);
    const diff = (to - from) / (1000 * 60 * 60 * 24);
    return diff >= 0 ? diff + 1 : 0;
  };

  useEffect(() => {
    const today = new Date().toISOString().split("T")[0];
    setFromDate(today);
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-blue-600">Borrow Book</h2>

        {/* Thông tin sách */}
        <div className="mb-4">
          <div className="mb-2">
            <span className="font-semibold">Title:</span> {book.title}
          </div>
          <div className="mb-2">
            <span className="font-semibold">Author:</span> {book.author}
          </div>
        </div>

        {/* Chọn ngày mượn */}
        <div className="mb-4">
          <div className="font-semibold mb-2">Borrow date:</div>
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-2">
              <label className="w-24">From date:</label>
              <input
                type="date"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={new Date().toISOString().split("T")[0]}
              />
            </div>
            <div className="flex items-center gap-2">
              <label className="w-24">Due date:</label>
              <input
                type="date"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
                className="flex-1 p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                min={fromDate || new Date().toISOString().split("T")[0]}
              />
            </div>
          </div>
        </div>

        {/* Số ngày mượn */}
        <div className="mb-6">
          <span className="font-semibold">Borrowing period:</span>{" "}
          <span className="text-blue-600 font-bold">{getDays()} days</span>
        </div>

        {/* Buttons */}
        <div className="flex justify-end gap-3">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600 transition-colors"
          >
            Cancel
          </button>
          <button
            onClick={() => onBorrow({ fromDate, toDate, days: getDays() })}
            disabled={!fromDate || !toDate || getDays() === 0}
            className="px-4 py-2 bg-[#CC9933] text-white rounded-md hover:bg-[#b38a2e] transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
          >
            Borrow
          </button>
        </div>
      </div>
    </div>
  );
};
ModalBorrowBook.propTypes = {
  book: PropTypes.shape({
    title: PropTypes.string.isRequired,
    author: PropTypes.string.isRequired,
  }).isRequired,
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onBorrow: PropTypes.func.isRequired,
};

export default ModalBorrowBook;
