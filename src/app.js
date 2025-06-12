const express = require('express');
const app = express();
const sequelize = require('./config/db');

const userRouter = require('./routes/userRoutes');
const artisanProfileRouter = require('./routes/artisanProfileRoutes');
const serviceRequestRoutes = require('./routes/serviceRequestRoutes');
const jobRoutes = require('./routes/jobRoutes');

app.use(express.json());



app.use('/api/users', userRouter);
app.use('/api/artisan-profile', artisanProfileRouter);
// app.use('/api/jobs', jobRoutes);
app.use('/api/service-requests', serviceRequestRoutes);



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
