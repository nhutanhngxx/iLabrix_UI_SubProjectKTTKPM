import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import iLabrixLogo from "../assets/iLibrary.png";
import backgroundImg from "../assets/Background.png";
import book3 from "../assets/3.png";
import book5 from "../assets/5.png";

const books = [
  {
    title: "Dế mèn phiêu lưu ký",
    author: "Tô Hoài",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi minus temporibus dicta, sed perspiciatis quisquam quibusdam sint neque explicabo laborum in esse voluptatem.",
    image: book5,
  },
  {
    title: "Chí Phèo",
    author: "NAM CAO",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe excepturi minus temporibus dicta, sed perspiciatis quisquam quibusdam sint neque explicabo laborum in esse voluptatem.",
    image: book3,
  },
];

const IntroPage = () => {
  const navigate = useNavigate();
  const [showScrollTopButton, setShowScrollTopButton] = useState(false);
  const [currentBookIndex, setCurrentBookIndex] = useState(0);

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
    const interval = setInterval(() => {
      setCurrentBookIndex((prevIndex) => (prevIndex + 1) % books.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleNextBook = () => {
    setCurrentBookIndex((prevIndex) => (prevIndex + 1) % books.length);
  };

  const handlePrevBook = () => {
    setCurrentBookIndex(
      (prevIndex) => (prevIndex - 1 + books.length) % books.length
    );
  };

  const currentBook = books[currentBookIndex];

  return (
    <div
      className="flex items-center flex-col w-screen bg-repeat-y bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Header */}
      <div className="h-20 w-screen backdrop-blur-md flex items-center fixed top-0 left-0 z-10">
        <div className="flex items-center justify-between w-full px-5">
          <div className="flex items-center text-white space-x-10">
            <img src={iLabrixLogo} alt="iLabrix Logo" style={{ height: 50 }} />
            <a href="#introduce">Introduce</a>
            <a
              onClick={() => navigate("/user-page")}
              className="cursor-pointer"
            >
              All books
            </a>
            <a href="#news-events">News - Events</a>
            <a href="#feature">Feature</a>
            <a href="#support">Support</a>
          </div>
          <div className="flex items-center space-x-4 mr-5 ml-auto flex-shrink-0 text-white">
            <Link to="/register">Sign Up</Link>
            <Link to="/login">Log In</Link>
          </div>
        </div>
      </div>

      {/* Container */}
      <div className="flex flex-col items-center justify-center mt-14">
        {/* Banner */}
        <div
          id="banner"
          className="w-5/6 flex flex-row h-screen justify-center items-center relative"
        >
          {/* Previous Button */}
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
          {/* Image */}
          <div className="w-3/5 flex items-center justify-center">
            <img
              src={currentBook.image}
              alt={currentBook.title}
              style={{ height: 400, width: 400 }}
            />
          </div>
          {/* Text */}
          <div className="w-11/12">
            <div className="font-bold text-6xl text-white mb-5">
              {currentBook.title}
            </div>
            <div className="font-medium text-3xl text-white">
              {currentBook.author}
            </div>
            <div className="text-xl text-white">{currentBook.description}</div>
          </div>
          {/* Next Button */}
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
              <b>iLabrix</b> - Hệ thống quản lý mượn trả sách thông minh. Chào
              mừng bạn đến với iLabrix, nền tảng quản lý mượn trả sách hiện đại,
              giúp sinh viên và giảng viên dễ dàng tiếp cận tài liệu học tập.
              Với giao diện thân thiện và công nghệ tiên tiến, chúng tôi mang
              đến một trải nghiệm mượn trả sách nhanh chóng, tiện lợi và minh
              bạch.
            </div>
            <div className="w-1/2 text-2xl text-white p-8 bg-black/25 backdrop-blur-md rounded-[20px]">
              <b>Tính năng nổi bật:</b>
              <ul className="list-none">
                <li>Quản lý kho sách trực tuyến.</li>
                <li>Tìm kiếm sách nhanh chóng theo danh mục, tác giả.</li>
                <li>Hỗ trợ gia hạn sách trực tuyến.</li>
                <li>Nhận thông báo khi sách sắp đến hạn trả.</li>
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
            <div className="text-2xl">
              📢 Cập nhật tin tức & sự kiện quan trọng
            </div>
            <ul className="list-disc ml-5 text-2xl">
              <li>
                [20/02/2025] Hội thảo &quot;Chuyển đổi số trong thư viện trường
                học&quot;
                <br /> Tham gia sự kiện để tìm hiểu về cách ứng dụng công nghệ
                vào quản lý thư viện.
              </li>
              <li>
                [15/03/2025] Ra mắt tính năng đặt chỗ trước cho sách hot <br />
                Giúp bạn giữ chỗ trước cho những cuốn sách đang được nhiều người
                mượn.
              </li>
              <li>
                [01/04/2025] Chương trình &quot;Mượn sách nhận quà&quot; <br />{" "}
                Mượn sách, tích điểm và đổi quà hấp dẫn ngay hôm nay!
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
              <div className="text-2xl">🔹Mượn và trả sách dễ dàng</div>
              <ul className="list-disc ml-10 text-2xl">
                <li>Quét mã QR để mượn/trả sách nhanh chóng.</li>
                <li>Theo dõi lịch sử mượn sách của bạn.</li>
              </ul>
            </div>
            <div>
              <div className="text-2xl">🔹Đặt trước sách yêu thích</div>
              <ul className="list-disc ml-10 text-2xl">
                <li>Kiểm tra số lượng sách còn lại và đặt chỗ trước.</li>
              </ul>
            </div>
            <div>
              <div className="text-2xl">🔹Gợi ý sách theo sở thích</div>
              <ul className="list-disc ml-10 text-2xl">
                <li>Hệ thông AI đề xuất sách dựa trên lịch sử đọc của bạn.</li>
              </ul>
            </div>
            <div>
              <div className="text-2xl">🔹Thông báo nhắc nhở tự động</div>
              <ul className="list-disc ml-10 text-2xl">
                <li>Cảnh báo khi sách sắp đến hạn trả để tránh phí trễ hạn.</li>
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
                ❓ <b>Bạn cần giúp đỡ?</b>
              </span>
              <span>
                📞 <b>Hotline:</b> 1900 1234
              </span>
              <span>
                📩 <b>Email:</b> support@ilabrix.com
              </span>
              <span>
                💬 <b>Live Chat:</b> Nhấn vào góc phải màn hình để trò chuyện
                với nhân viên hỗ trợ.
              </span>
            </div>
            <div className="flex flex-col mt-5">
              <div className="font-bold">Câu hỏi thường gặp:</div>
              <span>🔹 Làm thế nào để đăng ký tài khoản?</span>
              <span>🔹 Cách gia hạn sách mượn?</span>
              <span>🔹 Phải làm gì khi làm mất sách?</span>
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
    </div>
  );
};

export default IntroPage;
