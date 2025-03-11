import { BrowserRouter, Route, Routes } from "react-router-dom";
import IntroPage from "../pages/IntroPage";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Notification from "../pages/Notification";
import ForgotPassword from "../pages/ForgotPassword";
import RegisterPassword from "../pages/RegisterPassword";
import HomePage from "../pages/HomePage";
import AllBooksPage from "../pages/AllBooksPage";
import RegisterNewPassword from "../pages/RegisterNewPassword";

const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route index element={<IntroPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/register-password" element={<RegisterPassword />}></Route>
        <Route path="/home-page" element={<HomePage />}></Route>
        <Route path="/all-books" element={<AllBooksPage />}></Route>
        <Route
          path="/register-new-password"
          element={<RegisterNewPassword />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
