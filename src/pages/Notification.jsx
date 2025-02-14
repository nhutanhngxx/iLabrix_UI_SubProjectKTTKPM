import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

// import { Link } from "react-router-dom";
import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/Button";
import InputField from "../components/InputField";

const Notification = () => {
  const location = useLocation();
  const message = location.state?.message || "No message received";
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate("/login");
  };

  return (
    <div
      className="flex items-center justify-center h-screen flex-col w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="flex w-2/3 h-2/3 items-center justify-center bg-white/30 backdrop-blur-md shadow-lg rounded-2xl flex-col">
        <img src={iLabrixLogo} className="w-2/5 mx-auto" alt="iLabrix Logo" />
        <div className="font-bold text-white">{message}</div>
        <div className="mt-5">
          <Button onClick={handleLogin}>Sign in</Button>
        </div>
      </div>
    </div>
  );
};

export default Notification;
