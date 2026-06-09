const mysql = require("mysql2/promise");

const pool = mysql.createPool({
  host:     process.env.DB_HOST     || "localhost",
  user:     process.env.DB_USER     || "appbruker",
  password: process.env.DB_PASSWORD || "apppassord",
  database: process.env.DB_NAME     || "kontorutleie",
  waitForConnections: true,
  connectionLimit: 10,
});

module.exports = pool;
