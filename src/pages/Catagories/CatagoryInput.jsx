import { useState } from "react";
import { TextField, Button } from "@material-ui/core";
import { FireStore, Storage } from "../../storeFirebase";
import Alert from '../../Components/Alert';

export const ImageURLProvider = async (ImageFileObject) => {
  const FileRef = await Storage.child(ImageFileObject.name);
  await FileRef.put(ImageFileObject);
  return FileRef.getDownloadURL();
};

const CatagoryInput = () => {
  const [catagoryName, setCatagoryName] = useState("");
  const [catagoryFeaturedImage, setCatagoryFeaturedImage] = useState("");
  const [alerts, setAlert] = useState([]);

  const HandleSubmit = async (e) => {
    e.preventDefault();
    if (catagoryName !== "" || catagoryFeaturedImage !== "") {
      try {
        await FireStore.collection("catagories").add({
          name: catagoryName.toUpperCase(),
          featuredImg: await ImageURLProvider(catagoryFeaturedImage),
          creationTime: new Date().getTime(),
        });
        setAlert([{ message: "Catagory Added Successfully!", color: 'green' }]);
      } catch (e) {
        console.log(e)
        setAlert([{ message: "Catagory Addition Failed", color: 'red' }]);
      }
    }
  };

  return (
    <>
      {alerts.length ? alerts.map(({ message, color }) => <Alert message={message} color={color} remove={() => setAlert([])} />) : null}
      <form
        onSubmit={HandleSubmit}
        className="p-3 bg-white rounded-md flex flex-wrap gap-5 justify-between items-center"
      >
        <TextField
          className="flex-1"
          label="Catagory Name"
          type="text"
          value={catagoryName}
          onChange={(e) => setCatagoryName(e.target.value)}
          required
        />
        <input
          className="flex-1"
          type="file"
          onChange={(e) => setCatagoryFeaturedImage(e.target.files[0])}
          required
        />
        <Button
          className="flex-1"
          type="submit"
          variant="contained"
          color="primary"
        >
          Add Catagory
        </Button>
      </form>
    </>
  );
};

export default CatagoryInput;
