// API Configuration
export const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';

export const config = {
  apiUrl: API_URL,
  apiEndpoints: {
    weather: `${API_URL}/api/weather`,
    farmers: `${API_URL}/api/farmers`,
    alerts: `${API_URL}/api/alerts`,
    recommendations: `${API_URL}/api/recommendations`,
    payment: `${API_URL}/api/payment`
  }
};
