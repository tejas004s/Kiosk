import React from 'react';

const MenuItemCard = ({ item }) => {
    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
        }}>
            {/* Display Image */}
            <img 
                src={item.ImageURL} 
                alt={item.Name} 
                style={{ 
                    width: '100%', 
                    height: '200px', 
                    objectFit: 'scale-down', 
                    borderRadius: '8px' 
                }} 
            />

            {/* Item Name */}
            <h3 style={{ marginTop: '15px', fontSize: '1.2rem', color: '#333' }}>{item.Name}</h3>

            {/* Item Description */}
            <p style={{ fontSize: '1rem', color: '#777' }}>{item.Description}</p>

            {/* Item Price */}
            <p style={{ fontSize: '1.2rem', color: '#28a745', fontWeight: 'bold' }}>₹{item.Price}</p>

            {/* Item Category */}
            <p style={{ fontSize: '1rem', color: '#6c757d' }}>Category: {item.Category}</p>
        </div>
    );
};

export default MenuItemCard;
