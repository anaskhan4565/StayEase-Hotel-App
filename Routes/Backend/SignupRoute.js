const express = require('express');
const bcrypt = require('bcrypt');
const router = express.Router();
router.post('/', async (req, res) => {
    try {
        const { email, password } = req.body;
        const hashedPassword = await bcrypt.hash(password, 10);

        const client = req.client;
        const result = (await client.query("select email,password from users where email=$1", [email]));


        if (result.rows.length > 0) {
            res.json("Email already in use");
        }
        const result2 = (await client.query("insert into users (email,password) values($1,$2)", [email, hashedPassword]));
        res.status(201).json({ message: 'New data added', data: result.rows[0] });
        console.log("new data added");

    }
    catch (error) {
        console.error("Error found:", error.message);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});


module.exports = router;
