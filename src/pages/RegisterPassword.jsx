import { Link, useNavigate } from "react-router-dom";
import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";
import Button from "../components/Button";

const RegisterPassword = () => {
  const navigate = useNavigate();
  const handleRegister = () => {
    navigate("/forgot-password");
  }

  return (
    <div
      className="flex items-center justify-center h-screen flex-col w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="flex w-4/5 h-3/5 items-center justify-between">
        <div className="w-2/5 flex flex-col items-center justify-center">
          <div className="text-4xl font-bold">Welcome to</div>
          <img src={iLabrixLogo} className="w-2/3 mx-auto" alt="iLabrix Logo" />
        </div>

        <div className="w-3/5 flex flex-col items-center justify-center border rounded-2xl bg-white h-full">
          <div className="text-4xl font-bold text-[#CC9933] text-center">
            REGISTER PASSWORD
          </div>
          <div className="w-3/5">
            <div className=" mt-8 mb-4 text-left">
              <div className="text-xl font-bold">Password</div>
              <input
                type="password"
                className=" border rounded-3xl p-3 pl-5 w-full"
                placeholder="Enter your new password..."
              ></input>
            </div>
            <div className="mt-4 mb-8">
              <div className="text-xl font-bold">Re-enter Password</div>
              <input
                type="password"
                className=" border rounded-3xl p-3 pl-5 w-full"
                placeholder="Enter your new password..."
              ></input>
            </div>
            <div className="flex justify-center">
              {/* <Button backgroundColor={"#CC9933"} textColor={"white"} onClick={handleRegister}>
                Enter
              </Button> */}
              <Link to="/forgot-password">
                <Button backgroundColor={"#CC9933"} textColor={"white"}>
                  Enter
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegisterPassword;
