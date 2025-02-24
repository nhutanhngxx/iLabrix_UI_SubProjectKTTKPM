// import React from "react";
import PropTypes from "prop-types";

const UserItem = ({ user }) => {
  const handleDeleteUser = () => {
    alert("Delete user");
  };

  return (
    <div className="relative">
      {/* User's Information */}
      <div className="flex items-center h-[225px] px-6 border-b bg-[#FFFAFA] rounded-[40px] gap-5 text-xl shadow-md">
        {/* Image */}
        <div>
          <img
            src={user?.image}
            alt={user?.name || "null"}
            className="w-[145px] h-[195px] border-2 rounded-[10px] shadow-md"
          />
        </div>
        {/* user's Infomation */}
        <div className="font-normal fontSize-[19px]">
          <div>
            <b>Name : </b>
            {user?.name || "Null"}
          </div>
          <div>
            <b>Address : </b>
            {user?.address || "Null"}
          </div>
          <div>
            <b>User ID : </b>
            {user?.userId || "Null"}
          </div>
          <div>
            <b>Gender : </b>
            {user?.gender || "0"}
          </div>
          <div>
            <b>Email : </b>
            {user?.email || "Null"}
          </div>
          <div>
            <b>Phone : </b>
            {user?.phone || 0}
          </div>
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
