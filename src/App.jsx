import { BrowserRouter, Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPassword from "./pages/RegisterPassword";
import Notification from "./pages/Notification";
import RegisterNewPassword from "./pages/RegisterNewPassword";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<IntroPage />}></Route>
        <Route path="/login" element={<Login />}></Route>
        <Route path="/register" element={<Register />}></Route>
        <Route path="/notification" element={<Notification />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/register-password" element={<RegisterPassword />}></Route>
        <Route path="/home-page" element={<HomePage />}></Route>
        <Route
          path="/register-new-password"
          element={<RegisterNewPassword />}
        ></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
