import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config();

const connection = mysql.createPool({
  host: 'localhost',
  user: process.env.DATABASE_USER,
  password: process.env.DATABASE_PASSWORD,
  database: 'rent_a_vehicle',
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

connection.query("select 1")
  .then(data => console.log("Database connection successful"))
  .catch(err => {
    console.error(`DB connection failed - ${err.message}`);
    process.exit(1); // Exit the process on connection failure
  });

export default connection;
