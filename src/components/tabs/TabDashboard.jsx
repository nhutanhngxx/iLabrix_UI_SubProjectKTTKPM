import { BarChart, LineChart } from "@mui/x-charts";
import { PieChart } from "@mui/x-charts/PieChart";
import { useEffect, useState } from "react";
import borrowService from "../../services/borrowService";

const TabDashboard = () => {
  // Mock Data
  const booksBorrowedToday = 10;
  const booksBorrowedYesterday = 5;
  const usersBorrowedToday = 25;
  const usersBorrowedYesterday = 10;

  const OverViewTab = () => {
    const [borrowRequests, setBorrowRequests] = useState();

    // Lấy danh sách phiếu mượn
    const fetchBorrowRequests = async () => {
      try {
        const response = await borrowService.getBorrowRequestsStatistics();
        if (!response) {
          throw new Error("Lỗi khi lấy dữ liệu");
        }
        setBorrowRequests(response);
      } catch (error) {
        console.error("Lỗi API:", error);
      }
    };
    useEffect(() => {
      fetchBorrowRequests();
    }, []);

    // Dữ liệu cho phân tích các phiếu mượn
    const borrowRequestsData = [
      {
        id: 1,
        value: borrowRequests?.pendingRequests || 0,
        label: "Pending",
      },
      {
        id: 2,
        value: borrowRequests?.approvedRequests || 0,
        label: "Borrowed",
      },
      {
        id: 3,
        value: borrowRequests?.canceledRequests || 0,
        label: "Canceled",
      },
      {
        id: 4,
        value: borrowRequests?.returnedRequests || 0,
        label: "Returned",
      },
      {
        id: 5,
        value: borrowRequests?.overdueRequests || 0,
        label: "Overdue",
      },
    ];

    return (
      <div className="grid grid-cols-2 grid-rows-3 gap-2">
        {/* BorrowRecords - Pie Chart */}
        <div className="flex justify-center row-span-1 border-2 border-gray-400 rounded-xl">
          <div>
            <PieChart
              colors={["#FFC107", "#3B82F6", "#DC2626", "#EC4899", "#8B5CF6"]}
              series={[
                {
                  data: borrowRequestsData,
                  highlightScope: { fade: "global", highlight: "item" },
                  faded: {
                    innerRadius: 30,
                    additionalRadius: -30,
                    color: "gray",
                  },
                  innerRadius: 30,
                },
              ]}
              title="Borrow Requests"
              width={320}
              height={160}
            />
            <div className="text-center">
              Total borrow requests: {borrowRequests?.totalRequests || 0}
            </div>
          </div>
        </div>

        {/* BorrowRecords - Borrowed Today, Returned Yesterday */}
        <div className="flex gap-5 items-center justify-center border-2 border-gray-400 rounded-xl row-span-1">
          <div className="bg-white/75 py-2 px-5 rounded-xl border-2 border-gray-400">
            <div className="text-lg font-medium">Books Borrowed Today</div>
            <div className="flex justify-around mt-2 items-center">
              <div className="text-xl">{booksBorrowedToday}</div>
              <div className="text-sm">
                {(booksBorrowedToday / booksBorrowedYesterday) * 100}%
              </div>
            </div>
          </div>
          <div className="bg-white/75 py-2 px-5 rounded-xl border-2 border-gray-400">
            <div className="text-lg font-medium">Users Borrowed Today</div>
            <div className="flex justify-around mt-2 items-center">
              <div className="text-xl">{usersBorrowedToday}</div>
              <div className="text-sm">
                {(usersBorrowedToday / usersBorrowedYesterday) * 100}%
              </div>
            </div>
          </div>
        </div>

        {/* Number of Borrwer - Liner Chart */}
        <div className="flex flex-col items-center justify-center row-span-2 border-2 border-gray-400 rounded-xl">
          <LineChart
            xAxis={[
              { data: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12], label: "Month" },
            ]}
            series={[
              {
                data: [2, 5.5, 2, 8.5, 1.5, 5, 3, 7, 4, 6, 5, 8],
                label: "Number of Borrower",
                showMark: false,
                type: "line",
              },
            ]}
            width={500}
            height={350}
          />
        </div>

        {/* Favorite Book - Liner Chart */}
        <div className="flex flex-col items-center justify-center row-span-2 border-2 border-gray-400 rounded-xl">
          <BarChart
            xAxis={[
              {
                scaleType: "band",
                data: ["Book 1", "Book 2", "Book 3"],
                label: "Favorite Book",
              },
            ]}
            yAxis={[{ scaleType: "linear" }]}
            series={[{ data: [10, 7, 5] }]}
            width={500}
            height={350}
          />
        </div>
      </div>
    );
  };

  return (
    <div>
      <OverViewTab />
    </div>
  );
};

export default TabDashboard;
