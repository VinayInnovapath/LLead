const mysql = require('mysql');

const db = mysql.createConnection({
  host: '35.232.56.51',
  user: 'whiteboxqa',
  password: 'Innovapath1',
  database: 'whiteboxqa'
});

db.connect((err) => {
  if (err) throw err;
  console.log('Database connected...');
});

module.exports = db;
