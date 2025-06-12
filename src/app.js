const express = require('express');
const app = express();

const sequelize = require('./config/db');
const userRouter = require('./routes/user');
const artisanProfileRouter = require('./routes/artisanProfile');

app.use(express.json());

app.get('/', (req, res) => {
  res.send('Hello Artisan Connect!');
});

app.use('/api/users', userRouter);
app.use('/api/artisan-profile', artisanProfileRouter);


(async () => {
  try {
    await sequelize.authenticate();
    console.log('✅ Database connected (Sequelize)');
    await sequelize.sync({ force: true }); // Sync models to DB
    console.log('✅ Models synced');
  } catch (error) {
    console.error('❌ DB connection or sync failed:', error);
  }
})();

module.exports = app;
