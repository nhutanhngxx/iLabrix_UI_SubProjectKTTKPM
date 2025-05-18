import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import iLabrixLogo from "../assets/iLibrary.png";
import backgroundImg from "../assets/Background.png";
import icon1x1 from "../assets/icon1x1.png";
import imamgePlaceholder from "../assets/No-Image-Placeholder.png";
import authService from "../services/authService";
import bookService from "../services/bookService";
import { useDispatch } from "react-redux";
import { logout } from "../redux/slice/userSlice";
import Loading from "../components/common/Loading";

const IntroPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userLocal = localStorage.getItem("user");
  const [user, setUser] = useState(userLocal ? JSON.parse(userLocal) : null);
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [books, setBooks] = useState([]);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);
  const currentBook = books[currentBookIndex];

  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [passwordError, setPasswordError] = useState("");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isChangePWModalOpen, setIsChangePWModalOpen] = useState(false);
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);

  const fetchBooks = async () => {
    try {
      const response = await bookService.getBooks();
      if (!response) {
        throw new Error("Lỗi khi lấy dữ liệu");
      }
      setBooks(response.slice(0, 5));
      setCurrentBookIndex(0);
    } catch (error) {
      console.error("Lỗi API:", error);
    }
  };
  useEffect(() => {
    fetchBooks();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleInputPasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({
      ...passwordData,
      [name]: value,
    });
  };

  const handleViewProfile = () => {
    setIsProfileModalOpen(true);
    setIsModalOpen(false);
  };

  const handleUpdateProfile = async () => {
    const updatedData = {
      fullName: user.fullName,
      email: user.email,
      userId: user.userId,
      username: user.username,
      role: user.role,
      passwordHash: "",
    };

    try {
      const res = await authService.updateProfile(updatedData);
      setUser((prev) => ({ ...prev, ...res }));
      setIsProfileModalOpen(false);
      if (res) {
        alert("Đã cập nhật thông tin người dùng thành công.");
      } else {
        alert("Không thể cập nhật thông tin người dùng.");
      }
    } catch (error) {
      alert("Không thể cập nhật thông tin người dùng.");
      console.log("Không thể cập nhật thông tin người dùng: ", error);
    }
  };

  // Mở modal đổi mật khẩu
  const handleChangePW = () => {
    setIsChangePWModalOpen(true);
    setIsModalOpen(false);
  };

  const handleChangePassword = async (e) => {
    e.preventDefault();
    setPasswordError("");

    // Kiểm tra mật khẩu mới và xác nhận mật khẩu
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setPasswordError("Mật khẩu mới và xác nhận mật khẩu không khớp");
      return;
    }

    // Kiểm tra độ dài mật khẩu
    if (passwordData.newPassword.length < 6) {
      setPasswordError("Mật khẩu mới phải có ít nhất 6 ký tự");
      return;
    }

    try {
      const res = await authService.changePassword(
        passwordData.currentPassword,
        passwordData.newPassword
      );

      if (!res) {
        throw new Error("Đổi mật khẩu thất bại");
      }

      // Xử lý thành công
      alert("Đổi mật khẩu thành công");
      setIsChangePWModalOpen(false);

      // Reset form
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      });
    } catch (error) {
      console.error("Lỗi đổi mật khẩu:", error);
      setPasswordError(error.message || "Không thể đổi mật khẩu");
    }
  };

  const handleLogout = () => {
    dispatch(logout());
    setUser(null);
    setIsModalOpen(false);
    navigate("/");
  };

  // Cuộn màn hình lên
  const handleScroll = () => {
    if (window.scrollY > window.innerHeight) {
      setShowScrollTopButton(true);
    } else {
      setShowScrollTopButton(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Thay đổi banner sách mỗi 5s hoặc khi nhấn nút Previous/Next
  useEffect(() => {
    if (books.length > 0) {
      const interval = setInterval(() => {
        setCurrentBookIndex((prevIndex) => (prevIndex + 1) % books.length);
      }, 5000);
      return () => clearInterval(interval);
    }
  }, [books.length]);
  const handleNextBook = () => {
    if (books.length > 0) {
      setCurrentBookIndex((prevIndex) => (prevIndex + 1) % books.length);
    }
  };

  const handlePrevBook = () => {
    if (books.length > 0) {
      setCurrentBookIndex(
        (prevIndex) => (prevIndex - 1 + books.length) % books.length
      );
    }
  };

  return (
    <div
      className="flex items-center flex-col bg-repeat-y bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Header */}
      <div className="h-20 w-screen backdrop-blur-md flex items-center fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between w-full px-5">
          <div className="flex items-center text-white space-x-10">
            <img src={iLabrixLogo} alt="iLabrix Logo" style={{ height: 50 }} />
            <a href="#introduce">Introduce</a>
            <a href="/home-page">Home Page</a>
            <a href="#news-events">News - Events</a>
            <a href="#feature">Feature</a>
            <a href="#support">Support</a>
          </div>
          {user ? (
            // User is logged in - show user info
            <div className="flex items-center space-x-4 mr-5">
              <div className="flex flex-col items-end">
                <span className="text-white font-medium">{user.fullName}</span>
              </div>
              <img
                src={icon1x1}
                className="w-10 h-10 rounded-full border cursor-pointer"
                alt="User Avatar"
                onClick={() => setIsModalOpen(true)}
              />
            </div>
          ) : (
            // User not logged in - show auth links
            <div className="flex items-center space-x-4 mr-5 ml-auto flex-shrink-0 text-white">
              <Link to="/register">Sign Up</Link>
              <Link to="/login">Log In</Link>
            </div>
          )}
        </div>
      </div>

      {/* Container */}
      <div className="flex flex-col items-center justify-center mt-14">
        {/* Banner */}
        <div
          id="banner"
          className="w-5/6 flex flex-row h-screen justify-center items-center relative"
        >
          <div className="w-1/12">
            <button
              className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
              title="Go Back"
              onClick={handlePrevBook}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                className="stroke-white/75 hover:stroke-white"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M11 6L5 12M5 12L11 18M5 12H19"
                ></path>
              </svg>
            </button>
          </div>

          <div className="w-3/5 flex items-center justify-center">
            {currentBook ? (
              <img
                src={currentBook.image_url || imamgePlaceholder}
                alt={currentBook.title || "Book cover"}
                style={{
                  height: 400,
                  width: 400,
                  borderWidth: 2,
                  borderColor: "white",
                  borderRadius: "20px",
                }}
              />
            ) : (
              <Loading />
            )}
          </div>

          <div className="w-11/12">
            <div className="font-bold text-6xl text-white mb-5">
              {currentBook?.title}
            </div>
            <div className="font-medium text-3xl text-white">
              {Array.isArray(currentBook?.author)
                ? currentBook.author.join(", ")
                : currentBook?.author}
            </div>
          </div>

          <div className="w-1/12">
            <button
              className="cursor-pointer duration-200 hover:scale-125 active:scale-100"
              title="Go Back"
              onClick={handleNextBook}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="50px"
                height="50px"
                viewBox="0 0 24 24"
                className="stroke-white/75 hover:stroke-white"
              >
                <path
                  strokeLinejoin="round"
                  strokeLinecap="round"
                  strokeWidth="1.5"
                  d="M13 6L19 12M19 12L13 18M19 12H5"
                ></path>
              </svg>
            </button>
          </div>
        </div>

        {/* Introduce */}
        <div
          id="introduce"
          className="w-11/12 flex flex-col h-screen justify-center items-center"
        >
          <div className="flex justify-start w-full">
            <div className="text-8xl mb-20 text-white font-bold">Introduce</div>
          </div>
          <div className="flex flex-row justify-center items-center gap-10">
            <div className="w-1/2 text-2xl text-white p-8 bg-black/25 backdrop-blur-md rounded-[20px]">
              <b>iLabrix</b> - Smart Library Management System. Welcome to
              iLabrix, a modern library management platform that helps students
              and teachers easily access educational resources. With a
              user-friendly interface and advanced technology, we bring a fast,
              convenient, and transparent borrowing experience.
            </div>
            <div className="w-1/2 text-2xl text-white p-8 bg-black/25 backdrop-blur-md rounded-[20px]">
              <b>Outstanding Features:</b>
              <ul className="list-none">
                <li>Online book inventory management.</li>
                <li>Quick book search by category, author.</li>
                <li>Support for online book renewal.</li>
                <li>Receive notifications when books are due soon.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* News - Events */}
        <div
          id="news-events"
          className="w-11/12 flex flex-col h-screen justify-center items-end"
        >
          <div className="text-8xl mb-20 text-white font-bold">
            News - Events
          </div>
          <div className="w-3/4 text-white p-8 bg-black/25 backdrop-blur-md rounded-[20px]">
            <div className="text-2xl">📢 News and events updates</div>
            <ul className="list-disc ml-5 text-2xl">
              <li>
                [20/02/2025] Workshop &quot;Digital Transformation in School
                Libraries&quot;
                <br /> Join this event to learn about applying technology in
                library management.
              </li>
              <li>
                [15/03/2025] Launch of pre-booking feature for popular books
                <br /> Help you reserve books that are in high demand.
              </li>
              <li>
                [01/04/2025] &quot;Borrow Books, Get Rewards&quot; Program
                <br /> Borrow books, earn points, and redeem attractive gifts
                today!
              </li>
            </ul>
          </div>
        </div>

        {/* Feature */}
        <div
          id="feature"
          className="w-11/12 flex flex-col h-screen justify-center items-start "
        >
          <div className="text-8xl mb-20 text-white font-bold">Feature</div>
          <div className=" text-white p-8 bg-black/25 backdrop-blur-md rounded-[20px]">
            <div>
              <div className="text-2xl">
                🔹Easy Book Borrowing and Returning
              </div>
              <ul className="list-disc ml-10 text-2xl">
                <li>Scan QR codes to borrow/return books quickly.</li>
                <li>Track your book borrowing history.</li>
              </ul>
            </div>
            <div>
              <div className="text-2xl">🔹Reserve Your Favorite Books</div>
              <ul className="list-disc ml-10 text-2xl">
                <li>Check availability and reserve books in advance.</li>
              </ul>
            </div>
            <div>
              <div className="text-2xl">
                🔹Personalized Book Recommendations
              </div>
              <ul className="list-disc ml-10 text-2xl">
                <li>AI system suggests books based on your reading history.</li>
              </ul>
            </div>
            <div>
              <div className="text-2xl">🔹Automatic Reminder Notifications</div>
              <ul className="list-disc ml-10 text-2xl">
                <li>Get alerts when books are due soon to avoid late fees.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Support */}
        <div
          id="support"
          className="w-11/12 flex flex-col h-screen justify-center items-center "
        >
          <div className="text-8xl mb-20 text-white font-bold">Support</div>
          <div className=" text-white text-2xl p-8 bg-black/25 backdrop-blur-md rounded-[20px]">
            <div className="flex flex-col">
              <span>
                ❓ <b>Need help?</b>
              </span>
              <span>
                📞 <b>Hotline:</b> 1900 1234
              </span>
              <span>
                📩 <b>Email:</b> support@ilabrix.com
              </span>
              <span>
                💬 <b>Live Chat:</b> Click on the right corner of the screen to
                chat with our support staff.
              </span>
            </div>
            <div className="flex flex-col mt-5">
              <div className="font-bold">Frequently Asked Questions:</div>
              <span>🔹 How to register an account?</span>
              <span>🔹 How to renew borrowed books?</span>
              <span>🔹 What to do when you lose a book?</span>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll to Top Button */}
      {showScrollTopButton && (
        <button
          onClick={scrollToTop}
          className="w-10 text-2xl fixed bottom-10 right-10 bg-blue-500 text-white p-3 rounded-full shadow-lg"
        >
          ↑
        </button>
      )}

      {/* Modal View profile */}
      {isProfileModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-w-md w-full mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 className="text-2xl items-center text-sky-900 font-bold mb-6">
              Your Profile
            </h2>

            <form method="post" action="#">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="name"
                >
                  Full Name
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  type="text"
                  name="fullName"
                  value={user?.fullName}
                  onChange={handleInputChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="email"
                >
                  Email Address
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  name="email"
                  id="email"
                  type="email"
                  value={user?.email}
                  onChange={handleInputChange}
                />
              </div>

              {/* <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="bio"
                >
                  Bio
                </label>
                <textarea
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  rows="3"
                  name="bio"
                  id="bio"
                  value={"Bio no yet"}
                ></textarea>
              </div> */}

              <div className="flex  justify-around">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                >
                  Close
                </button>

                <button
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                  type="button"
                  onClick={handleUpdateProfile}
                >
                  Update Profile
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Change password */}
      {isChangePWModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="max-w-md w-full mx-auto relative overflow-hidden z-10 bg-white p-8 rounded-lg shadow-md before:w-24 before:h-24 before:absolute before:bg-purple-500 before:rounded-full before:-z-10 before:blur-2xl after:w-32 after:h-32 after:absolute after:bg-sky-400 after:rounded-full after:-z-10 after:blur-xl after:top-24 after:-right-12">
            <h2 className="text-2xl items-center text-sky-900 font-bold mb-6">
              Change Password
            </h2>

            {passwordError && (
              <div className="bg-red-100 border-l-4 border-red-500 text-red-700 p-3 mb-4 rounded">
                <p className="font-medium">Lỗi</p>
                <p>{passwordError}</p>
              </div>
            )}

            <form method="post" action="#">
              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="currentPW"
                >
                  Current Password
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  type="password"
                  name="currentPassword"
                  id="currentPW"
                  value={passwordData.currentPassword}
                  onChange={handleInputPasswordChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="newPW"
                >
                  New Your password
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  type="password"
                  name="newPassword"
                  id="newPW"
                  value={passwordData.newPassword}
                  onChange={handleInputPasswordChange}
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600 "
                  htmlFor="confirmPW"
                >
                  Re-enter new your password
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  name="confirmPassword"
                  id="confirmPW"
                  type="password"
                  value={passwordData.confirmPassword}
                  onChange={handleInputPasswordChange}
                ></input>
              </div>

              <div className="flex  justify-around">
                <button
                  onClick={() => {
                    setIsChangePWModalOpen(false);
                    setPasswordError();
                    setPasswordData({
                      currentPassword: "",
                      newPassword: "",
                      confirmPassword: "",
                    });
                  }}
                  className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                >
                  Close
                </button>

                <button
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                  type="button"
                  onClick={handleChangePassword}
                >
                  Change Passowrd
                </button>
              </div>
            </form>
          </div>
          {/* Modal Change password */}
        </div>
      )}

      {/* Modal User */}
      {isModalOpen && (
        <div
          className="fixed -inset-5 bg-black bg-opacity-30 backdrop-blur-sm z-50 flex justify-end pr-10 pt-24 transition-opacity duration-300"
          onClick={() => setIsModalOpen(false)}
        >
          <div
            className="flex flex-col items-center justify-center bg-white shadow-lg rounded-lg w-auto min-w-[12rem] max-w-sm min-h-[4rem] max-h-[15rem] p-4 overflow-y-auto transition-transform duration-300 scale-95 hover:scale-100"
            onClick={(e) => e.stopPropagation()} // Ngăn sự kiện click đóng modal khi bấm vào bên trong
          >
            <ul className="space-y-2">
              <li>
                <button
                  onClick={handleViewProfile}
                  className="text-blue-500 hover:bg-gray-100 hover:backdrop-blur-md px-3 py-2 rounded-md transition-all duration-200"
                >
                  View Profile
                </button>
              </li>
              <li>
                <button
                  onClick={handleChangePW}
                  className="text-blue-500 hover:bg-gray-100 hover:backdrop-blur-md px-3 py-2 rounded-md transition-all duration-200"
                >
                  Change Password
                </button>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 font-medium hover:bg-red-100 px-3 py-2 rounded-md transition-all duration-200"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default IntroPage;
