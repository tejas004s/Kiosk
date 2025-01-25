import React, { createContext, useState } from 'react';

// Create Context
export const CartContext = createContext();
// Add item to cart
const addToCart = (item) => {
    setCart((prevCart) => {
        const existingItem = prevCart.find((cartItem) => cartItem.ItemID === item.ItemID);
        if (existingItem) {
            // Update the quantity if the item already exists
            return prevCart.map((cartItem) =>
                cartItem.ItemID === item.ItemID
                    ? { ...cartItem, Quantity: cartItem.Quantity + 1 }
                    : cartItem
            );
        } else {
            // Add the item to the cart with an initial quantity of 1
            return [...prevCart, { ...item, Quantity: 1 }];
        }
    });
};

const updateCartItemQuantity = (itemId, quantity) => {
    setCart((prevCart) =>
        prevCart.map((item) =>
            item.ItemID === itemId
                ? { ...item, Quantity: quantity > 0 ? quantity : 1 } // Ensure quantity is always >= 1
                : item
        )
    );
};


// CartProvider Component
export const CartProvider = ({ children }) => {
    const [cart, setCart] = useState([]);

    // Add item to cart
    const addToCart = (item) => {
        setCart((prevCart) => [...prevCart, item]);
    };

    // Remove item from cart
    const removeFromCart = (itemId) => {
        setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
    };

    // Clear cart
    const clearCart = () => {
        setCart([]);
    };

    return (
        <CartContext.Provider value={{ cart, addToCart, removeFromCart, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};
