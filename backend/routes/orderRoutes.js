const express = require('express');
const db = require('../config/db');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');
const Joi = require('joi');

// Validation schemas
const orderSchema = Joi.object({
    userId: Joi.number().integer().required(),
    totalAmount: Joi.number().positive().required(),
    items: Joi.array()
        .items(
            Joi.object({
                itemId: Joi.number().integer().required(),
                quantity: Joi.number().integer().positive().required(),
                subTotal: Joi.number().positive().required()
            })
        )
        .min(1)
        .required()
});

// Place an order
router.post('/', verifyToken, async (req, res) => {
    const { error } = orderSchema.validate(req.body);
    if (error) return res.status(400).json({ message: error.details[0].message });

    const { userId, totalAmount, items } = req.body;

    if (req.user.userId !== userId && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const query = 'INSERT INTO Orders (UserID, TotalAmount) VALUES (?, ?)';
    db.query(query, [userId, totalAmount], (err, result) => {
        if (err) return res.status(500).json({ message: 'Failed to place order' });

        const orderId = result.insertId;
        const orderItems = items.map(item => [orderId, item.itemId, item.quantity, item.subTotal]);
        const orderItemsQuery = 'INSERT INTO OrderItems (OrderID, ItemID, Quantity, SubTotal) VALUES ?';

        db.query(orderItemsQuery, [orderItems], (err) => {
            if (err) return res.status(500).json({ message: 'Failed to add order items' });
            res.status(201).json({ message: 'Order placed successfully!', orderId });
        });
    });
});

// Get order history for a user
router.get('/:userId', verifyToken, (req, res) => {
    const { userId } = req.params;

    if (req.user.userId !== parseInt(userId) && req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const query = `
        SELECT o.OrderID, o.TotalAmount, o.OrderDate, o.Status, oi.ItemID, oi.Quantity, oi.SubTotal
        FROM Orders o
        JOIN OrderItems oi ON o.OrderID = oi.OrderID
        WHERE o.UserID = ?
    `;
    db.query(query, [userId], (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch order history' });
        res.status(200).json(results);
    });
});

// Fetch all orders (Admin only)
router.get('/', verifyToken, (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const query = `
        SELECT o.OrderID, o.UserID, o.TotalAmount, o.OrderDate, o.Status, u.Name AS CustomerName
        FROM Orders o
        JOIN Users u ON o.UserID = u.UserID
        ORDER BY o.OrderDate DESC
    `;
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ message: 'Failed to fetch orders' });
        res.status(200).json(results);
    });
});

// Update order status (Admin only)
router.put('/:id', verifyToken, (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const { status } = req.body;

    // Validate status
    const validStatuses = ['Pending', 'Completed', 'Cancelled'];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ message: 'Invalid status value' });
    }

    const query = 'UPDATE Orders SET Status = ? WHERE OrderID = ?';
    db.query(query, [status, id], (err) => {
        if (err) return res.status(500).json({ message: 'Failed to update order status' });
        res.status(200).json({ message: 'Order status updated successfully!' });
    });
});

module.exports = router;
