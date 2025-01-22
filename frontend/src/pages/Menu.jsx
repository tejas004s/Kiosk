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
        <div>
            <h1>Menu</h1>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px' }}>
                {menuItems.map((item) => (
                    <MenuItemCard key={item.ItemID} item={item} />
                ))}
            </div>
        </div>
    );
};

export default Menu;
