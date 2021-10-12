import { useSelector } from "react-redux";

const Cards = ({ orders }) => {
  const users = useSelector(({ users }) => users);

  const getLast30NumDayTime = (currentTime) => {
    const OneMonthTime = 2678400000;
    const PrevMonthTime = currentTime - OneMonthTime;
    return PrevMonthTime;
  }

  const newOrdersSinceLast30Days = () => {
    if (orders.length) {
      let newOrders = [];
      let currentTime = new Date().getTime();
      orders.forEach((order) => {
        const ORDER_TIME = order.orderInfo.time;
        if (ORDER_TIME >= getLast30NumDayTime(currentTime) && ORDER_TIME <= currentTime) {
          newOrders.push(order)
        }
      })
      return newOrders;
    } else return [];
  }

  const totalIncomeSinceLast30Days = () => {
    const NEW_ORDERS = newOrdersSinceLast30Days();
    let totalIncome = 0;
    NEW_ORDERS.forEach(order => {
      if (order.orderInfo.status === "Completed") {
        totalIncome += order.orderInfo.total
      }
    })
    return totalIncome;
  }

  const newUsersSinceLast30Days = () => {
    if (users.length) {
      let newUsers = [];
      let currentTime = new Date().getTime();
      users.forEach((user) => {
        const CREATION_TIME = user.creationTime;
        if (CREATION_TIME >= getLast30NumDayTime(currentTime) && CREATION_TIME <= currentTime) {
          newUsers.push(user)
        }
      })
      return newUsers;
    } else {
      return 0;
    }
  }

  return (
    <>
      <div className="flex flex-col md:flex-row gap-3 justify-around">
        <div className="flex bg-purple-500 text-white justify-between items-center p-5 shadow-md flex-1">
          <div>
            <p className="uppercase text-xs">New Orders</p>
            <h2 className="text-3xl font-bold">{newOrdersSinceLast30Days().length}</h2>
            <p className="text-xs">Last 30 Days</p>
          </div>
          <div>
            <i className="fas fa-shopping-cart bg-white text-purple-500 p-3 rounded-full flex justify-center items-center rounded-full w-10 h-10"></i>
          </div>
        </div>
        <div className="flex bg-green-500 text-white justify-between items-center p-5 shadow-md flex-1">
          <div>
            <p className="uppercase text-xs">Total Income</p>
            <h2 className="text-3xl font-bold">{totalIncomeSinceLast30Days()}</h2>
            <p className="text-xs">Last 30 Days</p>
          </div>
          <div>
            <i className="fas fa-dollar-sign bg-white text-green-500 p-3 flex justify-center items-center rounded-full w-10 h-10"></i>
          </div>
        </div>
        <div className="flex bg-yellow-500 text-white justify-between items-center p-5 shadow-md flex-1">
          <div>
            <p className="uppercase text-xs">New Users</p>
            <h2 className="text-3xl font-bold">{newUsersSinceLast30Days().length || 0}</h2>
            <p className="text-xs">Last 30 Days</p>
          </div>
          <div>
            <i className="fas fa-users bg-white text-yellow-500 p-3 rounded-full flex justify-center items-center rounded-full w-10 h-10"></i>
          </div>
        </div>
      </div>
    </>
  );
};

export default Cards;
