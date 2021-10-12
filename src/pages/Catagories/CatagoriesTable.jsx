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
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { FireStore } from '../../storeFirebase';
import Alert from '../../Components/Alert';
import date from 'date-and-time';

const CatagoriesTable = ({ catagories }) => {
    console.log(catagories);
    const [alerts, setAlert] = useState([]);
    const [loading, setLoading] = useState(false);

    const deleteCatagory = async (id) => {
        if (window.confirm("Are you sure?")) {
            setAlert([]);
            setLoading(true);
            try {
                await FireStore.collection("catagories").doc(id).delete();
                setLoading(false);
                setAlert([{ message: 'Catagory removed successfully', color: 'green' }])
            } catch {
                setLoading(false);
                setAlert([{ message: 'Action Failed!', color: 'red' }])
            }
        }
    }

    if (!catagories.length) return <div className="p-5 text-center">No Catagories Found</div>
    return (
        <>
            {alerts.length ? alerts.map(({ message, color }) => <Alert message={message} key={message} color={color} remove={() => setAlert([])} />) : null}

            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-semibold"><span className="font-semibold">Featured Image</span></TableCell>
                            <TableCell className="font-semibold"><span className="font-semibold">Name</span></TableCell>
                            <TableCell className="font-semibold"><span className="font-semibold">Created On</span></TableCell>
                            <TableCell className="font-semibold"></TableCell>
                            <TableCell className="font-semibold"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {catagories.map(({ id, featuredImg, name, creationTime }) => (
                            <TableRow key={id}>
                                <TableCell>
                                    <a href={featuredImg} target="_blank" rel="noreferrer">
                                        <img
                                            src={featuredImg}
                                            alt={name}
                                            width="50px"
                                        />
                                    </a>
                                </TableCell>
                                <TableCell>{name}</TableCell>
                                <TableCell>{date.format(new Date(creationTime), 'DD MMM, YYYY')}</TableCell>
                                <TableCell>
                                    <Link to={`/catagories/${id}`}>
                                        <Button variant="contained" color="primary">
                                            Edit
                                        </Button>
                                    </Link>
                                </TableCell>
                                <TableCell>
                                    <Button variant="contained" color="secondary" disabled={loading} onClick={() => deleteCatagory(id)}>
                                        Delete
                                    </Button>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </>
    );
};

export default CatagoriesTable;
