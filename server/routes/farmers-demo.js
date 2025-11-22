const express = require('express');
const router = express.Router();

// In-memory storage for demo (no database needed)
const farmers = [];

// Register new farmer
router.post('/register', async (req, res) => {
  try {
    const farmer = {
      _id: Date.now().toString(),
      ...req.body,
      isPremium: false,
      createdAt: new Date()
    };
    farmers.push(farmer);
    console.log(`✅ Farmer registered: ${farmer.name}`);
    res.status(201).json({ success: true, data: farmer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get farmer by phone
router.get('/:phone', async (req, res) => {
  try {
    const farmer = farmers.find(f => f.phone === req.params.phone);
    if (!farmer) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    res.json({ success: true, data: farmer });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Update farmer profile
router.put('/:id', async (req, res) => {
  try {
    const index = farmers.findIndex(f => f._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    farmers[index] = { ...farmers[index], ...req.body };
    res.json({ success: true, data: farmers[index] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upgrade to premium
router.post('/:id/upgrade', async (req, res) => {
  try {
    const index = farmers.findIndex(f => f._id === req.params.id);
    if (index === -1) {
      return res.status(404).json({ error: 'Farmer not found' });
    }
    farmers[index].isPremium = true;
    farmers[index].subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
    res.json({ success: true, data: farmers[index] });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
