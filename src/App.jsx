import { BrowserRouter, Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPassword from "./pages/RegisterPassword";
import Notification from "./pages/Notification";
import RegisterNewPassword from "./pages/RegisterNewPassword";

import Login from "./pages/Login";
import Register from "./pages/Register";
import HomePage from "./pages/HomePage";
import TabBorrow from "./components/tabs/TabBorrow";
import TabBooks from "./components/tabs/TabBooks";
import TabDashboard from "./components/tabs/TabDashboard";
import TabSearch from "./components/tabs/TabSearch";
import TabUsers from "./components/tabs/TabUsers";

function App() {
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
        <Route
          path="/register-new-password"
          element={<RegisterNewPassword />}
        ></Route>
        <Route path="/check-in-out" element={<TabBorrow />} />
        <Route path="/books" element={<TabBooks />} />
        <Route path="/users" element={<TabUsers />} />

        <Route path="/dashboard" element={<TabDashboard />} />
        <Route path="/search" element={<TabSearch />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
