const client = require('./connection.js');
const express = require('express');
const SigninRoute = require('./SigninRoute.js');
const SignupRoute = require('./SignupRoute.js');
const verifytoken = require('../Middleware/auth.js');
const dotenv = require('dotenv');
const app = express();
dotenv.config();
app.use(express.json());

app.use((req, res, next) => {
    req.client = client;
    next();
})
app.use('/UserSignin', SigninRoute);
app.use('/UserSignup', SignupRoute);
app.listen(3300, () => {

    console.log("Server is running on port 3300");
    console.log("Connected to PostgreSQL");
});


// app.get('/demodata', async (req, res) => {
//     try {
//         const result = (await client.query(`SELECT * FROM "demodata"`)).rows;
//         res.json(result);
//     } catch (error) {
//         console.error('Error executing query', error.stack);
//         res.status(500).send('Error executing query');
//     }
// });

// app.post('/demodata', async (req, res) => {
//     try {
//         const { name, location } = req.body;
//         const result = await client.query(`
//             INSERT INTO "demodata" (first_name, location)
//             VALUES ($1, $2)
//             RETURNING *;
//         `, [name, location]);

//         res.status(201).json({ message: 'New data added', data: result.rows[0] });
//     } catch (error) {
//         console.error('Error inserting data:', error.stack);
//         res.status(500).send('Error inserting data');
//     }
// });
