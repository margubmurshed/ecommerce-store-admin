import ProductTable from "./ProductTable";
import { useSelector } from "react-redux";
import { FireStore } from "../../storeFirebase";
import { useEffect, useState } from "react";
import Alert from "../../Components/Alert";

const Products = () => {
  const products = useSelector(state => state.products);
  const [alerts, setAlert] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => document.title = "Products | Ecommerce Admin", []);

  const deleteProduct = async (productID) => {
    if (window.confirm("Are you sure?")) {
      setAlert([]);
      setLoading(true);
      try {
        await FireStore.collection("products").doc(productID).delete();
        setLoading(false);
        setAlert([{ message: 'Product removed successfully', color: 'green' }])
      } catch {
        setLoading(false);
        setAlert([{ message: 'Action Failed!', color: 'red' }])
      }
    }
  };

  return (
    <>
      <Alert alerts={alerts} remove={() => setAlert([])} />
      <p className="text-2xl font-semibold mb-5">Products</p>
      <ProductTable products={products} deleteProduct={deleteProduct} loading={loading} />
    </>
  );
};

export default Products;
