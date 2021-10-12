import {
  TableContainer,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Button,
  Paper,
} from "@material-ui/core";
import { useState } from "react";
import { Link } from 'react-router-dom';

const ProductTable = ({ products, deleteProduct, loading }) => {
  const [showPage, setShowPage] = useState(10);

  if (!products.length) return <div className="p-5 text-center">No Product Found</div>
  return (
    <>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Image</TableCell>
              <TableCell>Name</TableCell>
              <TableCell>Catagory</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>ID</TableCell>
              <TableCell></TableCell>
              <TableCell></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {products.map((product, index) => {
              if (showPage < index) return null;
              else return (
                <TableRow key={product.id}>
                  <TableCell>
                    <a href={product.productImage} target="_blank" rel="noreferrer">
                      <img
                        src={product.productImage}
                        alt={product.name}
                        width="50px"
                      />
                    </a>
                  </TableCell>
                  <TableCell>{product.name}</TableCell>
                  <TableCell>{product.catagory}</TableCell>
                  <TableCell>{product.price}</TableCell>
                  <TableCell>{product.id}</TableCell>
                  <TableCell>
                    <Link to={`/products/${product.id}`}>
                      <Button variant="contained" color="primary">
                        Edit
                      </Button>
                    </Link>
                  </TableCell>
                  <TableCell>
                    <Button variant="contained" color="secondary" disabled={loading} onClick={() => deleteProduct(product.id)}>
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
      {showPage <= (products.length - 1) ? <Button color="secondary" variant="outlined" onClick={() => setShowPage(prevState => prevState + 5)}>Load More</Button> : null}
    </>
  );
};

export default ProductTable;
