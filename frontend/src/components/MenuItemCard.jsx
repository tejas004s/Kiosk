import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const MenuItemCard = ({ item, handleAddToCart }) => {
    const { cart } = useContext(CartContext);

    // Find the quantity of this item in the cart
    const cartItem = cart.find((cartItem) => cartItem.ItemID === item.ItemID);
    const quantity = cartItem ? cartItem.Quantity : 0;

    return (
        <div style={{
            border: '1px solid #ccc',
            padding: '20px',
            borderRadius: '10px',
            textAlign: 'center',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            backgroundColor: 'white',
        }}>
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
            <h3 style={{ marginTop: '15px', fontSize: '1.2rem', color: '#333' }}>
                {item.Name}
                {quantity > 0 && <span style={{ fontSize: '0.9rem', color: '#007BFF' }}> x {quantity}</span>}
            </h3>
            <p style={{ fontSize: '1rem', color: '#777' }}>{item.Description}</p>
            <p style={{ fontSize: '1.2rem', color: '#28a745', fontWeight: 'bold' }}>₹{item.Price}</p>
            <p style={{ fontSize: '1rem', color: '#6c757d' }}>Category: {item.Category}</p>
            <button
                onClick={() => handleAddToCart(item)}
                style={{
                    padding: '10px 20px',
                    backgroundColor: '#007bff',
                    color: '#fff',
                    border: 'none',
                    borderRadius: '8px',
                    cursor: 'pointer',
                    fontSize: '1rem',
                    transition: '0.3s',
                }}
                onMouseOver={(e) => e.target.style.backgroundColor = '#0056b3'}
                onMouseOut={(e) => e.target.style.backgroundColor = '#007bff'}
            >
                Add to Cart
            </button>
        </div>
    );
};

export default MenuItemCard;
