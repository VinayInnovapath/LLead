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


const insertLead = (req, res) => {
  const newLead = req.body;

  // Make sure to sanitize and validate input data as necessary
  req.db.query('INSERT INTO leads SET ?', newLead, (err, results) => {
    if (err) {
      console.error('Database insert error:', err);
      return res.status(500).json({ message: 'Database error' });
    }
    res.status(201).json({ id: results.insertId, ...newLead });
  });
};

module.exports = { getLeads, insertLead }; // Export the new function along with existing ones

// module.exports = { getLeads };
