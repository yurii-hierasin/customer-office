import React from 'react';

const orders = [
    {
        price: 150.00,
        destination: 'Chad',
        applicant: 'John Doe',
    },
    {
        price: 100.00,
        destination: 'Kenya',
        applicant: 'John Doe',
    },
    {
        price: 35.00,
        destination: 'Australia',
        applicant: 'John Doe',
    },
]

const Orders = () => {
    return (
        <div className="container mt-3">
            <h1>Your orders</h1>
            <h3>Track your orders here</h3>

            {orders.map(order => {
                return (
                    <div className="card mt-3">
                        <div className="card-body">
                            <div className="row">
                                <div className="col-10">
                                    {`Visa for ${order.applicant} to ${order.destination}`}
                                </div>
                                <div className="col-2">${order.price.toFixed(2)}</div>
                            </div>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default Orders
