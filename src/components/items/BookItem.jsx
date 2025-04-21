// import React from "react";
import PropTypes from "prop-types";
import { useState } from "react";

const BookItem = ({ book }) => {
  const [isCheck, setIsCheck] = useState(false);

  return (
    <div className="flex items-center w-[99%] p-4 border-b bg-[#FFFAFA] rounded-[40px] gap-5 text-xl shadow-md">
      {/* Checkbox */}
      <div className="">
        <input
          type="checkbox"
          className="h-8 w-8 "
          checked={isCheck}
          onChange={() => setIsCheck(!isCheck)}
        />
      </div>
      {/* Image */}
      <div>
        <img
          src={book?.image}
          alt={book?.name || "null"}
          className="w-[160px] h-[200px] border-2 rounded-[35px] shadow-md"
        />
      </div>
      {/* Book's Infomation */}
      <div className="font-normal">
        <div>
          <b>Name : </b>
          {book?.name || "Null"}
        </div>
        <div>
          <b>Author : </b>
          {book?.author || "Null"}
        </div>
        <div>
          <b>Book ID : </b>
          {book?.bookId || "Null"}
        </div>
        <div>
          <b>Pages : </b>
          {book?.pages || "0"}
        </div>
        <div>
          <b>Publisher : </b>
          {book?.publisher || "Null"}
        </div>
        <div>
          <b>Price : </b>
          {book?.price || 0}
        </div>
      </div>
    </div>
  );
};

BookItem.propTypes = {
  book: PropTypes.shape({
    bookId: PropTypes.string,
    name: PropTypes.string,
    author: PropTypes.string,
    pages: PropTypes.number,
    publisher: PropTypes.string,
    price: PropTypes.number,
    image: PropTypes.string,
  }),
};

export default BookItem;
