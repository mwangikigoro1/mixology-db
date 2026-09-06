require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

// Middleware
app.use(cors({
  origin: [
    'http://localhost:5173',
    'http://localhost:3000',
    'https://mixology-db-frontend.onrender.com',
    process.env.FRONTEND_URL
  ].filter(Boolean),
  credentials: true
}));
app.use(express.json());

// Routes
const cocktailRoutes = require('./routes/cocktails');
const userRoutes = require('./routes/users');

app.use('/api/cocktails', cocktailRoutes);
app.use('/api/users', userRoutes);

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected successfully'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

app.listen(process.env.PORT || 5000, () => {
  console.log(`✅ Server running on http://localhost:${process.env.PORT || 5000}`);
});
