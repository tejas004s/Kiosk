import React, { useContext } from 'react';
import { CartContext } from '../context/CartContext';

const Cart = () => {
    const { cart, removeFromCart, clearCart, updateCartItemQuantity } = useContext(CartContext);

    const totalAmount = cart.reduce(
        (total, item) => total + item.Price * (item.Quantity || 1),
        0
    );

    const handlePlaceOrder = () => {
        alert('Order placed successfully!');
        clearCart();
    };

    return (
        <div style={{ padding: '20px' }}>
            <h1>Your Cart</h1>
            {cart.length > 0 ? (
                <>
                    <ul style={{ listStyle: 'none', padding: 0 }}>
                        {cart.map((item) => (
                            <li
                                key={item.ItemID}
                                style={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    alignItems: 'center',
                                    marginBottom: '20px',
                                    padding: '10px',
                                    border: '1px solid #ddd',
                                    borderRadius: '8px',
                                }}
                            >
                                <div>
                                    <h3>{item.Name}</h3>
                                    <p>Price: ₹{item.Price}</p>
                                </div>
                                <div>
                                    <label>
                                        Quantity:
                                        <input
                                            type="number"
                                            value={item.Quantity || 1}
                                            min="1"
                                            onChange={(e) =>
                                                updateCartItemQuantity(
                                                    item.ItemID,
                                                    parseInt(e.target.value, 10)
                                                )
                                            }
                                            style={{
                                                width: '60px',
                                                marginLeft: '10px',
                                                padding: '5px',
                                                borderRadius: '5px',
                                                border: '1px solid #ccc',
                                            }}
                                        />
                                    </label>
                                </div>
                                <button
                                    onClick={() => removeFromCart(item.ItemID)}
                                    style={{
                                        padding: '10px',
                                        backgroundColor: '#d9534f',
                                        color: 'white',
                                        border: 'none',
                                        borderRadius: '5px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    Remove
                                </button>
                            </li>
                        ))}
                    </ul>
                    <h3>Total: ₹{totalAmount.toFixed(2)}</h3>
                    <button
                        onClick={handlePlaceOrder}
                        style={{
                            padding: '10px 20px',
                            backgroundColor: '#28a745',
                            color: 'white',
                            border: 'none',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                        }}
                    >
                        Place Order
                    </button>
                </>
            ) : (
                <p>Your cart is empty.</p>
            )}
        </div>
    );
};

export default Cart;
