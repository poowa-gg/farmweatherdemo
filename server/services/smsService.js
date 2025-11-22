const axios = require('axios');

class SMSService {
  async sendAlert(phone, message) {
    try {
      // Using Termii API (popular in Nigeria)
      const response = await axios.post(process.env.SMS_API_URL, {
        to: phone,
        from: process.env.SMS_SENDER_ID,
        sms: message,
        type: 'plain',
        channel: 'generic',
        api_key: process.env.SMS_API_KEY
      });

      console.log(`✅ SMS sent to ${phone}`);
      return response.data;
    } catch (error) {
      console.error(`❌ SMS failed for ${phone}:`, error.message);
      throw error;
    }
  }

  async sendBulkAlerts(recipients) {
    const results = [];
    for (const recipient of recipients) {
      try {
        await this.sendAlert(recipient.phone, recipient.message);
        results.push({ phone: recipient.phone, status: 'sent' });
      } catch (error) {
        results.push({ phone: recipient.phone, status: 'failed', error: error.message });
      }
    }
    return results;
  }

  formatWeatherAlert(forecast, farmerName) {
    const temp = `${Math.round(forecast.temp.min)}-${Math.round(forecast.temp.max)}°C`;
    const rain = forecast.rainfall > 0 ? `${Math.round(forecast.rainfall)}mm rain` : 'No rain';
    
    return `Hello ${farmerName}, Today's forecast: ${temp}, ${rain}. ${forecast.description}. Stay informed with FarmWeather.`;
  }
}

module.exports = new SMSService();
