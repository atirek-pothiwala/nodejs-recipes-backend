const mysql = require('mysql2');
require("dotenv").config({ path: "./debug.env" });

// Create Pool Connection
const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASSWORD,
    database: process.env.DB_NAME,
    waitForConnections: true,
    connectionLimit: 10, // Number of connections in the pool
    queueLimit: 0,
});

console.log("Database Host:", process.env.DB_HOST);
console.log("Database Name:", process.env.DB_NAME);

pool.getConnection((error, connection) => {
    if (error) {
        console.error("❌ Database connection failed:", error.message);
    } else {
        console.log("✅ Database connected successfully!");
        connection.ping(error => {
            if (error) {
                console.error("❌ Database ping failed:", error.message);
            } else {
                console.log("✅ Database is alive!");
            }
            connection.release();
        });
    }
});

module.exports = pool.promise();
