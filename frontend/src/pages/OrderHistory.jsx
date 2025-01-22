import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(1); // Hardcoded user ID, replace with actual login user ID

    useEffect(() => {
        const fetchOrderHistory = async () => {
            try {
                const response = await axios.get(`/orders/${userId}`);
                setOrders(response.data);
            } catch (err) {
                console.error('Error fetching order history:', err);
            }
        };

        fetchOrderHistory();
    }, [userId]);

    return (
        <div>
            <h1>Order History</h1>
            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.OrderID} style={{ marginBottom: '20px', padding: '10px', border: '1px solid #ddd' }}>
                        <h3>Order ID: {order.OrderID}</h3>
                        <p>Status: {order.Status}</p>
                        <p>Total: ₹{order.TotalAmount}</p>
                        <p>Date: {new Date(order.OrderDate).toLocaleDateString()}</p>
                        <div>
                            <h4>Items:</h4>
                            <ul>
                                {order.items.map((item, index) => (
                                    <li key={index}>
                                        {item.Name} - Quantity: {item.Quantity} - Subtotal: ₹{item.SubTotal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <p>No orders yet.</p>
            )}
        </div>
    );
};

export default OrderHistory;
