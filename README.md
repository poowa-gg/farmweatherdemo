# 🌾 FarmWeather - Hyperlocal Climate Intelligence for Nigerian Farmers

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Node.js](https://img.shields.io/badge/Node.js-18+-green.svg)](https://nodejs.org/)
[![React](https://img.shields.io/badge/React-18-blue.svg)](https://reactjs.org/)

A hyperlocal climate intelligence platform delivering location-specific weather forecasts and actionable farming advice to Nigerian farmers via web and SMS.

## 🎯 Problem Statement

90% of Nigerian farmers rely on rainfed agriculture, but current weather forecasts are too broad, late, and unreliable. This costs farmers billions in crop losses every year.

## 💡 Solution

FarmWeather provides:
- **Hyperlocal Forecasts**: 7-day weather outlook specific to each farm location
- **Smart Recommendations**: Actionable advice on when to plant, irrigate, and harvest
- **SMS Alerts**: Daily weather updates sent directly to farmers' phones
- **Risk Warnings**: Early alerts for floods, droughts, and extreme weather

## ✨ Features

### For Farmers
- 🌤️ Location-specific 7-day weather forecasts
- 📱 Daily SMS alerts (works on any phone)
- 🌾 Crop-specific farming recommendations
- ⚠️ Critical weather warnings
- 💎 Freemium model: Free basic alerts, ₦300/month premium

### For Cooperatives & Government
- 📊 Bulk farmer management
- 📈 Analytics dashboard
- 🔌 API access for integration
- 📞 Priority support

## 🛠️ Tech Stack

### Frontend
- React 18 + Vite
- Tailwind CSS
- React Router
- Axios

### Backend
- Node.js + Express
- MongoDB + Mongoose
- OpenWeatherMap API
- Termii SMS API
- Paystack Payment

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- MongoDB Atlas account (free)
- OpenWeatherMap API key (free)

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/YOUR_USERNAME/farmweather-backend.git
cd farmweather-backend
```

2. **Install dependencies**
```bash
# Backend
npm install

# Frontend
cd client
npm install
cd ..
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your API keys:
```env
MONGODB_URI=your_mongodb_atlas_connection_string
WEATHER_API_KEY=your_openweathermap_api_key
JWT_SECRET=your_generated_jwt_secret
```

4. **Generate JWT secret**
```bash
node generate-jwt-secret.js
```

5. **Run development servers**
```bash
# Terminal 1 - Backend
npm run server

# Terminal 2 - Frontend
cd client
npm run dev
```

6. **Open browser**
```
http://localhost:3000
```

## 📚 Documentation

- [Setup Guide](SETUP_GUIDE.md) - Detailed setup instructions
- [Deployment Guide](DEPLOYMENT.md) - Deploy to Render + Vercel
- [MongoDB Atlas Setup](MONGODB_ATLAS_SETUP.md) - Database configuration
- [Paystack Setup](PAYSTACK_SETUP_GUIDE.md) - Payment integration
- [Pitch Deck](PITCH_DECK.md) - Business model and market analysis

## 🌍 Deployment

### Backend (Render)
```bash
# Deploy to Render
# See DEPLOYMENT.md for detailed instructions
```

### Frontend (Vercel)
```bash
# Deploy to Vercel
cd client
vercel
```

## 💰 Business Model

### Revenue Streams
- **B2C**: ₦300/month premium subscriptions
- **B2B**: Cooperatives and agribusinesses
- **B2G**: State agriculture departments
- **API**: Licensing to insurance and logistics companies

### Market Opportunity
- 15M+ smallholder farmers in Nigeria
- ₦45M+ potential monthly recurring revenue (1% market capture)
- Growing agri-tech sector (25% YoY growth)

## 📊 Impact

- **Reduce crop losses** by 20-30%
- **Increase farmer income** by ₦50K-₦150K/year
- **Improve food security** across Nigeria
- **Build climate resilience** for smallholders

Aligned with **SDG 2** (Zero Hunger) and **SDG 13** (Climate Action)

## 🤝 Contributing

We welcome contributions! Please see our contributing guidelines.

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Team

Built with ❤️ for Nigerian farmers

## 📞 Contact

- Email: [your-email]
- Website: [coming soon]
- Twitter: [@farmweather]

## 🙏 Acknowledgments

- Wennovation Hub for incubation support
- Nigerian farmers who provided valuable feedback
- OpenWeatherMap for weather data API
- MongoDB Atlas for database hosting

---

**Making Nigerian agriculture climate-smart, one farmer at a time. 🌾**
