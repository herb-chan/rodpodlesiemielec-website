import mysql from 'mysql2/promise';

// Create a connection pool with proper settings
const pool = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE,
  waitForConnections: true,
  connectionLimit: 25,
  queueLimit: 0,
});

// Export a function to get a connection from the pool
const dbConnect = async () => {
  try {
    const connection = await pool.getConnection();
    return connection;
  } catch (error) {
    console.error('MySQL connection error:', error.message);
    throw error;
  }
};

export default dbConnect;
