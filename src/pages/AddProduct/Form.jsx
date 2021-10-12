import { useState } from "react";
import { ImageURLProvider } from "../Catagories/CatagoryInput";
import { FireStore } from "../../storeFirebase";
import {
  TextField,
  FormControl,
  Select,
  Button,
  MenuItem,
} from "@material-ui/core";
import Alert from "../../Components/Alert";
import Loader from "../../Components/Loader/Loader";

const AddProductForm = ({ catagories }) => {
  const [productName, setProductName] = useState("");
  const [productCatagory, setProductCatagory] = useState(catagories[0] ? catagories[0].name : '');
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [alerts, setAlert] = useState([]);
  const [loading, setLoading] = useState(false);

  const addProduct = async () => {
    setAlert([]);
    setLoading(true);
    const product = await createProduct();
    try {
      await FireStore.collection("products").add(product);
      setAlert([{ message: 'Product Added Successfully', color: 'green' }]);
      resetInput();
      setLoading(false);
    } catch {
      setAlert([{ message: 'Action Failed', color: 'red' }]);
      setLoading(false);
    }
  }

  const createProduct = async () => {
    return {
      name: productName,
      catagory: productCatagory,
      price: productPrice,
      description: productDescription,
      productImage: await ImageURLProvider(productImage),
    }
  }

  const handleSubmit = async e => {
    e.preventDefault();
    if (
      productName === "" ||
      productPrice === "" ||
      setProductDescription === "" ||
      productImage === ""
    ) {
      setAlert([{ message: 'Fill all the fields!', color: 'red' }])
    } else {
      addProduct()
    }
  };

  const resetInput = () => {
    setProductName("");
    setProductCatagory("shirt");
    setProductPrice("");
    setProductDescription("");
    setProductImage("");
  };

  if (loading) return <Loader />
  return (
    <>
      {alerts.length ? alerts.map(({ message, color }) => <Alert message={message} color={color} remove={() => setAlert([])} />) : null}
      <form autoComplete="off" onSubmit={handleSubmit}>
        <FormControl fullWidth className="flex flex-col gap-y-3">
          <TextField
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            label="Product Name"
            variant="outlined"
            type="text"
            required
          />
          <Select
            value={productCatagory}
            onChange={(e) => setProductCatagory(e.target.value)}
            variant="outlined"
          >
            {catagories.map(({ name }) => <MenuItem value={name} key={name}>{name}</MenuItem>)}
          </Select>
          <TextField
            value={productPrice}
            onChange={(e) => setProductPrice(e.target.value)}
            label="Product Price"
            variant="outlined"
            type="text"
            required
          />
          <TextField
            value={productDescription}
            onChange={(e) => setProductDescription(e.target.value)}
            label="Product Description"
            variant="outlined"
            type="text"
            required
          />
          <input
            accept="image/*"
            onChange={(e) => e.target.files[0] && setProductImage(e.target.files[0])}
            type="file"
          />
        </FormControl>
        <div className="mt-6">
          <Button color="primary" variant="contained" type="submit">Add Product</Button>
        </div>
      </form>
    </>
  );
};

export default AddProductForm;
