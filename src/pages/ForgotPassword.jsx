import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/Button";
import PropTypes from "prop-types";

const Title = ({ text }) => (
  <div className="text-4xl font-bold text-[#CC9933] text-center">{text}</div>
);

const InputField = ({ label, type, placeholder }) => (
  <div className="mt-4 mb-4">
    <div className="text-xl font-bold">{label}</div>
    <input
      type={type}
      className="border rounded-3xl p-3 pl-5 w-full"
      placeholder={placeholder}
    />
  </div>
);

const ForgotPassword = () => {
  return (
    <div
      className="flex items-center justify-center h-screen flex-col w-screen bg-cover bg-center"
      style={{ backgroundImage: `url(${backgroundImg})` }}
    >
      <div className="flex w-4/5 h-3/5 items-center justify-between">
        {/* Left side */}
        <div className="w-2/5 flex flex-col items-center justify-center">
          <Title text="Welcome to" />
          <img src={iLabrixLogo} className="w-2/3 mx-auto" alt="iLabrix Logo" />
        </div>

        {/* Right side */}
        <div className="w-3/5 flex flex-col items-center justify-center border rounded-2xl bg-white h-full">
          <Title text="FORGOT PASSWORD" />
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

Title.propTypes = {
  text: PropTypes.string.isRequired,
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
  placeholder: PropTypes.string.isRequired,
};

export default ForgotPassword;
