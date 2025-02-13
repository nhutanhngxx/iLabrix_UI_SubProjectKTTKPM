import { BrowserRouter, Route, Routes } from "react-router-dom";
import IntroPage from "./pages/IntroPage";
import ForgotPassword from "./pages/ForgotPassword";
import RegisterPassword from "./pages/RegisterPassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={<Home />} /> */}
        <Route index element={<IntroPage />}></Route>
        <Route path="/forgot-password" element={<ForgotPassword />}></Route>
        <Route path="/register-password" element={<RegisterPassword />}></Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
