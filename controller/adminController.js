const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const db = require('../config/db'); // Assuming a database connection is set up

// Admin registration
exports.registerAdmin = async (req, res) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 10);

  // Insert into database
  db.query(`INSERT INTO Admins (username, password) VALUES (?, ?)`, [username, hashedPassword], (err, result) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    res.status(201).json({ message: 'Admin registered' });
  });
};

// Admin login
exports.loginAdmin = async (req, res) => {
  const { username, password } = req.body;

  // Check if admin exists
  db.query(`SELECT * FROM Admins WHERE username = ?`, [username], async (err, results) => {
    if (err) return res.status(500).json({ error: 'Database error' });
    if (results.length === 0) return res.status(400).json({ error: 'Admin not found' });

    const admin = results[0];
    const match = await bcrypt.compare(password, admin.password);
    
    if (match) {
      const token = jwt.sign({ adminId: admin.id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      res.json({ token });
    } else {
      res.status(401).json({ error: 'Invalid credentials' });
    }
  });
};
