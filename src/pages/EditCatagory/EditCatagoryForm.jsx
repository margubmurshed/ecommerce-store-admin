import { useEffect, useState } from "react";
import firebase from "firebase";
import { FireStore } from "../../storeFirebase";
import {
    TextField,
    FormControl,
    Button
} from "@material-ui/core";
import Alert from "../../Components/Alert";
import Loader from "../../Components/Loader/Loader";

const EditProductForm = ({ catagory }) => {
    const [catagoryName, setCatagoryName] = useState("");
    const [catagoryImage, setCatagoryImage] = useState("");
    const [UpdatedImage, setUpdatedImage] = useState("");
    const [alerts, setAlert] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (catagory) {
            setCatagoryName(catagory.name);
            setCatagoryImage(catagory.featuredImg);
        }
    }, [catagory]);


    const ImageHandler = () => {
        return new Promise(async (resolve) => {
            if (typeof UpdatedImage === "string") {
                resolve(catagoryImage);
            } else {
                const StorageRef = firebase.storage().ref();
                const FileRef = StorageRef.child(UpdatedImage.name);
                await FileRef.put(UpdatedImage);
                resolve(await FileRef.getDownloadURL());
            }
        });
    };

    const updateCatagory = async () => {
        setAlert([]);
        setLoading(true);
        const updatedCatagory = await createUpdatedCatagory();
        try {
            await FireStore.collection("catagories")
                .doc(updatedCatagory.id)
                .set(updatedCatagory);
            setLoading(false);
            setAlert([{ message: 'Product updated successfully', color: 'green' }])
        } catch {
            setLoading(false);
            setAlert([{ message: 'Action Failed', color: 'red' }])
        }
    };

    const createUpdatedCatagory = async () => {
        return {
            ...catagory,
            name: catagoryName,
            featuredImg: await ImageHandler(),
            updateTime: new Date().getTime(),
        }
    }

    const HandleSubmit = async (e) => {
        e.preventDefault();
        if (
            catagory.name !== catagoryName ||
            typeof UpdatedImage !== "string"
        ) {
            updateCatagory();
        } else {
            setAlert([{ message: 'No changes made', color: 'red' }])
        }
    };

    if (loading) return <Loader />
    return (
        <>
            <Alert key={Math.random()} alerts={alerts} remove={() => setAlert([])} />
            <div
                className="bg-center bg-cover bg-no-repeat"
                style={{
                    flexBasis: "50%",
                    minHeight: "80vh",
                    backgroundImage: `url(${catagoryImage})`,
                }}
            />
            <form autoComplete="off" onSubmit={HandleSubmit} className="flex-1 p-5">
                <FormControl fullWidth className="flex flex-col gap-y-3">
                    <TextField
                        value={catagoryName}
                        onChange={(e) => setCatagoryName(e.target.value)}
                        label="Catagory Name"
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
                        Update Catagory
                    </Button>
                </div>
            </form>
        </>
    );
};

export default EditProductForm;
