import {
    TableContainer,
    Table,
    TableHead,
    TableRow,
    TableCell,
    TableBody,
    Button,
    Paper,
    Select,
    MenuItem
} from "@material-ui/core";
import { useState } from 'react';
import { Link } from 'react-router-dom';
import date from 'date-and-time';

const OrdersTable = ({ orders, handleStatusChange, deleteOrder }) => {
    const [showPage, setShowPage] = useState(10);
    return (
        <>
            <TableContainer component={Paper}>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell className="font-semibold"><span className="font-semibold">ID</span></TableCell>
                            <TableCell className="font-semibold"><span className="font-semibold">Name</span></TableCell>
                            <TableCell className="font-semibold"><span className="font-semibold">NOP</span></TableCell>
                            <TableCell className="font-semibold"><span className="font-semibold">Total</span></TableCell>
                            <TableCell className="font-semibold"><span className="font-semibold">Status</span></TableCell>
                            <TableCell className="font-semibold"><span className="font-semibold">Date</span></TableCell>
                            <TableCell className="font-semibold"></TableCell>
                            <TableCell className="font-semibold"></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {orders.map((order, orderIndex) => {
                            const { userInfo: { name }, orderInfo: { products, total, status, time }, id, index } = order;
                            if (orderIndex > showPage) return null;
                            return (
                                <TableRow key={Math.random()}>
                                    <TableCell>{id.slice(0, 7)}</TableCell>
                                    <TableCell>{name}</TableCell>
                                    <TableCell>{products.length}</TableCell>
                                    <TableCell>{total}</TableCell>
                                    <TableCell>
                                        <Select
                                            value={status}
                                            onChange={e => handleStatusChange(e.target.value, index, id)}
                                        >
                                            <MenuItem value="Pending">Pending</MenuItem>
                                            <MenuItem value="Completed">Completed</MenuItem>
                                        </Select>
                                    </TableCell>
                                    <TableCell>{date.format(new Date(time), 'DD MMM, YYYY')}</TableCell>
                                    <TableCell>
                                        <Link to={{ pathname: `/orders/${id}/${index}`, state: { order } }}>
                                            <Button color="primary" variant="contained" size="small">View Details</Button>
                                        </Link>
                                    </TableCell>
                                    <TableCell>
                                        <Button color="secondary" variant="contained" onClick={() => deleteOrder(id, index)}>Delete</Button>
                                    </TableCell>
                                </TableRow>
                            )
                        })}
                    </TableBody>
                </Table>
            </TableContainer>
            {showPage <= (orders.length - 1) ? <Button color="secondary" variant="outlined" onClick={() => setShowPage(prevState => prevState + 5)}>Load More</Button> : null}
        </>
    )
}

export default OrdersTable
