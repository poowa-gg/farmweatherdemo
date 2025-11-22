const express = require('express');
const router = express.Router();
const Farmer = require('../models/Farmer');

// Register new farmer
router.post('/register', async (req, res) => {
  try {
    const farmer = new Farmer(req.body);
    await farmer.save();
    res.status(201).json({ success: true, data: farmer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Get farmer by phone
router.get('/:phone', async (req, res) => {
  try {
    const farmer = await Farmer.findOne({ phone: req.params.phone });
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
    const farmer = await Farmer.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json({ success: true, data: farmer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Upgrade to premium
router.post('/:id/upgrade', async (req, res) => {
  try {
    const farmer = await Farmer.findById(req.params.id);
    farmer.isPremium = true;
    farmer.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
    await farmer.save();
    res.json({ success: true, data: farmer });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

module.exports = router;
