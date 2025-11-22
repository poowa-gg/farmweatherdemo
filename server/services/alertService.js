const Farmer = require('../models/Farmer');
const WeatherAlert = require('../models/WeatherAlert');
const weatherService = require('./weatherService');
const smsService = require('./smsService');

class AlertService {
  async sendDailyAlerts() {
    try {
      const farmers = await Farmer.find({ 'alertPreferences.sms': true });
      console.log(`📤 Sending alerts to ${farmers.length} farmers...`);

      const alerts = [];
      
      for (const farmer of farmers) {
        const forecast = await weatherService.getForecast(
          farmer.location.coordinates.lat,
          farmer.location.coordinates.lon
        );

        const todayForecast = forecast[0];
        const message = smsService.formatWeatherAlert(todayForecast, farmer.name);

        // Check for critical conditions
        if (this.isCriticalWeather(todayForecast)) {
          await this.createAlert(farmer, todayForecast);
        }

        alerts.push({ phone: farmer.phone, message });
      }

      await smsService.sendBulkAlerts(alerts);
      console.log('✅ Daily alerts sent successfully');
    } catch (error) {
      console.error('❌ Error sending daily alerts:', error);
    }
  }

  isCriticalWeather(forecast) {
    return (
      forecast.rainfall > 50 || // Heavy rain
      forecast.temp.max > 38 || // Extreme heat
      forecast.wind > 15 // Strong wind
    );
  }

  async createAlert(farmer, forecast) {
    let alertType = 'heavy_rain';
    let severity = 'medium';
    let recommendation = '';

    if (forecast.rainfall > 50) {
      alertType = 'heavy_rain';
      severity = 'high';
      recommendation = 'Ensure proper drainage. Delay planting if possible.';
    } else if (forecast.temp.max > 38) {
      alertType = 'extreme_heat';
      severity = 'high';
      recommendation = 'Increase irrigation. Provide shade for sensitive crops.';
    } else if (forecast.wind > 15) {
      alertType = 'strong_wind';
      severity = 'medium';
      recommendation = 'Secure young plants. Delay pesticide application.';
    }

    const alert = new WeatherAlert({
      location: farmer.location,
      alertType,
      severity,
      message: `Critical weather alert for ${farmer.location.lga}, ${farmer.location.state}`,
      recommendation,
      sentTo: [farmer._id],
      expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000)
    });

    await alert.save();
    return alert;
  }
}

module.exports = new AlertService();
