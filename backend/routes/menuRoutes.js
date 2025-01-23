const express = require('express');
const db = require('../config/db');
const router = express.Router();
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken, (req, res) => {
    if (req.user.role !== 'Admin') {
        return res.status(403).json({ message: 'Access denied' });
    }

    const { name, description, price, category, imageURL } = req.body;
    const query = 'INSERT INTO MenuItems (Name, Description, Price, Category, ImageURL) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, description, price, category, imageURL], (err) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Menu item added successfully!' });
    });
});


// Get all menu items
router.get('/', (req, res) => {
    const query = 'SELECT * FROM MenuItems';
    db.query(query, (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(200).json(results);
    });
});

// Add a new menu item (Admin only)
router.post('/', (req, res) => {
    const { name, description, price, category, imageURL } = req.body;
    const query = 'INSERT INTO MenuItems (Name, Description, Price, Category, ImageURL) VALUES (?, ?, ?, ?, ?)';
    db.query(query, [name, description, price, category, imageURL], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'Menu item added successfully!' });
    });
});

module.exports = router;
