const express = require('express');
const db = require('../config/db');
const router = express.Router();

// Register a new user
router.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;
    const query = 'INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)';
    db.query(query, [name, email, password, role || 'Customer'], (err, result) => {
        if (err) return res.status(500).json({ error: err.message });
        res.status(201).json({ message: 'User registered successfully!' });
    });
});

// Login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });
        res.status(200).json({ message: 'Login successful!', user: results[0] });
    });
});

module.exports = router;
