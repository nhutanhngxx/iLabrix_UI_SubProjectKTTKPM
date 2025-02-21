import { useNavigate } from "react-router-dom";
// import { Link } from "react-router-dom";
import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/Button";
import InputField from "../components/InputField";

const RegisterPassword = () => {
  const navigate = useNavigate();
  const handleRegisterPassword = () => {
    navigate("/notification", {
      state: { message: "Account registration successful!" },
    });
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
          <img src={iLabrixLogo} className="w-2/3 mx-auto" alt="iLabrix Logo" />
        </div>

        {/* Right side */}
        <div className="w-3/5 flex flex-col items-center justify-center border rounded-2xl bg-white h-full">
          {/* Title */}
          <div className="text-4xl font-bold text-[#CC9933] text-center">
            REGISTER PASSWORD
          </div>

          {/* Form */}
          <div className="w-3/5">
            {/* Password field */}
            <InputField
              type="password"
              label="Password"
              placeholder="Enter your new password..."
            />

            {/* Re-enter Password field */}
            <InputField
              type="password"
              label="Re-enter Password"
              placeholder="Enter your new password..."
            />

            {/* Enter button */}
            <div className="flex justify-center">
              <Button
                backgroundColor={"#CC9933"}
                textColor={"white"}
                onClick={handleRegisterPassword}
              >
                Enter
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPassword;