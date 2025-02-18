import backgroundImg from "../assets/Background.png";
import iLabrixLogo from "../assets/iLibrary.png";

const HomePage = () => {
  return (
    <div
      className="flex items-center justify-center h-screen flex-col w-screen bg-cover bg-center"
      style={{
        backgroundImage: `url(${backgroundImg})`,
      }}
    >
      <div className="flex w-2/3 h-2/3 items-center justify-center bg-white/30 backdrop-blur-md shadow-lg rounded-2xl flex-col">
        <img src={iLabrixLogo} className="w-2/5 mx-auto" alt="iLabrix Logo" />
        <div>HOME PAGE</div>
      </div>
    </div>
  );
};

export default HomePage;
