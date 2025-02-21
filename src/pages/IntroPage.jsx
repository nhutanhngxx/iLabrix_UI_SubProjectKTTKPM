import { useNavigate, Link } from "react-router-dom";

import iLabrixLogo from "../assets/iLibrary.png";
import backgroundImg from "../assets/Background.png";

const IntroPage = () => {
  const navigate = useNavigate();
  const handleSignIn = () => {
    navigate("/login");
  };

  const handleRegister = () => {
    navigate("/register");
  };

  return (
    <div
      className="flex items-center h-screen flex-col w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      {/* <div>
        <img src={iLabrixLogo} alt="iLabrix Logo" style={{height: 300}} />
      </div>
      <div className="flex mt-12 justify-between items-center w-2/5">
        <Button onClick={handleSignIn}>Sign in</Button>
        <Button
          backgroundColor={"transparent"}
          textColor={"#fff"}
          onClick={handleRegister}
        >
          Register
        </Button>
      </div> */}

      {/* Header */}
      <div className="h-14 w-screen bg-transparent flex items-center">
        <div className="flex items-center justify-between w-full px-5">
          <div className="flex items-center text-white space-x-10">
            <img src={iLabrixLogo} alt="iLabrix Logo" style={{ height: 50 }} />
            <Link>Introduce</Link>
            <Link>News - Events</Link>
            <Link>Feature</Link>
            <Link>Support</Link>
          </div>
          <div className="flex items-center space-x-4 ml-auto flex-shrink-0 text-white">
            <button onClick={handleRegister}>Sign up</button>
            <button onClick={handleSignIn}>Sign in</button>
          </div>
        </div>
        <div></div>
      </div>

      {/* Container */}
      <div></div>
    </div>
  );
};

export default IntroPage;
