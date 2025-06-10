const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/db'); 

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes placeholder
app.get('/', async (req, res) => {
    try {
      const result = await db.query('SELECT NOW()');
      res.send(`API is running - DB time: ${result.rows[0].now}`);
    } catch (err) {
      console.error(err);
      res.status(500).send('Database error');
    }
  });
  

// Start server
app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`);
});
