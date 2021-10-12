import CatagoryInput from "./CatagoryInput";
import CatagoriesTable from './CatagoriesTable'
import { useSelector } from "react-redux";
import { useEffect } from "react";

const Catagories = () => {
  const catagories = useSelector(({ catagories }) => catagories);
  useEffect(() => document.title = "Catagories | Ecommerce Admin", []);

  return (
    <>
      <p className="text-2xl font-semibold mb-5">Catagories</p>
      <CatagoryInput />
      <div className="flex flex-wrap gap-5 bg-white mt-5 rounded-md">
        <CatagoriesTable catagories={catagories} />
      </div>
    </>
  );
};

export default Catagories;
