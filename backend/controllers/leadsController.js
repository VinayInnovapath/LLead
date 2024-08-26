const mysql = require('mysql2');

// Connect to the database
const db = mysql.createConnection({
  host: '35.232.56.51',
  user: 'whiteboxqa',
  password: 'Innovapath1',
  database: 'whiteboxqa',
});

const getLeads = (req, res) => {
  db.query('SELECT * FROM leads', (err, results) => {
    if (err) {
      console.error('Database query error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.json(results);
  });
};

module.exports = { getLeads };
