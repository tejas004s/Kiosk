import React from 'react';

const MenuItemCard = ({ item }) => {
    return (
        <div style={{ border: '1px solid #ccc', padding: '10px', borderRadius: '5px' }}>
            <h3>{item.Name}</h3>
            <p>{item.Description}</p>
            <p>₹{item.Price}</p>
            <p>Category: {item.Category}</p>
        </div>
    );
};

export default MenuItemCard;
