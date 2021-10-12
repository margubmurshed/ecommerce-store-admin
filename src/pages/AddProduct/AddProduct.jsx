import { useSelector } from "react-redux";
import AddProductForm from "./Form";
import { useEffect } from "react";

const AddProduct = () => {
  const catagories = useSelector(state => state.catagories);
  useEffect(() => document.title = "Add Product | Ecommerce Admin", []);

  return (
    <div className="py-10">
      <p className="text-2xl font-semibold pb-5">Add Products</p>
      <AddProductForm
        catagories={catagories}
      />
    </div>
  );
};

export default AddProduct;
