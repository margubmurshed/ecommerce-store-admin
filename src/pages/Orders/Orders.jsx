import React, { useEffect, useState } from 'react';
import { FireStore } from '../../storeFirebase';
import Table from './OrdersTable';

const Orders = () => {
    const [orders, setOrders] = useState(null);

    useEffect(() => {
        document.title = "Orders | Ecommerce Admin";
        const unmount = getOrders();
        return unmount;
    }, [])

    const getOrders = () => {
        const unmount = FireStore.collection('orders').onSnapshot(snapshot => {
            const fetchedOrders = [];
            snapshot.forEach(doc => fetchedOrders.push({ id: doc.id, ...doc.data() }));
            setOrders(fetchedOrders)
        })
        return unmount;
    }

    const separateFromNestedArrays = (array) => {
        return (
            array.length
                ? array.map(({ orders, id }) =>
                    orders.map((order, index) => ({ ...order, id, index })))
                    .reduce((prev, current) => [...prev, ...current], [])
                    .sort((a, b) => b.orderInfo.time - a.orderInfo.time)
                : []
        );
    }

    const handleStatusChange = (value, changeIndex, userID) => {
        const userOrder = orders.filter(({ id }) => id === userID)[0];
        userOrder.orders[changeIndex].orderInfo.status = value;
        FireStore.collection('orders').doc(userID).set(userOrder)
    }

    const deleteOrder = (userID, index) => {
        const userOrder = orders.filter(({ id }) => id === userID)[0];
        userOrder.orders.splice(index);
        FireStore.collection('orders').doc(userID).set(userOrder)
    }

    return (
        <div>
            <p className="text-2xl font-semibold mb-5">Orders</p>
            {orders ? (
                <Table
                    orders={separateFromNestedArrays(orders)}
                    handleStatusChange={handleStatusChange}
                    deleteOrder={deleteOrder}
                />
            ) : 'Loading...'}
        </div>
    )
}

export default Orders
