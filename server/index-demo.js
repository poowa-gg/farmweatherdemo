// Demo version - works without MongoDB for quick testing
require('dotenv').config();
const express = require('express');
const cors = require('cors');

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

console.log('🚀 Starting FarmWeather Demo Server...');

// Mock database connection (no MongoDB needed for demo)
console.log('✅ Demo mode - MongoDB not required');

// Routes
app.use('/api/weather', require('./routes/weather'));
app.use('/api/farmers', require('./routes/farmers-demo'));
app.use('/api/alerts', require('./routes/alerts-demo'));
app.use('/api/recommendations', require('./routes/recommendations'));
app.use('/api/payment', require('./routes/payment'));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Demo Server running on port ${PORT}`);
  console.log(`📊 Frontend should connect to: http://localhost:${PORT}`);
  console.log(`🌐 Open frontend at: http://localhost:3000`);
});
