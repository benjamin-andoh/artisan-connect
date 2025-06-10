const express = require('express');
const app = express();

const sequelize = require('./config/db');
const userRouter = require('./routes/user');

app.use(express.json());

app.use('/api/users', userRouter);

app.get('/', (req, res) => {
  res.send('Hello Artisan Connect!');
});

(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected (Sequelize)');
    await sequelize.sync({ alter: true }); // Sync models to DB
    console.log('✅ Models synced');
  } catch (error) {
    console.error('❌ DB connection or sync failed:', error);
  }
})();

module.exports = app;
