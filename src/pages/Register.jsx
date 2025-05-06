import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
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
  const [role, setRole] = useState("");
  const [isDisable, setIsDisable] = useState(true);
  const [isLoading, setIsLoading] = useState(false);

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
      fullName &&
      role
    ) {
      setIsDisable(false);
    } else {
      setIsDisable(true);
    }
  }, [email, password, rePassword, role, fullName, username]);

  const handleRegister = async () => {
    if (isDisable) return;
    setIsLoading(true);

    let registerData = {};
    registerData.email = email;
    registerData.password = password;
    registerData.fullName = fullName;
    registerData.role = role;
    registerData.username = username;
    try {
      const response = await authService.register(registerData);

      if (response.success) {
        navigate("/notification", {
          state: { message: "Account registration successful!" },
        });
      } else if (response.errors) {
        const errorMessages = [];
        for (const key in response.errors) {
          if (Object.hasOwnProperty.call(response.errors, key)) {
            errorMessages.push(response.errors[key]);
          }
        }
        if (errorMessages.length > 0) {
          alert(errorMessages.join("\n"));
        } else {
          alert("Registration failed. Please try again.");
        }
      } else {
        alert("Registration failed. Please try again.");
      }
    } catch (error) {
      console.log(error);
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

          {/* Form */}
          {isLoading ? (
            <Loading />
          ) : (
            <div className="w-11/12">
              <div className="flex justify-around ">
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

                <div className="px-2 mt-4 mb-4">
                  <div className="text-xl font-bold">Role</div>
                  <div className="border rounded-3xl p-3 pl-5 w-full mt-2">
                    <div className="flex items-center space-x-6">
                      <div className="flex items-center">
                        <input
                          id="USER-role"
                          type="radio"
                          name="role"
                          value="USER"
                          checked={role === "USER"}
                          onChange={() => setRole("USER")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="USER-role"
                          className="ml-2 text-sm font-medium text-gray-700"
                        >
                          User
                        </label>
                      </div>
                      <div className="flex items-center">
                        <input
                          id="ADMIN-role"
                          type="radio"
                          name="role"
                          value="ADMIN"
                          checked={role === "ADMIN"}
                          onChange={() => setRole("ADMIN")}
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500"
                        />
                        <label
                          htmlFor="ADMIN-role"
                          className="ml-2 text-sm font-medium text-gray-700"
                        >
                          Librarian
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
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
