const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Place an order
router.post('/', (req, res) => {
    const { userId, totalAmount, items } = req.body;
    const query = 'INSERT INTO Orders (UserID, TotalAmount) VALUES (?, ?)';
    db.query(query, [userId, totalAmount], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });

        const orderId = result.insertId;
        const orderItems = items.map(item => [orderId, item.itemId, item.quantity, item.subTotal]);
        const orderItemsQuery = 'INSERT INTO OrderItems (OrderID, ItemID, Quantity, SubTotal) VALUES ?';

        db.query(orderItemsQuery, [orderItems], (err) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'Order placed successfully!' });
        });
    });
});

// Get order history for a user
// Updated GET /api/orders/:userId route
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `
        SELECT o.OrderID, o.TotalAmount, o.OrderDate, o.Status, 
               oi.Quantity, oi.SubTotal, m.Name
        FROM Orders o
        JOIN OrderItems oi ON o.OrderID = oi.OrderID
        JOIN MenuItems m ON oi.ItemID = m.ItemID
        WHERE o.UserID = ?
        ORDER BY o.OrderDate DESC
    `;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        
        // Group items by OrderID for easier rendering on the frontend
        const orders = [];
        results.forEach(row => {
            const order = orders.find(o => o.OrderID === row.OrderID);
            if (order) {
                order.items.push({ Name: row.Name, Quantity: row.Quantity, SubTotal: row.SubTotal });
            } else {
                orders.push({
                    OrderID: row.OrderID,
                    TotalAmount: row.TotalAmount,
                    OrderDate: row.OrderDate,
                    Status: row.Status,
                    items: [{ Name: row.Name, Quantity: row.Quantity, SubTotal: row.SubTotal }]
                });
            }
        });

        res.status(200).json(orders);
    });
});


module.exports = router;
