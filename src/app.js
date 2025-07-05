const express = require('express');
const cors = require('cors');
const app = express();
const sequelize = require('./config/db');
require('./models');
const userRouter = require('./routes/userRoutes');
const artisanProfileRouter = require('./routes/artisanProfileRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const artisanCategoryRoutes = require('./routes/artisanCategory');
const authRoutes = require('./routes/authRoutes');
const customerProfileRoute = require('./routes/customerProfileRoute')
const jobRequestRoutes = require('./routes/jobRequestRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

// Allow requests from frontend (Vite runs on port 5173)
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true, // if you're sending cookies or auth headers
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/artisan-categories', artisanCategoryRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/users', userRouter);
app.use('/api/artisan-profile', artisanProfileRouter);
app.use('/api/customer-profile', customerProfileRoute);
app.use('/api/job-requests', jobRequestRoutes);
app.use('/api/reviews', reviewRoutes);

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
