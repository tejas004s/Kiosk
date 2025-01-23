const express = require('express');
const db = require('../config/db');
const router = express.Router();
const jwt = require('jsonwebtoken');

// Register a new user
router.post('/register', (req, res) => {
    const { name, email, password, role } = req.body;

    // Check if the email already exists
    const checkQuery = 'SELECT * FROM Users WHERE Email = ?';
    db.query(checkQuery, [email], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length > 0) {
            return res.status(400).json({ message: 'Email already exists' });
        }

        // Insert the new user into the database
        const insertQuery = 'INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)';
        db.query(insertQuery, [name, email, password, role || 'Customer'], (err, result) => {
            if (err) return res.status(500).json({ error: err.message });
            res.status(201).json({ message: 'User registered successfully!' });
        });
    });
});

// Login a user
// Login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database for the user
    const query = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        // User is valid, return success response
        const user = results[0];
        res.status(200).json({
            message: 'Login successful!',
            user: { userId: user.UserID, name: user.Name, role: user.Role }
        });
    });
});
router.post('/login', (req, res) => {
    const { email, password } = req.body;
    const query = 'SELECT * FROM Users WHERE Email = ? AND Password = ?';
    db.query(query, [email, password], (err, results) => {
        if (err) return res.status(500).json({ error: err.message });
        if (results.length === 0) return res.status(401).json({ message: 'Invalid credentials' });

        const user = results[0];
        // Generate a JWT token
        const token = jwt.sign(
            { userId: user.UserID, role: user.Role },
            JWT_SECRET,
            { expiresIn: '1h' }
        );

        res.status(200).json({
            message: 'Login successful!',
            token,
            user: { userId: user.UserID, name: user.Name, role: user.Role }
        });
    });
});

module.exports = router;
