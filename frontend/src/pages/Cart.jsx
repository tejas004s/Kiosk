import React, { useState } from 'react';
import MenuItemCard from '../components/MenuItemCard';
import axios from '../api/axiosConfig';

const Cart = () => {
    const [cartItems, setCartItems] = useState([]);
    const [totalAmount, setTotalAmount] = useState(0);

    const handleAddToCart = (item) => {
        const newCartItems = [...cartItems];
        const index = newCartItems.findIndex((cartItem) => cartItem.ItemID === item.ItemID);
        
        if (index !== -1) {
            newCartItems[index].Quantity += 1;
        } else {
            newCartItems.push({ ...item, Quantity: 1 });
        }
        
        setCartItems(newCartItems);
        updateTotalAmount(newCartItems);
    };

    const handleRemoveItem = (itemId) => {
        const newCartItems = cartItems.filter(item => item.ItemID !== itemId);
        setCartItems(newCartItems);
        updateTotalAmount(newCartItems);
    };

    const handleChangeQuantity = (itemId, newQuantity) => {
        const newCartItems = [...cartItems];
        const index = newCartItems.findIndex((item) => item.ItemID === itemId);
        
        if (index !== -1) {
            newCartItems[index].Quantity = newQuantity;
        }
        
        setCartItems(newCartItems);
        updateTotalAmount(newCartItems);
    };

    const updateTotalAmount = (items) => {
        const total = items.reduce((acc, item) => acc + (item.Price * item.Quantity), 0);
        setTotalAmount(total);
    };

    const handlePlaceOrder = async () => {
        // This will send a POST request to place the order
        const userId = 1; // Example user ID, replace with actual logged-in user's ID
        const items = cartItems.map(item => ({
            itemId: item.ItemID,
            quantity: item.Quantity,
            subTotal: item.Price * item.Quantity
        }));

        try {
            const response = await axios.post('/orders', { userId, totalAmount, items });
            alert('Order placed successfully!');
            setCartItems([]); // Empty the cart after placing the order
        } catch (err) {
            console.error('Error placing order:', err);
            alert('Failed to place order.');
        }
    };

    return (
        <div style={{
            padding: '20px',
            backgroundColor: '#f1f1f1',
            minHeight: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'flex-start'
        }}>
            <h1 style={{ fontSize: '3em', marginBottom: '20px', color: '#333' }}>Your Cart</h1>

            {cartItems.length > 0 ? (
                <div style={{ width: '100%', maxWidth: '800px' }}>
                    {cartItems.map((item) => (
                        <div key={item.ItemID} style={{
                            backgroundColor: '#fff',
                            padding: '20px',
                            borderRadius: '10px',
                            marginBottom: '20px',
                            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
                        }}>
                            <h3 style={{ fontSize: '1.5em', margin: '10px 0' }}>{item.Name}</h3>
                            <p style={{ fontSize: '1.2em', color: '#333' }}>₹{item.Price}</p>
                            <p style={{ fontSize: '1.1em', margin: '10px 0' }}>Quantity:
                                <input
                                    type="number"
                                    value={item.Quantity}
                                    min="1"
                                    onChange={(e) => handleChangeQuantity(item.ItemID, e.target.value)}
                                    style={{
                                        fontSize: '1.2em',
                                        padding: '10px',
                                        width: '70px',
                                        borderRadius: '8px',
                                        textAlign: 'center',
                                        marginLeft: '10px',
                                    }}
                                />
                            </p>
                            <button 
                                onClick={() => handleRemoveItem(item.ItemID)} 
                                style={{
                                    padding: '10px 20px',
                                    fontSize: '1.2em',
                                    backgroundColor: '#d9534f',
                                    color: '#fff',
                                    border: 'none',
                                    borderRadius: '8px',
                                    cursor: 'pointer',
                                    transition: '0.3s',
                                }}
                                onMouseOver={(e) => e.target.style.backgroundColor = '#c9302c'}
                                onMouseOut={(e) => e.target.style.backgroundColor = '#d9534f'}
                            >
                                Remove
                            </button>
                        </div>
                    ))}
                    <div style={{ textAlign: 'center', marginTop: '30px' }}>
                        <h3 style={{ fontSize: '2em', marginBottom: '20px', color: '#333' }}>Total Amount: ₹{totalAmount}</h3>
                        <button 
                            onClick={handlePlaceOrder} 
                            style={{
                                padding: '15px 30px',
                                fontSize: '1.5em',
                                backgroundColor: '#28a745',
                                color: '#fff',
                                border: 'none',
                                borderRadius: '10px',
                                cursor: 'pointer',
                                transition: '0.3s',
                            }}
                            onMouseOver={(e) => e.target.style.backgroundColor = '#218838'}
                            onMouseOut={(e) => e.target.style.backgroundColor = '#28a745'}
                        >
                            Place Order
                        </button>
                    </div>
                </div>
            ) : (
                <p style={{ fontSize: '1.5em', color: '#333' }}>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;
