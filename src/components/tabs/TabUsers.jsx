import { useState } from "react";
import UserItem from "../items/UserItem";

const TabUsers = () => {
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
  ];
  const [userData, setUserData] = useState({
    userName: "",
    gender: "",
    bookId: "",
    doi: "",
    adhaarId: "",
    email: "",
    dob: "",
    phone: "",
    address: "",
  });
  const [currentPage, setCurrentPage] = useState(1);
  const usersPerPage = 4;
  const totalPages = Math.ceil(users.length / usersPerPage);
  const startIndex = (currentPage - 1) * usersPerPage;
  const selectdUsers = users.slice(startIndex, startIndex + usersPerPage);
  const [isShowModal, setIsShowModal] = useState(false);
  // Hàm chuyển trang theo số trang
  const goToPage = (page) => {
    if (page >= 1 && page <= totalPages) setCurrentPage(page);
  };
  // Hàm render số trang
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
  // Hàm mở và đóng modal
  const handleOpenModal = () => {
    setIsShowModal(true);
  };
  const handleCloseModal = () => {
    setIsShowModal(false);
  };
  // Hàm xử lý thay đổi giá trị input
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData({ ...userData, [name]: value });
  };
  // Hàm xử lý submit form
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(userData);
    users.push(userData);
    setUserData({
      userName: "",
      gender: "",
      bookId: "",
      doi: "",
      adhaarId: "",
      email: "",
      dob: "",
      phone: "",
      address: "",
    });
    setIsShowModal(false);
  };
  // Hàm xử lý hủy form
  const handleCancel = () => {
    setUserData({
      userName: "",
      gender: "",
      bookId: "",
      doi: "",
      adhaarId: "",
      email: "",
      dob: "",
      phone: "",
      address: "",
    });
    setIsShowModal(false);
  };

  return (
    <div className="text-lg p-2">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        {/* Search */}
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
        {/* Button add new User */}
        <button
          onClick={() => handleOpenModal()}
          title="Add New"
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

      {/* List Users */}
      <div className="grid grid-cols-2 gap-7 h-3/5">
        {selectdUsers.map((user, index) => (
          <UserItem key={index} user={user} />
        ))}
      </div>

      {/* Paging Navigation */}
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

      {isShowModal && (
        // Model
        <div
          onClick={handleCloseModal}
          className="fixed inset-0 bg-black/20 backdrop-blur-md shadow-lg rounded-xl flex items-center justify-center"
        >
          {/* Form */}
          <div
            onClick={(e) => e.stopPropagation()}
            // className="p-5 bg-white rounded-xl shadow-lg w-4/6"
            className="w-4/6 mx-auto relative overflow-hidden z-10 bg-white p-5 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12"
          >
            <div className="text-3xl text-center font-bold mb-4 text-sky-900">
              ADD NEW USER
            </div>
            <div className="grid grid-cols-2 gap-20">
              <div className="space-y-2">
                {/* <label className="text-right font-semibold">User Name:</label> */}
                <input
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="text"
                  name="userName"
                  placeholder="Enter Use name"
                  value={userData.userName}
                  onChange={handleChange}
                />
                {/* <label className="text-right font-semibold">Gender:</label> */}
                <input
                  placeholder="Enter Gender"
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="text"
                  name="gender"
                  value={userData.gender}
                  onChange={handleChange}
                />
                {/* <label className="text-right font-semibold">Book ID:</label> */}
                <input
                  placeholder="Enter Book ID"
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="text"
                  name="bookId"
                  value={userData.bookId}
                  onChange={handleChange}
                />
                {/* <label className="text-right font-semibold">D.O.I:</label> */}
                <input
                  placeholder="Enter D.O.I"
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="date"
                  name="doi"
                  value={userData.doi}
                  onChange={handleChange}
                />
                {/* <label className="text-right font-semibold">Adhaar ID:</label> */}
                <input
                  placeholder="Enter Adhaar ID"
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="text"
                  name="adhaarId"
                  value={userData.adhaarId}
                  onChange={handleChange}
                />
              </div>
              <div className="space-y-2">
                {/* <label className="text-right font-semibold">Email:</label> */}
                <input
                  placeholder="Enter email"
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="email"
                  name="email"
                  value={userData.email}
                  onChange={handleChange}
                />
                {/* <label className="text-right font-semibold">D.O.B:</label> */}
                <input
                  placeholder="Enter D.O.B"
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="date"
                  name="dob"
                  value={userData.dob}
                  onChange={handleChange}
                />
                {/* <label className="text-right font-semibold">Phone:</label> */}
                <input
                  placeholder="Enter number phone"
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="tel"
                  name="phone"
                  value={userData.phone}
                  onChange={handleChange}
                />
                {/* <label className="text-right font-semibold">Address:</label> */}
                <input
                  placeholder="Enter address"
                  className="w-full px-3 bg-transparent py-2 border-b border-blue-400 focus:outline-none focus:ring-0 focus:border-blue-600"
                  type="text"
                  name="address"
                  value={userData.address}
                  onChange={handleChange}
                />
              </div>
            </div>
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setIsShowModal(false)}
                className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
              >
                Close
              </button>
              <button
                className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                type="submit"
              >
                Add new user
              </button>
            </div>
          </div>

          {/* Buttons */}
          {/* <div className="absolute bottom-24 flex gap-x-80 font-semibold text-lg">
            <button
              className="bg-[#FF0000] text-white px-10 py-1 mx-1 rounded-[40px]"
              onClick={handleCancel}
              type="reset"
            >
              Cancel
            </button>
            <button
              className="bg-[#0CE346] text-white px-10 py-1 mx-1 rounded-[40px]"
              onClick={handleSubmit}
              type="submit"
            >
              Submit
            </button>
          </div> */}
        </div>
      )}
    </div>
  );
};

export default TabUsers;
