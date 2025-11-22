const mongoose = require('mongoose');

const farmerSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true, unique: true },
  location: {
    state: { type: String, required: true },
    lga: { type: String, required: true },
    coordinates: {
      lat: { type: Number, required: true },
      lon: { type: Number, required: true }
    }
  },
  crops: [{ type: String }],
  farmSize: { type: Number }, // in hectares
  isPremium: { type: Boolean, default: false },
  subscriptionExpiry: { type: Date },
  alertPreferences: {
    sms: { type: Boolean, default: true },
    rainfall: { type: Boolean, default: true },
    temperature: { type: Boolean, default: true },
    wind: { type: Boolean, default: false }
  },
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Farmer', farmerSchema);
