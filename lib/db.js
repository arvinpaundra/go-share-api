const db = require('mysql');
require('dotenv').config();

const connection = db.createConnection({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
});

connection.connect();

module.exports = connection;
