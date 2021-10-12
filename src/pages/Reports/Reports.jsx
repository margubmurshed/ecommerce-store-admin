import { useEffect } from "react";
import { useSelector } from "react-redux";
import Cards from "./Cards";
import Summary from "./Summary";

const Lander = () => {
  const { orders } = useSelector(({ orders }) => ({ orders }));
  useEffect(() => document.title = "Reports | Ecommerce Admin", [])
  return (
    <>
      <div className="flex flex-col gap-5">
        <Cards orders={orders} />
        <Summary orders={orders} />
      </div>
    </>
  );
};

export default Lander;
