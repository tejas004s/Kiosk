import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import styled from 'styled-components';
import MenuItemCard from '../components/MenuItemCard'; // Import MenuItemCard component

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [category, setCategory] = useState('All');
    const [loading, setLoading] = useState(true); // Adding loading state for fetching data

    useEffect(() => {
        // Fetching menu items from the API
        axios.get('http://localhost:5000/api/menu')
            .then(response => {
                setMenuItems(response.data); // Storing the fetched menu items
                setLoading(false); // Set loading to false once the data is fetched
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
                setLoading(false); // Stop loading even if there's an error
            });
    }, []); // Empty array to run the effect only once (on component mount)

    // Filtering menu items based on the selected category
    const filteredItems = menuItems.filter(item => category === 'All' || item.Category === category);

    return (
        <Container>
            <Title>Your Menu</Title>

            {/* Category filter buttons */}
            <CategoryFilter>
                {['All', 'Main Course', 'Desserts', 'Drinks'].map(cat => (
                    <CategoryButton key={cat} onClick={() => setCategory(cat)} active={category === cat}>
                        {cat}
                    </CategoryButton>
                ))}
            </CategoryFilter>

            {/* Loading state */}
            {loading ? (
                <LoadingMessage>Loading menu items...</LoadingMessage>
            ) : (
                <MenuGrid>
                    {/* Display filtered menu items */}
                    {filteredItems.map(item => (
                        <MenuItemCard key={item.ItemID} item={item} />
                    ))}
                </MenuGrid>
            )}

            {/* Empty state message */}
            {filteredItems.length === 0 && !loading && (
                <EmptyMessage>No items available in this category.</EmptyMessage>
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

const EmptyMessage = styled.p`
    font-size: 1.2rem;
    color: #888;
    margin-top: 20px;
`;

export default MenuPage;
