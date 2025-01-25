import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import styled from 'styled-components';
import MenuManagement from './MenuManagement'; // Assuming these components exist
import OrderManagement from './OrderManagement';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('menu');
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        if (activeTab === 'menu') fetchMenuItems();
        if (activeTab === 'orders') fetchOrders();
    }, [activeTab]);

    const fetchMenuItems = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/menu', {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setMenuItems(response.data);
        } catch (err) {
            setError('Failed to fetch menu items.');
        } finally {
            setLoading(false);
        }
    };

    const fetchOrders = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get('http://localhost:5000/api/orders', {
                headers: { Authorization: localStorage.getItem('token') },
            });
            setOrders(response.data);
        } catch (err) {
            setError('Failed to fetch orders.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <Container>
            <Tabs>
                <Tab active={activeTab === 'menu'} onClick={() => setActiveTab('menu')}>
                    Menu Management
                </Tab>
                <Tab active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>
                    Order Management
                </Tab>
            </Tabs>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            <Content>
                {loading ? (
                    <LoadingMessage>Loading...</LoadingMessage>
                ) : activeTab === 'menu' ? (
                    <MenuManagement menuItems={menuItems} fetchMenuItems={fetchMenuItems} />
                ) : (
                    <OrderManagement orders={orders} fetchOrders={fetchOrders} />
                )}
            </Content>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    max-width: 1200px;
    margin: 0 auto;
`;

const Tabs = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    flex: 1;
    padding: 12px;
    background-color: ${({ active }) => (active ? '#007BFF' : '#f4f4f4')};
    color: ${({ active }) => (active ? 'white' : '#333')};
    border: none;
    cursor: pointer;
    font-size: 16px;
    font-weight: bold;
    transition: background-color 0.3s, color 0.3s;
    border-radius: 5px;

    &:hover {
        background-color: ${({ active }) => (active ? '#0056b3' : '#e9ecef')};
        color: white;
    }

    &:focus {
        outline: none;
    }

    &:not(:last-child) {
        margin-right: 10px;
    }
`;

const Content = styled.div`
    margin-top: 20px;
`;

const ErrorMessage = styled.div`
    color: red;
    margin-bottom: 20px;
    text-align: center;
    font-weight: bold;
`;

const LoadingMessage = styled.div`
    text-align: center;
    font-size: 18px;
    color: #555;
`;

export default AdminDashboard;
