const express = require('express');
const db = require('../config/db');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

// Add a new menu item (Admin only)
router.post('/', verifyToken, (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { name, description, price, category, imageURL } = req.body;
    const query = 'INSERT INTO MenuItems (Name, Description, Price, Category, ImageURL) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, description, price, category, imageURL], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to add menu item' });
        res.status(201).json({ message: 'Menu item added successfully!' });
    });
});

// Get all menu items (Optionally restrict access)
router.get('/', (req, res) => {
    // If you want unrestricted access, remove `verifyToken`
    const query = 'SELECT * FROM MenuItems';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: 'Failed to fetch menu items' });
        res.status(200).json(results);
    });
});

// Update a menu item (Admin only)
router.put('/:id', verifyToken, (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;
    const { name, description, price, category, imageURL } = req.body;

    const query = `
        UPDATE MenuItems
        SET Name = ?, Description = ?, Price = ?, Category = ?, ImageURL = ?
        WHERE ItemID = ?
    `;
    db.query(query, [name, description, price, category, imageURL, id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to update menu item' });
        res.status(200).json({ message: 'Menu item updated successfully!' });
    });
});

// Delete a menu item (Admin only)
router.delete('/:id', verifyToken, (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { id } = req.params;

    const query = 'DELETE FROM MenuItems WHERE ItemID = ?';
    db.query(query, [id], (err) => {
        if (err) return res.status(500).json({ error: 'Failed to delete menu item' });
        res.status(200).json({ message: 'Menu item deleted successfully!' });
    });
});

module.exports = router;
