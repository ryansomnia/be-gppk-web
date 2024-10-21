const mysql = require('mysql2');
const util = require('util');
let dotenv = require('dotenv');
dotenv.config();

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Lzhyto237!',
  database: 'gppkcbn'
});

db.connect(err => {
  if (err) throw err;
  console.log('Database connected.');
});

// Convert the query method to return promises
db.query = util.promisify(db.query);

module.exports = db;

