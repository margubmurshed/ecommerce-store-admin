import React from 'react';
import { useLocation } from 'react-router';
import date from 'date-and-time'

const ViewOrder = () => {
    const { order: { userInfo, orderInfo } } = useLocation().state;
    const statusColor = color => color === 'Pending' ? 'yellow' : 'green';
    return (
        <main>
            <h2 className="text-2xl font-semibold">Order Details</h2>
            <div className="flex py-5 gap-3">
                <div className="order-details rounded-md" style={{ flexBasis: '50%' }}>
                    <p>Num of products : <strong>{orderInfo.products.length}</strong></p>
                    <p>Order Date : <strong>{date.format(new Date(orderInfo.time), 'DD MMM, YYYY')}</strong></p>
                    <p>Payable Total : <strong>{orderInfo.total} Taka</strong></p>
                    <p>Status : <strong className={`text-${statusColor(orderInfo.status)}-500`}>{orderInfo.status}</strong></p>
                    <div className="bg-white p-3 flex flex-col gap-3 mt-5">
                        <h2 className="text-xl font-semibold">Products</h2>
                        {orderInfo.products.map(({ product, count }) => (
                            <div className="flex justify-between">
                                <span>{product.name.slice(0, 40) + '...'} X <strong>{count}</strong></span>
                                <span>{product.price * count} Taka</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="user-details bg-white p-3 rounded-md" style={{ flexBasis: '50%' }}>
                    <h2 className="text-xl font-semibold">User Details</h2>
                    <div className="flex flex-col gap-3 mt-5">
                        <p>Name : <strong>{userInfo.name}</strong></p>
                        <p>Phone : <strong>{userInfo.phoneNumber}</strong></p>
                        <p>Alt. Phone : <strong>{userInfo.alternativePhoneNumber}</strong></p>
                        <p>Address : <strong>{userInfo.address}</strong></p>
                        <p>Payment Method : <strong>{userInfo.paymentMethod}</strong></p>
                    </div>
                </div>
            </div>
        </main>
    )
}

export default ViewOrder
