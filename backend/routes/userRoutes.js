const express = require('express');
const db = require('../config/db');
const bcrypt = require('bcrypt'); // For hashing passwords
const jwt = require('jsonwebtoken');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Register a new user
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        // Check if the email already exists
        const checkQuery = 'SELECT * FROM Users WHERE Email = ?';
        db.query(checkQuery, [email], async (err, results) => {
            if (err) return res.status(500).json({ error: 'Internal server error' });
            if (results.length > 0) {
                return res.status(400).json({ message: 'Email already exists' });
            }

            // Hash the password before storing it
            const hashedPassword = await bcrypt.hash(password, 10);

            // Insert the new user into the database
            const insertQuery = 'INSERT INTO Users (Name, Email, Password, Role) VALUES (?, ?, ?, ?)';
            db.query(insertQuery, [name, email, hashedPassword, role || 'Customer'], (err) => {
                if (err) return res.status(500).json({ error: 'Failed to register user' });
                res.status(201).json({ message: 'User registered successfully!' });
            });
        });
    } catch (error) {
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Login a user
router.post('/login', (req, res) => {
    const { email, password } = req.body;

    // Query the database for the user
    const query = 'SELECT * FROM Users WHERE Email = ?';
    db.query(query, [email], async (err, results) => {
        if (err) return res.status(500).json({ error: 'Internal server error' });
        if (results.length === 0) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

        const user = results[0];

        // Compare the provided password with the hashed password
        const isPasswordValid = await bcrypt.compare(password, user.Password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Invalid email or password' });
        }

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
