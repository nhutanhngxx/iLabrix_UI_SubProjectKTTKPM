import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import Loading from "../components/common/Loading";
import { jwtDecode } from "jwt-decode";

import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../redux/slice/userSlice";
import authService from "../services/authService";
import config from "../configs/config";
const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  useEffect(() => {
    if (validatePassword(password)) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [password]);

  // Sau khi lấy được user xong, lưu userId, và username vào redux/session
  const handleLogin = async () => {
    setIsLoading(true);
    setError("");

    try {
      const response = await authService.login({ username, password });

      if (!response) {
        throw new Error("User or password wrong!");
      }

      let userId = null;
      let role = "";
      try {
        const decodedToken = jwtDecode(response.accessToken);
        userId = decodedToken.id;
        role = decodedToken.role;
      } catch (error) {
        console.log("Không thể giải mã token: ", error);
      }

      dispatch(
        login({
          email: response.email,
          accessToken: response.accessToken,
          fullName: response.fullName,
          userId,
          role,
        })
      );

      navigate("/home-page");
    } catch (err) {
      setError(err.message);
      console.log("error", err);
    } finally {
      setIsLoading(false);
    }
  };

  // const handleForgotPassword = (e) => {
  //   e.preventDefault();
  //   navigate("/forgot-password");
  // };

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
        {isLoading ? (
          <Loading />
        ) : (
          <div className="w-3/5 flex flex-col items-center justify-center border rounded-2xl bg-white h-full">
            {/* Title */}
            <div className="text-4xl font-bold text-[#CC9933] text-center">
              LOGIN
            </div>

            {/* Form */}
            <form
              className="w-3/5"
              onSubmit={(e) => {
                e.preventDefault();
                handleLogin();
              }}
            >
              <InputField
                type="text"
                label="Username"
                placeholder="Enter your username..."
                onChange={(e) => {
                  const value = e.target.value;
                  setUsername(value);
                }}
                value={username}
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
                {/* <a
                  className="text-gray-600 hover:text-black cursor-pointer bg-transparent border-none"
                  onClick={handleForgotPassword}
                >
                  Forgot Password?
                </a> */}

                <div className="mt-4 mb-4 flex justify-center">
                  Do not have an account?
                  <button
                    type="button"
                    className="text-orange-600 cursor-pointer bg-transparent border-none ml-1 mr-1 font-bold"
                    onClick={() => navigate("/register")}
                  >
                    Sign up
                  </button>
                  now
                </div>
              </div>

              {error && (
                <div className="p-5 text-lg font-semibold text-red-500 text-center">
                  {error}
                </div>
              )}

              <div className="flex justify-center">
                <Button
                  backgroundColor={isDisable ? "gray" : "#CC9933"}
                  textColor={"white"}
                  onClick={handleLogin}
                  type="submit"
                  disable={isDisable}
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default Register;
