import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';

const OrderHistory = () => {
    const [orders, setOrders] = useState([]);
    const [userId, setUserId] = useState(1); // Hardcoded user ID, replace with actual logged-in user ID

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
        <div style={{
            padding: '20px',
            backgroundColor: '#f9f9f9',
            minHeight: '100vh',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            <h1 style={{ fontSize: '3em', marginBottom: '30px', color: '#333' }}>Order History</h1>

            {orders.length > 0 ? (
                orders.map((order) => (
                    <div key={order.OrderID} style={{
                        backgroundColor: '#fff',
                        padding: '20px',
                        borderRadius: '10px',
                        marginBottom: '20px',
                        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)',
                        width: '100%',
                        maxWidth: '800px',
                    }}>
                        <h3 style={{ fontSize: '1.5em', marginBottom: '10px', color: '#333' }}>Order ID: {order.OrderID}</h3>
                        <p style={{ fontSize: '1.2em', marginBottom: '10px', color: '#555' }}>Status: <span style={{ fontWeight: 'bold' }}>{order.Status}</span></p>
                        <p style={{ fontSize: '1.5em', fontWeight: 'bold', marginBottom: '10px' }}>Total: ₹{order.TotalAmount}</p>
                        <p style={{ fontSize: '1.1em', marginBottom: '20px', color: '#777' }}>Date: {new Date(order.OrderDate).toLocaleDateString()}</p>

                        <div>
                            <h4 style={{ fontSize: '1.3em', color: '#333', marginBottom: '10px' }}>Items:</h4>
                            <ul style={{ paddingLeft: '20px', fontSize: '1.1em' }}>
                                {order.items.map((item, index) => (
                                    <li key={index} style={{ marginBottom: '10px' }}>
                                        <span style={{ fontWeight: 'bold' }}>{item.Name}</span> - Quantity: {item.Quantity} - Subtotal: ₹{item.SubTotal}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                ))
            ) : (
                <p style={{ fontSize: '1.5em', color: '#333' }}>No orders yet.</p>
            )}
        </div>
    );
};

export default OrderHistory;
