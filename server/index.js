require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cron = require('node-cron');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Database connection
mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

// Routes
app.use('/api/weather', require('./routes/weather'));
app.use('/api/farmers', require('./routes/farmers'));
app.use('/api/alerts', require('./routes/alerts'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/payment', require('./routes/payment'));

// Scheduled SMS alerts (runs every day at 6 AM)
cron.schedule('0 6 * * *', async () => {
  console.log('🔔 Running daily weather alert job...');
  const alertService = require('./services/alertService');
  await alertService.sendDailyAlerts();
});

// Serve frontend in production
if (process.env.NODE_ENV === 'production') {
  const path = require('path');
  
  // Serve static files from the React app
  app.use(express.static(path.join(__dirname, '../client/dist')));
  
  // Handle React routing, return all requests to React app
  app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/dist/index.html'));
  });
}

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  if (process.env.NODE_ENV === 'production') {
    console.log('📦 Serving frontend from /client/dist');
  }
});
