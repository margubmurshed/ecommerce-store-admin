import { useEffect, useState } from "react";
import firebase from "firebase";
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

const EditProductForm = ({ product, catagories }) => {
  const [productName, setProductName] = useState("");
  const [productCatagory, setProductCatagory] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productImage, setProductImage] = useState("");
  const [UpdatedImage, setUpdatedImage] = useState("");
  const [alerts, setAlert] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (product) {
      setProductName(product.name);
      setProductCatagory(product.catagory);
      setProductPrice(product.price);
      setProductDescription(product.description);
      setProductImage(product.productImage);
    }
  }, [product]);

  const ImageHandler = () => {
    return new Promise(async (resolve) => {
      if (typeof UpdatedImage === "string") {
        resolve(productImage);
      } else {
        const StorageRef = firebase.storage().ref();
        const FileRef = StorageRef.child(UpdatedImage.name);
        await FileRef.put(UpdatedImage);
        resolve(await FileRef.getDownloadURL());
      }
    });
  };

  const updateProduct = async () => {
    setAlert([]);
    setLoading(true);
    const updatedProduct = await createUpdatedProduct();
    try {
      await FireStore.collection("products")
        .doc(updatedProduct.id)
        .set(updatedProduct);
      setLoading(false);
      setAlert([{ message: 'Product updated successfully', color: 'green' }])
    } catch {
      setLoading(false);
      setAlert([{ message: 'Action Failed', color: 'red' }])
    }
  };

  const createUpdatedProduct = async () => {
    return {
      ...product,
      name: productName,
      catagory: productCatagory,
      price: productPrice,
      description: productDescription,
      productImage: await ImageHandler(),
      updateTime: new Date().getTime(),
    }
  }

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (
      product.name !== productName ||
      product.catagory !== productCatagory ||
      product.price !== productPrice ||
      product.description !== productDescription ||
      typeof UpdatedImage !== "string"
    ) {
      updateProduct();
    } else {
      setAlert([{ message: 'No changes made', color: 'red' }])
    }
  };

  if (loading) return <Loader />
  return (
    <>
      {alerts.length ? alerts.map(({ message, color }) => <Alert key={message} message={message} color={color} remove={() => setAlert([])} />) : null}
      <div className="flex flex-col md:flex-row">
        <div
          className="bg-center bg-cover bg-no-repeat"
          style={{
            flexBasis: "50%",
            minHeight: "80vh",
            backgroundImage: `url(${productImage})`,
          }}
        />
        <form autoComplete="off" onSubmit={HandleSubmit} className="flex-1 p-5">
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
              {catagories.map((catagory) => (
                <MenuItem value={catagory.name} key={catagory.id}>
                  {catagory.name}
                </MenuItem>
              ))}
            </Select>
            <TextField
              value={productPrice}
              onChange={(e) => setProductPrice(e.target.value)}
              label="Product Price (৳)"
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
              onChange={(e) =>
                e.target.files[0] && setUpdatedImage(e.target.files[0])
              }
              type="file"
            />
          </FormControl>
          <div className="mt-6">
            <Button color="primary" variant="contained" type="submit">
              Update Product
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default EditProductForm;
