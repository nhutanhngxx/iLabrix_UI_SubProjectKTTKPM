import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { useEffect, useState } from "react";

const Register = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isDisable, setIsDisable] = useState(true);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  useEffect(() => {
    if (validateEmail(email) && validatePassword(password)) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, password]);

  const handleLogin = () => {
    let registerData = {};
    registerData.email = email;
    registerData.password = password;
    console.log(registerData);
    navigate("/home-page");
  };

  const handleForgotPassword = () => {
    navigate("/forgot-password");
  };

  return (
    <div
      className="flex items-center justify-center h-screen flex-col w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="flex w-2/3 h-2/3 items-center justify-center bg-white/30 backdrop-blur-md shadow-lg rounded-2xl">
        {/* Left side */}
        <div className="w-2/5 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">Welcome to</div>
          <img
            src={iLabrixLogo}
            className="w-2/3 mx-auto cursor-pointer"
            alt="iLabrix Logo"
            onClick={() => navigate("/")}
          />
        </div>

        {/* Right side */}
        <div className="w-3/5 flex flex-col items-center justify-center border rounded-2xl bg-white h-full">
          {/* Title */}
          <div className="text-4xl font-bold text-[#CC9933] text-center">
            LOGIN
          </div>

          {/* Form */}
          <div className="w-3/5">
            <InputField
              type="email"
              label="Email"
              placeholder="Enter your email..."
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
              }}
              value={email}
            />

            <InputField
              type="password"
              label="Password"
              placeholder="Enter your password..."
              onChange={(e) => {
                const value = e.target.value;
                setPassword(value);
              }}
              value={password}
            />

            <div className="mt-2 mb-2 font-bold">
              <button
                className="text-gray-600 hover:text-black cursor-pointer bg-transparent border-none"
                onClick={handleForgotPassword}
              >
                Forgot Password?
              </button>
            </div>

            <div className="flex justify-center">
              <Button
                backgroundColor={isDisable ? "gray" : "#CC9933"}
                textColor={"white"}
                onClick={handleLogin}
                disable={isDisable}
              >
                Login
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
