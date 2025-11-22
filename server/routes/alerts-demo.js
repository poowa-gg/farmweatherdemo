const express = require('express');
const router = express.Router();

// Mock alerts for demo
const mockAlerts = [
  {
    _id: '1',
    location: { state: 'Kaduna', lga: 'Zaria' },
    alertType: 'heavy_rain',
    severity: 'high',
    message: 'Heavy rain expected in the next 24 hours',
    recommendation: 'Delay planting and ensure proper drainage. Secure young plants.',
    createdAt: new Date(),
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
  }
];

// Get all active alerts
router.get('/', async (req, res) => {
  try {
    res.json({ success: true, data: mockAlerts });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Get alerts by location
router.get('/location', async (req, res) => {
  try {
    const { state, lga } = req.query;
    const filtered = mockAlerts.filter(a => 
      a.location.state === state && a.location.lga === lga
    );
    res.json({ success: true, data: filtered });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
