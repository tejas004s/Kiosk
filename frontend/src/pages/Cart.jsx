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
        <div>
            <h1>Your Cart</h1>
            {cartItems.length > 0 ? (
                <div>
                    {cartItems.map((item) => (
                        <div key={item.ItemID} style={{ marginBottom: '20px' }}>
                            <h3>{item.Name}</h3>
                            <p>₹{item.Price}</p>
                            <p>Quantity:
                                <input
                                    type="number"
                                    value={item.Quantity}
                                    min="1"
                                    onChange={(e) => handleChangeQuantity(item.ItemID, e.target.value)}
                                />
                            </p>
                            <button onClick={() => handleRemoveItem(item.ItemID)}>Remove</button>
                        </div>
                    ))}
                    <div>
                        <h3>Total Amount: ₹{totalAmount}</h3>
                        <button onClick={handlePlaceOrder}>Place Order</button>
                    </div>
                </div>
            ) : (
                <p>Your cart is empty</p>
            )}
        </div>
    );
};

export default Cart;
