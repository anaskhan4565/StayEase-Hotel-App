const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');

require('dotenv').config();
const router = express.Router();
const generateToken = ({ email }) => {
    const jwtSecret = process.env.JWT_SECRET;
    if (!jwtSecret) {
        throw new Error('JWT_SECRET not defined in .env');
    }
    return jwt.sign({ email }, jwtSecret);
};

router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const client = req.client;
        const result = (await client.query("select email,password from users where email=$1", [email])).rows[0];

        if (result) {
            const match = await bcrypt.compare(password, result.password);
            console.log("hi");
            if (result.email === email && match) {
                const token = generateToken({ email });
                console.log("hi2");
                res.json({ token });

            }
            else {
                res.status(401).json({ error: "Incorrect email or password" });
            }
        }
        else {
            res.status(404).json({ error: "User not found" });
        }
    } catch (error) {
        console.error("Error found:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
