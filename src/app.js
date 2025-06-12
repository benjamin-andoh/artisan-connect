const express = require('express');
const app = express();

const sequelize = require('./config/db');
const userRouter = require('./routes/userRoutes');
const artisanProfileRouter = require('./routes/artisanProfileRoutes');

app.use(express.json());
const jobRoutes = require('./routes/jobRoutes');



app.get('/', (req, res) => {
  res.send('Hello Artisan Connect!');
});

app.use('/api/users', userRouter);
app.use('/api/artisan-profile', artisanProfileRouter);
app.use('/api/jobs', jobRoutes);


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
