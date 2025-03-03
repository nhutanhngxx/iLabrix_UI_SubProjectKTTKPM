import { BarChart, LineChart } from "@mui/x-charts";
import {
  mockBooks,
  mockBorrowRecords,
  mockInventorys,
} from "../../mock/mockData";
import { PieChart } from "@mui/x-charts/PieChart";
import { useState } from "react";

const TabDashboard = () => {
  const [activeTab, setActiveTab] = useState("overview");
  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  // Mock Data
  const booksBorrowedToday = 10;
  const booksBorrowedYesterday = 5;
  const usersBorrowedToday = 25;
  const usersBorrowedYesterday = 10;

  // Calculate total books
  const totalBooks = mockBooks.reduce(
    (total, quantity) => total + quantity.totalCopies,
    0
  );

  // Calculate total books returned
  const totalBooksReturned = mockBorrowRecords.reduce(
    (total, record) =>
      record.isReturned ? total + record.bookId.length : total,
    0
  );

  // Calculate total books in inventory
  const totalBooksInInventory = mockInventorys.reduce(
    (total, inventory) => total + inventory.stockQuantity,
    0
  );

  // Calculate total books late return
  const totalBooksLateReturn = mockBorrowRecords.reduce((total, record) => {
    const currentDate = new Date();
    const dueDate = new Date(record.dueDate);
    return currentDate > dueDate && !record.isReturned // return record.returnDate === ""
      ? total + record.bookId.length
      : total;
  }, 0);

  // Pie Chart Data for Borrow Records
  const bookPieChartData = [
    {
      id: 0,
      value: totalBooksReturned,
      label: "Đã trả",
    },
    {
      id: 1,
      value: totalBooks - totalBooksInInventory,
      label: "Đang mượn",
    },
    { id: 2, value: totalBooksLateReturn, label: "Quá hạn" },
  ];

  // const lateReutrnUnder7Days = mockBorrowRecords.reduce((total, record) => {
  //   const currentDate = new Date();
  //   const dueDate = new Date(record.dueDate);
  //   const lateDays = currentDate - dueDate;
  //   return lateDays < 7 && !record.isReturned // return record.returnDate === ""
  //     ? total + record.bookId.length
  //     : total;
  // });

  // Pie Chart Data for Late Return
  // const lateReturnPieChartData = [
  //   {
  //     id: 0,
  //     value: totalBooksReturned,
  //     label: "Under 7 days",
  //   },
  //   {
  //     id: 1,
  //     value: totalBooks - totalBooksInInventory,
  //     label: "7 - 14 days",
  //   },
  //   { id: 2, value: totalBooksLateReturn, label: "Over 14 days" },
  // ];

  // Line Chart Data with 2 series
  const uData = [15, 2, 5, 8, 3, 7, 4, 6, 5, 8, 2, 5];
  const pData = [2, 5, 2, 9, 2, 5, 3, 7, 4, 6, 5, 8];
  const xLabels_Month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12];
  // const xLabels_Weak = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

  const OverViewTab = () => {
    return (
      <div className="grid grid-cols-2 gap-2">
        {/* BorrowRecords - Pie Chart */}
        <div className="flex justify-center">
          <div>
            <PieChart
              colors={["green", "yellow", "oklch(0.704 0.191 22.216)"]}
              series={[
                {
                  data: bookPieChartData,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                },
              ]}
              title="Borrow Records"
              width={400}
              height={150}
            />
            <div className="text-center">
              Total books in inventory: {totalBooks}
            </div>
          </div>
        </div>

        {/* BorrowRecords - Borrowed Today, Returned Yesterday */}
        <div className="flex gap-5 items-center justify-center border-2 border-gray-400 rounded-xl">
          <div className="bg-white/75 py-2 px-5 rounded-xl">
            <div className="text-lg font-medium">Books Borrowed Today</div>
            <div className="flex justify-around mt-2 items-center">
              <div className="text-xl">{booksBorrowedToday}</div>
              <div className="text-sm">
                {(booksBorrowedToday / booksBorrowedYesterday) * 100}%
              </div>
            </div>
          </div>
          <div className="bg-white/75 py-2 px-5 rounded-xl">
            <div className="text-lg font-medium">Users Borrowed Today</div>
            <div className="flex justify-around mt-2 items-center">
              <div className="text-xl">{usersBorrowedToday}</div>
              <div className="text-sm">
                {(usersBorrowedToday / usersBorrowedYesterday) * 100}%
              </div>
            </div>
          </div>
        </div>

        {/* Late Return - Pie Chart */}
        <div className="flex justify-center ">
          <div>
            <PieChart
              colors={["orange", "skyblue", "oklch(0.396 0.141 25.723)"]}
              series={[
                {
                  data: bookPieChartData,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  innerRadius: 30,
                },
              ]}
              title="Borrow Records"
              width={400}
              height={150}
            />
            <div className="text-center">
              Total books late ruturn: {totalBooks}
            </div>
          </div>
        </div>

        {/* Number of Borrwer - Liner Chart */}
        <div className="flex flex-col items-center justify-center ">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5, 3, 7, 4, 6, 5, 8],
              },
            ]}
            width={500}
            height={200}
          />
          <div className="text-center">
            Biểu đồ số người mượn sách theo thời gian
          </div>
        </div>
      </div>
    );
  };

  const AnalysisTab = () => {
    return (
      <div className="flex justify-around gap-10 items-center h-full mt-10">
        {/* Borrow && Return - Liner Chart */}
        <div className="flex flex-col items-center">
          <LineChart
            width={500}
            height={300}
            series={[
              { data: pData, label: "Borrow", showMark: false, type: "line" },
              { data: uData, label: "Return", showMark: false, type: "line" },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels_Month }]}
          />
          <div className="text-center text-xl">
            Biểu đồ số sách mượn và trả theo thời gian
          </div>
        </div>

        {/* Favorite Category - Liner Chart */}
        <div className="flex flex-col items-center">
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Kinh dị", "Khoa học", "Tiểu thuyết"],
                // label: "Biểu đồ thể loại sách được yêu thích nhất",
              },
            ]}
            yAxis={[{ scaleType: "linear" }]}
            series={[{ data: [10, 7, 5] }]}
            // layout="horizontal"
            width={500}
            height={300}
          />
          <div className="text-center text-xl">
            Biểu đồ thể loại sách được yêu thích nhất
          </div>
        </div>
      </div>
    );
  };

  return (
    <div>
      {/* Header Tab: Overview - Analysis */}
      <div className=" flex gap-5 text-center items-center">
        <div
          className={`text-xl px-10 cursor-pointer  ${
            activeTab === "overview"
              ? "border-b-2  border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => handleTabClick("overview")}
        >
          Overview
        </div>
        <div
          className={`text-xl px-10 cursor-pointer ${
            activeTab === "analysis"
              ? "border-b-2  border-blue-500 font-bold"
              : ""
          }`}
          onClick={() => handleTabClick("analysis")}
        >
          Analysis
        </div>
      </div>

      {/* Tab Content */}
      <div className="mt-5">
        {activeTab === "overview" && <OverViewTab />}
        {activeTab === "analysis" && <AnalysisTab />}
      </div>
    </div>
  );
};

export default TabDashboard;
