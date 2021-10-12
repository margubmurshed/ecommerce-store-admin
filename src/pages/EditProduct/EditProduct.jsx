import Form from "./EditProductForm";
import { useParams } from "react-router";
import { useSelector } from "react-redux";
import { useEffect } from "react";

const EditProduct = () => {
  const { products, catagories } = useSelector(({ products, catagories }) => ({ products, catagories }));
  const { id: productID } = useParams();
  const product = products.filter((product) => product.id === productID)[0];

  useEffect(() => document.title = "Product Details | Ecommerce Admin", []);


  return (
    <>
      <Form
        product={product}
        catagories={catagories}
      />
    </>
  );
};

export default EditProduct;
