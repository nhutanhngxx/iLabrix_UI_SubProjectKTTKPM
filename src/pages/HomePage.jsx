import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";

import backgroundImg from "../assets/Background.png";
import logoHorizontal from "../assets/iLibrary.png";
import avt from "../assets/react.svg";

import TabBooks from "../components/tabs/TabBooks";
import TabBorrow from "../components/tabs/TabBorrow";
import TabDashboard from "../components/tabs/TabDashboard";
import TabBorrrowManagement from "../components/tabs/TabBorrowManagement";
import TabUsers from "../components/tabs/TabUsers";

import checkInOutIcon from "/icons/check-in-out.png";
import bookIcon from "/icons/book.png";
import usersIcon from "/icons/users.png";
import dashboardIcon from "/icons/dashboard.png";
import managementIcon from "/icons/management.png";

import { logout } from "../redux/slice/userSlice";

import { mockUsers } from "../mock/mockData";

// Danh sách các tab
const tabs = [
  {
    id: "tab4",
    label: "Dashboard",
    component: <TabDashboard />,
    path: "/dashboard",
    icon: dashboardIcon,
  },
  {
    id: "tab1",
    label: "Dashboard",
    component: <TabDashboard />,
    path: "/dashboard",
    icon: dashboardIcon,
  },
  {
    id: "tab2",
    label: "Borrow Book",
    component: <TabBorrow />,
    path: "/check-in-out",
    icon: checkInOutIcon,
  },
  {
    id: "tab3",
    label: "Books",
    component: <TabBooks />,
    path: "/books",
    icon: bookIcon,
  },
  {
    id: "tab4",
    label: "Users",
    component: <TabUsers />,
    path: "/users",
    icon: usersIcon,
  },
  {
    id: "tab5",
    label: "Borrow Management",
    component: <TabBorrrowManagement />,
    path: "/management",
    icon: managementIcon,
  },
];

// Component hiển thị thời gian hiện tại
const CurrentDateTime = () => {
  const [currentDateTime, setCurrentDateTime] = useState({
    date: "",
    time: "",
  });

  useEffect(() => {
    const updateTime = () => {
      const currentDate = new Date();
      setCurrentDateTime({
        date: currentDate.toLocaleDateString(),
        time: currentDate.toLocaleTimeString(),
      });
    };
    const interval = setInterval(updateTime, 1000);
    updateTime();
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex gap-4">
      <span>{currentDateTime.date}</span>
      <span>{currentDateTime.time}</span>
    </div>
  );
};

const HomePage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userStored = useSelector((state) => state.user);
  console.log(userStored);

  const [user, setUser] = useState(mockUsers[0]);
  const [activeTab, setActiveTab] = useState("tab4");
  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [isChangePWModalOpen, setIsChangePWModalOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchProfile = async () => {
      const token = localStorage.getItem("accessToken");
      const user_id = localStorage.getItem("user_id");
      try {
        const respone = await fetch(
          "http://localhost:3001/users/profile/" + user_id,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        if (respone.ok) {
          const data = await respone.json();
          setUser(data);
        } else {
          console.log("Error fetching profile");
        }
      } catch (error) {
        console.log(error);
      }
    };
    fetchProfile();
  }, []);

  const handleViewProfile = () => {
    setIsProfileModalOpen(true);
    setIsModalOpen(false);
  };
  const handleChangePW = () => {
    setIsChangePWModalOpen(true);
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUser((prevUser) => ({ ...prevUser, [name]: value }));
  };

  const handleUserClick = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate("/");
  };

  return (
    <div
      className="flex flex-col h-screen w-screen bg-cover bg-center bg-fixed"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      {/* Thanh Status (Header) */}
      <div className="flex items-center w-full px-10 py-5 bg-transparent">
        <div className="flex items-center justify-between w-full">
          <div className="flex items-center space-x-10">
            {/* Logo */}
            <img src={logoHorizontal} className="w-1/5" alt="iLabrix Logo" />

            {/* Thời gian */}
            <div className="text-lg font-semibold text-white">
              <CurrentDateTime />
            </div>
          </div>

          {/* Thông tin người dùng */}
          <div
            onClick={handleUserClick}
            className="flex items-center space-x-4 ml-auto flex-shrink-0 cursor-pointer"
          >
            <div className="flex flex-col items-end">
              <span className="text-white font-medium">
                {mockUsers[0]?.fullName}
              </span>
              <span className="text-white opacity-75">
                {mockUsers[0]?.role}
              </span>
            </div>
            <img
              src={avt}
              className="w-10 h-10 rounded-full border"
              alt="User Avatar"
            />
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
                    <hr />
                    <li>
                      <button className="text-red-500 font-medium hover:bg-gray-100 hover:backdrop-blur-md px-3 py-2 rounded-md transition-all duration-200">
                        Delete Account
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
        </div>
      </div>

      {/* Wrapper Pills Tab */}
      <div className="flex flex-1 px-5 pb-5">
        {/* Tabs Điều Hướng */}
        <div className="w-1/6 h-fit rounded-2xl bg-white/30 backdrop-blur-md shadow-lg p-3 flex flex-col justify-start space-y-2 mr-6 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-2 py-5 text-left rounded-lg flex items-center gap-2 transition-all
                ${
                  activeTab === tab.id
                    ? "bg-transparent text-orange-600 font-semibold shadow-md"
                    : "bg-transparent text-gray-600 hover:bg-gray-300"
                }`}
            >
              <img src={tab.icon} className="w-6 h-6" alt={tab.label} />
              {tab.label}
            </button>
          ))}
        </div>

        {/* Nội dung Tab */}
        <div className="flex-1 p-6 bg-white/50 backdrop-blur-md shadow-lg rounded-xl">
          {tabs.map(
            (tab) =>
              activeTab === tab.id && <div key={tab.id}>{tab.component}</div>
          )}
        </div>
      </div>

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

              <div className="mb-4">
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
              </div>

              <div className="flex  justify-around">
                <button
                  onClick={() => setIsProfileModalOpen(false)}
                  className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                >
                  Close
                </button>

                <button
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                  type="submit"
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
                />
              </div>

              <div className="mb-4">
                <label
                  className="block text-sm font-medium text-gray-600"
                  htmlFor="email"
                >
                  New Your password
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  name="newPW"
                  id="newPW"
                  type="password"
                />
              </div>

              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-600">
                  Re-enter new your password
                </label>
                <input
                  className="mt-1 p-2 w-full border rounded-md font-medium"
                  name="rePW"
                  id="rePW"
                  type="password"
                ></input>
              </div>

              <div className="flex  justify-around">
                <button
                  onClick={() => setIsChangePWModalOpen(false)}
                  className="[background:linear-gradient(144deg,#ff4d4d,#ff1a1a_50%,#cc0000)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                >
                  Close
                </button>

                <button
                  className="[background:linear-gradient(144deg,#af40ff,#5b42f3_50%,#00ddeb)] text-white px-4 py-2 font-bold rounded-md hover:opacity-80"
                  type="submit"
                >
                  Change Passowrd
                </button>
              </div>
            </form>
          </div>
          {/* Modal Change password */}
        </div>
      )}
    </div>
  );
};

export default HomePage;
