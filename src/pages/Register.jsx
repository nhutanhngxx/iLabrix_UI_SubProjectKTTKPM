import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { useEffect, useState } from "react";
import authService from "../services/authService";
import Loading from "../components/common/Loading";

const Register = () => {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [rePassword, setRePassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

  const [errors, setErrors] = useState({
    general: "", // Lỗi chung
    email: "", // Lỗi email
    username: "", // Lỗi username
  });

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validatePassword = (password) => {
    return password.length >= 6;
  };

  useEffect(() => {
    if (
      validateEmail(email) &&
      validatePassword(password) &&
      password === rePassword &&
      username &&
      fullName
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, password, rePassword, fullName, username]);

  const handleRegister = async () => {
    if (isDisable) return;
    setIsLoading(true);

    setErrors({
      general: "",
      email: "",
      username: "",
    });

    let registerData = {};
    registerData.email = email;
    registerData.password = password;
    registerData.fullName = fullName;
    registerData.role = "USER";
    registerData.username = username;

    try {
      const response = await authService.register(registerData);

      if (response.success) {
        navigate("/notification", {
          state: { message: "Account registration successful!" },
        });
      } else if (response.errors) {
        const newErrors = { general: "", email: "", username: "" };

        for (const key in response.errors) {
          if (Object.hasOwnProperty.call(response.errors, key)) {
            const errorMsg = response.errors[key];

            // Phân loại lỗi dựa theo nội dung
            if (
              errorMsg.includes("Email") ||
              errorMsg.toLowerCase().includes("email")
            ) {
              newErrors.email = errorMsg;
            } else if (
              errorMsg.includes("Username") ||
              errorMsg.toLowerCase().includes("username")
            ) {
              newErrors.username = errorMsg;
            } else {
              // Lỗi chung hoặc không xác định
              newErrors.general =
                (newErrors.general ? newErrors.general + "\n" : "") + errorMsg;
            }
          }
        }

        setErrors(newErrors);
      } else {
        setErrors({
          ...errors,
          general: "Registration failed. Please try again.",
        });
      }
    } catch (error) {
      console.log(error);
      setErrors({
        ...errors,
        general: "An unexpected error occurred. Please try again.",
      });
    } finally {
      setIsLoading(false);
    }
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
            REGISTER
          </div>

          {/* Hiển thị lỗi chung (nếu có) */}
          {errors.general && (
            <div className="mt-2 mb-2 text-red-500 text-sm text-center max-w-md">
              {errors.general.split("\n").map((msg, index) => (
                <div key={index} className="mb-1">
                  • {msg}
                </div>
              ))}
            </div>
          )}

          {/* Form */}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="w-full px-5">
              <div className="flex justify-around ">
                <div className="w-[45%]">
                  <InputField
                    type="text"
                    label="Username"
                    placeholder="Enter your new username..."
                    onChange={(e) => {
                      const value = e.target.value;
                      setUsername(value);
                    }}
                    value={username}
                  />
                  {/* Hiển thị lỗi username */}
                  {errors.username && (
                    <div className="text-xs text-red-500 mt-1">
                      ✗ {errors.username}
                    </div>
                  )}
                </div>

                <div className="w-[45%]">
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
                  {/* Hiển thị lỗi email */}
                  {errors.email && (
                    <div className="text-xs text-red-500 mt-1">
                      ✗ {errors.email}
                    </div>
                  )}
                </div>
              </div>

              {/* Thêm kiểm tra email */}
              <div className="flex justify-around w-full mb-3">
                <div className="w-[45%]">
                  {username && !errors.username && (
                    <div className="text-xs text-green-500 mt-1">
                      ✓ Username is valid
                    </div>
                  )}
                </div>

                <div className="w-[45%]">
                  {email && !errors.email && (
                    <div className="text-xs mt-1">
                      {validateEmail(email) ? (
                        <span className="text-green-500">✓ Email is valid</span>
                      ) : (
                        <span className="text-red-500">
                          ✗ Please enter a valid email
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-around ">
                <InputField
                  type="password"
                  label="Password"
                  placeholder="Enter your new password..."
                  onChange={(e) => {
                    const value = e.target.value;
                    setPassword(value);
                  }}
                  value={password}
                />

                <InputField
                  type="password"
                  label="Re-Password"
                  placeholder="Re-enter your password..."
                  onChange={(e) => {
                    const value = e.target.value;
                    setRePassword(value);
                  }}
                  value={rePassword}
                />
              </div>

              {/* Phần kiểm tra password */}
              <div className="flex justify-around w-full mb-3">
                <div className="w-[45%]">
                  {password && (
                    <div className="text-xs mt-1">
                      {validatePassword(password) ? (
                        <span className="text-green-500">
                          ✓ Password meets requirements
                        </span>
                      ) : (
                        <span className="text-red-500">
                          ✗ Password must be at least 6 characters
                        </span>
                      )}
                    </div>
                  )}
                </div>

                <div className="w-[45%]">
                  {rePassword && (
                    <div className="text-xs mt-1">
                      {password === rePassword ? (
                        <span className="text-green-500">
                          ✓ Passwords match
                        </span>
                      ) : (
                        <span className="text-red-500">
                          ✗ Passwords do not match
                        </span>
                      )}
                    </div>
                  )}
                </div>
              </div>

              <div className="flex justify-around ">
                <InputField
                  type="text"
                  label="Full name"
                  placeholder="Enter your full name..."
                  onChange={(e) => {
                    const value = e.target.value;
                    setFullName(value);
                  }}
                  value={fullName}
                />
              </div>

              <div className="mt-2 mb-2 flex justify-center">
                Already have an account?
                <button
                  className="text-orange-600 cursor-pointer bg-transparent border-none ml-1 mr-1 font-bold"
                  onClick={() => navigate("/login")}
                >
                  Sign in
                </button>
                now
              </div>

              <div className="flex justify-center">
                <Button
                  backgroundColor={isDisable ? "gray" : "#CC9933"}
                  textColor={"white"}
                  onClick={handleRegister}
                  disable={isDisable}
                >
                  Register
                </Button>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Register;
