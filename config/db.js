const mysql = require('mysql2');
const util = require('util');
let dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: process.env.DB_HOST || 'localhost',
  user: process.env.DB_USER || 'root',
  password: process.env.DB_PASSWORD || 'Lzhyto237!',
  database: process.env.DB_NAME || 'gppkcbn'
});

const reconnect = () => {
  db.connect(err => {
    if (err) {
      console.error('Error reconnecting to the database:', err);
      setTimeout(reconnect, 2000); // Coba ulangi koneksi setelah 2 detik
    } else {
      console.log('Reconnected to the database.');
    }
  });
};

// Coba koneksi awal
db.connect(err => {
  if (err) {
    console.error('Initial connection error:', err);
    reconnect();
  } else {
    console.log('Database connected.');
  }
});

// Convert the query method to return promises
db.query = util.promisify(db.query);

module.exports = db;
