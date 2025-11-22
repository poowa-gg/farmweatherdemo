const express = require('express');
const router = express.Router();
const axios = require('axios');
const Farmer = require('../models/Farmer');

// Initialize payment
router.post('/initialize', async (req, res) => {
  try {
    const { email, farmerId, plan } = req.body;
    
    // Determine amount based on plan
    const amount = plan === 'premium' ? 30000 : 0; // ₦300 in kobo (Paystack uses kobo)
    
    if (amount === 0) {
      return res.status(400).json({ error: 'Invalid plan' });
    }

    // Initialize payment with Paystack
    const response = await axios.post(
      'https://api.paystack.co/transaction/initialize',
      {
        email,
        amount, // Amount in kobo (₦300 = 30000 kobo)
        currency: 'NGN',
        reference: `FW-${Date.now()}-${farmerId}`,
        callback_url: `${process.env.FRONTEND_URL || 'http://localhost:3000'}/payment/callback`,
        metadata: {
          farmerId,
          plan,
          custom_fields: [
            {
              display_name: 'Farmer ID',
              variable_name: 'farmer_id',
              value: farmerId
            }
          ]
        }
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`,
          'Content-Type': 'application/json'
        }
      }
    );

    res.json({
      success: true,
      data: {
        authorization_url: response.data.data.authorization_url,
        access_code: response.data.data.access_code,
        reference: response.data.data.reference
      }
    });
  } catch (error) {
    console.error('Payment initialization error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to initialize payment',
      details: error.response?.data?.message 
    });
  }
});

// Verify payment
router.get('/verify/:reference', async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.PAYSTACK_SECRET_KEY}`
        }
      }
    );

    const paymentData = response.data.data;

    if (paymentData.status === 'success') {
      // Update farmer to premium
      const farmerId = paymentData.metadata.farmerId;
      const farmer = await Farmer.findById(farmerId);
      
      if (farmer) {
        farmer.isPremium = true;
        farmer.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000); // 30 days
        await farmer.save();
      }

      res.json({
        success: true,
        message: 'Payment verified successfully',
        data: {
          amount: paymentData.amount / 100, // Convert from kobo to naira
          status: paymentData.status,
          reference: paymentData.reference
        }
      });
    } else {
      res.status(400).json({
        success: false,
        message: 'Payment verification failed',
        status: paymentData.status
      });
    }
  } catch (error) {
    console.error('Payment verification error:', error.response?.data || error.message);
    res.status(500).json({ 
      error: 'Failed to verify payment',
      details: error.response?.data?.message 
    });
  }
});

// Webhook endpoint for Paystack callbacks
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const hash = require('crypto')
      .createHmac('sha512', process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(req.body))
      .digest('hex');

    if (hash === req.headers['x-paystack-signature']) {
      const event = req.body;

      if (event.event === 'charge.success') {
        const farmerId = event.data.metadata.farmerId;
        const farmer = await Farmer.findById(farmerId);
        
        if (farmer) {
          farmer.isPremium = true;
          farmer.subscriptionExpiry = new Date(Date.now() + 30 * 24 * 60 * 60 * 1000);
          await farmer.save();
          console.log(`✅ Farmer ${farmerId} upgraded to premium via webhook`);
        }
      }

      res.sendStatus(200);
    } else {
      res.sendStatus(400);
    }
  } catch (error) {
    console.error('Webhook error:', error);
    res.sendStatus(500);
  }
});

module.exports = router;
