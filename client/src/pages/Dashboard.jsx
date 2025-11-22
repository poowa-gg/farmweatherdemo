import { useState, useEffect } from 'react';
import axios from 'axios';
import { CloudRain, Thermometer, Wind, Droplets, AlertTriangle } from 'lucide-react';
import { config } from '../config';

export default function Dashboard() {
  const [forecast, setForecast] = useState([]);
  const [recommendations, setRecommendations] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [location, setLocation] = useState({ lat: 9.0820, lon: 8.6753 }); // Default Abuja

  useEffect(() => {
    fetchWeatherData();
    fetchAlerts();
  }, []);

  const fetchWeatherData = async () => {
    try {
      const response = await axios.get(`${config.apiEndpoints.weather}/forecast`, {
        params: location
      });
      setForecast(response.data.data);

      const recResponse = await axios.get(`${config.apiEndpoints.weather}/recommendations`, {
        params: { ...location, crop: 'maize' }
      });
      setRecommendations(recResponse.data.data.recommendations);
    } catch (error) {
      console.error('Error fetching weather:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchAlerts = async () => {
    try {
      const response = await axios.get(config.apiEndpoints.alerts);
      setAlerts(response.data.data);
    } catch (error) {
      console.error('Error fetching alerts:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading weather data...</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Your Farm Weather Dashboard</h1>

      {/* Active Alerts */}
      {alerts.length > 0 && (
        <div className="mb-8">
          <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
            <AlertTriangle className="text-red-500" />
            Active Weather Alerts
          </h2>
          <div className="space-y-3">
            {alerts.slice(0, 3).map((alert, i) => (
              <div key={i} className="bg-red-50 border-l-4 border-red-500 p-4 rounded">
                <p className="font-semibold">{alert.message}</p>
                <p className="text-sm text-gray-600 mt-1">{alert.recommendation}</p>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recommendations */}
      <div className="mb-8 bg-green-50 p-6 rounded-lg">
        <h2 className="text-2xl font-semibold mb-4">Today's Recommendations</h2>
        <ul className="space-y-2">
          {recommendations.map((rec, i) => (
            <li key={i} className="flex items-start gap-2">
              <span className="text-green-600 font-bold">•</span>
              <span>{rec}</span>
            </li>
          ))}
        </ul>
      </div>

      {/* 7-Day Forecast */}
      <div>
        <h2 className="text-2xl font-semibold mb-4">7-Day Forecast</h2>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {forecast.map((day, i) => (
            <WeatherCard key={i} day={day} />
          ))}
        </div>
      </div>
    </div>
  );
}

function WeatherCard({ day }) {
  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <p className="font-semibold text-lg mb-3">{new Date(day.date).toLocaleDateString('en-US', { weekday: 'short', month: 'short', day: 'numeric' })}</p>
      
      <div className="space-y-3">
        <div className="flex items-center gap-2">
          <Thermometer size={20} className="text-red-500" />
          <span>{Math.round(day.temp.min)}° - {Math.round(day.temp.max)}°C</span>
        </div>
        
        <div className="flex items-center gap-2">
          <CloudRain size={20} className="text-blue-500" />
          <span>{Math.round(day.rainfall)}mm</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Droplets size={20} className="text-cyan-500" />
          <span>{day.humidity}%</span>
        </div>
        
        <div className="flex items-center gap-2">
          <Wind size={20} className="text-gray-500" />
          <span>{Math.round(day.wind)} m/s</span>
        </div>
      </div>
      
      <p className="mt-4 text-sm text-gray-600 capitalize">{day.description}</p>
    </div>
  );
}
