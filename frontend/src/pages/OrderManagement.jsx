import React, { useState } from 'react';
import axios from '../api/axiosConfig';
import styled from 'styled-components';

const OrderManagement = ({ orders, fetchOrders }) => {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleStatusChange = (id, status) => {
        if (!window.confirm(`Are you sure you want to change the status to ${status}?`)) {
            return;
        }

        setLoading(true);
        setError('');
        axios.put(`http://localhost:5000/api/orders/${id}`, { status }, {
            headers: { Authorization: localStorage.getItem('token') }
        })
            .then(() => {
                fetchOrders();
                setLoading(false);
            })
            .catch(error => {
                setLoading(false);
                setError('Error updating order status. Please try again.');
                console.error('Error updating order status:', error);
            });
    };

    return (
        <Container>
            <Title>Order Management</Title>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <OrderList>
                {orders.map(order => (
                    <OrderCard key={order.OrderID}>
                        <OrderDetails>
                            <p><strong>Order ID:</strong> {order.OrderID}</p>
                            <p><strong>Customer:</strong> {order.CustomerName}</p>
                            <p><strong>Status:</strong> <StatusBadge status={order.Status}>{order.Status}</StatusBadge></p>
                        </OrderDetails>
                        <StatusButtons>
                            <ActionButton 
                                onClick={() => handleStatusChange(order.OrderID, 'In Progress')} 
                                disabled={loading || order.Status === 'In Progress'}>
                                In Progress
                            </ActionButton>
                            <ActionButton 
                                onClick={() => handleStatusChange(order.OrderID, 'Delivered')} 
                                disabled={loading || order.Status === 'Delivered'}>
                                Delivered
                            </ActionButton>
                        </StatusButtons>
                    </OrderCard>
                ))}
            </OrderList>
            {loading && <LoadingMessage>Updating status...</LoadingMessage>}
        </Container>
    );
};

// Styled Components
const Container = styled.div`
    padding: 20px;
    background-color: #f4f7fa;
    min-height: 100vh;
`;

const Title = styled.h2`
    font-size: 2rem;
    color: #333;
    margin-bottom: 30px;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`;

const OrderList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
`;

const OrderCard = styled.div`
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    gap: 10px;
`;

const OrderDetails = styled.div`
    p {
        margin: 5px 0;
        font-size: 1.1rem;
        color: #555;
    }
`;

const StatusBadge = styled.span`
    padding: 5px 10px;
    border-radius: 12px;
    color: white;
    background-color: ${({ status }) => 
        status === 'Delivered' ? '#28a745' :
        status === 'In Progress' ? '#ffc107' :
        '#dc3545'};
`;

const StatusButtons = styled.div`
    display: flex;
    gap: 10px;
    margin-top: 10px;
`;

const ActionButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background-color: ${({ disabled }) => (disabled ? '#ccc' : '#007bff')};
    border: none;
    border-radius: 5px;
    cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
    transition: background-color 0.3s;

    &:hover {
        background-color: ${({ disabled }) => (disabled ? '#ccc' : '#0056b3')};
    }
`;

const LoadingMessage = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin-top: 20px;
    text-align: center;
`;

export default OrderManagement;
