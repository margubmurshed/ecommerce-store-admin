import React from "react";
import { Line } from "react-chartjs-2";
import { useSelector } from "react-redux";
import TopCustomers from './TopCustomers';

const Summary = ({ orders }) => {
  const users = useSelector(({ users }) => users);

  const Months = [
    "Jan",
    "Feb",
    "March",
    "April",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  const getAllMonthOrders = () => {
    const OneMonthTime = 2678400000;
    const YEAR = new Date().getFullYear();
    const allMonthOrders = [];
    Months.forEach(month => {
      const monthStartTime = new Date(`1 ${month} ${YEAR}`).getTime();
      const monthEndTime = monthStartTime + OneMonthTime;
      let thisMonthOrders = 0;
      orders.forEach(order => {
        if (monthStartTime <= order.orderInfo.time && monthEndTime >= order.orderInfo.time) {
          thisMonthOrders += 1
        }
      })
      thisMonthOrders ? allMonthOrders.push(thisMonthOrders) : allMonthOrders.push(null);
    })
    return allMonthOrders
  }

  const getAllMonthIncomes = () => {
    const OneMonthTime = 2678400000;
    const YEAR = new Date().getFullYear();
    const allMonthIncomes = [];
    Months.forEach(month => {
      const monthStartTime = new Date(`1 ${month} ${YEAR}`).getTime();
      const monthEndTime = monthStartTime + OneMonthTime;
      let thisMonthIncomes = 0;
      orders.forEach(order => {
        if (monthStartTime <= order.orderInfo.time && monthEndTime >= order.orderInfo.time) {
          if (order.orderInfo.status === 'Completed') {
            thisMonthIncomes += order.orderInfo.total
          }
        }
      })
      thisMonthIncomes ? allMonthIncomes.push(thisMonthIncomes) : allMonthIncomes.push(null);
    })
    return allMonthIncomes;
  }

  const getAllMonthUsers = () => {
    const OneMonthTime = 2678400000;
    const YEAR = new Date().getFullYear();
    const allMonthUsers = [];
    Months.forEach(month => {
      const monthStartTime = new Date(`1 ${month} ${YEAR}`).getTime();
      const monthEndTime = monthStartTime + OneMonthTime;
      let thisMonthUsers = 0;
      users.forEach(user => {
        if (monthStartTime <= user.creationTime && monthEndTime >= user.creationTime) {
          thisMonthUsers += 1
        }
      })
      thisMonthUsers ? allMonthUsers.push(thisMonthUsers) : allMonthUsers.push(null);
    })
    return allMonthUsers;
  }

  const SalesData = {
    labels: Months,
    datasets: [
      {
        label: "Sales",
        data: getAllMonthIncomes(),
        backgroundColor: "#19D895",
      },
    ],
  };

  const OrderData = {
    labels: Months,
    datasets: [
      {
        label: "Orders",
        data: getAllMonthOrders(),
        backgroundColor: "#8B5CF6",
      },
    ],
  };
  const UserData = {
    labels: Months,
    datasets: [
      {
        label: "Users",
        data: getAllMonthUsers(),
        backgroundColor: "#F59E0B",
      },
    ],
  };
  return (
    <>
      <div className="flex flex-col gap-3">
        <div className="flex flex-col md:flex-row gap-3 flex-1">
          <div className="bg-white shadow-md" style={{ flexBasis: '50%' }}>
            <div className="p-3 bg-green-100">
              <span className="text-green-500">Sales Summary</span>
            </div>
            <div className="p-3">
              <Line data={SalesData} />
            </div>
          </div>
          <div className="bg-white shadow-md" style={{ flexBasis: '50%' }}>
            <div className="p-3 bg-purple-100">
              <span className="text-purple-500">Orders Summary</span>
            </div>
            <div className="p-3">
              <Line data={OrderData} />
            </div>
          </div>
        </div>
        <div className="flex flex-col md:flex-row gap-3">
          <div className="bg-white shadow-md" style={{ flexBasis: '50%' }}>
            <div className="p-3 bg-yellow-100">
              <span className="text-yellow-500">Users Summary</span>
            </div>
            <div className="p-3">
              <Line data={UserData} />
            </div>
          </div>
          <TopCustomers />
        </div>
      </div>
    </>
  );
};

export default Summary;
