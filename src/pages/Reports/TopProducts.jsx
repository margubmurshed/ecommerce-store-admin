import { useState, useEffect } from 'react';
import { FireStore } from '../../storeFirebase';

const TopProducts = () => {
    const [topProducts, setTopProducts] = useState([]);
    const [prevOrders, setPrevOrders] = useState([]);

    useEffect(() => {
        const unmount = getPreviousOrders();
        return unmount;
    }, [])

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

    return (
        <div className="bg-white p-3 w-full">
            top products
        </div>
    )
}

export default TopProducts
