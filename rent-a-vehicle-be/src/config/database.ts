import mysql from 'mysql2/promise';

const connection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'mysql10@',
  database: 'rent_a_vehicle'
});

connection.query("select 1")
  .then(data => console.log("Database connection successful"))
  .catch(err => {
    console.error(`DB connection failed - ${err.message}`);
    process.exit(1); // Exit the process on connection failure
  });

export default connection;
