const express = require('express');
const router = express.Router();
const WeatherAlert = require('../models/WeatherAlert');

// Get all active alerts
router.get('/', async (req, res) => {
  try {
    const alerts = await WeatherAlert.find({ 
      expiresAt: { $gt: new Date() } 
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get alerts by location
router.get('/location', async (req, res) => {
  try {
    const { state, lga } = req.query;
    const alerts = await WeatherAlert.find({
      'location.state': state,
      'location.lga': lga,
      expiresAt: { $gt: new Date() }
    }).sort({ createdAt: -1 });
    res.json({ success: true, data: alerts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
