const mongoose = require('mongoose');

const weatherAlertSchema = new mongoose.Schema({
  location: {
    state: String,
    lga: String,
    coordinates: {
      lat: Number,
      lon: Number
    }
  },
  alertType: { 
    type: String, 
    enum: ['heavy_rain', 'drought', 'extreme_heat', 'strong_wind', 'frost'],
    required: true 
  },
  severity: { 
    type: String, 
    enum: ['low', 'medium', 'high', 'critical'],
    default: 'medium'
  },
  message: { type: String, required: true },
  recommendation: { type: String },
  sentTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Farmer' }],
  createdAt: { type: Date, default: Date.now },
  expiresAt: { type: Date }
});

module.exports = mongoose.model('WeatherAlert', weatherAlertSchema);
