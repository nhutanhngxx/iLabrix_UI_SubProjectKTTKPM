import { useNavigate } from "react-router-dom";
import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/common/Button";
import InputField from "../components/common/InputField";
import { useEffect, useState } from "react";

const ForgotPassword = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [otp, setOTP] = useState("");
  const [isDisableGetCode, setIsDisableGetCode] = useState(true);
  const [isDisableNext, setIsDisableNext] = useState(true);

  const validateEmail = (email) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  };

  const validateOTP = (otp) => {
    return otp.length === 6;
  };

  const handleGetCode = () => {
    if (isDisableGetCode) return;
    console.log("Email is used to get code otp: " + email);
  };

  useEffect(() => {
    if (validateEmail(email)) {
      setIsDisableGetCode(false);
    } else {
      setIsDisableGetCode(true);
    }
    if (validateOTP(otp)) {
      setIsDisableNext(false);
    } else {
      setIsDisableNext(true);
    }
  }, [email, otp]);

  const handleRegisterNewPassword = () => {
    if (isDisableNext) return;
    navigate("/register-new-password");
  };
  return (
    <div
      className="flex items-center justify-center h-screen flex-col w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
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
            FORGOT PASSWORD
          </div>
          {/* <div className="text-sm text-center">
            Enter your email to reset your password
          </div> */}

          {/* Form */}
          <div className="w-3/5">
            {/* Email field */}
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email..."
              onChange={(e) => {
                const value = e.target.value;
                setEmail(value);
              }}
              value={email}
            />
            <div className="flex justify-center">
              <Button
                backgroundColor={isDisableGetCode ? "gray" : "#CC9933"}
                textColor={"white"}
                onClick={handleGetCode}
                disable={isDisableGetCode}
              >
                Get code
              </Button>
            </div>

            {/* OTP field */}
            <InputField
              label="OTP"
              type="number"
              placeholder="Enter OTP..."
              onChange={(e) => {
                const value = e.target.value;
                setOTP(value);
              }}
              value={otp}
            />
            <div className="flex justify-center">
              <Button
                backgroundColor={isDisableNext ? "gray" : "#CC9933"}
                textColor={"white"}
                onClick={handleRegisterNewPassword}
                disable={isDisableNext}
              >
                Next
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
