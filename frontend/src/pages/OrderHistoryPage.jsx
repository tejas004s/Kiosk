import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const OrderHistoryPage = () => {
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        const userId = 1; // Hardcoded for now. Replace with actual logged-in user ID.
        axios.get(`http://localhost:5000/api/orders/${userId}`)
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    }, []);

    return (
        <Container>
            <h1>Your Orders</h1>
            {orders.length === 0 ? (
                <p>No orders yet.</p>
            ) : (
                <OrderList>
                    {orders.map(order => (
                        <OrderItem key={order.OrderID}>
                            <p><strong>Order ID:</strong> {order.OrderID}</p>
                            <p><strong>Total Amount:</strong> ₹{order.TotalAmount}</p>
                            <p><strong>Status:</strong> {order.Status}</p>
                        </OrderItem>
                    ))}
                </OrderList>
            )}
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    text-align: center;
`;

const OrderList = styled.div`
    margin-top: 20px;
`;

const OrderItem = styled.div`
    padding: 15px;
    border: 1px solid #ddd;
    border-radius: 8px;
    margin-bottom: 10px;
    background-color: #f9f9f9;
`;

export default OrderHistoryPage;
