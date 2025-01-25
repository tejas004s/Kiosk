import React, { useState, useEffect } from 'react';
import axios from '../api/axiosConfig';
import styled from 'styled-components';
import MenuItemCard from '../components/MenuItemCard'; // Import MenuItemCard

const MenuManagement = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [newItem, setNewItem] = useState({
        name: '',
        description: '',
        price: '',
        category: 'Main Course',
        imageURL: ''
    });

    // Fetch menu items on component mount
    useEffect(() => {
        axios.get('http://localhost:5000/api/menu')
            .then(response => {
                setMenuItems(response.data);
                setLoading(false);
            })
            .catch(error => {
                console.error('Error fetching menu items:', error);
                setLoading(false);
                setError('Failed to load menu items.');
            });
    }, []);

    // Handle adding a new menu item
    const handleAddItem = async () => {
        const { name, description, price, category, imageURL } = newItem;

        if (!name || !description || !price || !category || !imageURL) {
            setError('All fields are required!');
            return;
        }

        setLoading(true);
        setError('');
        try {
            await axios.post('http://localhost:5000/api/menu', newItem, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setNewItem({
                name: '',
                description: '',
                price: '',
                category: 'Main Course',
                imageURL: ''
            }); // Reset form fields
            setLoading(false);
            // Re-fetch menu items to update the list
            axios.get('http://localhost:5000/api/menu')
                .then(response => setMenuItems(response.data))
                .catch(err => console.error('Error refreshing menu items:', err));
        } catch (err) {
            console.error('Error adding item:', err);
            setError('Failed to add the menu item.');
            setLoading(false);
        }
    };

    // Handle deleting a menu item
    const handleDeleteItem = async (id) => {
        if (!window.confirm('Are you sure you want to delete this item?')) return;

        setLoading(true);
        setError('');
        try {
            await axios.delete(`http://localhost:5000/api/menu/${id}`, {
                headers: { Authorization: localStorage.getItem('token') }
            });
            setLoading(false);
            // Remove the deleted item from the state
            setMenuItems(menuItems.filter(item => item.ItemID !== id));
        } catch (err) {
            console.error('Error deleting item:', err);
            setError('Failed to delete the menu item.');
            setLoading(false);
        }
    };

    return (
        <Container>
            <h2>Menu Management</h2>
            {error && <ErrorMessage>{error}</ErrorMessage>}
            {loading ? (
                <LoadingMessage>Loading...</LoadingMessage>
            ) : (
                <>
                    <AddItemForm>
                        <h3>Add New Menu Item</h3>
                        <FormInput
                            type="text"
                            placeholder="Name"
                            value={newItem.name}
                            onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                        />
                        <FormInput
                            type="text"
                            placeholder="Description"
                            value={newItem.description}
                            onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                        />
                        <FormInput
                            type="number"
                            placeholder="Price"
                            value={newItem.price}
                            onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                        />
                        <FormSelect
                            value={newItem.category}
                            onChange={(e) => setNewItem({ ...newItem, category: e.target.value })}
                        >
                            <option value="Main Course">Main Course</option>
                            <option value="Desserts">Desserts</option>
                            <option value="Drinks">Drinks</option>
                        </FormSelect>
                        <FormInput
                            type="text"
                            placeholder="Image URL"
                            value={newItem.imageURL}
                            onChange={(e) => setNewItem({ ...newItem, imageURL: e.target.value })}
                        />
                        <AddButton onClick={handleAddItem}>Add Item</AddButton>
                    </AddItemForm>

                    <MenuGrid>
                        {menuItems.length === 0 ? (
                            <p>No menu items available.</p>
                        ) : (
                            menuItems.map(item => (
                                <MenuItemCard key={item.ItemID} item={item}>
                                    <DeleteButton onClick={() => handleDeleteItem(item.ItemID)} disabled={loading}>
                                        {loading ? 'Deleting...' : 'Delete'}
                                    </DeleteButton>
                                </MenuItemCard>
                            ))
                        )}
                    </MenuGrid>
                </>
            )}
        </Container>
    );
};

const Container = styled.div`
    padding: 20px;
    text-align: center;
`;

const ErrorMessage = styled.div`
    color: red;
    font-size: 14px;
    margin-bottom: 10px;
`;

const LoadingMessage = styled.p`
    font-size: 1.2rem;
    color: #888;
`;

const AddItemForm = styled.div`
    margin-bottom: 30px;
`;

const FormInput = styled.input`
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
`;

const FormSelect = styled.select`
    padding: 10px;
    margin: 10px;
    border: 1px solid #ccc;
    border-radius: 5px;
    width: 100%;
    max-width: 400px;
`;

const AddButton = styled.button`
    padding: 10px 20px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

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

const DeleteButton = styled.button`
    padding: 5px 10px;
    font-size: 14px;
    color: white;
    background-color: #ff4d4d;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;

    &:hover {
        background-color: #ff1a1a;
    }

    &:disabled {
        background-color: #ccc;
        cursor: not-allowed;
    }
`;

export default MenuManagement;
