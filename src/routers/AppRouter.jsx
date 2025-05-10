import {
  BrowserRouter,
  Navigate,
  Outlet,
  redirect,
  Route,
  Routes,
} from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Notification from "../pages/Notification";
import ForgotPassword from "../pages/ForgotPassword";
import RegisterPassword from "../pages/RegisterPassword";
import HomePage from "../pages/HomePage";
import AllBooksPage from "../pages/AllBooksPage";
import RegisterNewPassword from "../pages/RegisterNewPassword";
import { useEffect, useState } from "react";
import Loading from "../components/common/Loading";

// Component giúp bảo vệ route, kiểm tra xác thực người dùng
const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem("accessToken");

  if (!isAuthenticated) {
    return <Navigate to={"/login"} replace />;
  }

  return <Outlet />;
  // return isAuthenticated ? <HomePage /> : <Login />;
};

const AppRouter = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Kiểm tra trạng thái xác thực khi component được mount
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      setIsLoading(false);
    }
    setIsLoading(false);
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <BrowserRouter>
      <Routes>
        {/* Các route không cần bảo vệ */}
        <Route index element={<IntroPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/register-password" element={<RegisterPassword />}></Route>
        <Route
          path="/register-new-password"
          element={<RegisterNewPassword />}
        ></Route>

        {/* Các route cần bảo vệ */}
        <Route element={<ProtectedRoute />}>
          <Route path="/home-page" element={<HomePage />}></Route>
          <Route path="/all-books" element={<AllBooksPage />}></Route>
        </Route>

        {/* Route mặc định */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
