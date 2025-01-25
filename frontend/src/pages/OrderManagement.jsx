const OrderManagement = ({ orders, fetchOrders }) => {
    const handleStatusChange = (id, status) => {
        axios.put(`http://localhost:5000/api/orders/${id}`, { status }, {
            headers: { Authorization: localStorage.getItem('token') }
        })
            .then(() => fetchOrders())
            .catch(error => console.error('Error updating order status:', error));
    };

    return (
        <div>
            <h2>Order Management</h2>
            <ul>
                {orders.map(order => (
                    <li key={order.OrderID}>
                        <p>
                            <strong>Order ID:</strong> {order.OrderID} | 
                            <strong> Customer:</strong> {order.CustomerName} | 
                            <strong> Status:</strong> {order.Status}
                        </p>
                        <button onClick={() => handleStatusChange(order.OrderID, 'Delivered')}>Mark as Delivered</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default OrderManagement;
