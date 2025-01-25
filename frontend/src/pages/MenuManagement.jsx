const MenuManagement = ({ menuItems, fetchMenuItems }) => {
    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/api/menu/${id}`, {
            headers: { Authorization: localStorage.getItem('token') }
        })
            .then(() => fetchMenuItems())
            .catch(error => console.error('Error deleting item:', error));
    };

    return (
        <div>
            <h2>Menu Management</h2>
            <ul>
                {menuItems.map(item => (
                    <li key={item.ItemID}>
                        <strong>{item.Name}</strong> - ₹{item.Price}
                        <button onClick={() => handleDelete(item.ItemID)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default MenuManagement;
