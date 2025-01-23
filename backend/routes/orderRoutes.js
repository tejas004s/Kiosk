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
router.get('/:userId', (req, res) => {
    const { userId } = req.params;
    const query = `
        SELECT o.OrderID, o.TotalAmount, o.OrderDate, o.Status, oi.ItemID, oi.Quantity, oi.SubTotal
        FROM Orders o
        JOIN OrderItems oi ON o.OrderID = oi.OrderID
        WHERE o.UserID = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

module.exports = router;
