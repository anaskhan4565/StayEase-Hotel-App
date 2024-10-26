
const jwt = require('jsonwebtoken');

// Middleware to protect routes
const verifyToken = (req, res, next) => {
    const token = req.headers['authorization'];

    if (!token) {
        return res.status(403).json({ message: 'Access denied. No token provided.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
        if (err) {
            return res.status(401).json({ message: 'Invalid token.' });
        }

        req.user = decoded; // Attach user info to request object
        next(); // Proceed to the next middleware or route handler
    });
};

module.exports = verifyToken;
