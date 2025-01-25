import React, { useEffect, useState } from 'react';
import axios from '../api/axiosConfig';
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
            <Title>Your Orders</Title>
            {orders.length === 0 ? (
                <NoOrdersMessage>No orders yet.</NoOrdersMessage>
            ) : (
                <OrderList>
                    {orders.map(order => (
                        <OrderItem key={order.OrderID}>
                            <OrderDetails>
                                <p><strong>Order ID:</strong> {order.OrderID}</p>
                                <p><strong>Total Amount:</strong> ₹{order.TotalAmount}</p>
                                <p><strong>Status:</strong> <Status status={order.Status}>{order.Status}</Status></p>
                            </OrderDetails>
                            <ViewDetailsButton>View Details</ViewDetailsButton>
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
    background-color: #f4f7fa;
    min-height: 100vh;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 30px;
`;

const NoOrdersMessage = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin-top: 20px;
`;

const OrderList = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 20px;
`;

const OrderItem = styled.div`
    width: 80%;
    max-width: 800px;
    background-color: #fff;
    padding: 20px;
    border-radius: 10px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    margin-bottom: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateY(-5px);
    }
`;

const OrderDetails = styled.div`
    width: 100%;
    margin-bottom: 20px;
    p {
        font-size: 1.1rem;
        margin: 5px 0;
        color: #555;
    }
`;

const Status = styled.span`
    color: ${({ status }) => (status === 'Completed' ? '#28a745' : status === 'Pending' ? '#ffc107' : '#dc3545')};
    font-weight: bold;
`;

const ViewDetailsButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    font-size: 1rem;
    transition: background-color 0.3s;

    &:hover {
        background-color: #0056b3;
    }
`;

export default OrderHistoryPage;
