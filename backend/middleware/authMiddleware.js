const jwt = require('jsonwebtoken');
const JWT_SECRET = 'your_secret_key';

// Middleware to verify JWT token
function verifyToken(req, res, next) {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'No token provided' });
    }

    jwt.verify(token, JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Unauthorized!' });
        }

        // Attach user info to the request object
        req.user = decoded;
        next();
    });
}

module.exports = verifyToken;
