const mysql = require('mysql2');
const util = require('util');

// Konfigurasi pool koneksi
const pool = mysql.createPool({
  host: process.env.VPS_HOST,       // Sesuaikan dengan host database Anda
  user: process.env.VPS_USER,            // Sesuaikan dengan user database Anda
  password: process.env.VPS_PASSWORD,    // Sesuaikan dengan password database Anda
  database: process.env.VPS_NAME,     // Ganti dengan nama database Anda
waitForConnections: true,
  connectionLimit: 10,     // Jumlah maksimal koneksi yang dapat dibuat
  queueLimit: 0,           // Tidak ada batasan antrian koneksi
  connectTimeout: 10000    // Waktu maksimal menunggu koneksi (dalam ms)
});


// Konversi metode query menjadi promise
pool.query = util.promisify(pool.query).bind(pool);

// Penanganan error global (untuk reconnect jika pool terputus)
pool.on('connection', () => {
  console.log('Database connected.');
});

pool.on('error', (err) => {
  console.error('Database error:', err);
  if (err.code === 'PROTOCOL_CONNECTION_LOST') {
    console.log('Attempting to reconnect...');
    // Pool akan otomatis membuat ulang koneksi yang terputus
  }
});

module.exports = pool;
