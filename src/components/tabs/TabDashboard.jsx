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
  const uData = [4000, 3000, 2000, 2780, 1890, 2390, 3490];
  const pData = [2400, 1398, 9800, 3908, 4800, 3800, 4300];
  const xLabels = [
    "Page A",
    "Page B",
    "Page C",
    "Page D",
    "Page E",
    "Page F",
    "Page G",
  ];

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
              height={225}
            />
            <div className="text-center">
              Total books in inventory: {totalBooks}
            </div>
          </div>
        </div>

        {/* BorrowRecords - Borrowed Today, Returned Yesterday */}
        <div className="flex flex-col gap-4 items-center justify-center border-2 border-gray-400 rounded-xl">
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
              height={225}
            />
            <div className="text-center">
              Total books late ruturn: {totalBooks}
            </div>
          </div>
        </div>

        {/* Number of Borrwer - Liner Chart */}
        <div className="flex flex-col items-center justify-center ">
          <LineChart
            xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5],
              },
            ]}
            width={550}
            height={225}
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
        <div className="flex flex-col items-center border border-gray-300">
          <LineChart
            width={500}
            height={250}
            series={[
              { data: pData, label: "Borrow" },
              { data: uData, label: "Return" },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
          <div className="text-center">
            Biểu đồ số sách mượn và trả theo thời gian
          </div>
        </div>

        {/* Favorite Category - Liner Chart */}
        <div className="flex flex-col items-center border border-gray-300">
          <BarChart
            xAxis={[
              { scaleType: "band", data: ["group A", "group B", "group C"] },
            ]}
            series={[
              { data: [4, 3, 5] },
              { data: [1, 6, 3] },
              { data: [2, 5, 6] },
            ]}
            width={500}
            height={300}
          />
          <div className="text-center">
            Biểu đồ số lượng sách mượn theo thể loại
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
