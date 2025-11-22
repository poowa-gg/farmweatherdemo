const express = require('express');
const router = express.Router();

// Crop-specific recommendations database
const cropRecommendations = {
  maize: {
    planting: { minTemp: 18, maxTemp: 35, minRainfall: 500, maxRainfall: 1000 },
    advice: 'Plant during early rains. Requires well-drained soil.'
  },
  rice: {
    planting: { minTemp: 20, maxTemp: 35, minRainfall: 1000, maxRainfall: 2000 },
    advice: 'Requires flooded fields. Plant at onset of rainy season.'
  },
  cassava: {
    planting: { minTemp: 25, maxTemp: 35, minRainfall: 500, maxRainfall: 1500 },
    advice: 'Drought-tolerant. Can be planted year-round in most regions.'
  },
  yam: {
    planting: { minTemp: 25, maxTemp: 30, minRainfall: 1000, maxRainfall: 1500 },
    advice: 'Plant at beginning of rainy season. Requires mounds or ridges.'
  },
  tomato: {
    planting: { minTemp: 18, maxTemp: 27, minRainfall: 400, maxRainfall: 600 },
    advice: 'Sensitive to heavy rain. Requires staking and regular watering.'
  }
};

// Get crop-specific recommendations
router.get('/:crop', async (req, res) => {
  try {
    const crop = req.params.crop.toLowerCase();
    const recommendation = cropRecommendations[crop];
    
    if (!recommendation) {
      return res.status(404).json({ error: 'Crop not found' });
    }
    
    res.json({ success: true, data: recommendation });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get all available crops
router.get('/', async (req, res) => {
  res.json({ 
    success: true, 
    data: Object.keys(cropRecommendations) 
  });
});

module.exports = router;
