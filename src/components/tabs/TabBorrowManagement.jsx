// import BookItem from "../BookItem";

const TabSearch = () => {
  return (
    <div className="text-lg font-medium">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        {/* Bộ lọc */}
        <div className="flex w-full items-center justify-evenly gap-5 font-light">
          <div className="flex items-center gap-3">
            <label className="font-medium">Category</label>
            <select className="w-44 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 italic">
              <option value="" disabled selected>
                Select a Category
              </option>
              <option value="category1">Category 1</option>
              <option value="category2">Category 2</option>
              <option value="category3">Category 3</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <label className="font-medium">Language</label>
            <select className="w-48 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 italic">
              <option value="" disabled selected>
                Select a Language
              </option>
              <option value="language1">Language 1</option>
              <option value="language2">Language 2</option>
              <option value="language3">Language 3</option>
            </select>
          </div>

          <div className="flex items-center gap-3">
            <input
              placeholder="Search"
              className="w-60 px-2 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400 placeholder:italic"
            ></input>
            <button>
              <img src="/icons/search.png" className="w-6 h-6"></img>
            </button>
          </div>
        </div>
      </div>

      {/* List Books */}
      {/* <div className="flex gap-5 flex-col h-[500px] overflow-y-auto py-1">
        <BookItem book={null} />
        <BookItem book={null} />
        <BookItem book={null} />
      </div> */}
    </div>
  );
};

export default TabSearch;
