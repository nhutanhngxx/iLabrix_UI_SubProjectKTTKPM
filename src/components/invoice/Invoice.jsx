import logo from "../../../src/assets/iLibrary.png";
import PropTypes from "prop-types";

const Invoice = ({ borrower }) => {
  const currentDate = new Date().toLocaleString();

  return (
    <div className="mx-auto p-10 text-black bg-white shadow-lg border border-gray-300 rounded-md text-[16px] leading-relaxed">
      {/* Header */}
      <div className="text-center mb-8">
        <img src={logo} alt="iLabrix Logo" className="mx-auto h-20" />
        <h1 className="text-4xl font-bold text-indigo-700 tracking-wide mb-2">
          iLabrix Library System
        </h1>
        <p className="text-sm text-gray-600">
          12 Nguyen Van Bao, Ward 4, Go Vap District, Ho Chi Minh City
        </p>
        <p className="text-sm text-gray-600">
          Email: <span>support@ilabrix.com</span> | Phone: (012) 345-6789
        </p>
      </div>

      <hr className="my-6 border-gray-300" />

      {/* Title */}
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-800 uppercase tracking-wide mb-2">
          Borrow Invoice
        </h2>
        <p className="text-sm text-gray-500">Issued on: {currentDate}</p>
      </div>

      {/* Borrower Info */}
      <div className="px-10 text-gray-800">
        <p>
          <strong>Name:</strong> {borrower.name}
        </p>
        <p>
          <strong>Book:</strong> {borrower.book}
        </p>
        <p>
          <strong>Borrow Date:</strong> {borrower.borrowDate}
        </p>
        <p>
          <strong>Due Date:</strong> {borrower.dueDate}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              borrower.status === "Returned"
                ? "text-green-600"
                : borrower.status === "Overdue"
                ? "text-red-600"
                : "text-yellow-600"
            }`}
          >
            {borrower.status}
          </span>
        </p>
      </div>

      {/* Librarian Info */}
      <div className="px-10 mt-10">
        <p>
          <strong>Librarian:</strong> Nguyễn Nhựt Anh
        </p>
        <p>
          <strong>Position:</strong> Head Librarian
        </p>
        <p>
          <strong>Signature:</strong> ____________________________
        </p>
      </div>

      {/* Footer */}
      <div className="mt-12 text-center text-sm text-gray-500 border-t pt-6">
        <p>
          Thank you for choosing{" "}
          <span className="font-semibold text-indigo-600">iLabrix</span>. Please
          return books on time to avoid penalties.
        </p>
      </div>
    </div>
  );
};

Invoice.propTypes = {
  borrower: PropTypes.shape({
    name: PropTypes.string.isRequired,
    book: PropTypes.string.isRequired,
    borrowDate: PropTypes.string.isRequired,
    dueDate: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }).isRequired,
};

export default Invoice;
