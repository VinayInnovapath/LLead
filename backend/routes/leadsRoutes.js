const express = require('express');
const router = express.Router();
const mysql = require('mysql2'); // Use mysql2 instead of mysql

// Create MySQL connection
const db = mysql.createConnection({
  host: '35.232.56.51',
  user: 'whiteboxqa',
  password: 'Innovapath1',
  database: 'whiteboxqa'
});

// Middleware to handle database connection
router.use((req, res, next) => {
  req.db = db;
  next();
});

// Route to get leads with pagination
router.get('/leads', (req, res) => {
  const db = req.db;
  if (!db) {
    return res.status(500).json({ message: 'Database connection error' });
  }

  const page = parseInt(req.query.page, 10) || 1; // Page number
  const pageSize = parseInt(req.query.pageSize, 10) || 100; // Number of items per page
  const offset = (page - 1) * pageSize;

  // Query to fetch data with pagination
  db.query(
    'SELECT * FROM leads LIMIT ? OFFSET ?',
    [pageSize, offset],
    (err, results) => {
      if (err) {
        console.error('Database query error:', err);
        return res.status(500).json({ message: 'Database error' });
      }

      // Query to count total rows
      db.query('SELECT COUNT(*) AS total FROM leads', (countErr, countResults) => {
        if (countErr) {
          console.error('Count query error:', countErr);
          return res.status(500).json({ message: 'Database error' });
        }
        const totalRows = countResults[0].total;
        res.json({ data: results, totalRows });
      });
    }
  );
});

module.exports = router;


