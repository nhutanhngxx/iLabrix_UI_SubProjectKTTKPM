import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

import backgroundImg from "../assets/Background.png";
import logoHorizontal from "../assets/iLibrary.png";
import avt from "../assets/react.svg";

import TabBooks from "../components/tabs/TabBooks";
import TabBorrow from "../components/tabs/TabBorrow";
import TabDashboard from "../components/tabs/TabDashboard";
import TabSearch from "../components/tabs/TabSearch";
import TabUsers from "../components/tabs/TabUsers";

import checkInOutIcon from "/icons/check-in-out.png";
import bookIcon from "/icons/book.png";
import usersIcon from "/icons/users.png";
import dashboardIcon from "/icons/dashboard.png";
import searchIcon from "/icons/search.png";

// Danh sách các tab
const tabs = [
  {
    id: "tab1",
    label: "Check-in/out",
    component: <TabBorrow />,
    path: "/check-in-out",
    icon: checkInOutIcon,
  },
  {
    id: "tab2",
    label: "Books",
    component: <TabBooks />,
    path: "/books",
    icon: bookIcon,
  },
  {
    id: "tab3",
    label: "Users",
    component: <TabUsers />,
    path: "/users",
    icon: usersIcon,
  },
  {
    id: "tab4",
    label: "Dashboard",
    component: <TabDashboard />,
    path: "/dashboard",
    icon: dashboardIcon,
  },
  {
    id: "tab5",
    label: "Search",
    component: <TabSearch />,
    path: "/search",
    icon: searchIcon,
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
  const [activeTab, setActiveTab] = useState("tab1");
  const navigate = useNavigate();
  const location = useLocation();
  const handleTabClick = (tabId, path) => {
    setActiveTab(tabId);
    navigate(path);
  };

  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleUserClick = () => {
    setIsModalOpen(!isModalOpen);
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
            className="flex items-center space-x-4 ml-auto flex-shrink-0"
          >
            <div className="flex flex-col items-end">
              <span className="text-white font-medium">Nguyễn Nhựt Anh</span>
              <span className="text-white opacity-75">Admin</span>
            </div>
            <img
              src={avt}
              className="w-10 h-10 rounded-full border"
              alt="User Avatar"
            />
            {/* Modal */}
            {isModalOpen && (
              <div className="absolute top-24 right-5 bg-white shadow-lg rounded-lg w-48 p-4 z-50">
                <h3 className="text-xl font-semibold">User Functions</h3>
                <ul className="mt-4 space-y-2">
                  <li>
                    <button className="text-blue-500">Edit Profile</button>
                  </li>
                  <li>
                    <button className="text-blue-500">Settings</button>
                  </li>
                  <li>
                    <button className="text-blue-500">Logout</button>
                  </li>
                </ul>
                <button
                  className="mt-4 text-red-500"
                  onClick={() => setIsModalOpen(false)}
                >
                  Close
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Wrapper Pills Tab */}
      <div className="flex flex-1 px-10 pb-10">
        {/* Tabs Điều Hướng */}
        <div className="w-1/6 h-2/3 rounded-2xl bg-white/30 backdrop-blur-md shadow-lg p-4 flex flex-col space-y-2 mr-6 gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`p-3 text-left rounded-lg flex items-center gap-2 transition-all
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
    </div>
  );
};

export default HomePage;
