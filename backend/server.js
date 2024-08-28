// const express = require('express');
// const bodyParser = require('body-parser');
// const cors = require('cors');
// const authRoutes = require('./routes/authRoutes');
// const leadsRoutes = require('./routes/leadsRoutes');
// const mysql = require('mysql2');

// const app = express();

// // Create and configure the database connection
// const db = mysql.createConnection({
//   host: '35.232.56.51',
//   user: 'whiteboxqa',
//   password: 'Innovapath1',
//   database: 'whiteboxqa',
// });

// db.connect((err) => {
//   if (err) throw err;
//   console.log('Connected to database');
// });

// app.use(bodyParser.json());

// app.use(cors());
// app.use(express.json());


// // Make db available to routes via middleware
// app.use((req, res, next) => {
//   req.db = db;
//   next();
// });

// app.use('/api/auth', authRoutes);
// app.use('/api', leadsRoutes);

// const PORT = process.env.PORT || 8001;
// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));



const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const leadsRoutes = require('./routes/leadsRoutes');
const mysql = require('mysql2');

const app = express();

// Create and configure the database connection
const db = mysql.createConnection({
  host: '35.232.56.51',
  user: 'whiteboxqa',
  password: 'Innovapath1',
  database: 'whiteboxqa',
});

db.connect((err) => {
  if (err) throw err;
  console.log('Connected to database');
});

app.use(bodyParser.json());
app.use(cors());
app.use(express.json());


// Make db available to routes via middleware
app.use((req, res, next) => {
  req.db = db;
  next();
});

app.use('/api/auth', authRoutes);
app.use('/api', leadsRoutes);

const PORT = process.env.PORT || 8001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
