import {
  mockBooks,
  mockBorrowRecords,
  mockInventorys,
} from "../../mock/mockData";
import { PieChart } from "@mui/x-charts/PieChart";

const TabDashboard = () => {
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
    const returnDate = new Date(record.dueDate);
    return currentDate > returnDate && !record.isReturned // return record.returnDate === ""
      ? total + record.bookId.length
      : total;
  }, 0);

  // Pie Chart Data
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

  return (
    <div>
      {/* BorrowRecords - Pie Chart */}
      <div className="flex justify-around items-center border border-gray-300 ">
        <div>
          <PieChart
            colors={["red", "blue", "green"]}
            series={[
              {
                data: bookPieChartData,
              },
            ]}
            title="Borrow Records"
            width={400}
            height={200}
          />
          <div className="text-center">
            Total books in inventory: {totalBooks}
          </div>
        </div>

        {/* BorrowRecords - Borrowed Today, Returned Yesterday */}
        <div className="flex flex-col gap-20">
          <div>
            <div className="text-lg font-medium">Books Borrowed Today</div>
            <div className="flex justify-around">
              <div>{booksBorrowedToday}</div>
              <div>{(booksBorrowedToday / booksBorrowedYesterday) * 100}%</div>
            </div>
          </div>
          <div>
            <div className="text-lg font-medium">Users Borrowed Today</div>
            <div className="flex justify-around">
              <div>{usersBorrowedToday}</div>
              <div>{(usersBorrowedToday / usersBorrowedYesterday) * 100}%</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabDashboard;
