# FarmWeather - Setup Guide

## Prerequisites
- Node.js (v18+)
- MongoDB (local or Atlas)
- OpenWeatherMap API key (free tier)
- Termii API key (for SMS) - optional for testing

## Installation Steps

### 1. Install Dependencies
```bash
# Install backend dependencies
npm install

# Install frontend dependencies
cd client
npm install
cd ..
```

### 2. Environment Setup
```bash
# Copy environment template
copy .env.example .env

# Generate JWT secret
node generate-jwt-secret.js

# Edit .env and add your API keys
```

Required environment variables:
- `MONGODB_URI` - Your MongoDB connection string
- `WEATHER_API_KEY` - OpenWeatherMap API key (get free at https://openweathermap.org/api)
- `JWT_SECRET` - Run `node generate-jwt-secret.js` to generate one
- `SMS_API_KEY` - Termii API key (optional for testing)

### 3. Start MongoDB
```bash
# If using local MongoDB
mongod
```

Or use MongoDB Atlas (cloud) - update MONGODB_URI in .env

### 4. Run the Application
```bash
# Development mode (runs both frontend and backend)
npm run dev

# Or run separately:
# Backend only
npm run server

# Frontend only (in another terminal)
npm run client
```

### 5. Access the Application
- Frontend: http://localhost:3000
- Backend API: http://localhost:5000

## Testing the Platform

### 1. Register a Farmer
- Go to http://localhost:3000/register
- Fill in farmer details
- Submit registration

### 2. View Dashboard
- Go to http://localhost:3000/dashboard
- See 7-day weather forecast
- View recommendations

### 3. Test API Endpoints
```bash
# Get weather forecast
curl "http://localhost:5000/api/weather/forecast?lat=9.0820&lon=8.6753"

# Get recommendations
curl "http://localhost:5000/api/weather/recommendations?lat=9.0820&lon=8.6753&crop=maize"

# Get all alerts
curl "http://localhost:5000/api/alerts"
```

## SMS Testing (Optional)

To test SMS alerts:
1. Sign up for Termii account (https://termii.com)
2. Get API key and add to .env
3. Add your phone number to test farmer registration
4. SMS alerts run daily at 6 AM (configurable in server/index.js)

## Deployment

### Frontend (Vercel/Netlify)
```bash
cd client
npm run build
# Deploy dist folder
```

### Backend (Railway/Render/Heroku)
```bash
# Set environment variables on platform
# Deploy from root directory
```

## Next Steps for Production

1. **Get Production API Keys:**
   - OpenWeatherMap paid plan for more requests
   - Termii production account with SMS credits

2. **Database:**
   - Use MongoDB Atlas for production
   - Set up backups and monitoring

3. **Payment Integration:**
   - Integrate Paystack for premium subscriptions
   - Add webhook handlers

4. **Geocoding:**
   - Add proper geocoding for Nigerian locations
   - Use Google Maps API or Mapbox

5. **Monitoring:**
   - Add error tracking (Sentry)
   - Set up uptime monitoring
   - Add analytics (Google Analytics)

## Troubleshooting

### MongoDB Connection Error
- Ensure MongoDB is running
- Check MONGODB_URI in .env
- For Atlas, whitelist your IP address

### Weather API Error
- Verify WEATHER_API_KEY is correct
- Check API quota (free tier: 1000 calls/day)
- Ensure internet connection

### SMS Not Sending
- Verify SMS_API_KEY is correct
- Check Termii account balance
- Verify phone number format (+234...)

## Support
For issues or questions, contact: [your-email]
