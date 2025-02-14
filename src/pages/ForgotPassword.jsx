import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/Button";
import InputField from "../components/InputField";

const ForgotPassword = () => {
  return (
    <div
      className="flex items-center justify-center h-screen flex-col w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="flex w-4/5 h-3/5 items-center justify-between bg-white rounded-2xl">
        {/* Left side */}
        <div className="w-2/5 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">Welcome to</div>
          <img src={iLabrixLogo} className="w-2/3 mx-auto" alt="iLabrix Logo" />
        </div>

        {/* Right side */}
        <div className="w-3/5 flex flex-col items-center justify-center border rounded-2xl bg-white h-full">
          {/* Title */}
          <div className="text-4xl font-bold text-[#CC9933] text-center">
            FORGOT PASSWORD
          </div>
          <div className="text-sm text-center">
            Enter your email to reset your password
          </div>

          {/* Form */}
          <div className="w-3/5">
            {/* Email field */}
            <InputField
              label="Email"
              type="email"
              placeholder="Enter your email..."
            />
            <div className="flex justify-center">
              <Button backgroundColor={"#CC9933"} textColor={"white"}>
                Get code
              </Button>
            </div>

            {/* OTP field */}
            <InputField label="OTP" type="text" placeholder="Enter OTP..." />
            <div className="flex justify-center">
              <Button backgroundColor={"#CC9933"} textColor={"white"}>
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
