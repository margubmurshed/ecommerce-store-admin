import { Link } from "react-router-dom";

const CatagoryItem = ({ catagory }) => {
  return (
    <>
      <Link
        to={`/catagories/${catagory.id}/details`}
        className="flex-1"
        style={{
          flexBasis: "300px",
        }}
      >
        <div
          className="flex justify-center items-center h-48 bg-white shadow-md bg-center bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${catagory.featuredImg})`,
          }}
        >
          <p className="bg-white rounded-md text-gray-900 p-3 font-semibold">
            {catagory.name}
          </p>
        </div>
      </Link>
    </>
  );
};

export default CatagoryItem;
