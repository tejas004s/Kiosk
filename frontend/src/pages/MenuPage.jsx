import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const MenuPage = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [category, setCategory] = useState('All');

    useEffect(() => {
        axios.get('http://localhost:5000/api/menu')
            .then(response => setMenuItems(response.data))
            .catch(error => console.error('Error fetching menu:', error));
    }, []);

    const filteredItems = menuItems.filter(item => category === 'All' || item.Category === category);

    return (
        <Container>
            <h1>Our Menu</h1>
            <CategoryFilter>
                {['All', 'Main Course', 'Desserts', 'Drinks'].map(cat => (
                    <CategoryButton key={cat} onClick={() => setCategory(cat)} active={category === cat}>
                        {cat}
                    </CategoryButton>
                ))}
            </CategoryFilter>
            <MenuGrid>
                {filteredItems.map(item => (
                    <MenuItem key={item.ItemID}>
                        <h3>{item.Name}</h3>
                        <p>{item.Description}</p>
                        <p><strong>Price:</strong> ₹{item.Price}</p>
                    </MenuItem>
                ))}
            </MenuGrid>
        </Container>
    );
};

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

export default MenuPage;
