import React from 'react';
import Orders from '../components/Orders/Orders';

const OrdersPage = () => {
    return (
        <div className="container mt-3">
            <h1 data-test="orders-page-header">Your orders</h1>
            <h3 data-test="orders-page-moto">Track your orders here</h3>
            <Orders/>
        </div>
    )
}

export default OrdersPage
