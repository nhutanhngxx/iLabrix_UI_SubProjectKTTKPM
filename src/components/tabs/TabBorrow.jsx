import { useState } from "react";
import { Switch } from "@headlessui/react";

const TabBorrow = () => {
  const [isCheckIn, setIsCheckIn] = useState(true);

  return (
    <div className="text-lg font-medium flex flex-col items-center justify-center space-y-6 p-4">
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
        <div className="p-5 w-full flex flex-col justify-between items-center">
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
                    type="text"
                    placeholder="Enter User Name"
                    className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 w-40">
                  Book ID
                </label>
                <input
                  type="text"
                  placeholder="Enter Book ID"
                  className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 w-40">
                  Book Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Book Name"
                  className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 w-40">
                  Publisher
                </label>
                <input
                  type="text"
                  placeholder="Enter Publisher"
                  className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
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
                  type="date"
                  className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-600 w-40">
                  Due date
                </label>
                <input
                  type="date"
                  className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-600 w-40">
                  Book Condition
                </label>
                <textarea
                  placeholder="Please mention the book condition, damages (if any...)"
                  rows={4}
                  className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Button Submit */}
          <div className="mt-3 text-center absolute bottom-10">
            {/* <button className="py-2 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Check In
            </button> */}
            <button className="bg-gradient-to-r from-blue-800 to-purple-400 hover:from-purple-400 hover:to-blue-800 text-white font-medium py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              BORROW BOOK
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 w-3/6 flex flex-col justify-between items-center">
          <div className="grid grid-cols-2 gap-20">
            <div className="space-y-4">
              <div className="">
                <label className="block text-sm font-medium text-gray-600 w-40">
                  User ID
                </label>
                <input
                  type="text"
                  placeholder="Enter User ID"
                  className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-600 w-40">
                  Book ID
                </label>
                <input
                  type="text"
                  placeholder="Enter Book ID"
                  className="mt-1 rounded-md text-sm w-full px-3 py-2 font-medium"
                />
              </div>
            </div>
            <div className="space-y-4">
              <div className="">
                <label className="block text-sm font-medium text-gray-600 w-40">
                  Date
                </label>
                <input
                  type="date"
                  className="mt-1 rounded-md text-sm w-full px-3 py-1.5 font-medium"
                />
              </div>
              <div className="">
                <label className="block text-sm font-medium text-gray-600 w-40">
                  Date Return
                </label>
                <input
                  type="date"
                  className="mt-1 rounded-md text-sm w-full px-3 py-1.5 font-medium"
                />
              </div>
            </div>
          </div>

          {/* Button Submit */}
          <div className="mt-8 text-center absolute bottom-10">
            {/* <button className="px-5 py-2 bg-red-600 text-white rounded-md hover:bg-red-700">
              Check Out
            </button> */}
            <button className="bg-gradient-to-r from-red-600  to-orange-500 hover:from-orange-500 hover:to-red-600 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              RETURN BOOK
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default TabBorrow;
