const express = require('express');
const router = express.Router();
const weatherService = require('../services/weatherService');

// Get weather forecast by coordinates
router.get('/forecast', async (req, res) => {
  try {
    const { lat, lon } = req.query;
    
    if (!lat || !lon) {
      return res.status(400).json({ error: 'Latitude and longitude required' });
    }

    const forecast = await weatherService.getForecast(parseFloat(lat), parseFloat(lon));
    res.json({ success: true, data: forecast });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get recommendations based on forecast and crop
router.get('/recommendations', async (req, res) => {
  try {
    const { lat, lon, crop } = req.query;
    
    const forecast = await weatherService.getForecast(parseFloat(lat), parseFloat(lon));
    const recommendations = weatherService.generateRecommendation(forecast[0], crop);
    
    res.json({ success: true, data: { forecast: forecast[0], recommendations } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
