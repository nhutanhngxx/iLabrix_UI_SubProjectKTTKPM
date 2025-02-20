import { useNavigate, Link } from "react-router-dom";

import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/Button";
import backgroundImg from "../assets/Background.png";

const IntroPage = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="flex items-center h-screen flex-col w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      {/* <div>
        <img src={iLabrixLogo} alt="iLabrix Logo" style={{height: 300}} />
      </div>
      <div className="flex mt-12 justify-between items-center w-[400px]">
        <Button onClick={handleSignIn}>Sign in</Button>
        <Button
          backgroundColor={"transparent"}
          textColor={"#fff"}
          onClick={handleRegister}
        >
          Register
        </Button>
      </div> */}

      {/* Header */}
      <div className="h-14 w-screen bg-transparent flex items-center border-b border-white">
        <div className="flex items-center justify-between w-full px-5">
          <div className="flex items-center text-white space-x-10">
            <img src={iLabrixLogo} alt="iLabrix Logo" style={{ height: 50 }} />
            <Link>Introduce</Link>
            <Link>News - Events</Link>
            <Link>Feature</Link>
            <Link>Support</Link>
          </div>
          <div className="flex items-center space-x-4 ml-auto flex-shrink-0 text-white">
            <Link>Sign Up</Link>
            <Link>Log In</Link>
          </div>
        </div>
        <div></div>
      </div>

      {/* Container */}
      <div className="flex flex-col items-center justify-center">
        {/* Banner */}
        <div className="w-2/3 flex flex-row h-screen justify-center items-center gap-4">
          {/* Image */}
          <div className="w-1/3 flex items-center justify-center">
            <img
              src={iLabrixLogo}
              alt="iLabrix Logo"
              style={{ height: 450, width: 450, border: "1px solid white" }}
            />
          </div>
          {/* Text */}
          <div className="w-2/3">
            <div className="font-bold text-6xl text-white mb-5">Tắt đèn</div>
            <div className="font-medium text-3xl text-white">NGÔ TẤT TỐ</div>
            <div className=" text-xl text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Saepe
              excepturi minus temporibus dicta, sed perspiciatis quisquam
              quibusdam sint neque explicabo laborum in esse voluptatem,
              consectetur expedita eum id velit dolores?
            </div>
            <button className="text-white text-2xl font-bold px-8 py-3 border rounded-xl border-white mt-5">
              Borrow more
            </button>
          </div>
        </div>

        {/* Introduce */}
        <div className="w-11/12 flex flex-col h-screen justify-center items-center bg-slate-400">
          <div className="flex justify-start w-full">
            <div className="text-8xl mb-20 text-white font-bold">Introduce</div>
          </div>
          <div className="flex flex-row justify-center items-center gap-10">
            <div className="w-1/2 text-2xl text-white p-8 border bg-white/30 backdrop-blur-md rounded-[20px]">
              <b>iLabrix</b> - Hệ thống quản lý mượn trả sách thông minh. Chào
              mừng bạn đến lới iLabrix, nền tảng quản lý mượn trả sách hiện đại,
              giúp sinh viên và giảng viên dễ dàng tiếp cận tài liệu học tập.
              Với giao diện thân thiện và công nghệ tiên tiến, chúng tôi mang
              đến một trải nghiệm mượn trả sách nhanh chóngm tiện lợi và minh
              bạch.
            </div>
            <div className="w-1/2 text-2xl text-white p-8 border bg-white/30 backdrop-blur-md rounded-[20px]">
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

        {/* Feature */}
        <div className="w-11/12 flex flex-row h-screen justify-center items-center">
          <div>Feature</div>
        </div>
        {/* News - Events */}
        <div className="w-11/12 flex flex-row h-screen justify-center items-center">
          <div>News - Events</div>
        </div>

        {/* Support */}
        <div className="w-11/12 flex flex-row h-screen justify-center items-center">
          <div>Support</div>
        </div>
      </div>
    </div>
  );
};

export default IntroPage;
