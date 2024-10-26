const { Client } = require('pg');
require('dotenv').config();

const client = new Client({
    host: 'aws-0-ap-southeast-1.pooler.supabase.com', // No https://
    user: 'postgres.mhnpvhwvdnkrtpqyfbrs',
    port: 6543, // Use the correct port
    database: 'postgres', // Use the correct database name
    password: process.env.Data_Base_Password, // Ensure the password is set correctly in .env
});

client.connect().then(() => {
    console.log('Connected to PostgreSQL');
}).catch(err => {
    console.error('Failed to connect to PostgreSQL', err);
});

module.exports = client;
