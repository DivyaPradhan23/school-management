import mysql from "mysql2/promise";

// parse DATABASE_URL from environment
const { DATABASE_URL } = process.env;
const url = new URL(DATABASE_URL);

const connection = mysql.createPool({
  host: url.hostname,
  user: url.username,
  password: url.password,
  database: url.pathname.slice(1), // remove the leading '/'
  port: url.port,
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
});

export default connection;
