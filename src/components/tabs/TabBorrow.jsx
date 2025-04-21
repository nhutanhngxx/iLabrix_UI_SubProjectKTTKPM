import React, { useState } from "react";
import { Switch } from "@headlessui/react";

const TabBorrow = () => {
  const [isCheckIn, setIsCheckIn] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();
    setModalMessage(
      isCheckIn ? "Book borrowed successfully!" : "Book returned successfully!"
    );
    setShowModal(true);
  };

  return (
    <div className="text-lg font-medium flex flex-col items-center justify-center p-4">
      {/* Button chuyển đổi giữa Check In và Check Out */}
      <div className="flex items-center space-x-5">
        <div
          className={`${
            isCheckIn ? "text-blue-600 font-bold" : "text-gray-500"
          }`}
        >
          Borrow Book
        </div>

        <Switch
          checked={isCheckIn}
          onChange={setIsCheckIn}
          className={`relative inline-flex h-8 w-16 items-center rounded-full transition duration-300 ${
            isCheckIn ? "bg-blue-600" : "bg-gray-400"
          }`}
        >
          <span
            className={`inline-block h-6 w-6 transform rounded-full bg-white transition duration-300 ${
              isCheckIn ? "translate-x-9" : "translate-x-1"
            }`}
          />
        </Switch>

        <div
          className={`${
            !isCheckIn ? "text-red-600 font-bold" : "text-gray-500"
          }`}
        >
          Return Book
        </div>
      </div>

      {/* Form hiển thị dựa trên trạng thái */}
      {isCheckIn ? (
        <div className="mt-3 w-full flex flex-col justify-between items-center">
          <form onSubmit={handleSubmit}>
            {/* Layout 2 cột */}
            <div className="grid grid-cols-2 gap-20">
              {/* Cột 1 */}
              <div className="space-y-4">
                <div className="flex gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 w-40">
                      User ID
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter User ID"
                      className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 w-40">
                      User name
                    </label>
                    <input
                      readOnly
                      type="text"
                      placeholder="Enter User Name"
                      className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium pointer-events-none focus:outline-none placeholder:italic"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Book ID
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter Book ID"
                    className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Title Book
                  </label>
                  <input
                    readOnly
                    type="text"
                    placeholder="Title Book"
                    className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium pointer-events-none focus:outline-none placeholder:italic"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Publisher
                  </label>
                  <input
                    readOnly
                    type="text"
                    placeholder="Publisher"
                    className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium pointer-events-none focus:outline-none placeholder:italic"
                  />
                </div>
              </div>

              {/* Cột 2 */}
              <div className="space-y-4">
                <div className="">
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Borrowed date
                  </label>
                  <input
                    required
                    type="date"
                    className="mt-1 rounded-md text-sm w-full px-3 py-1.5 font-medium"
                  />
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Due date
                  </label>
                  <input
                    required
                    type="date"
                    className="mt-1 rounded-md text-sm w-full px-3 py-1.5 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Book Condition
                  </label>
                  <textarea
                    required
                    placeholder="Please mention the book condition, damages (if any...)"
                    rows={5}
                    className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                  />
                </div>
              </div>
            </div>

            {/* Button Submit */}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-blue-800 to-purple-400 hover:from-purple-400 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                BORROW BOOK
              </button>
            </div>
          </form>
        </div>
      ) : (
        <div className="mt-3 flex flex-col justify-between items-center">
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-4">
                <div className="flex gap-5">
                  <div>
                    <label className="block text-sm font-medium text-gray-600 w-40">
                      User ID
                    </label>
                    <input
                      required
                      type="text"
                      placeholder="Enter User ID"
                      className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-600 w-40">
                      Full name
                    </label>
                    <input
                      readOnly
                      type="text"
                      placeholder="Full name"
                      className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium pointer-events-none focus:outline-none placeholder:italic"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Book ID
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Enter Book ID"
                    className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Title Book
                  </label>
                  <input
                    readOnly
                    type="text"
                    placeholder="Title Book"
                    className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium pointer-events-none focus:outline-none placeholder:italic"
                  />
                </div>
              </div>
              <div className="space-y-4">
                <div className="">
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Date
                  </label>
                  <input
                    required
                    type="date"
                    className="mt-1 rounded-md text-sm w-full px-3 py-1.5 font-medium"
                  />
                </div>
                <div className="">
                  <label className="block text-sm font-medium text-gray-600 w-40">
                    Date Return
                  </label>
                  <input
                    required
                    type="date"
                    className="mt-1 rounded-md text-sm w-full px-3 py-1.5 font-medium"
                  />
                </div>
              </div>
            </div>
            {/* Button Submit */}
            <div className="flex justify-end mt-3">
              <button
                type="submit"
                className="bg-gradient-to-r from-red-600  to-orange-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out"
              >
                RETURN BOOK
              </button>
            </div>
          </form>
        </div>
      )}
      {/* Modal thông báo */}
      {showModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/30 rounded-lg">
          <div
            className="w-3/12 flex flex-col items-center justify-center text-center mx-auto relative overflow-hidden z-10 bg-white p-5 rounded-lg shadow-md 
        before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl 
        after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
          >
            <p className="text-lg font-semibold mb-4">{modalMessage}</p>
            <button
              onClick={() => setShowModal(false)}
              className="bg-blue-500 hover:bg-blue-700 text-white py-2 px-4 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBorrow;
