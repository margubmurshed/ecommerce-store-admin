import { useSelector } from "react-redux";
import { useParams } from "react-router";
import Loader from '../../Components/Loader/Loader';
import Form from './EditCatagoryForm';
import { useEffect } from "react";

const CatagoryDetails = () => {
  const catagories = useSelector(({ catagories }) => catagories);
  const { id } = useParams();
  const catagory = catagories.filter((catagory) => catagory.id === id)[0];

  useEffect(() => document.title = "Catagory Details | Ecommerce Admin", []);


  return (
    <>
      <div className="bg-white p-3 rounded-md shadow-md flex flex-col md:flex-row">
        {catagory ? <Form catagory={catagory} /> : <Loader />}
      </div>
    </>
  );
};

export default CatagoryDetails;
