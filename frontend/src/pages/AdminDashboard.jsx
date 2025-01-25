import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styled from 'styled-components';

const AdminDashboard = () => {
    const [activeTab, setActiveTab] = useState('menu');
    const [menuItems, setMenuItems] = useState([]);
    const [orders, setOrders] = useState([]);

    useEffect(() => {
        if (activeTab === 'menu') fetchMenuItems();
        if (activeTab === 'orders') fetchOrders();
    }, [activeTab]);

    const fetchMenuItems = () => {
        axios.get('http://localhost:5000/api/menu')
            .then(response => setMenuItems(response.data))
            .catch(error => console.error('Error fetching menu:', error));
    };

    const fetchOrders = () => {
        axios.get('http://localhost:5000/api/orders', {
            headers: { Authorization: localStorage.getItem('token') }
        })
            .then(response => setOrders(response.data))
            .catch(error => console.error('Error fetching orders:', error));
    };

    return (
        <Container>
            <Tabs>
                <Tab active={activeTab === 'menu'} onClick={() => setActiveTab('menu')}>Menu Management</Tab>
                <Tab active={activeTab === 'orders'} onClick={() => setActiveTab('orders')}>Order Management</Tab>
            </Tabs>
            <Content>
                {activeTab === 'menu' && <MenuManagement menuItems={menuItems} fetchMenuItems={fetchMenuItems} />}
                {activeTab === 'orders' && <OrderManagement orders={orders} fetchOrders={fetchOrders} />}
            </Content>
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
`;

const Tabs = styled.div`
    display: flex;
    margin-bottom: 20px;
`;

const Tab = styled.button`
    flex: 1;
    padding: 10px;
    background-color: ${({ active }) => (active ? '#007BFF' : '#f4f4f4')};
    color: ${({ active }) => (active ? 'white' : '#333')};
    border: none;
    cursor: pointer;

    &:hover {
        background-color: #0056b3;
        color: white;
    }
`;

const Content = styled.div`
    margin-top: 20px;
`;

export default AdminDashboard;
