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
            <div className="space-y-2">
              <div className="flex items-center">
                <label className="block text-gray-700 font-medium w-40">
                  User ID
                </label>
                <input
                  type="text"
                  placeholder="Enter User ID"
                  className="placeholder:italic font-extralight w-full px-3 bg-transparent py-2 border-b  focus:outline-none focus:ring-0 border-white focus:border-gray-200"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 font-medium w-40">
                  User Name
                </label>
                <input
                  type="text"
                  placeholder="Enter User Name"
                  className="placeholder:italic font-extralight w-full px-3 bg-transparent py-2 border-b focus:outline-none focus:ring-0 border-white focus:border-gray-200"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 font-medium w-40">
                  Book ID
                </label>
                <input
                  type="text"
                  placeholder="Enter Book ID"
                  className="placeholder:italic font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 font-medium w-40">
                  Book Name
                </label>
                <input
                  type="text"
                  placeholder="Enter Book Name"
                  className="placeholder:italic font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 font-medium w-40">
                  Publisher
                </label>
                <input
                  type="text"
                  placeholder="Enter Publisher"
                  className="placeholder:italic font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
                />
              </div>
            </div>

            {/* Cột 2 */}
            <div className="space-y-4">
              <div className="flex items-center">
                <label className="block text-gray-700 font-medium w-56">
                  Date
                </label>
                <input
                  type="date"
                  className="text-gray-400 font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
                />
              </div>
              <div className="flex items-center">
                <label className="block text-gray-700 font-medium w-56">
                  Date Return
                </label>
                <input
                  type="date"
                  className="text-gray-400 font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
                />
              </div>
              <div>
                <label className="block text-gray-700 font-medium w-56 pb-3">
                  Book Condition
                </label>
                <textarea
                  placeholder="Please mention the book condition, damages (if any...)"
                  className="w-full h-24 px-3 font-extralight py-2 bg-transparent border rounded-md focus:outline-none focus:ring-2 border-white focus:border-gray-200 resize-none placeholder:italic"
                />
              </div>
            </div>
          </div>

          {/* Button Submit */}
          <div className="mt-3 text-center absolute bottom-10">
            {/* <button className="py-2 px-5 bg-blue-600 text-white rounded-md hover:bg-blue-700">
              Check In
            </button> */}
            <button className="bg-gradient-to-r from-blue-800 to-purple-400 hover:from-purple-400 hover:to-blue-800 text-white font-semibold py-3 px-6 rounded-full shadow-lg transform hover:scale-105 transition duration-300 ease-in-out">
              BORROW BOOK
            </button>
          </div>
        </div>
      ) : (
        <div className="p-5 w-3/6 flex flex-col justify-between items-center">
          <div className="space-y-4">
            <div className="flex items-center">
              <label className="block text-gray-700 font-medium w-36">
                User ID
              </label>
              <input
                type="text"
                placeholder="Enter User ID"
                className="placeholder:italic font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-gray-700 font-medium w-36">
                Book ID
              </label>
              <input
                type="text"
                placeholder="Enter Book ID"
                className="placeholder:italic font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-gray-700 font-medium w-36">
                Date
              </label>
              <input
                type="date"
                className="text-gray-400 font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
              />
            </div>
            <div className="flex items-center">
              <label className="block text-gray-700 font-medium w-36">
                Date Return
              </label>
              <input
                type="date"
                className="text-gray-400 font-extralight w-full px-3 bg-transparent py-2 border-b border-white focus:outline-none focus:ring-0 focus:border-gray-200"
              />
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
