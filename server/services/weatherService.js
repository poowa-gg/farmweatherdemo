const axios = require('axios');

class WeatherService {
  async getForecast(lat, lon) {
    try {
      const response = await axios.get(`${process.env.WEATHER_API_URL}/forecast`, {
        params: {
          lat,
          lon,
          appid: process.env.WEATHER_API_KEY,
          units: 'metric'
        }
      });

      return this.formatForecast(response.data);
    } catch (error) {
      console.error('Weather API error:', error.message);
      throw new Error('Failed to fetch weather data');
    }
  }

  formatForecast(data) {
    const dailyForecasts = {};
    
    data.list.forEach(item => {
      const date = item.dt_txt.split(' ')[0];
      if (!dailyForecasts[date]) {
        dailyForecasts[date] = {
          date,
          temp: { min: item.main.temp_min, max: item.main.temp_max },
          humidity: item.main.humidity,
          rainfall: item.rain ? item.rain['3h'] || 0 : 0,
          wind: item.wind.speed,
          description: item.weather[0].description,
          icon: item.weather[0].icon
        };
      } else {
        dailyForecasts[date].temp.min = Math.min(dailyForecasts[date].temp.min, item.main.temp_min);
        dailyForecasts[date].temp.max = Math.max(dailyForecasts[date].temp.max, item.main.temp_max);
        dailyForecasts[date].rainfall += item.rain ? item.rain['3h'] || 0 : 0;
      }
    });

    return Object.values(dailyForecasts).slice(0, 7);
  }

  generateRecommendation(forecast, crop) {
    const recommendations = [];
    
    // Rainfall recommendations
    if (forecast.rainfall > 50) {
      recommendations.push('⚠️ Heavy rain expected. Delay planting and ensure proper drainage.');
    } else if (forecast.rainfall < 5 && forecast.temp.max > 32) {
      recommendations.push('💧 Low rainfall and high heat. Irrigate crops if possible.');
    } else if (forecast.rainfall >= 10 && forecast.rainfall <= 30) {
      recommendations.push('✅ Good conditions for planting and field work.');
    }

    // Temperature recommendations
    if (forecast.temp.max > 35) {
      recommendations.push('🌡️ Extreme heat. Provide shade for sensitive crops and increase watering.');
    }

    // Wind recommendations
    if (forecast.wind > 10) {
      recommendations.push('💨 Strong winds expected. Secure young plants and delay spraying.');
    }

    return recommendations.length > 0 ? recommendations : ['Weather conditions are normal. Continue regular farm activities.'];
  }
}

module.exports = new WeatherService();
