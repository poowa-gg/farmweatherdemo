// API Configuration
// In production, API is served from same origin (no need for full URL)
// In development, use localhost:5000
const API_URL = import.meta.env.VITE_API_URL || 
  (import.meta.env.MODE === 'production' ? '' : 'http://localhost:5000');

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
