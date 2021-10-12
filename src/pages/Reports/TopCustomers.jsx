import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import Loader from '../../Components/Loader/Loader';
import { FireStore } from '../../storeFirebase';
import { Avatar } from '@material-ui/core';

const TopCustomers = () => {
    const users = useSelector(({ users }) => users);
    const [topCustomers, setTopCustomers] = useState([]);
    const [prevOrders, setPrevOrders] = useState([]);

    useEffect(() => {
        const unmount = getPreviousOrders();
        return unmount;
    }, [])

    useEffect(() => {
        getTopCustomers()
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [prevOrders])

    const getPreviousOrders = async () => {
        return FireStore.collection("orders")
            .onSnapshot((snapshot) => {
                const previousOrders = [];
                snapshot.forEach(doc => {
                    if (doc.exists) {
                        previousOrders.push({ ...doc.data(), userID: doc.id });
                    }
                })
                setPrevOrders(previousOrders);
            })
    };

    const getTopCustomers = () => {
        const sortedOrders = prevOrders.sort((a, b) => b.orders.length - a.orders.length);
        setTopCustomers(sortedOrders);
    }

    return (
        <div className="bg-white rounded-md w-full" style={{ flexBasis: '50%' }}>
            <div className="p-3 bg-blue-100">
                <span className="text-blue-500 font-semibold">Top 10 Customers of the month</span>
            </div>
            <div className="flex flex-col gap-3 overflow-y-auto h-64 p-3">
                {users.length
                    ? (topCustomers.length ? topCustomers.map(({ userID }, index) => {
                        const user = users.find(user => user.uid === userID);
                        if (index > 9) return null;
                        return (
                            <div className="flex items-center bg-yellow-500 text-white p-2 rounded-md gap-2">
                                <p>#{index + 1}</p>
                                <Avatar src={user.photoURL} />
                                <p className="font-semibold">{user.name}</p>
                            </div>
                        )
                    }) : 'No customer found')
                    : <Loader />}
            </div>
        </div>
    )
}

export default TopCustomers
