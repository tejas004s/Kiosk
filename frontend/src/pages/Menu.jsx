import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import MenuItemCard from '../components/MenuItemCard';

const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);

    useEffect(() => {
        // Fetch menu items from the backend
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('/menu');
                setMenuItems(response.data);
            } catch (err) {
                console.error('Error fetching menu:', err);
            }
        };

        fetchMenuItems();
    }, []);

    return (
        <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            height: '100vh',
            width: '100vw',
            backgroundColor: '#f1f1f1',
            textAlign: 'center',
            padding: '10px',
        }}>
            <h1 style={{ fontSize: '3rem', color: '#343a40' }}>Our Menu</h1>
            <p style={{ fontSize: '1.2rem', color: '#6c757d', margin: '20px 0' }}>
                Choose your favorite items for a quick and delicious experience!
            </p>
            
            <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '30px',
                width: '100%',
                maxWidth: '1200px',
            }}>
                {menuItems.map((item) => (
                    <MenuItemCard key={item.ItemID} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
