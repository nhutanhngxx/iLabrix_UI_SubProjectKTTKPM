// import React from "react";
import PropTypes from "prop-types";

const UserItem = ({ user }) => {
  const handleDeleteUser = () => {
    alert("Delete user");
  };

  return (
    <div className="relative text-lg ">
      {/* User's Information */}
      <div className="flex items-center py-3 px-8 border-b bg-[#FFFAFA] rounded-[20px] gap-5 shadow-md">
        {/* Image */}
        <div>
          <img
            src={user?.image}
            alt={user?.name || "null"}
            className="w-24 h-32 border-2 rounded-[10px] shadow-md"
          />
        </div>
        {/* user's Infomation */}
        <div className="text-gray-600">
          <div className="text-xl font-semibold text-blue-600">
            {user?.name || "Null"}
          </div>
          {/* <p className="text-gray-600">ID: {user?.userId || "Null"}</p> */}
          {/* <p className="text-gray-600">Gender: {user?.gender || "Null"}</p> */}
          <p className="text-gray-600">Email: {user?.email || "Null"}</p>
          <p className="text-gray-600">Phone: {user?.phone || "Null"}</p>
          <p className="text-gray-600">Adress: {user?.address || "Null"}</p>
        </div>
      </div>

      {/* Delete Button */}
      <div className="absolute -bottom-3 right-10">
        <button
          className="bg-[#FF0000] text-white px-10 py-1 mx-1 rounded-[40px] text-sm"
          onClick={() => handleDeleteUser()}
        >
          DELETE
        </button>
      </div>
    </div>
  );
};

UserItem.propTypes = {
  user: PropTypes.shape({
    userId: PropTypes.string,
    name: PropTypes.string,
    address: PropTypes.string,
    gender: PropTypes.string,
    email: PropTypes.string,
    phone: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default UserItem;
