import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from '../api/axiosConfig';
import styled from 'styled-components';
import MenuItemCard from '../components/MenuItemCard';
import { CartContext } from '../context/CartContext'; // Import CartContext

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { cart, addToCart } = useContext(CartContext); // Use CartContext
    const navigate = useNavigate();

    useEffect(() => {
        const fetchMenuItems = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/menu');
                setMenuItems(response.data);
            } catch (err) {
                console.error('Error fetching menu items:', err);
                setError('Failed to load menu items.');
            } finally {
                setLoading(false);
            }
        };

        fetchMenuItems();
    }, []);

    const handleProceedToCart = () => {
        if (cart.length > 0) {
            navigate('/cart'); // Redirect to cart page
        } else {
            alert('Your cart is empty! Add items before proceeding.');
        }
    };

    const filteredItems = menuItems.filter(
        (item) => category === 'All' || item.Category === category
    );

    const totalPrice = cart.reduce((acc, item) => acc + item.Price * (item.Quantity || 1), 0);

    return (
        <Container>
            <Title>Your Menu</Title>

            {/* Category filter buttons */}
            <CategoryFilter>
                {['All', 'Main Course', 'Desserts', 'Drinks'].map((cat) => (
                    <CategoryButton
                        key={cat}
                        onClick={() => setCategory(cat)}
                        active={category === cat}
                    >
                        {cat}
                    </CategoryButton>
                ))}
            </CategoryFilter>

            {/* Loading or error state */}
            {loading ? (
                <LoadingMessage>Loading menu items...</LoadingMessage>
            ) : error ? (
                <ErrorMessage>{error}</ErrorMessage>
            ) : (
                <MenuGrid>
                    {filteredItems.map((item) => (
                        <MenuItemCard key={item.ItemID} item={item} handleAddToCart={addToCart} />
                    ))}
                </MenuGrid>
            )}

            {/* Empty state */}
            {!loading && filteredItems.length === 0 && (
                <EmptyMessage>No items available in this category.</EmptyMessage>
            )}

            {/* Cart Summary */}
            {cart.length > 0 && (
                <CartSummary>
                    <TotalPrice>Total Price: ₹{totalPrice.toFixed(2)}</TotalPrice>
                    <ProceedButton onClick={handleProceedToCart}>Proceed to Cart</ProceedButton>
                </CartSummary>
            )}
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    text-align: center;
    background-color: #f4f7fa;
    min-height: 100vh;
`;

const Title = styled.h1`
    font-size: 2rem;
    color: #333;
    margin-bottom: 30px;
`;

const CategoryFilter = styled.div`
    display: flex;
    justify-content: center;
    gap: 10px;
    margin-bottom: 20px;
`;

const CategoryButton = styled.button`
    padding: 10px 20px;
    background-color: ${({ active }) => (active ? '#0056b3' : '#007BFF')};
    color: white;
    border: none;
    border-radius: 5px;

    &:hover {
        background-color: #0056b3;
    }
`;

const MenuGrid = styled.div`
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
    gap: 20px;
    margin-top: 20px;
`;

const LoadingMessage = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin-top: 20px;
`;

const ErrorMessage = styled.p`
    font-size: 1.2rem;
    color: red;
    margin-top: 20px;
`;

const EmptyMessage = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin-top: 20px;
`;

const CartSummary = styled.div`
    margin-top: 20px;
    padding: 15px;
    border-top: 2px solid #ddd;
    text-align: center;
`;

const TotalPrice = styled.p`
    font-size: 1.5rem;
    color: #333;
    font-weight: bold;
`;

const ProceedButton = styled.button`
    padding: 10px 20px;
    font-size: 1rem;
    color: white;
    background-color: #28a745;
    border: none;
    border-radius: 5px;
    cursor: pointer;

    &:hover {
        background-color: #218838;
    }
`;

export default MenuPage;
