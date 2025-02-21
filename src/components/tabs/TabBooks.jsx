// import { useNavigate } from "react-router-dom";

const TabBooks = () => {
  // const navigate = useNavigate();
  return (
    <div className="text-lg font-medium">
      {/* Thanh công cụ: Filter book, Add new book,.. */}
      <div className="flex items-center justify-between">
        {/* Filter book */}
        <div className="flex items-center gap-10">
          <div className="flex items-center gap-3">
            <label>Category</label>
            <select className="w-52 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select an Category</option>
              <option value="option1">Category 1</option>
              <option value="option2">Category 2</option>
              <option value="option3">Category 3</option>
            </select>
          </div>

          {/* <div className="flex items-center gap-3">
            <label>Type</label>
            <select className="w-52 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select an Type</option>
              <option value="option1">Category 1</option>
              <option value="option2">Category 2</option>
              <option value="option3">Category 3</option>
            </select>
          </div> */}

          <div className="flex items-center gap-3">
            <label>Language</label>
            <select className="w-52 px-3 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400">
              <option value="">Select an Language</option>
              <option value="option1">Language 1</option>
              <option value="option2">Language 2</option>
              <option value="option3">Language 3</option>
            </select>
          </div>
        </div>
        {/* Add new book */}
        <div>
          <button className="px-5 py-2 bg-green-500 text-white rounded-md hover:bg-green-600 transition">
            Add new book
          </button>
        </div>
      </div>
    </div>
  );
};

export default TabBooks;
